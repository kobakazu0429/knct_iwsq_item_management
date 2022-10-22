import axios from "axios";
import { type ItemSchemaWithChiefEmailVerifiedTokenSchema } from "./../item/index";

const client = axios.create({ baseURL: process.env.GAS_URL });

export type Data =
  | {
      type: "new";
      payload: Omit<
        ItemSchemaWithChiefEmailVerifiedTokenSchema,
        "expires_at"
      > & {
        expires_at: string;
      };
    }
  | {
      type: "verify";
      payload: Pick<
        ItemSchemaWithChiefEmailVerifiedTokenSchema,
        "id" | "chief_email_verified_token"
      >;
    }
  | {
      type: "get";
      payload: Pick<ItemSchemaWithChiefEmailVerifiedTokenSchema, "id"> & {
        token: string;
      };
    };

export const requestGas = async (data: Data) => {
  const res = await client.post("", data);
  return res.data;
};
