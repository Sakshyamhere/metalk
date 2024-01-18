import user from "../../models/userSchema";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
connectDB();

  if (req.method == "POST") {
    try {
      const { fullname, email, password, phonenumber } = req.body.data
      const emailExist = await user.findOne({"email" : email})
      if (emailExist) {
        res.status(409).json({user : "User Already Exist"})
      }
      else {
      const person = new user({
        fullname: fullname,
        email: email,
        password: password,
        phonenumber: phonenumber,
      });
      await person.save();
      res.status(200).json({ done: true, user: person });    
    }
    } catch (error) {
      res.status(401).json({ error: error, done: false });
    }
  }
}
