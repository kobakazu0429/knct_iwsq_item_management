import { z } from "zod";
import { parseISO, isValid } from "date-fns";

export const itemSchema = z.object({
  id: z.string().length(9),
  name: z.string().min(1, { message: "物品名を入力してください" }),
  notes: z.string(),
  location: z.string().min(1, { message: "管理場所を入力してください" }),
  chief_id: z.string().min(6, { message: "責任者の学生番号は6桁です" }),
  chief_name: z.string().min(1, { message: "責任者名を入力してください" }),
  chief_department: z
    .string()
    .min(1, { message: "責任者の所属を入力してください" }),
  chief_email: z
    .string()
    .refine((val) => !val.includes("@"), {
      message: "@から前のみ入力してください",
    })
    .refine((val) => /^(M|E|C|A|S)\d{2}-[a-z]{4}$/gi.test(val), {
      message:
        "メールアドレスの書式が異なります /^(M|E|C|A|S)d{2}-[a-z]{4}$/gi",
    }),
  expires_at: z.string().refine((val) => isValid(parseISO(val))),
  confirmed_ta_name: z
    .string()
    .min(1, { message: "確認したTAの名前を入力してください" }),
});
export type ItemSchema = z.infer<typeof itemSchema>;

export const chiefEmailVerifiedTokenSchema = z.object({
  chief_email_verified_token: z.string().length(24),
});
export type ChiefEmailVerifiedTokenSchema = z.infer<
  typeof chiefEmailVerifiedTokenSchema
>;

export const itemSchemaWithChiefEmailVerifiedTokenSchema = itemSchema.merge(
  chiefEmailVerifiedTokenSchema
);

export type ItemSchemaWithChiefEmailVerifiedTokenSchema = z.infer<
  typeof itemSchemaWithChiefEmailVerifiedTokenSchema
>;

export const otherDateSchema = z.object({
  created_at: z.string().refine((val) => isValid(parseISO(val))),
  updated_at: z.string().refine((val) => isValid(parseISO(val))),
});

export const fullItemSchema = itemSchema
  .merge(chiefEmailVerifiedTokenSchema)
  .merge(otherDateSchema);

export type FullItemSchema = z.infer<typeof fullItemSchema>;
