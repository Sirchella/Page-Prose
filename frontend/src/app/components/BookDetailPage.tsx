import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { fetchBook, fetchBooks, type Book as ApiBook } from '../api';
import { books as mockBooks } from '../data/books';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, User, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  rating: number;
}

const bookImages = [
  'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyJTIwdmludGFnZXxlbnwxfHx8fDE3NzMzODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1758565811465-4c64744b898a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwaW50ZXJpb3IlMjBwYWdlcyUyMGRldGFpbHxlbnwxfHx8fDE3NzMzOTkzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1692742593479-7b37552a4815?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwc3BpbmUlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MzM5OTM0MXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1692877157706-b370f2a048a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwYmFjayUyMGNvdmVyfGVufDF8fHx8MTc3MzM5OTM0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
];

const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Mitchell',
    rating: 5,
    date: 'March 5, 2026',
    title: 'A masterpiece of modern fiction',
    comment: 'This book completely captivated me from the first page. The writing is beautiful, the characters are deeply developed, and the story stays with you long after you finish reading. Highly recommended!',
    verified: true,
  },
  {
    id: '2',
    author: 'James Wilson',
    rating: 4,
    date: 'February 28, 2026',
    title: 'Engaging and thought-provoking',
    comment: 'A wonderful exploration of life\'s complexities. While the pacing slowed in the middle, the ending was absolutely worth it. The author\'s prose is exceptional.',
    verified: true,
  },
  {
    id: '3',
    author: 'Emily Chen',
    rating: 5,
    date: 'February 15, 2026',
    title: 'Could not put it down!',
    comment: 'Finished this in two days because I couldn\'t stop reading. The concept is brilliant and executed perfectly. This is the kind of book that reminds you why you love reading.',
    verified: false,
  },
];


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
    coverImage: b.cover_image ? `${(import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace('/api', '')}${b.cover_image}` : bookImages[0],
    inStock: b.stock > 0,
    rating: 4.5,
    reviewCount: 0,
    synopsis: b.description,
    isbn: b.isbn,
    publisher: '',
    publicationDate: b.created_at.slice(0, 10),
    pages: 0,
  };
}

export function BookDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mockFallback = mockBooks.find(b => String(b.id) === id) ?? mockBooks[0];
  const [book, setBook] = useState(mockFallback);
  const [relatedBooks, setRelatedBooks] = useState<RelatedBook[]>([]);

  const mediaBase = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace('/api', '');

  useEffect(() => {
    if (!id) return;
    fetchBook(id)
      .then(apiBook => setBook(apiBookToDisplay(apiBook)))
      .catch(() => {});
    fetchBooks()
      .then(all => {
        setRelatedBooks(all.filter(b => String(b.id) !== id).slice(0, 5).map(b => ({
          id: String(b.id), title: b.title, author: b.author,
          price: parseFloat(b.price),
          coverImage: b.cover_image ? `${mediaBase}${b.cover_image}` : bookImages[0],
          rating: 4.5,
        })));
      })
      .catch(() => {});
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'Hardback' | 'Paperback'>('Hardback');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
                <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-[#A68A64] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-12">
        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
          {/* Left Side - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden mb-4 aspect-[3/4]">
              <ImageWithFallback
                src={selectedImage === 0 ? book.coverImage : bookImages[selectedImage]}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Previews */}
            <div className="grid grid-cols-4 gap-3">
              {bookImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#4A7C2C] shadow-lg'
                      : 'border-[#D4C4B0] hover:border-[#A68A64]'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
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

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D4C4B0]'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#6B5D4F]">{book.rating} ({book.reviewCount.toLocaleString()} reviews)</span>
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
              <button onClick={() => navigate('/cart')} className="w-full py-4 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-3 text-lg font-semibold">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
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
                  <span className="text-[#6B5D4F]">Pages:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">{book.pages}</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">Publisher:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">{book.publisher}</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">ISBN:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">{book.isbn}</span>
                </div>
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
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">ISBN-13</div>
                  <div className="text-base text-[#2C2416]">{book.isbn}</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Publisher</div>
                  <div className="text-base text-[#2C2416]">{book.publisher}</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Publication Date</div>
                  <div className="text-base text-[#2C2416]">{book.publicationDate}</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Language</div>
                  <div className="text-base text-[#2C2416]">English</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Pages</div>
                  <div className="text-base text-[#2C2416]">{book.pages} pages</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Dimensions</div>
                  <div className="text-base text-[#2C2416]">21.6 x 13.5 x 2.8 cm</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Weight</div>
                  <div className="text-base text-[#2C2416]">420g</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Awards</div>
                  <div className="text-base text-[#2C2416]">Goodreads Choice Award Nominee (2020)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif">Customer Reviews</h2>
              <button onClick={() => alert('Review submission coming soon.')} className="px-4 py-2 border-2 border-[#4A7C2C] text-[#4A7C2C] rounded-lg hover:bg-[#4A7C2C] hover:text-white transition-colors">
                Write a Review
              </button>
            </div>

            {/* Review Summary */}
            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8 pb-6 md:pb-8 mb-6 md:mb-8 border-b-2 border-[#E8DCC8]">
              <div className="text-center">
                <div className="text-5xl text-[#4A7C2C] font-serif mb-2">{book.rating}</div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D4C4B0]'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-[#6B5D4F]">{book.reviewCount.toLocaleString()} reviews</div>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm text-[#6B5D4F] w-12">{stars} star</span>
                    <div className="flex-1 h-2 bg-[#E8DCC8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F59E0B] rounded-full"
                        style={{ width: `${stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#6B5D4F] w-12 text-right">
                      {stars === 5 ? '1,850' : stars === 4 ? '712' : stars === 3 ? '199' : stars === 2 ? '57' : '29'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="pb-6 border-b border-[#E8DCC8] last:border-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#4A7C2C] flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-[#2C2416]">{review.author}</span>
                        {review.verified && (
                          <span className="px-2 py-1 bg-[#4A7C2C]/10 text-[#4A7C2C] text-xs rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D4C4B0]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-[#6B5D4F]">{review.date}</span>
                      </div>
                      <h4 className="font-semibold text-[#2C2416] mb-2">{review.title}</h4>
                      <p className="text-[#4A4A4A] leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => alert('Loading more reviews...')} className="w-full mt-6 py-3 border-2 border-[#D4C4B0] text-[#4A7C2C] rounded-lg hover:bg-[#F5EFE7] transition-colors">
              Show More Reviews
            </button>
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
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(book.rating) ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#D4C4B0]'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#6B5D4F]">{book.rating}</span>
                      </div>
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