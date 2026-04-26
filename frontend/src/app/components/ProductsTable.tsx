import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import { ProductDrawer } from './ProductDrawer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchBooks, deleteBook, coverUrl, type Book as ApiBook } from '../api';

interface Book {
  id: string;
  coverUrl: string;
  title: string;
  author: string;
  isbn: string;
  price: number;
  stock: number;
  genre: string;
  status: 'active' | 'out-of-stock';
}


function apiBooksToDisplay(apiBooks: ApiBook[]): Book[] {
  return apiBooks.map(b => ({
    id: String(b.id),
    coverUrl: coverUrl(b.cover_image),
    title: b.title,
    author: b.author,
    isbn: b.isbn,
    price: parseFloat(b.price),
    stock: b.stock,
    genre: b.genre,
    status: (b.stock > 0 ? 'active' : 'out-of-stock') as 'active' | 'out-of-stock',
  }));
}

export function ProductsTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookList, setBookList] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchBooks()
      .then(apiBooks => {
        if (apiBooks.length > 0) setBookList(apiBooksToDisplay(apiBooks));
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      try {
        await deleteBook(parseInt(id));
        setBookList(prev => prev.filter(b => b.id !== id));
      } catch {
        setBookList(prev => prev.filter(b => b.id !== id));
      }
    }
  };

  const filteredBooks = bookList.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || book.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;

    return matchesSearch && matchesGenre && matchesStatus;
  });

  const getStatusColor = (status: Book['status']) => {
    return status === 'active'
      ? 'bg-[#4A7C2C]/20 text-[#6B9D48] border-[#4A7C2C]/30'
      : 'bg-[#dc2626]/20 text-[#ef4444] border-[#dc2626]/30';
  };

  const getStatusLabel = (status: Book['status']) => {
    return status === 'active' ? 'Active' : 'Out of Stock';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#f5f5f5]">Product Catalog</h2>
          <p className="text-sm text-[#a3a3a3] mt-1">Manage your book inventory</p>
        </div>
        <button
          onClick={() => { setSelectedBook(null); setIsDrawerOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg pl-12 pr-4 py-3 text-[#f5f5f5] placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              />
            </div>
          </div>

          {/* Genre Filter */}
          <div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3] pointer-events-none" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg pl-12 pr-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent appearance-none"
              >
                <option value="all">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="romance">Romance</option>
                <option value="fantasy">Fantasy</option>
                <option value="science fiction">Science Fiction</option>
                <option value="biography">Biography</option>
                <option value="self-help">Self-Help</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-[#a3a3a3]">
            Showing {filteredBooks.length} of {bookList.length} products
          </p>
          {(searchQuery || selectedGenre !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedGenre('all');
                setSelectedStatus('all');
              }}
              className="text-sm text-[#A68A64] hover:text-[#C4A67A] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626] bg-[#0f0f0f]">
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Cover</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Title</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Author</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">ISBN</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Price</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Stock</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Status</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className="border-b border-[#262626] hover:bg-[#1a1a1a]/50 transition-colors">
                  <td className="px-6 py-4">
                    <ImageWithFallback
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#f5f5f5]">{book.title}</p>
                    <p className="text-xs text-[#a3a3a3] mt-1">{book.genre}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#f5f5f5]">{book.author}</td>
                  <td className="px-6 py-4 text-sm text-[#a3a3a3] font-mono">{book.isbn}</td>
                  <td className="px-6 py-4 text-sm text-green-400">{Math.round(book.price).toLocaleString()} XAF</td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${book.stock === 0 ? 'text-[#ef4444]' : 'text-[#f5f5f5]'}`}>
                      {book.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${getStatusColor(book.status)}`}>
                      {getStatusLabel(book.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setSelectedBook(book); setIsDrawerOpen(true); }} className="p-2 text-[#a3a3a3] hover:text-[#A68A64] hover:bg-[#262626] rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(book.id, book.title)} className="p-2 text-[#a3a3a3] hover:text-[#dc2626] hover:bg-[#262626] rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer */}
      <ProductDrawer isOpen={isDrawerOpen} onClose={() => { setSelectedBook(null); setIsDrawerOpen(false); }} editBook={selectedBook} />
    </div>
  );
}
