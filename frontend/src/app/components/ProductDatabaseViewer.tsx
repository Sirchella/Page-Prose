import { useState, useMemo, useEffect } from 'react';
import { fetchBooks, type Book as ApiBook } from '../api';
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


type SortField = 'id' | 'title' | 'author' | 'genre' | 'isbn' | 'price' | 'stock' | 'createdDate' | 'lastUpdated';
type SortDirection = 'asc' | 'desc' | null;

export function ProductDatabaseViewer() {
  const [books, setBooks] = useState<{id: string; title: string; author: string; genre: string; isbn: string; price: string; stock: number; createdDate: string; lastUpdated: string}[]>([]);
  useEffect(() => {
    fetchBooks().then((apiBooks: ApiBook[]) => {
      setBooks(apiBooks.map(b => ({
        id: `BK${String(b.id).padStart(5, '0')}`,
        title: b.title,
        author: b.author,
        genre: b.genre,
        isbn: b.isbn || '—',
        price: b.price,
        stock: b.stock,
        createdDate: new Date(b.created_at).toLocaleDateString(),
        lastUpdated: new Date(b.created_at).toLocaleDateString(),
      })));
    }).catch(() => {});
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const itemsPerPage = 15;

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

  const sortedBooks = useMemo(() => {
    if (!sortField || !sortDirection) return filteredBooks;
    return [...filteredBooks].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'price' || sortField === 'stock') {
        aVal = parseFloat(aVal as string);
        bVal = parseFloat(bVal as string);
      }
      if (sortField === 'createdDate' || sortField === 'lastUpdated') {
        aVal = new Date(aVal as string).getTime();
        bVal = new Date(bVal as string).getTime();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBooks, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedBooks.slice(start, start + itemsPerPage);
  }, [sortedBooks, currentPage]);

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
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
    if (sortField !== field) return <ChevronsUpDown className="w-4 h-4 opacity-50" />;
    if (sortDirection === 'asc') return <ChevronUp className="w-4 h-4" />;
    return <ChevronDown className="w-4 h-4" />;
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Title', 'Author', 'Genre', 'ISBN', 'Price', 'Stock', 'Created Date', 'Last Updated'];
    const rows = sortedBooks.map((book) => [
      book.id, `"${book.title}"`, `"${book.author}"`, book.genre,
      book.isbn, book.price, book.stock, book.createdDate, book.lastUpdated,
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
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-[#262626]">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-8 h-8 text-[#A68A64]" />
            <div>
              <h1 className="text-2xl font-semibold text-[#f5f5f5]">Product Database</h1>
              <p className="text-sm text-[#a3a3a3]">Page & Prose Internal Tool</p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
              <Input
                type="text"
                placeholder="Search by ID, title, author, genre, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-[#262626] border-[#262626] text-[#f5f5f5] placeholder:text-[#a3a3a3]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
                    <Upload className="w-4 h-4" />
                    Import CSV
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#1a1a1a] border-[#262626]">
                  <DialogHeader>
                    <DialogTitle className="text-[#f5f5f5]">Import Products from CSV</DialogTitle>
                    <DialogDescription className="text-[#a3a3a3]">
                      Upload a CSV file with the following columns: ID, Title, Author, Genre, ISBN, Price, Stock,
                      Created Date, Last Updated
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="border-2 border-dashed border-[#262626] rounded-lg p-8 text-center hover:border-[#A68A64] transition-colors cursor-pointer">
                      <FileText className="w-12 h-12 text-[#a3a3a3] mx-auto mb-3" />
                      <p className="text-sm font-medium text-[#f5f5f5] mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-[#a3a3a3]">CSV files only (max 10MB)</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setImportDialogOpen(false)} className="border-[#262626] text-[#f5f5f5] hover:bg-[#262626]">
                        Cancel
                      </Button>
                      <Button onClick={() => { setImportDialogOpen(false); }} className="bg-[#A68A64] hover:bg-[#8B7355]">
                        Upload & Import
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button onClick={exportToCSV} className="gap-2 bg-[#A68A64] hover:bg-[#8B7355]">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-6 text-sm">
            <span className="text-[#a3a3a3]">
              <span className="font-semibold text-[#f5f5f5]">{sortedBooks.length}</span> products
              {searchQuery && <span className="text-[#a3a3a3]"> (filtered from {books.length})</span>}
            </span>
            <span className="text-[#a3a3a3]">•</span>
            <span className="text-[#a3a3a3]">
              Page <span className="font-semibold text-[#f5f5f5]">{currentPage}</span> of{' '}
              <span className="font-semibold text-[#f5f5f5]">{totalPages}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-[1600px] mx-auto px-8 py-6">
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#262626] hover:bg-[#262626]">
                  {(['id', 'title', 'author', 'genre', 'isbn', 'price', 'stock', 'createdDate', 'lastUpdated'] as SortField[]).map((field) => (
                    <TableHead
                      key={field}
                      className={`cursor-pointer select-none font-semibold text-[#f5f5f5] ${
                        field === 'price' || field === 'stock' ? 'text-right' : ''
                      } ${field === 'title' ? 'min-w-[250px]' : ''} ${field === 'author' ? 'min-w-[180px]' : ''} ${
                        field === 'isbn' ? 'min-w-[160px]' : ''
                      } ${field === 'createdDate' || field === 'lastUpdated' ? 'min-w-[120px]' : ''}`}
                      onClick={() => handleSort(field)}
                    >
                      <div className={`flex items-center gap-2 ${field === 'price' || field === 'stock' ? 'justify-end' : ''}`}>
                        {field === 'id' ? 'ID' : field === 'isbn' ? 'ISBN' : field === 'createdDate' ? 'Created' : field === 'lastUpdated' ? 'Last Updated' : field.charAt(0).toUpperCase() + field.slice(1)}
                        {getSortIcon(field)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-[#a3a3a3]">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedBooks.map((book) => (
                    <TableRow key={book.id} className="border-[#262626] hover:bg-[#262626]">
                      <TableCell className="font-mono text-sm text-[#a3a3a3]">{book.id}</TableCell>
                      <TableCell className="font-medium text-[#f5f5f5]">{book.title}</TableCell>
                      <TableCell className="text-[#a3a3a3]">{book.author}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#262626] text-[#a3a3a3]">
                          {book.genre}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-[#a3a3a3]">{book.isbn}</TableCell>
                      <TableCell className="text-right font-medium text-green-400">{Math.round(parseFloat(book.price as string)).toLocaleString()} XAF</TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`inline-flex items-center justify-center min-w-[60px] px-2 py-0.5 rounded text-xs font-medium ${
                            parseInt(book.stock as string) < 20
                              ? 'bg-red-950 text-red-400'
                              : parseInt(book.stock as string) < 50
                              ? 'bg-amber-950 text-amber-400'
                              : 'bg-green-950 text-green-400'
                          }`}
                        >
                          {book.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-[#a3a3a3]">{book.createdDate}</TableCell>
                      <TableCell className="text-sm text-[#a3a3a3]">{book.lastUpdated}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-[#262626] px-6 py-4 bg-[#262626]">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#a3a3a3]">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedBooks.length)} of {sortedBooks.length} results
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-[#262626] text-[#f5f5f5] hover:bg-[#1a1a1a] disabled:opacity-40"
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
                              ? 'bg-[#A68A64] hover:bg-[#8B7355] min-w-[36px]'
                              : 'border-[#262626] text-[#f5f5f5] hover:bg-[#1a1a1a] min-w-[36px]'
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
                    className="border-[#262626] text-[#f5f5f5] hover:bg-[#1a1a1a] disabled:opacity-40"
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
