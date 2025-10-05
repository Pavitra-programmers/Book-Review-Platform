const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Mock data for testing
let mockBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel about the Jazz Age, following the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
    genre: 'Fiction',
    year: 1925,
    averageRating: 4.2,
    totalReviews: 15,
    addedBy: { name: 'John Doe' },
    createdAt: new Date()
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South during the 1930s.',
    genre: 'Fiction',
    year: 1960,
    averageRating: 4.5,
    totalReviews: 23,
    addedBy: { name: 'Jane Smith' },
    createdAt: new Date()
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance in a world where independent thinking is a crime.',
    genre: 'Sci-Fi',
    year: 1949,
    averageRating: 4.3,
    totalReviews: 18,
    addedBy: { name: 'Mike Johnson' },
    createdAt: new Date()
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet, the dynamic protagonist.',
    genre: 'Romance',
    year: 1813,
    averageRating: 4.4,
    totalReviews: 31,
    addedBy: { name: 'Sarah Wilson' },
    createdAt: new Date()
  },
  {
    _id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    description: 'A coming-of-age story about teenage rebellion and alienation, told from the perspective of Holden Caulfield.',
    genre: 'Fiction',
    year: 1951,
    averageRating: 3.8,
    totalReviews: 12,
    addedBy: { name: 'David Brown' },
    createdAt: new Date()
  },
  {
    _id: '6',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    description: 'An epic high-fantasy novel about the quest to destroy the One Ring and defeat the Dark Lord Sauron.',
    genre: 'Fantasy',
    year: 1954,
    averageRating: 4.7,
    totalReviews: 45,
    addedBy: { name: 'Emma Davis' },
    createdAt: new Date()
  },
  {
    _id: '7',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    description: 'The first book in the Harry Potter series, following a young wizard\'s journey at Hogwarts School of Witchcraft and Wizardry.',
    genre: 'Fantasy',
    year: 1997,
    averageRating: 4.6,
    totalReviews: 67,
    addedBy: { name: 'Alex Thompson' },
    createdAt: new Date()
  },
  {
    _id: '8',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel about the adventures of Bilbo Baggins, a hobbit who goes on an unexpected journey.',
    genre: 'Fantasy',
    year: 1937,
    averageRating: 4.5,
    totalReviews: 28,
    addedBy: { name: 'Lisa Anderson' },
    createdAt: new Date()
  },
  {
    _id: '9',
    title: 'The Chronicles of Narnia',
    author: 'C.S. Lewis',
    description: 'A series of fantasy novels about children who discover the magical world of Narnia through a wardrobe.',
    genre: 'Fantasy',
    year: 1950,
    averageRating: 4.3,
    totalReviews: 35,
    addedBy: { name: 'Chris Miller' },
    createdAt: new Date()
  },
  {
    _id: '10',
    title: 'The Da Vinci Code',
    author: 'Dan Brown',
    description: 'A mystery thriller novel about symbologist Robert Langdon as he investigates a murder in the Louvre Museum.',
    genre: 'Mystery',
    year: 2003,
    averageRating: 3.9,
    totalReviews: 22,
    addedBy: { name: 'Rachel Green' },
    createdAt: new Date()
  },
  {
    _id: '11',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A philosophical novel about a young Andalusian shepherd who travels from Spain to Egypt in search of treasure.',
    genre: 'Philosophy',
    year: 1988,
    averageRating: 4.1,
    totalReviews: 19,
    addedBy: { name: 'Tom Wilson' },
    createdAt: new Date()
  },
  {
    _id: '12',
    title: 'The Kite Runner',
    author: 'Khaled Hosseini',
    description: 'A powerful story of friendship, betrayal, and redemption set against the backdrop of Afghanistan\'s tumultuous history.',
    genre: 'Fiction',
    year: 2003,
    averageRating: 4.4,
    totalReviews: 41,
    addedBy: { name: 'Maria Garcia' },
    createdAt: new Date()
  },
  {
    _id: '13',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    description: 'A psychological thriller about journalist Mikael Blomkvist and hacker Lisbeth Salander investigating a decades-old disappearance.',
    genre: 'Thriller',
    year: 2005,
    averageRating: 4.2,
    totalReviews: 33,
    addedBy: { name: 'James Taylor' },
    createdAt: new Date()
  },
  {
    _id: '14',
    title: 'The Book Thief',
    author: 'Markus Zusak',
    description: 'A historical novel set in Nazi Germany, narrated by Death, about a young girl who steals books.',
    genre: 'Historical Fiction',
    year: 2005,
    averageRating: 4.5,
    totalReviews: 29,
    addedBy: { name: 'Anna Lee' },
    createdAt: new Date()
  },
  {
    _id: '15',
    title: 'The Hunger Games',
    author: 'Suzanne Collins',
    description: 'A dystopian novel about Katniss Everdeen, who volunteers to take her sister\'s place in a televised fight to the death.',
    genre: 'Sci-Fi',
    year: 2008,
    averageRating: 4.3,
    totalReviews: 52,
    addedBy: { name: 'Kevin Park' },
    createdAt: new Date()
  }
];

