import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionTodb= async()=>{
    try {
        const { connection } = await mongoose.connect(
          process.env.MONGO_URI ||
            "mongodb+srv://thakurshivang579:<password>@cluster0.aj8hrur.mongodb.net/"
        );
        if (connection) {
            console.log(`connected to Mongodb: ${connection.host}`)
        }
    } catch (e) {
        console.log(e)
        process.exit(1);
    }
}

export default connectionTodb; 