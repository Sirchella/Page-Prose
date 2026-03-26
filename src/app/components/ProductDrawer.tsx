import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface ProductDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDrawer({ isOpen, onClose }: ProductDrawerProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    isbn: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#1a1a1a] z-50 shadow-xl overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#262626] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-[#f5f5f5]">Add New Book</h2>
            <p className="text-sm text-[#a3a3a3] mt-1">Enter the book details below</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#a3a3a3] hover:text-[#f5f5f5] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Cover Image</label>
            <div className="border-2 border-dashed border-[#262626] rounded-lg p-8 text-center hover:border-[#A68A64] transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-[#a3a3a3] mx-auto mb-4" />
              <p className="text-sm text-[#f5f5f5] mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-[#a3a3a3]">PNG, JPG up to 5MB</p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">ISBN</label>
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              placeholder="978-0-00-000000-0"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Genre *</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
              required
            >
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

          {/* Price and Stock - Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Price *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a3a3a3]">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg pl-8 pr-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#f5f5f5] mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#f5f5f5] mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg px-4 py-3 text-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent resize-none"
              placeholder="Enter book description..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#A68A64] text-[#0a0a0a] rounded-lg hover:bg-[#C4A67A] transition-colors"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
