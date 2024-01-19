import message from "../../models/messageSchema";
import connectDB from "../lib/connectDB"

export default async function handler(req, res) {
     connectDB()
    if(req.method == "POST"){
        try {

            const {senderemail , recieveremail , text } = req.body.data;
            const messages = new message({
               senderemail:senderemail,
               recieveremail : recieveremail,
               text:text
            })
            await messages.save()
            res.status(200).json({ done: true , message: messages })
        } catch (error) {
            res.status(401).json({error: error, done: false})
        }
       
       
        
    }
    
  }