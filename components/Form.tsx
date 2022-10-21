import { useCallback, type FC } from "react";
import { Stack, Cluster, Button } from "smarthr-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getNextExpiresDate, itemId } from "../utils/item";
import { InputGroup } from "./InputGroup";
import { DatePickerGroup } from "./DatePickerGroup";

const schema = z.object({
  id: z.string().length(10),
  name: z.string().min(1, { message: "物品名を入力してください" }),
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
  expires_at: z.date(),
  confirmed_ta_name: z
    .string()
    .min(1, { message: "確認したTAの名前を入力してください" }),
});

export type Schema = z.infer<typeof schema>;

const defaultValues = {
  location: "スクエア廊下",
  expires_at: getNextExpiresDate(new Date()),
};

export const Form: FC = () => {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: {
      id: itemId(),
      ...defaultValues,
    },
    resolver: zodResolver(schema, {}, { mode: "sync" }),
  });

  const handleReset = useCallback(() => {
    reset({ id: itemId(), ...defaultValues });
  }, [reset]);

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Stack gap="XL">
        <InputGroup label="ID" readOnly register={register} registerName="id" />

        <InputGroup
          label="物品名"
          hint="「IW イス パーツ」のように用途を分かりやすく記入してください"
          required
          error={errors.name?.message}
          register={register}
          registerName="name"
        />

        <InputGroup
          label="保管場所"
          required
          error={errors.location?.message}
          register={register}
          registerName="location"
        />

        <InputGroup
          label="責任者の学生番号"
          required
          error={errors.chief_id?.message}
          register={register}
          registerName="chief_id"
        />

        <InputGroup
          label="責任者の名前"
          hint="「高専 太郎」のように入力してください"
          required
          error={errors.chief_name?.message}
          register={register}
          registerName="chief_name"
        />

        <InputGroup
          label="責任者の所属"
          hint="「E1 イスを作ろう」のように学年学科や部活名、テーマ名など入力してください"
          required
          error={errors.chief_department?.message}
          register={register}
          registerName="chief_department"
        />

        <InputGroup
          label="責任者のメールアドレス"
          hint="「e17-abcd」のように@kure.kosen-ac.jpで終わるメールアドレスの最初のみ入力してください"
          required
          error={errors.chief_email?.message}
          register={register}
          registerName="chief_email"
          trailingVisual="@kure.kosen-ac.jp"
        />

        <DatePickerGroup
          label="保管期限"
          hint="通常は学期末(夏休み前、春休み前)1週間前までです"
          required
          register={register}
          registerName="expires_at"
          control={control}
          setValue={setValue}
        />

        <InputGroup
          label="TA名前"
          hint="物品の保管許可、変更、撤収などの確認をしたTAの名前を入力してください"
          required
          error={errors.confirmed_ta_name?.message}
          register={register}
          registerName="confirmed_ta_name"
        />

        <Cluster style={{ flexDirection: "row-reverse" }}>
          <Button type="submit" variant="primary">
            保存する
          </Button>
          <Button variant="danger" onClick={handleReset}>
            リセットする
          </Button>
        </Cluster>
      </Stack>
    </form>
  );
};
