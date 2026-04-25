import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, ShoppingCart, User, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchBooks, coverUrl, type Book as ApiBook } from '../api';
import { useCart } from '../CartContext';

type DisplayBook = {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  format: string[];
  coverImage: string;
  inStock: boolean;
  isbn: string;
};

function mapApiBook(b: ApiBook): DisplayBook {
  return {
    id: String(b.id),
    title: b.title,
    author: b.author,
    price: parseFloat(b.price),
    genre: b.genre,
    format: ['Paperback'],
    coverImage: coverUrl(b.cover_image),
    inStock: b.stock > 0,
    isbn: b.isbn,
  };
}

const genres = ['All', 'African Literature', 'Fiction', 'Mystery & Thriller', 'Science Fiction & Fantasy', 'Romance', 'Non-Fiction', 'Biography', 'Business & Economics', 'Self-Help', 'History', 'Science & Technology', 'Religion & Spirituality', "Children's Books", 'Poetry & Drama'];

export function BrowsePage() {
  const navigate = useNavigate();
  const { addItem, totalCount } = useCart();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showInStock, setShowInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [books, setBooks] = useState<DisplayBook[]>([]);

  useEffect(() => {
    fetchBooks()
      .then(apiBooks => setBooks(apiBooks.map(mapApiBook)))
      .catch(() => {});
  }, []);

  const handleAddToCart = (book: DisplayBook) => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      format: 'Paperback',
      price: book.price,
      coverImage: book.coverImage,
    });
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats(prev =>
      prev.includes(format)
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const filteredBooks = books.filter(book => {
    if (selectedGenre !== 'All' && book.genre !== selectedGenre) return false;
    if (selectedFormats.length > 0 && !book.format.some((f: string) => selectedFormats.includes(f))) return false;
    if (book.price < priceRange[0] || book.price > priceRange[1]) return false;
    if (showInStock && !book.inStock) return false;
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && !book.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
              <p className="hidden md:block text-xs text-[#8B6F47]">Literary Excellence Since 1952</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#8B6F47]" />
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-white border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] text-sm md:text-base"
                />
              </div>
            </div>

            {/* Genre Dropdown — hide on mobile */}
            <div className="relative hidden md:block">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-[#D4C4B0] rounded-lg hover:border-[#A68A64] transition-colors text-[#2C2416]">
                <span>Browse</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="md:hidden flex items-center gap-1 px-3 py-2 bg-white border-2 border-[#D4C4B0] rounded-lg text-[#2C2416] text-sm flex-shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Cart Icon */}
            <button onClick={() => navigate('/cart')} className="relative p-2 md:p-3 bg-[#4A7C2C] rounded-lg hover:bg-[#3d6624] transition-colors flex-shrink-0">
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-[#A68A64] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Login Icon */}
            <button onClick={() => navigate('/admin/login')} className="p-2 md:p-3 bg-[#A68A64] rounded-lg hover:bg-[#8f7556] transition-colors flex-shrink-0">
              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Filter Drawer Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
          <div className="relative ml-auto w-72 max-w-full h-full bg-white shadow-xl overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#4A7C2C]" />
                <h2 className="text-lg text-[#2C2416] font-serif">Filters</h2>
              </div>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5 text-[#6B5D4F]" />
              </button>
            </div>

            {/* Genre Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Genre</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1 text-sm rounded-full border-2 transition-colors ${selectedGenre === genre ? 'bg-[#4A7C2C] border-[#4A7C2C] text-white' : 'border-[#D4C4B0] text-[#4A4A4A]'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6 pb-6 border-b border-[#E8DCC8]">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Price Range</h3>
              <input type="range" min="0" max="50000" value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-[#4A7C2C]" />
              <div className="flex items-center justify-between text-sm text-[#4A4A4A] mt-2">
                <span>{Math.round(priceRange[0]).toLocaleString()} XAF</span>
                <span>{Math.round(priceRange[1]).toLocaleString()} XAF</span>
              </div>
            </div>

            {/* Format */}
            <div className="mb-6 pb-6 border-b border-[#E8DCC8]">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Format</h3>
              <div className="space-y-2">
                {['Hardback', 'Paperback', 'eBook'].map(format => (
                  <label key={format} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedFormats.includes(format)} onChange={() => toggleFormat(format)} className="w-4 h-4 text-[#4A7C2C] border-[#A68A64] rounded focus:ring-[#4A7C2C]" />
                    <span className="text-sm text-[#4A4A4A]">{format}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Availability</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={showInStock} onChange={(e) => setShowInStock(e.target.checked)} className="w-4 h-4 text-[#4A7C2C] border-[#A68A64] rounded focus:ring-[#4A7C2C]" />
                <span className="text-sm text-[#4A4A4A]">In Stock Only</span>
              </label>
            </div>

            <button
              onClick={() => { setSelectedGenre('All'); setSelectedFormats([]); setPriceRange([0, 50000]); setShowInStock(false); setSearchQuery(''); setShowMobileFilters(false); }}
              className="w-full px-4 py-2 bg-[#E8DCC8] text-[#4A4A4A] rounded-lg hover:bg-[#D4C4B0] transition-colors text-sm"
            >
              Clear All Filters
            </button>
            <button onClick={() => setShowMobileFilters(false)} className="w-full mt-3 px-4 py-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors text-sm">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 md:py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters (desktop only) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-[#4A7C2C]" />
                <h2 className="text-lg text-[#2C2416] font-serif">Filters</h2>
              </div>

              {/* Genre Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Genre</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {genres.map(genre => (
                    <label key={genre} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="genre"
                        checked={selectedGenre === genre}
                        onChange={() => setSelectedGenre(genre)}
                        className="w-4 h-4 text-[#4A7C2C] border-[#A68A64] focus:ring-[#4A7C2C]"
                      />
                      <span className="text-sm text-[#4A4A4A]">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-[#E8DCC8]">
                <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-[#4A7C2C]"
                  />
                  <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                    <span>{Math.round(priceRange[0]).toLocaleString()} XAF</span>
                    <span>{Math.round(priceRange[1]).toLocaleString()} XAF</span>
                  </div>
                </div>
              </div>

              {/* Format Filter */}
              <div className="mb-6 pb-6 border-b border-[#E8DCC8]">
                <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Format</h3>
                <div className="space-y-2">
                  {['Hardback', 'Paperback', 'eBook'].map(format => (
                    <label key={format} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFormats.includes(format)}
                        onChange={() => toggleFormat(format)}
                        className="w-4 h-4 text-[#4A7C2C] border-[#A68A64] rounded focus:ring-[#4A7C2C]"
                      />
                      <span className="text-sm text-[#4A4A4A]">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <h3 className="text-sm font-semibold text-[#2C2416] mb-3">Availability</h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="w-4 h-4 text-[#4A7C2C] border-[#A68A64] rounded focus:ring-[#4A7C2C]"
                  />
                  <span className="text-sm text-[#4A4A4A]">In Stock Only</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setSelectedFormats([]);
                  setPriceRange([0, 50000]);
                  setShowInStock(false);
                  setSearchQuery('');
                }}
                className="w-full mt-6 px-4 py-2 bg-[#E8DCC8] text-[#4A4A4A] rounded-lg hover:bg-[#D4C4B0] transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content - Book Grid */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif mb-1 md:mb-2">
                {selectedGenre === 'All' ? 'All Books' : selectedGenre}
              </h2>
              <p className="text-sm text-[#6B5D4F]">
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </p>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filteredBooks.map(book => (
                <div
                  key={book.id}
                  onClick={() => navigate(`/book/${book.id}`)}
                  className="bg-white border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer"
                >
                  {/* Book Cover */}
                  <div className="relative aspect-[3/4] bg-[#F5EFE7] overflow-hidden">
                    <ImageWithFallback
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!book.inStock && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-[#dc2626] text-white text-xs rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-2 md:p-4">
                    <h3 className="text-sm md:text-base font-serif text-[#2C2416] mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#6B5D4F] mb-2 md:mb-3">{book.author}</p>

                    {/* Formats */}
                    <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                      {book.format.map(format => (
                        <span
                          key={format}
                          className="text-xs px-1.5 py-0.5 md:px-2 md:py-1 bg-[#F5EFE7] text-[#6B5D4F] rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <span className="text-sm md:text-xl font-serif text-[#4A7C2C]">
                        {Math.round(book.price).toLocaleString()} XAF
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(book); }}
                      disabled={!book.inStock}
                      className="w-full py-1.5 md:py-2 text-xs md:text-sm bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors disabled:bg-[#D4C4B0] disabled:cursor-not-allowed disabled:text-[#8B6F47] flex items-center justify-center gap-1 md:gap-2"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                      {book.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-[#6B5D4F] font-serif mb-2">No books found</p>
                <p className="text-sm text-[#8B6F47]">Try adjusting your filters or search query</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
