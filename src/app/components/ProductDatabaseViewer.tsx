import { useState, useMemo } from 'react';
import {
  Database,
  Download,
  Upload,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  FileText,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

// Mock book data
const generateMockBooks = () => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography', 'History', 'Self-Help'];
  const titles = [
    'The Silent Echo', 'Whispers in Time', 'Beyond the Horizon', 'The Last Garden',
    'Midnight Chronicles', 'The Forgotten Path', 'Echoes of Tomorrow', 'The Silver Thread',
    'Dancing with Shadows', 'The Crimson Key', 'Tales of the North', 'The Ancient Code',
    'Beneath the Stars', 'The Hidden Door', 'Waves of Memory', 'The Eternal Flame',
    'Secrets of the Sea', 'The Golden Hour', 'Through the Mist', 'The Broken Compass',
    'Voices in the Dark', 'The Sapphire Crown', 'Dreams of Yesterday', 'The Iron Gate',
    'Fragments of Light', 'The Wandering Soul', 'Tales from the Edge', 'The Copper Mountain',
    'Echoes of Silence', 'The Velvet Shadow', 'Beneath the Surface', 'The Amber Stone',
  ];
  const authors = [
    'Emma Richardson', 'James Mitchell', 'Sarah Chen', 'David Walsh',
    'Maria Garcia', 'Robert Foster', 'Lisa Anderson', 'Michael Brown',
    'Jennifer Lee', 'Thomas Wright', 'Amy Carter', 'Daniel Moore',
    'Rachel Green', 'Christopher Davis', 'Laura Martinez', 'Kevin Taylor',
  ];

  return titles.map((title, index) => ({
    id: `BK${String(index + 1001).padStart(5, '0')}`,
    title,
    author: authors[index % authors.length],
    genre: genres[index % genres.length],
    isbn: `978-${Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}-${String(Math.floor(Math.random() * 100)).padStart(2, '0')}-${Math.floor(Math.random() * 10)}`,
    price: (Math.random() * 40 + 10).toFixed(2),
    stock: Math.floor(Math.random() * 200),
    createdDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
    lastUpdated: new Date(2026, Math.floor(Math.random() * 3), Math.floor(Math.random() * 15) + 1).toLocaleDateString(),
  }));
};

type SortField = 'id' | 'title' | 'author' | 'genre' | 'isbn' | 'price' | 'stock' | 'createdDate' | 'lastUpdated';
type SortDirection = 'asc' | 'desc' | null;

export function ProductDatabaseViewer() {
  const [books] = useState(generateMockBooks());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const itemsPerPage = 15;

  // Filtering
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;

    const query = searchQuery.toLowerCase();
    return books.filter(
      (book) =>
        book.id.toLowerCase().includes(query) ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  // Sorting
  const sortedBooks = useMemo(() => {
    if (!sortField || !sortDirection) return filteredBooks;

    return [...filteredBooks].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Handle numeric fields
      if (sortField === 'price' || sortField === 'stock') {
        aVal = parseFloat(aVal as string);
        bVal = parseFloat(bVal as string);
      }

      // Handle date fields
      if (sortField === 'createdDate' || sortField === 'lastUpdated') {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBooks, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedBooks.slice(start, start + itemsPerPage);
  }, [sortedBooks, currentPage]);

  // Reset to page 1 when search changes
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4" />;
    }
    return <ChevronDown className="w-4 h-4" />;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Author', 'Genre', 'ISBN', 'Price', 'Stock', 'Created Date', 'Last Updated'];
    const rows = sortedBooks.map((book) => [
      book.id,
      `"${book.title}"`,
      `"${book.author}"`,
      book.genre,
      book.isbn,
      book.price,
      book.stock,
      book.createdDate,
      book.lastUpdated,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `page-prose-products-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-slate-700" />
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Product Database</h1>
              <p className="text-sm text-slate-500">Page & Prose Internal Tool</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by ID, title, author, genre, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 border-slate-300 focus:border-slate-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-slate-300 text-slate-700 hover:bg-slate-50">
                    <Upload className="w-4 h-4" />
                    Import CSV
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Import Products from CSV</DialogTitle>
                    <DialogDescription>
                      Upload a CSV file with the following columns: ID, Title, Author, Genre, ISBN, Price, Stock,
                      Created Date, Last Updated
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
                      <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm font-medium text-slate-700 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">CSV files only (max 10MB)</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-slate-700 hover:bg-slate-800">Upload & Import</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={exportToCSV} className="gap-2 bg-slate-700 hover:bg-slate-800">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <span className="text-slate-600">
              <span className="font-semibold text-slate-900">{sortedBooks.length}</span> products
              {searchQuery && <span className="text-slate-500"> (filtered from {books.length})</span>}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">
              Page <span className="font-semibold text-slate-900">{currentPage}</span> of{' '}
              <span className="font-semibold text-slate-900">{totalPages}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-8 py-6">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center gap-2">
                      ID
                      {getSortIcon('id')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 min-w-[250px]"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center gap-2">
                      Title
                      {getSortIcon('title')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 min-w-[180px]"
                    onClick={() => handleSort('author')}
                  >
                    <div className="flex items-center gap-2">
                      Author
                      {getSortIcon('author')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700"
                    onClick={() => handleSort('genre')}
                  >
                    <div className="flex items-center gap-2">
                      Genre
                      {getSortIcon('genre')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 min-w-[160px]"
                    onClick={() => handleSort('isbn')}
                  >
                    <div className="flex items-center gap-2">
                      ISBN
                      {getSortIcon('isbn')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 text-right"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Price
                      {getSortIcon('price')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 text-right"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center gap-2 justify-end">
                      Stock
                      {getSortIcon('stock')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 min-w-[120px]"
                    onClick={() => handleSort('createdDate')}
                  >
                    <div className="flex items-center gap-2">
                      Created
                      {getSortIcon('createdDate')}
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer select-none font-semibold text-slate-700 min-w-[120px]"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    <div className="flex items-center gap-2">
                      Last Updated
                      {getSortIcon('lastUpdated')}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-slate-500">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBooks.map((book) => (
                    <TableRow key={book.id} className="hover:bg-slate-50">
                      <TableCell className="font-mono text-sm text-slate-600">{book.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{book.title}</TableCell>
                      <TableCell className="text-slate-700">{book.author}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          {book.genre}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-slate-600">{book.isbn}</TableCell>
                      <TableCell className="text-right font-medium text-slate-900">${book.price}</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center justify-center min-w-[60px] px-2 py-0.5 rounded text-xs font-medium ${
                            parseInt(book.stock as string) < 20
                              ? 'bg-red-50 text-red-700'
                              : parseInt(book.stock as string) < 50
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-green-50 text-green-700'
                          }`}
                        >
                          {book.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{book.createdDate}</TableCell>
                      <TableCell className="text-sm text-slate-600">{book.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedBooks.length)} of {sortedBooks.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-slate-300"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={
                            currentPage === pageNum
                              ? 'bg-slate-700 hover:bg-slate-800 min-w-[36px]'
                              : 'border-slate-300 min-w-[36px]'
                          }
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-slate-300"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
