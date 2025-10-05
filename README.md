# 📚 Book Review Platform

A comprehensive MERN stack application where users can sign up, log in, add books, and review books. Built with MongoDB, Express, React, and Node.js with JWT authentication.

## 🔗 Live Links

- Frontend: https://bookreviewassign.gt.tc
- Backend API: https://book-review-platform-behq.onrender.com

## ✨ Features

### 🔐 Authentication
- User registration and login with JWT tokens
- Password hashing with bcrypt
- Protected routes and middleware
- Persistent login sessions

### 📖 Book Management
- Add, edit, and delete books
- Only book creators can modify their books
- Book details with author, genre, year, and description
- Pagination (5 books per page)
- Search and filter functionality
- Sort by title, author, year, or rating

### ⭐ Review System
- Rate books from 1-5 stars
- Write detailed text reviews
- Edit and delete your own reviews
- Average rating calculation
- Review history in user profile

### 🎨 User Interface
- Modern, responsive design with Tailwind CSS
- Clean and intuitive user experience
- Mobile-friendly interface
- Loading states and error handling

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization (bonus feature)

## 📁 Project Structure

```
Book Review assign/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   └── reviews.js
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── StarRating.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── BookDetails.js
│   │   │   ├── AddBook.js
│   │   │   ├── EditBook.js
│   │   │   └── Profile.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Book Review assign"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI= Mongodb url
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

**Important**: Replace `<db_password>` with your actual MongoDB password and set a strong JWT secret.

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📊 Database Schema

### User Schema
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, lowercase),
  password: String (required, min 6 chars, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Book Schema
```javascript
{
  title: String (required, max 100 chars),
  author: String (required, max 50 chars),
  description: String (required, max 1000 chars),
  genre: String (required, max 30 chars),
  year: Number (required, min 1000, max current year),
  addedBy: ObjectId (ref: User),
  averageRating: Number (default 0, min 0, max 5),
  totalReviews: Number (default 0),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Schema
```javascript
{
  bookId: ObjectId (ref: Book, required),
  userId: ObjectId (ref: User, required),
  rating: Number (required, min 1, max 5),
  reviewText: String (required, max 500 chars),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Books
- `GET /api/books` - Get all books (with pagination, search, filter)
- `GET /api/books/:id` - Get single book with reviews
- `POST /api/books` - Add new book (protected)
- `PUT /api/books/:id` - Update book (protected, owner only)
- `DELETE /api/books/:id` - Delete book (protected, owner only)

### Reviews
- `POST /api/reviews` - Add review (protected)
- `PUT /api/reviews/:id` - Update review (protected, owner only)
- `DELETE /api/reviews/:id` - Delete review (protected, owner only)
- `GET /api/reviews/user/:userId` - Get user's reviews

## 🎯 Key Features Implementation

### 🔐 Authentication Flow
1. User registers with name, email, and password
2. Password is hashed using bcrypt
3. JWT token is generated and stored in localStorage
4. Token is sent with each API request
5. Protected routes check for valid token

### 📚 Book Management
1. Users can add books with title, author, description, genre, and year
2. Only book creators can edit or delete their books
3. Books are displayed with pagination (5 per page)
4. Search functionality across title and author
5. Filter by genre and sort by various criteria

### ⭐ Review System
1. Users can rate books from 1-5 stars
2. Text reviews with character limits
3. One review per user per book
4. Average rating automatically calculated
5. Users can edit or delete their own reviews

### 🎨 Frontend Features
1. Responsive design with Tailwind CSS
2. React Router for navigation
3. Context API for state management
4. Protected routes for authenticated users
5. Loading states and error handling
6. Form validation and user feedback

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Create a new web service
2. Connect your GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT`
4. Deploy the backend

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy the frontend

### Environment Variables for Production
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_jwt_secret
PORT=5000
```

## 🧪 Testing the Application

### 1. User Registration
- Navigate to `/signup`
- Fill in the registration form
- Verify successful registration and automatic login

### 2. User Login
- Navigate to `/login`
- Enter credentials
- Verify successful login and token storage

### 3. Add Books
- Click "Add Book" (requires login)
- Fill in book details
- Verify book appears in the home page

### 4. Review Books
- Navigate to a book's detail page
- Write a review with rating
- Verify review appears and average rating updates

### 5. Edit/Delete
- Test editing your own books and reviews
- Test deleting your own books and reviews
- Verify you cannot edit/delete others' content

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted
   - Ensure the database user has proper permissions

2. **JWT Token Issues**
   - Check if JWT_SECRET is set correctly
   - Verify token expiration settings
   - Clear localStorage and try logging in again

3. **CORS Errors**
   - Ensure CORS is properly configured in backend
   - Check if frontend and backend are running on correct ports

4. **Build Errors**
   - Run `npm install` in both frontend and backend
   - Check Node.js version compatibility
   - Clear node_modules and reinstall if needed

## 📝 License

This project is created for educational purposes as part of a MERN stack assignment.

## 👨‍💻 Author

Created as a comprehensive MERN stack project demonstrating full-stack development skills including:
- Backend API development with Node.js and Express
- Database design and management with MongoDB
- Frontend development with React
- Authentication and authorization
- CRUD operations
- Responsive UI design
- State management
- API integration

---

**Note**: Remember to replace the MongoDB connection string with your actual credentials and set a strong JWT secret for production use.
