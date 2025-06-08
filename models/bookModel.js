import mongoose from "mongoose"

const booksBillesySchema = mongoose.Schema({
    bookname: {
        type: String,
        required: [true, "Please Enter book name"],
        trim: true,
    },
    author : {
        type: String,
        required: [true, "Please Enter author"],
        trim: true,
    },
    genre : {
        type: String,
        required: [true, "Please Enter genre"],
        trim: true,
    },
    bookId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },

    createdBy: {
        type: String,
        required: [true, "Please Enter Name of creator"],
        trim: true,
    }
    
});

export default mongoose.model("booksBillesy", booksBillesySchema);