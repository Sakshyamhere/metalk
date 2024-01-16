import messageSchema from "@/models/messageSchema";

const handler = async (req, res, next) => {
  if (req.method === 'GET') {
    try {
      const result = await messageSchema.find();
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
};

export default handler;
