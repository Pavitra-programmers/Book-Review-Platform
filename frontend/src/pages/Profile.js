import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [userBooks, setUserBooks] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's books
      const booksResponse = await axios.get('/api/books');
      const userBooks = booksResponse.data.books.filter(book => book.addedBy._id === user._id);
      setUserBooks(userBooks);
      
      // Fetch user's reviews
      const reviewsResponse = await axios.get(`/api/reviews/user/${user._id}`);
      setUserReviews(reviewsResponse.data.reviews);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book? This will also delete all reviews for this book.')) {
      try {
        await axios.delete(`/api/books/${bookId}`);
        setUserBooks(userBooks.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Name</h3>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Email</h3>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Member Since</h3>
            <p className="text-gray-900">
              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('books')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'books'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Books ({userBooks.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reviews'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Reviews ({userReviews.length})
          </button>
        </nav>
      </div>

      {/* Books Tab */}
      {activeTab === 'books' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Books</h2>
            <Link to="/add-book" className="btn-primary">
              Add New Book
            </Link>
          </div>

          {userBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">You haven't added any books yet</p>
              <Link to="/add-book" className="btn-primary">
                Add Your First Book
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBooks.map((book) => (
                <div key={book._id} className="card hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 mb-2">by {book.author}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {book.genre} • {book.year}
                    </p>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {book.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <StarRating rating={book.averageRating} readonly size="sm" />
                      <span className="text-sm text-gray-600">
                        ({book.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to={`/book/${book._id}`}
                      className="btn-primary flex-1 text-center"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-book/${book._id}`}
                      className="btn-secondary flex-1 text-center"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>

          {userReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">You haven't written any reviews yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {userReviews.map((review) => (
                <div key={review._id} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {review.bookId.title}
                      </h3>
                      <p className="text-gray-600">by {review.bookId.author}</p>
                    </div>
                    <Link
                      to={`/book/${review.bookId._id}`}
                      className="btn-secondary text-sm"
                    >
                      View Book
                    </Link>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <StarRating rating={review.rating} readonly size="sm" />
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700">{review.reviewText}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;