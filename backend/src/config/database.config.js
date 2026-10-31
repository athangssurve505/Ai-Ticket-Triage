import mongoose from "mongoose";


async function connectToDatabase(){
  try{
    
      await mongoose.connect(`${process.env.MONGO_URI}ai_ticket_triage`);
      console.log("Connected to Database")
  }catch(e){
    console.log("Error Occured While connecting to database:", e.message);
  }
}

export default connectToDatabase