import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [userReview, setUserReview] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/books/${id}`);
      setBook(response.data.book);
      setReviews(response.data.reviews);
      
      // Check if user has already reviewed this book
      if (isAuthenticated) {
        const existingReview = response.data.reviews.find(
          review => review.userId._id === user._id
        );
        setUserReview(existingReview);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmittingReview(true);

    try {
      if (userReview) {
        // Update existing review
        await axios.put(`/api/reviews/${userReview._id}`, reviewForm);
      } else {
        // Create new review
        await axios.post('/api/reviews', {
          bookId: id,
          ...reviewForm
        });
      }
      
      // Refresh book details
      await fetchBookDetails();
      setShowReviewForm(false);
      setReviewForm({ rating: 5, reviewText: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (window.confirm('Are you sure you want to delete your review?')) {
      try {
        await axios.delete(`/api/reviews/${userReview._id}`);
        await fetchBookDetails();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleEditReview = () => {
    setReviewForm({
      rating: userReview.rating,
      reviewText: userReview.reviewText
    });
    setShowReviewForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Book not found</p>
        <Link to="/" className="btn-primary mt-4">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Book Information */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <StarRating rating={book.averageRating} readonly size="lg" />
                <span className="text-lg font-medium">
                  {book.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-500">
                  ({book.totalReviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Genre:</span>
                <p className="text-gray-900">{book.genre}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Year:</span>
                <p className="text-gray-900">{book.year}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500">Description:</span>
              <p className="text-gray-900 mt-1">{book.description}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Added by {book.addedBy?.name}
              </p>
              
              {isAuthenticated && book.addedBy._id === user._id && (
                <Link
                  to={`/edit-book/${book._id}`}
                  className="btn-secondary"
                >
                  Edit Book
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          
          {isAuthenticated && !userReview && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="btn-primary"
            >
              Write Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {userReview ? 'Edit Your Review' : 'Write a Review'}
            </h3>
            
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => setReviewForm({ ...reviewForm, rating })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review
                </label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                  required
                  rows="4"
                  className="input-field"
                  placeholder="Share your thoughts about this book..."
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-primary disabled:opacity-50"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setReviewForm({ rating: 5, reviewText: '' });
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* User's Review */}
        {userReview && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">Your Review</h4>
              <div className="flex space-x-2">
                <button
                  onClick={handleEditReview}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteReview}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <StarRating rating={userReview.rating} readonly size="sm" />
              <span className="text-sm text-gray-600">
                {new Date(userReview.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{userReview.reviewText}</p>
          </div>
        )}

        {/* All Reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{review.userId.name}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={review.rating} readonly size="sm" />
                </div>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;