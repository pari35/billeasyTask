import express from "express"
import { isAuthenticatedUser } from "../middleware/auth.js"
import { deleteReviews, getBookDetails, getBooks, manageBook, manageReviews, searchBooks, updateReviews } from "../controllers/bookController.js"

const router = express.Router()

router.route("/books").post(isAuthenticatedUser, manageBook)
router.route("/getBooks").get(isAuthenticatedUser, getBooks)
router.route("/search").get(isAuthenticatedUser, searchBooks)

router.route("/books/reviews").post(isAuthenticatedUser, manageReviews)
router.route("/books/:id").get(isAuthenticatedUser, getBookDetails)

router.route("/reviews/:id").put(isAuthenticatedUser, updateReviews)
router.route("/reviews/:id").delete(isAuthenticatedUser, deleteReviews)
export default router