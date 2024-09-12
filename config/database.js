import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    // if the database is connected dont connect again 
    if(connected){
        console.log('MongoDB is already connected');
        return
    }

    // connect to mongoDO 

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;