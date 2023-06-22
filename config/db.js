import mongoose from "mongoose";


const mongoDBConnect = async ()=>{
    try {
        
        const data = await mongoose.connect(process.env.MONGOURL)
        console.log("Mongdb connected successful");
        
    } catch (error) {
        console.log(error.message);  
    }
}

export default mongoDBConnect;