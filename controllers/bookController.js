import mongoose from "mongoose"
import catchAsyncError from "../middleware/catchAsyncError.js"
import Book from "../models/bookModel.js"
import BooksReview from "../models/bookReviews.js"
import joi from "joi"
import bookReviews from "../models/bookReviews.js"

//create book
const manageBook = catchAsyncError(async (req, res, next) => {
    const { bookname, author, genre } = req.body
    // validate user input

    const schema = joi.object({
        bookname: joi.string().min(3).max(100).required(),
        author: joi.string().min(3).max(100).required(),
        genre: joi.string().min(3).max(100).required(),

    })

    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }

    let createdBy = req.user._id
    //check if book exist with same name in DB
    const createBook = await Book.create({
        bookname, author, genre, createdBy
    })

    if (createBook) {
        return res.status(200).json({ message: "New Book Created Sucessfully" })
    }
})

// get books
const getBooks = async (req, res) => {
    try {
        const { genre, author, bookname,page = 1, limit = 10 } = req.query;

        // Build filter object dynamically
        const filter = {};
        if (genre) filter.genre = { $regex: genre, $options: "i" };
        if (author) filter.author = { $regex: author, $options: "i" };
        if (bookname) filter.bookname = { $regex: bookname, $options: "i" };
        

        // Convert pagination values to integers
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const books = await Book
            .find(filter)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);

        const totalBooks = await Book.countDocuments(filter);

        res.status(200).json({
            total: totalBooks,
            page: pageNumber,
            limit: limitNumber,
            results: books
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
}

const searchBooks = async (req, res) => {
    try {
        
        const { genre, author, bookname } = req.query;

        // Build filter object dynamically
        const filter = {};
        if (genre) filter.genre = { $regex: genre, $options: "i" };
        if (author) filter.author = { $regex: author, $options: "i" };
        if (bookname) filter.bookname = { $regex: bookname, $options: "i" };
        
        const books = await Book.find(filter)
        res.status(200).json({ results: books})

    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
}

const manageReviews = async (req, res) => {
    try {

        const { bookId, review, ratings } = req.body

        let userId = req.user._id

        //check if already exists reviews
        const existBookReview = await BooksReview.findOne({
            bookId: bookId,
            userId: userId
        })

        if (existBookReview != null && (existBookReview).userId == userId) {
            return res.status(200).json({
                message: "You have already posted review for this book",
            })

        }
        const booksReviewData = await BooksReview.create({
            bookId, review, ratings, userId
        })

        return res.status(200).json({
            message: "Book review posted sucessfully",
            booksReviewData
        })

    } catch (error) {
        res.status(500).json({ message: "Error creating books reviews", error: error.message });
    }
}

const getBookDetails = async (req, res) => {
    try {

        const { id } = req.params

        const booksWithReviews = await Book.findOne({
            _id: id
        })

        //find reviews for that book
        const booksReviews = await bookReviews.find(
            { bookId: new mongoose.Types.ObjectId(id) },
            { bookId: 1, bookname: 1, author: 1, genre: 1, review: 1, ratings: 1 },
        )

        // Calculate average
        let averageRating = 0;

        if (booksReviews.length > 0) {
            const total = booksReviews.reduce((sum, review) => sum + (review.ratings || 0), 0);
            averageRating = total / booksReviews.length;
        }

        let bookData = {
            _id: booksWithReviews._id,
            bookname: booksWithReviews.bookname,
            author: booksWithReviews.author,
            genre: booksWithReviews.genre,
            createdBy: booksWithReviews.createdBy,
            reviews: booksReviews,
            averageRating: averageRating
        }

        return res.status(200).json({
            sucess: true,
            bookData
        })

    } catch (error) {
        res.status(500).json({ message: "Error getting books ", error: error.message });
    }
}

const updateReviews = async (req, res) => {
    try {

        const { id } = req.params

        let userId = req.user._id
        const { review, ratings } = req.body
        //find reviews for that book and update
        const booksReviews = await bookReviews.findOneAndUpdate(
            { userId: userId ,
                bookId : id
            }, // Filter condition
            { $set: { review: review, ratings: ratings } }, // Fields to update
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            sucess: true,
            booksReviews :  booksReviews
        })

    } catch (error) {
        res.status(500).json({ message: "Error upadating book reviews ", error: error.message });
    }
}

const deleteReviews = async (req, res) => {
    try {

        const { id } = req.params

        let userId = req.user._id
      
        //find reviews for that book and update
        const booksReviewsDelete = await bookReviews.findOneAndDelete(
            { userId: userId ,
                bookId : id
            }
        );

        return res.status(200).json({
            sucess: true,
            message : "Reviews and ratings deleted sucessfully"
        })

    } catch (error) {
        res.status(500).json({ message: "Error deleting book reviews ", error: error.message });
    }
}

export {
    manageBook,
    getBooks,
    manageReviews,
    getBookDetails,
    updateReviews,
    deleteReviews,
    searchBooks
}