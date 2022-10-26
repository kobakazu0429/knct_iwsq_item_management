import axios from "axios";
import {
  getRequestSchema,
  newRequestSchema,
  verifyRequestSchema,
} from "../gas";
import { type ItemSchema } from "../item";

export interface Response {
  ok: boolean;
  message: string;
}

export type GetResponse =
  | {
      ok: true;
      data: ItemSchema;
    }
  | { ok: false; message: string };

export const client = {
  get: async (payload: object) => {
    const params = getRequestSchema.shape.payload.parse({
      ...payload,
      token: process.env.NEXT_PUBLIC_GAS_TOKEN ?? "",
    });
    return axios.get<GetResponse>("/api/get", {
      params,
    });
  },
  new: async (payload: object) => {
    const data = newRequestSchema.shape.payload
      .omit({ chief_email_verified_token: true })
      .parse(payload);
    return axios.post<Response>("/api/new", data);
  },
  verify: async (payload: object) => {
    const data = verifyRequestSchema.shape.payload.parse(payload);
    return axios.post<Response>("/api/verify", data);
  },
};
