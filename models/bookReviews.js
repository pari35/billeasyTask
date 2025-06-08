import mongoose from "mongoose"

const booksReviewsSchema = mongoose.Schema({
    bookId: {
        type: String,
        required: [true, "Please Enter book Id"],
        trim: true,
    },
    userId : {
        type: String,
        required: [true, "Please Enter user id"],
        trim: true,
    },
    review : {
        type: String,
        required: [true, "Please Enter review"],
        trim: true,
    },
    bookId: { type: mongoose.Schema.Types.ObjectId, required: true },

    ratings: {
        type: Number,
        required: [true, "Please enter ratings out of 5"],
        trim: true,
    }
    
});

export default mongoose.model("booksReviews", booksReviewsSchema);