let mockReviews = [
  {
    _id: 'r1',
    bookId: '1',
    userId: { _id: 'u1', name: 'BookLover123' },
    rating: 5,
    reviewText: 'An absolute masterpiece! Fitzgerald\'s writing is beautiful and the story is timeless. Highly recommend!',
    createdAt: new Date()
  },
  {
    _id: 'r2',
    bookId: '1',
    userId: { _id: 'u2', name: 'ClassicReader' },
    rating: 4,
    reviewText: 'Great classic novel. The Jazz Age setting is fascinating and the characters are well-developed.',
    createdAt: new Date()
  },
  {
    _id: 'r3',
    bookId: '2',
    userId: { _id: 'u3', name: 'LiteratureFan' },
    rating: 5,
    reviewText: 'One of the most important books ever written. Harper Lee\'s storytelling is powerful and moving.',
    createdAt: new Date()
  },
  {
    _id: 'r4',
    bookId: '6',
    userId: { _id: 'u4', name: 'FantasyEnthusiast' },
    rating: 5,
    reviewText: 'Tolkien created an entire world that feels real. The Lord of the Rings is pure fantasy perfection!',
    createdAt: new Date()
  },
  {
    _id: 'r5',
    bookId: '7',
    userId: { _id: 'u5', name: 'HarryPotterFan' },
    rating: 5,
    reviewText: 'Magical in every sense of the word! J.K. Rowling\'s imagination is incredible. A must-read for all ages.',
    createdAt: new Date()
  },
  {
    _id: 'r6',
    bookId: '3',
    userId: { _id: 'u6', name: 'DystopianReader' },
    rating: 4,
    reviewText: 'Orwell\'s vision of the future is chilling and unfortunately still relevant today. A thought-provoking read.',
    createdAt: new Date()
  },
  {
    _id: 'r7',
    bookId: '4',
    userId: { _id: 'u7', name: 'RomanceReader' },
    rating: 4,
    reviewText: 'Jane Austen\'s wit and social commentary make this a delightful read. Elizabeth Bennet is a wonderful character.',
    createdAt: new Date()
  },
  {
    _id: 'r8',
    bookId: '12',
    userId: { _id: 'u8', name: 'ContemporaryReader' },
    rating: 5,
    reviewText: 'Hosseini\'s writing is beautiful and heartbreaking. This book will stay with you long after you finish it.',
    createdAt: new Date()
  }
];

