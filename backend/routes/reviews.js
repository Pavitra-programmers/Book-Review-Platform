const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// Utility function to validate ObjectId
const validateObjectId = (id, paramName) => {
  if (!id || id === 'undefined' || id === 'null') {
    return { 
      isValid: false, 
      error: { 
        message: `Valid ${paramName} is required`,
        error: `Invalid ${paramName} parameter`
      }
    };
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { 
      isValid: false, 
      error: { 
        message: `Invalid ${paramName} format`,
        error: `${paramName} must be a valid MongoDB ObjectId`
      }
    };
  }

  return { isValid: true };
};

// @route   POST /api/reviews
// @desc    Add review
// @access  Private
router.post('/', auth, [
  body('bookId').isMongoId().withMessage('Valid book ID is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('reviewText').trim().isLength({ min: 10, max: 500 }).withMessage('Review text must be between 10 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, rating, reviewText } = req.body;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ bookId, userId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      bookId,
      userId: req.user._id,
      rating,
      reviewText
    });

    await review.save();
    await review.populate('userId', 'name');

    res.status(201).json({
      message: 'Review added successfully',
      review
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put('/:id', auth, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('reviewText').trim().isLength({ min: 10, max: 500 }).withMessage('Review text must be between 10 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, reviewText } = req.body;

    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the author of the review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = rating;
    review.reviewText = reviewText;

    await review.save();
    await review.populate('userId', 'name');

    res.json({
      message: 'Review updated successfully',
      review
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user is the author of the review
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/book/:bookId
// @desc    Get reviews for a specific book
// @access  Public
router.get('/book/:bookId', async (req, res) => {
  try {
    const { bookId } = req.params;
    
    // Validate bookId parameter
    const validation = validateObjectId(bookId, 'bookId');
    if (!validation.isValid) {
      return res.status(400).json(validation.error);
    }

    const reviews = await Review.find({ bookId })
      .populate('bookId', 'title author')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error('Get book reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/my-reviews
// @desc    Get current user's reviews
// @access  Private
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('bookId', 'title author')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/reviews/user/:userId
// @desc    Get user's reviews
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId parameter
    const validation = validateObjectId(userId, 'userId');
    if (!validation.isValid) {
      return res.status(400).json(validation.error);
    }

    const reviews = await Review.find({ userId })
      .populate('bookId', 'title author')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ reviews });
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;