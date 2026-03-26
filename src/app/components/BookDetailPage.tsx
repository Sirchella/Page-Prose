import { useState } from 'react';
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

const relatedBooks: RelatedBook[] = [
  {
    id: '1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 12.99,
    rating: 4.5,
    coverImage: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzUzNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    title: 'Beach Read',
    author: 'Emily Henry',
    price: 13.99,
    rating: 4.8,
    coverImage: 'https://images.unsplash.com/photo-1711185898226-beea7eee0611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzk0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 16.99,
    rating: 4.7,
    coverImage: 'https://images.unsplash.com/photo-1772225027406-00bda64076b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMyODk4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    price: 15.99,
    rating: 4.9,
    coverImage: 'https://images.unsplash.com/photo-1711185892188-13f35959d3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzM3OTYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    title: 'Educated',
    author: 'Tara Westover',
    price: 14.99,
    rating: 4.6,
    coverImage: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzMxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function BookDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState<'Hardback' | 'Paperback'>('Hardback');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const hardbackPrice = 16.99;
  const paperbackPrice = 14.99;
  const currentPrice = selectedFormat === 'Hardback' ? hardbackPrice : paperbackPrice;

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation Bar (Simple version) */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-[#4A7C2C] hover:text-[#3d6624] transition-colors">
                Back to Browse
              </button>
              <button className="relative p-3 bg-[#4A7C2C] rounded-lg hover:bg-[#3d6624] transition-colors">
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#A68A64] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* Product Section */}
        <div className="grid grid-cols-2 gap-12 mb-16">
          {/* Left Side - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg overflow-hidden mb-4 aspect-[3/4]">
              <ImageWithFallback
                src={bookImages[selectedImage]}
                alt="The Midnight Library"
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
              <h1 className="text-4xl text-[#2C2416] font-serif mb-3">
                The Midnight Library
              </h1>
              <p className="text-xl text-[#4A7C2C] mb-4">
                by <a href="#" className="hover:underline">Matt Haig</a>
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
                <span className="text-sm text-[#6B5D4F]">4.2 (2,847 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b-2 border-[#E8DCC8]">
              <div className="text-4xl text-[#4A7C2C] font-serif">
                £{currentPrice.toFixed(2)}
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
                  <div className="text-sm text-[#6B5D4F]">£{hardbackPrice.toFixed(2)}</div>
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
                  <div className="text-sm text-[#6B5D4F]">£{paperbackPrice.toFixed(2)}</div>
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A7C2C]/10 border border-[#4A7C2C] rounded-lg">
                <Check className="w-5 h-5 text-[#4A7C2C]" />
                <span className="text-sm text-[#4A7C2C] font-semibold">In Stock - Ships within 24 hours</span>
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
              <button className="w-full py-4 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-3 text-lg font-semibold">
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
                  <span className="ml-2 text-[#2C2416] font-semibold">Fiction</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">Pages:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">304</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">Publisher:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">Canongate</span>
                </div>
                <div>
                  <span className="text-[#6B5D4F]">ISBN:</span>
                  <span className="ml-2 text-[#2C2416] font-semibold">978-1786892737</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Below the Fold - Tabs Section */}
        <div className="mb-16">
          {/* Synopsis */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-8">
            <h2 className="text-2xl text-[#2C2416] font-serif mb-4">Synopsis</h2>
            <div className="text-[#4A4A4A] leading-relaxed space-y-4">
              <p>
                Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?
              </p>
              <p>
                A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time. Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life.
              </p>
              <p>
                While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better? In The Midnight Library, Matt Haig's enchanting new novel, Nora Seed finds herself faced with this decision. Faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.
              </p>
            </div>
          </div>

          {/* Book Details */}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-8">
            <h2 className="text-2xl text-[#2C2416] font-serif mb-6">Book Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">ISBN-13</div>
                  <div className="text-base text-[#2C2416]">978-1786892737</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Publisher</div>
                  <div className="text-base text-[#2C2416]">Canongate Books</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Publication Date</div>
                  <div className="text-base text-[#2C2416]">August 13, 2020</div>
                </div>
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Language</div>
                  <div className="text-base text-[#2C2416]">English</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#6B5D4F] mb-1">Pages</div>
                  <div className="text-base text-[#2C2416]">304 pages</div>
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
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-[#2C2416] font-serif">Customer Reviews</h2>
              <button className="px-4 py-2 border-2 border-[#4A7C2C] text-[#4A7C2C] rounded-lg hover:bg-[#4A7C2C] hover:text-white transition-colors">
                Write a Review
              </button>
            </div>

            {/* Review Summary */}
            <div className="flex items-start gap-8 pb-8 mb-8 border-b-2 border-[#E8DCC8]">
              <div className="text-center">
                <div className="text-5xl text-[#4A7C2C] font-serif mb-2">4.2</div>
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
                <div className="text-sm text-[#6B5D4F]">2,847 reviews</div>
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

            <button className="w-full mt-6 py-3 border-2 border-[#D4C4B0] text-[#4A7C2C] rounded-lg hover:bg-[#F5EFE7] transition-colors">
              Show More Reviews
            </button>
          </div>
        </div>

        {/* You May Also Like Carousel */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
          <h2 className="text-2xl text-[#2C2416] font-serif mb-6">You May Also Like</h2>
          <div className="carousel-container">
            <Slider {...carouselSettings}>
              {relatedBooks.map((book) => (
                <div key={book.id} className="px-3">
                  <div className="bg-[#F5EFE7] border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer">
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
                        £{book.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
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