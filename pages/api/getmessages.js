import messageSchema from "@/models/messageSchema";

const handler = async (req, res, next) => {
  const sender = req.query.sender;
  const reciever = req.query.reciever
  if (req.method === 'GET') {
    try {
      const result = await messageSchema.find({ senderemail: sender, recieveremail: reciever });
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
};

export default handler;
