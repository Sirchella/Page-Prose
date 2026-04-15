import { X, Upload } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createBook, updateBook, type Book } from '../api';

interface BookDisplay {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  price: number;
  stock: number;
  coverUrl: string;
}

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  editingBook?: BookDisplay | null;
}

const emptyForm = { title: '', author: '', genre: '', price: '', stock: '', isbn: '', description: '' };

export function ProductDrawer({ isOpen, onClose, onSave, editingBook }: ProductDrawerProps) {
  const [formData, setFormData] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!editingBook;

  // Pre-populate form when editing
  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        price: String(editingBook.price),
        stock: String(editingBook.stock),
        isbn: editingBook.isbn,
        description: '',
      });
      setCoverPreview(editingBook.coverUrl || null);
      setCoverFile(null);
    } else {
      setFormData(emptyForm);
      setCoverPreview(null);
      setCoverFile(null);
    }
    setError(null);
  }, [editingBook, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.isbn.trim()) {
      setError('Title, author and ISBN are required.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('author', formData.author);
      data.append('genre', formData.genre);
      data.append('price', formData.price);
      data.append('stock', formData.stock);
      data.append('isbn', formData.isbn);
      data.append('description', formData.description);
      if (coverFile) data.append('cover_image', coverFile);

      const saved = isEditing
        ? await updateBook(parseInt(editingBook!.id), data)
        : await createBook(data);

      onSave(saved);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save book. Check all fields and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#1a1a1a] z-50 shadow-xl overflow-auto">
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#262626] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-[#f5f5f5]">{isEditing ? 'Edit Book' : 'Add New Book'}</h2>
            <p className="text-sm text-[#a3a3a3] mt-1">{isEditing ? 'Update the book details below' : 'Enter the book details below'}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#a3a3a3] hover:text-[#f5f5f5] flex items-center justify-center transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-700/40 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>
          )}

          {/* Cover Image */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Cover Image</label>
            <div
              className="border-2 border-dashed border-[#262626] rounded-lg p-8 text-center hover:border-[#A68A64] transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {coverPreview ? (
                <img src={coverPreview} alt="Cover preview" className="mx-auto h-40 object-contain rounded" />
              ) : (
                <>
                  <Upload className="w-12 h-12 text-[#a3a3a3] mx-auto mb-4" />
                  <p className="text-sm text-[#f5f5f5] mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-[#a3a3a3]">PNG, JPG up to 5MB</p>
                </>
              )}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="Enter book title" required />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Author *</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="Enter author name" required />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">ISBN *</label>
            <input type="text" name="isbn" value={formData.isbn} onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="978-0-00-000000-0" required />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Genre *</label>
            <select name="genre" value={formData.genre} onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              required>
              <option value="">Select a genre</option>
              <option value="fiction">Fiction</option>
              <option value="mystery">Mystery & Thriller</option>
              <option value="romance">Romance</option>
              <option value="fantasy">Fantasy</option>
              <option value="scifi">Science Fiction</option>
              <option value="biography">Biography</option>
              <option value="history">History</option>
              <option value="selfhelp">Self-Help</option>
              <option value="business">Business</option>
            </select>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]">$</span>
                <input type="number" name="price" value={formData.price} onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg pl-8 pr-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
                  placeholder="0.00" step="0.01" min="0" required />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Stock Quantity *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
                placeholder="0" min="0" required />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent resize-none"
              placeholder="Enter book description..." />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
