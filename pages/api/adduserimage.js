import user from "../../models/userSchema";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
  connectDB();

  if (req.method === "PUT") {
    try {
      const { email, image , bio } = req.body;
      console.log(email);

      const person = await user.findOneAndUpdate(
        { email: email },
        { $set: { image: image, bio: bio } },
        { new: true } // Return the modified document rather than the original
      );
      await person.save()
      res.status(200).json({ message: "Profile updated successfully", done: true });
    } catch (error) {
      res.status(500).json({ error: error.message, done: false });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
