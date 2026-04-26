import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { fetchBook, fetchBooks, coverUrl, type Book as ApiBook } from '../api';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}


function apiBookToDisplay(b: ApiBook) {
  return {
    id: String(b.id),
    title: b.title,
    author: b.author,
    price: parseFloat(b.price),
    hardbackPrice: parseFloat(b.price),
    paperbackPrice: parseFloat(b.price),
    genre: b.genre,
    format: ['Paperback'] as string[],
    coverImage: coverUrl(b.cover_image) || '',
    inStock: b.stock > 0,
    synopsis: b.description,
    isbn: b.isbn,
    publicationDate: b.created_at.slice(0, 10),
  };
}

export function BookDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { totalCount, addItem } = useCart();
  const [book, setBook] = useState<ReturnType<typeof apiBookToDisplay> | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBooks, setRelatedBooks] = useState<RelatedBook[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchBook(id)
      .then(apiBook => setBook(apiBookToDisplay(apiBook)))
      .catch(() => {})
      .finally(() => setLoading(false));
    fetchBooks()
      .then(all => {
        setRelatedBooks(all.filter(b => String(b.id) !== id).slice(0, 5).map(b => ({
          id: String(b.id), title: b.title, author: b.author,
          price: parseFloat(b.price),
          coverImage: coverUrl(b.cover_image) || '',
        })));
      })
      .catch(() => {});
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'Hardback' | 'Paperback'>('Hardback');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center">
        <p className="text-[#6B5D4F] text-lg">Loading…</p>
      </div>
    );
  }
  if (!book) {
    return (
      <div className="min-h-screen bg-[#F5EFE7] flex items-center justify-center">
        <p className="text-[#6B5D4F] text-lg">Book not found.</p>
      </div>
    );
  }

  const hardbackPrice = book.hardbackPrice ?? book.price;
  const paperbackPrice = book.paperbackPrice ?? book.price;
  const currentPrice = selectedFormat === 'Hardback' ? hardbackPrice : paperbackPrice;

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    draggable: false,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, draggable: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, draggable: true } },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation Bar (Simple version) */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => navigate('/')} className="px-3 py-2 text-sm md:text-base md:px-4 text-[#4A7C2C] hover:text-[#3d6624] transition-colors">
                Back to Browse
              </button>
              <button onClick={() => navigate('/cart')} className="relative p-2 md:p-3 bg-[#4A7C2C] rounded-lg hover:bg-[#3d6624] transition-colors">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
                {totalCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-[#A68A64] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
          {/* Left Side - Image */}
          <div>
            {/* Main Image */}
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden mb-4 aspect-[3/4]">
              {book.coverImage ? (
                <ImageWithFallback
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F5EFE7]">
                  <span className="text-[#6B5D4F] text-center px-4 font-serif text-lg">{book.title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Details */}
          <div>
            {/* Title & Author */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-4xl text-[#2C2416] font-serif mb-3">
                {book.title}
              </h1>
              <p className="text-base md:text-xl text-[#4A7C2C] mb-4">
                by <span className="hover:underline">{book.author}</span>
              </p>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4A7C2C]/10 rounded-full">
                <span className="text-sm text-[#4A7C2C] font-semibold">{book.genre}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b-2 border-[#E8DCC8]">
              <div className="text-2xl md:text-4xl text-[#4A7C2C] font-serif">
                {Math.round(currentPrice).toLocaleString()} XAF
              </div>
            </div>

            {/* Format Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2C2416] mb-3">
                Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedFormat('Hardback')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFormat === 'Hardback'
                      ? 'border-[#4A7C2C] bg-[#4A7C2C]/10'
                      : 'border-[#D4C4B0] hover:border-[#A68A64]'
                  }`}
                >
                  <div className="text-base text-[#2C2416] font-semibold mb-1">Hardback</div>
                  <div className="text-sm text-[#6B5D4F]">{Math.round(hardbackPrice).toLocaleString()} XAF</div>
                </button>
                <button
                  onClick={() => setSelectedFormat('Paperback')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedFormat === 'Paperback'
                      ? 'border-[#4A7C2C] bg-[#4A7C2C]/10'
                      : 'border-[#D4C4B0] hover:border-[#A68A64]'
                  }`}
                >
                  <div className="text-base text-[#2C2416] font-semibold mb-1">Paperback</div>
                  <div className="text-sm text-[#6B5D4F]">{Math.round(paperbackPrice).toLocaleString()} XAF</div>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A7C2C]/10 border border-[#4A7C2C] rounded-lg">
                <Check className="w-5 h-5 text-[#4A7C2C]" />
                <span className="text-sm text-[#4A7C2C] font-semibold">{book.inStock ? 'In Stock - Ships within 24 hours' : 'Out of Stock'}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#2C2416] mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#D4C4B0] rounded-lg hover:border-[#A68A64] transition-colors"
                >
                  <span className="text-xl text-[#2C2416]">−</span>
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border-2 border-[#D4C4B0] rounded-lg text-[#2C2416]"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border-2 border-[#D4C4B0] rounded-lg hover:border-[#A68A64] transition-colors"
                >
                  <span className="text-xl text-[#2C2416]">+</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => {
                  // Add the selected quantity to cart
                  for (let i = 0; i < quantity; i++) {
                    addItem({
                      id: book.id,
                      title: book.title,
                      author: book.author,
                      format: selectedFormat,
                      price: currentPrice,
                      coverImage: book.coverImage,
                    });
                  }
                  navigate('/cart');
                }}
                disabled={!book.inStock}
                className="w-full py-4 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-3 text-lg font-semibold disabled:bg-[#D4C4B0] disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                {book.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-full py-3 border-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'border-[#dc2626] text-[#dc2626] bg-[#dc2626]/5'
                    : 'border-[#A68A64] text-[#A68A64] hover:bg-[#A68A64]/5'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Quick Details */}
            <div className="p-4 bg-white border-2 border-[#E8DCC8] rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-[#6B5D4F]">Category:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">{book.genre}</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">Added:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">{book.publicationDate}</span>
                </div>
                {book.isbn && (
                  <div className="col-span-2">
                    <span className="text-[#6B5D4F]">ISBN:</span>
                    <span className="ml-2 text-[#2C2416] font-semibold">{book.isbn}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Below the Fold - Tabs Section */}
        <div className="mb-16">
          {/* Synopsis */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8 mb-4 md:mb-8">
            <h2 className="text-2xl text-[#2C2416] font-serif mb-4">Synopsis</h2>
            <div className="text-[#4A4A4A] leading-relaxed">
              <p>{book.synopsis}</p>
            </div>
          </div>

          {/* Book Details */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8 mb-4 md:mb-8">
            <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif mb-4 md:mb-6">Book Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <div className="text-sm text-[#6B5D4F] mb-1">Author</div>
                <div className="text-base text-[#2C2416]">{book.author}</div>
              </div>
              <div>
                <div className="text-sm text-[#6B5D4F] mb-1">Genre</div>
                <div className="text-base text-[#2C2416] capitalize">{book.genre}</div>
              </div>
              <div>
                <div className="text-sm text-[#6B5D4F] mb-1">Date Added</div>
                <div className="text-base text-[#2C2416]">{book.publicationDate}</div>
              </div>
              {book.isbn && (
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">ISBN</div>
                  <div className="text-base text-[#2C2416]">{book.isbn}</div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Reviews placeholder */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8">
            <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif mb-4">Customer Reviews</h2>
            <p className="text-[#6B5D4F] text-sm">Reviews are coming soon. Be the first to read and share your thoughts!</p>
          </div>
        </div>

        {/* You May Also Like Carousel */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8">
          <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif mb-4 md:mb-6">You May Also Like</h2>
          <div className="carousel-container">
            <Slider {...carouselSettings}>
              {relatedBooks.map((book) => (
                <div key={book.id} className="px-3">
                  <Link to={`/book/${book.id}`} className="block bg-[#F5EFE7] border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer">
                    <div className="aspect-[3/4] overflow-hidden">
                      <ImageWithFallback
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-serif text-[#2C2416] mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-xs text-[#6B5D4F] mb-2">{book.author}</p>
                      <div className="text-lg font-serif text-[#4A7C2C]">
                        {Math.round(book.price).toLocaleString()} XAF
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Arrow Components for Carousel
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}