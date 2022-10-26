import { type NextApiHandler } from "next";
import { z } from "zod";
import { withZod } from "../../lib/next/withZod";
import { requestGas, verifyRequestSchema } from "./../../lib/gas";

const handlePost = withZod(
  z.object({
    body: verifyRequestSchema.shape.payload,
  }),
  async (req, res) => {
    const response = await requestGas({
      type: "verify",
      payload: req.body,
    });
    res.status(200).json(response);
  }
);

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      return;
  }
};

export default handler;
