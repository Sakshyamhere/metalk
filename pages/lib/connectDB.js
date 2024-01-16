const mongoose = require('mongoose');
const DBurl = "mongodb+srv://sakshyamblog:sakshyam@contact.7qlkr1c.mongodb.net/?retryWrites=true&w=majority"


connectDB().catch(err => console.log(err));

 export default async function connectDB() {
  await mongoose.connect(DBurl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}