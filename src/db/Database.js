import mongoose from "mongoose";
import {DB_NAME,DATABASE_URL} from "../constants.js";



let connectDB = async()=>{
    try {
    let databaseResponse= await mongoose.connect(`mongodb+srv://Shotlin0912:Shotlin0912@shotlin.jpiyx.mongodb.net/${DB_NAME}`)
    console.log(`\n MongoDB connected successfully to the database ${DB_NAME} 😎😎 :-> ${databaseResponse.connection.host}`)
        
    } catch (error) {
        console.log("error in db connection" , error)
        process.exit(1)
    }
}

export default connectDB