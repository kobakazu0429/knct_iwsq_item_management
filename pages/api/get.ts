import { type NextApiHandler } from "next";
import { z } from "zod";
import { withZod } from "../../lib/next/withZod";
import { itemSchema } from "./../../lib/item";
import { requestGas } from "./../../lib/gas";

const handleGet = withZod(
  z.object({
    query: itemSchema.pick({ id: true }).merge(
      z.object({
        token: z.string().min(128).max(180),
      })
    ),
  }),
  async (req, res) => {
    const response = await requestGas({
      type: "get",
      payload: {
        ...req.query,
      },
    });
    res.status(200).json(response);
  }
);

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      return;
  }
};

export default handler;