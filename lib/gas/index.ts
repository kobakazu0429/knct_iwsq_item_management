import axios from "axios";
import { z } from "zod";
import { itemSchema } from "./../item/index";

const client = axios.create({ baseURL: process.env.GAS_URL });

export const newRequestSchema = z.object({
  type: z.literal("new"),
  payload: itemSchema.pick({
    id: true,
    name: true,
    notes: true,
    location: true,
    chief_id: true,
    chief_name: true,
    chief_department: true,
    chief_email: true,
    chief_email_verified_token: true,
    confirmed_ta_name: true,
    expires_at: true,
  }),
});

export const verifyRequestSchema = z.object({
  type: z.literal("verify"),
  payload: itemSchema.pick({
    id: true,
    chief_email_verified_token: true,
  }),
});

export const getRequestSchema = z.object({
  type: z.literal("get"),
  payload: itemSchema
    .pick({
      id: true,
    })
    .extend({
      token: z.string().min(128).max(180),
    }),
});

export const updateRequestSchema = z.object({
  type: z.literal("update"),
  payload: itemSchema.pick({
    id: true,
    name: true,
    notes: true,
    location: true,
    status: true,
    confirmed_ta_name: true,
    expires_at: true,
  }),
});

export const getRequestPayloadSchemaOmittedToken =
  getRequestSchema.shape.payload.omit({ token: true });

export type NewRequestSchema = z.infer<typeof newRequestSchema>;
export type VerifyRequestSchema = z.infer<typeof verifyRequestSchema>;
export type GetRequestSchema = z.infer<typeof getRequestSchema>;

export type RequestDataSchema =
  | NewRequestSchema
  | VerifyRequestSchema
  | GetRequestSchema;

export const requestGas = async (data: RequestDataSchema) => {
  const res = await client.post("", data);
  return res.data;
};
