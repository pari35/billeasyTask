# billeasyTask
This project uses MongoDB as its database, managed via Mongoose ODM. Below is a brief overview of the schema design and relationships:

1. User Schema (UserAlpha)
Stores user authentication and profile data.

email (String, required, unique): User's email address.

password (String, required, minLength: 8): Encrypted user password.

firstName (String, optional): User's first name.

lastName (String, optional): User's last name.

phone (Number, optional): User's phone number.

createdAt (Date): Timestamp of user creation.

resetPasswordToken (String, optional): Token used for password reset.

resetPasswordExpire (Date, optional): Token expiration time.

🔐 Includes methods for:

JWT token generation

Password comparison

Password reset token generation

2. Book Schema (booksBillesy)
Stores details about books added by users.

bookname (String, required): Title of the book.

author (String, required): Author of the book.

genre (String, required): Genre/category of the book.

bookId (ObjectId, required, unique): Unique identifier for the book.

createdBy (String, required): Creator's name or identifier.

3. Review Schema (booksReviews)
Stores user-submitted reviews for books.

bookId (ObjectId, required): Reference to the reviewed book.

userId (String, required): Identifier of the reviewer.

review (String, required): Text content of the review.

ratings (Number, required): Numeric rating (e.g., 1–5 scale).


Project setup instruction - 
1. Clone the Repository
2. Install Dependencies
Make sure you have Node.js ,nodemon and npm installed.
bash
Copy
Edit
npm install
4. Start the Server
nodemon server.js

5. API is Ready
By default, the API will run at:

arduino
Copy
Edit
http://localhost:5000

Postman or Thunder Client: For testing API endpoints.

MongoDB Compass: GUI for inspecting your MongoDB collections.


curl for api examples
## 📘 API Endpoints
// register 
curl --location 'http://localhost:5000/api/v1/register' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data-raw '  {
        "email": "sophiawalker7777@example.com",
        "password": "SophiaSecure7777",
        "firstName": "Sophia",
        "lastName": "Walker",
        "phone": "9120123456"
    }'

//login
curl --location 'http://localhost:5000/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data-raw '{
  "email": "roberthall404@example.com",
    "password": "robHallPass"
}'

//create books data
curl --location 'http://localhost:5000/api/v1/books' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data '{
  "bookname": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Adventure, Fantasy"
}'

//get books data with pagination
curl --location 'http://localhost:5000/api/v1/getBooks?page=1&limit=10&bookname=The%20Alchemist' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data ''

//delete bookdata 
curl --location --request DELETE 'http://localhost:4000/api/v1/deleteUser?id=6739d6dd3a9c35965691c03c' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E'

//post reviews and ratings 
curl --location 'http://localhost:5000/api/v1/books/reviews' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data '{
  "bookId": "68455f653311ec013088427b",
  "review": "suspence story",
  "ratings": 3.5
}'

//get bookdetails by book id
curl --location 'http://localhost:5000/api/v1/books/68455f653311ec013088427b' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data ''

//update reviews and ratings 
curl --location --request PUT 'http://localhost:5000/api/v1/reviews/68455f653311ec013088427b' \
--header 'Content-Type: application/json' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data '{
  "review": "updated review",
  "ratings": 4.5
}'

//delete reviews with bookid
curl --location --request DELETE 'http://localhost:5000/api/v1/reviews/68455f653311ec013088427b' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data ''

//search book with bookname and author
curl --location 'http://localhost:5000/api/v1/search?author=paulo' \
--header 'Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzlkNjViM2E5YzM1OTY1NjkxYzAyZSIsImlhdCI6MTc0OTM2OTY3MywiZXhwIjoxNzQ5NDY5NjczfQ.aOyv-3nQX6HxYLw5nSZ1jkJ9QOgtYIb1e75kHjZiF5E' \
--data ''