let mockUsers = [
  {
    _id: 'u1',
    name: 'BookLover123',
    email: 'booklover@example.com',
    createdAt: new Date()
  },
  {
    _id: 'u2',
    name: 'ClassicReader',
    email: 'classic@example.com',
    createdAt: new Date()
  },
  {
    _id: 'u3',
    name: 'LiteratureFan',
    email: 'literature@example.com',
    createdAt: new Date()
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Book Review API is running!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Auth routes (mock)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = {
    _id: Date.now().toString(),
    name,
    email,
    createdAt: new Date()
  };

  mockUsers.push(user);

  res.status(201).json({
    message: 'User registered successfully',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Mock login - accept any email/password
  const user = {
    _id: 'mock-user-id',
    name: 'Test User',
    email: email,
    createdAt: new Date()
  };

  res.json({
    message: 'Login successful',
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: {
      id: 'mock-user-id',
      name: 'Test User',
      email: 'test@example.com'
    }
  });
});

// Books routes
app.get('/api/books', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const genre = req.query.genre || '';

  let filteredBooks = mockBooks;

  if (search) {
    filteredBooks = mockBooks.filter(book => 
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (genre) {
    filteredBooks = filteredBooks.filter(book => 
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  const total = filteredBooks.length;
  const totalPages = Math.ceil(total / limit);
  const books = filteredBooks.slice(skip, skip + limit);

  res.json({
    books,
    pagination: {
      currentPage: page,
      totalPages,
      totalBooks: total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  });
});

app.get('/api/books/:id', (req, res) => {
  const book = mockBooks.find(b => b._id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const reviews = mockReviews.filter(r => r.bookId === req.params.id);

  res.json({ book, reviews });
});

app.post('/api/books', (req, res) => {
  const { title, author, description, genre, year } = req.body;
  
  const newBook = {
    _id: Date.now().toString(),
    title,
    author,
    description,
    genre,
    year,
    averageRating: 0,
    totalReviews: 0,
    addedBy: { name: 'Current User' },
    createdAt: new Date()
  };

  mockBooks.unshift(newBook);

  res.status(201).json({
    message: 'Book added successfully',
    book: newBook
  });
});

app.put('/api/books/:id', (req, res) => {
  const bookIndex = mockBooks.findIndex(b => b._id === req.params.id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author, description, genre, year } = req.body;
  
  mockBooks[bookIndex] = {
    ...mockBooks[bookIndex],
    title,
    author,
    description,
    genre,
    year
  };

  res.json({
    message: 'Book updated successfully',
    book: mockBooks[bookIndex]
  });
});

app.delete('/api/books/:id', (req, res) => {
  const bookIndex = mockBooks.findIndex(b => b._id === req.params.id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  mockBooks.splice(bookIndex, 1);
  mockReviews = mockReviews.filter(r => r.bookId !== req.params.id);

  res.json({ message: 'Book deleted successfully' });
});

// Reviews routes
app.post('/api/reviews', (req, res) => {
  const { bookId, rating, reviewText } = req.body;
  
  const newReview = {
    _id: Date.now().toString(),
    bookId,
    userId: { _id: 'mock-user-id', name: 'Test User' },
    rating,
    reviewText,
    createdAt: new Date()
  };

  mockReviews.push(newReview);

  res.status(201).json({
    message: 'Review added successfully',
    review: newReview
  });
});

app.put('/api/reviews/:id', (req, res) => {
  const reviewIndex = mockReviews.findIndex(r => r._id === req.params.id);
  
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }

  const { rating, reviewText } = req.body;
  
  mockReviews[reviewIndex] = {
    ...mockReviews[reviewIndex],
    rating,
    reviewText
  };

  res.json({
    message: 'Review updated successfully',
    review: mockReviews[reviewIndex]
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  const reviewIndex = mockReviews.findIndex(r => r._id === req.params.id);
  
  if (reviewIndex === -1) {
    return res.status(404).json({ message: 'Review not found' });
  }

  mockReviews.splice(reviewIndex, 1);

  res.json({ message: 'Review deleted successfully' });
});

app.get('/api/reviews/user/:userId', (req, res) => {
  const reviews = mockReviews.filter(r => r.userId._id === req.params.userId);
  res.json({ reviews });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Mock server running on port ${PORT}`);
  console.log(`📚 Book Review API is ready for testing!`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📖 Books API: http://localhost:${PORT}/api/books`);
  console.log(`\n📚 Sample Data Loaded:`);
  console.log(`   • ${mockBooks.length} books with ratings and reviews`);
  console.log(`   • ${mockReviews.length} sample reviews`);
  console.log(`   • Multiple genres: Fiction, Fantasy, Sci-Fi, Romance, Mystery, etc.`);
  console.log(`\n💡 This is a mock server for testing without MongoDB.`);
  console.log(`💡 To use the real database, update the MongoDB connection string.`);
});