import { useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  genre: string;
  format: string[];
  coverImage: string;
  inStock: boolean;
}

const books: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 14.99,
    genre: 'Fiction',
    format: ['Hardback', 'Paperback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyJTIwdmludGFnZXxlbnwxfHx8fDE3NzMzODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '2',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 12.99,
    genre: 'Mystery & Thriller',
    format: ['Paperback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzUzNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '3',
    title: 'Beach Read',
    author: 'Emily Henry',
    price: 13.99,
    genre: 'Romance',
    format: ['Hardback', 'Paperback'],
    coverImage: 'https://images.unsplash.com/photo-1711185898226-beea7eee0611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzk0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    price: 16.99,
    genre: 'Science Fiction',
    format: ['Hardback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1772225027406-00bda64076b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMyODk4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '5',
    title: 'The Name of the Wind',
    author: 'Patrick Rothfuss',
    price: 15.99,
    genre: 'Fantasy',
    format: ['Hardback', 'Paperback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1711185892188-13f35959d3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzM3OTYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: false,
  },
  {
    id: '6',
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    price: 10.99,
    genre: 'Poetry',
    format: ['Paperback'],
    coverImage: 'https://images.unsplash.com/photo-1716892001560-935f123683f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2V0cnklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzg5ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '7',
    title: 'Educated',
    author: 'Tara Westover',
    price: 14.99,
    genre: 'Biography',
    format: ['Hardback', 'Paperback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzMxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '8',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 13.99,
    genre: 'Self-Help',
    format: ['Hardback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1632847933603-677959bb8ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMzMjU5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '9',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    price: 14.99,
    genre: 'Historical Fiction',
    format: ['Paperback', 'eBook'],
    coverImage: 'https://images.unsplash.com/photo-1767968835997-5c5e9bc14b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3JpY2FsJTIwZmljdGlvbiUyMGJvb2t8ZW58MXx8fHwxNzczMzY1MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '10',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    price: 16.99,
    genre: 'Psychology',
    format: ['Hardback', 'Paperback'],
    coverImage: 'https://images.unsplash.com/photo-1722974611253-d9ecd8d03b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWxmJTIwaGVscCUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMzOTcxMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '11',
    title: 'Salt, Fat, Acid, Heat',
    author: 'Samin Nosrat',
    price: 24.99,
    genre: 'Cooking',
    format: ['Hardback'],
    coverImage: 'https://images.unsplash.com/photo-1602516095206-3365caa029e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9vayUyMGN1bGluYXJ5JTIwYm9va3xlbnwxfHx8fDE3NzMzOTcxMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: true,
  },
  {
    id: '12',
    title: 'Lonely Planet Europe',
    author: 'Lonely Planet',
    price: 22.99,
    genre: 'Travel',
    format: ['Paperback'],
    coverImage: 'https://images.unsplash.com/photo-1560278674-4a17b808730a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBndWlkZSUyMGJvb2t8ZW58MXx8fHwxNzczMzg0NjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    inStock: false,
  },
];

const genres = ['All', 'Fiction', 'Mystery & Thriller', 'Romance', 'Science Fiction', 'Fantasy', 'Poetry', 'Biography', 'Self-Help', 'Historical Fiction', 'Psychology', 'Cooking', 'Travel'];

export function BrowsePage() {
  const [cartCount, setCartCount] = useState(3);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showInStock, setShowInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
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
    if (selectedFormats.length > 0 && !book.format.some(f => selectedFormats.includes(f))) return false;
    if (book.price < priceRange[0] || book.price > priceRange[1]) return false;
    if (showInStock && !book.inStock) return false;
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && !book.author.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
              <p className="text-xs text-[#8B6F47]">Literary Excellence Since 1952</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B6F47]" />
                <input
                  type="text"
                  placeholder="Search for books, authors, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                />
              </div>
            </div>

            {/* Genre Dropdown */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-[#D4C4B0] rounded-lg hover:border-[#A68A64] transition-colors text-[#2C2416]">
                <span>Browse</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Icon */}
            <button className="relative p-3 bg-[#4A7C2C] rounded-lg hover:bg-[#3d6624] transition-colors">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#A68A64] text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login Icon */}
            <button className="p-3 bg-[#A68A64] rounded-lg hover:bg-[#8f7556] transition-colors">
              <User className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <aside className="w-64 flex-shrink-0">
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
                    max="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-[#4A7C2C]"
                  />
                  <div className="flex items-center justify-between text-sm text-[#4A4A4A]">
                    <span>£{priceRange[0]}</span>
                    <span>£{priceRange[1]}</span>
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
                  setPriceRange([0, 50]);
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
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl text-[#2C2416] font-serif mb-2">
                {selectedGenre === 'All' ? 'All Books' : selectedGenre}
              </h2>
              <p className="text-sm text-[#6B5D4F]">
                Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
              </p>
            </div>

            {/* Book Grid */}
            <div className="grid grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <div
                  key={book.id}
                  className="bg-white border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group"
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
                  <div className="p-4">
                    <h3 className="text-base font-serif text-[#2C2416] mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-[#6B5D4F] mb-3">{book.author}</p>

                    {/* Formats */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {book.format.map(format => (
                        <span
                          key={format}
                          className="text-xs px-2 py-1 bg-[#F5EFE7] text-[#6B5D4F] rounded"
                        >
                          {format}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-serif text-[#4A7C2C]">
                        £{book.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!book.inStock}
                      className="w-full py-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors disabled:bg-[#D4C4B0] disabled:cursor-not-allowed disabled:text-[#8B6F47] flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
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
