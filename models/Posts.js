import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    content:{
        type: String,
        trim: true
    },
    photo:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.models.Post || mongoose.model("Post", userSchema);