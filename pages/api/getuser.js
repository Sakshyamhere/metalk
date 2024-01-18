import userSchema from "@/models/userSchema";

const handler = async (req, res, next) => {
    const email = req.query.email
  if (req.method === 'GET') {
    try {
      const result = await userSchema.find({email});
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
};

export default handler;
