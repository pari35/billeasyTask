import ErrorHandler from "../utils/errorHandler.js"
import catchAsyncError from "../middleware/catchAsyncError.js"
import sendToken from "../utils/jwttoken.js"
import User from "../models/userModel.js"
import joi from "joi"

//register a user
const registerUser = catchAsyncError(async (req, res, next) => {
    const { email, password, firstName, lastName, phone } = req.body

    // validate user input
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).alphanum().required(),
        firstName: joi.string().min(3).max(100).required(),
        lastName: joi.string().min(3).max(100).required(),
        phone: joi.string().min(3).max(10)
    })
    const { error, value } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request", error })
    }

    //and register user in DB
    const user = await User.create({
        email, password, firstName, lastName, phone
    })
    if(user){
        return res.status(200).json({ message: "User Registartion successful" })
    }
})

//login user
const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body
    // checking if user has given password and email both 
    if (!email || !password) {
        return next(new ErrorHandler("please enter email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        return next(new ErrorHandler("invalid email or password"), 401)
    }
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password"), 401)
    }
    user.password = undefined
    const token = user.getJWTToken();

    sendToken(user, 200, res)

})

export {
    registerUser,
    loginUser
}