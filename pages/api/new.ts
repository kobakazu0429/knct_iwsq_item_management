import { randomBytes } from "node:crypto";
import { type NextApiHandler } from "next";
import { z } from "zod";
import { withZod } from "../../lib/next/withZod";
import { requestGas, newRequestSchema } from "./../../lib/gas";

const handlePost = withZod(
  z.object({
    body: newRequestSchema.shape.payload.omit({
      chief_email_verified_token: true,
    }),
  }),
  async (req, res) => {
    const response = await requestGas({
      type: "new",
      payload: {
        ...req.body,
        chief_email: req.body.chief_email + "@kure.kosen-ac.jp",
        chief_email_verified_token: randomBytes(16).toString("base64"),
      },
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
