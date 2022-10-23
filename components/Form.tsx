import { useCallback, useMemo, type FC } from "react";
import { Stack, Cluster, Button } from "smarthr-ui";
import { useForm, type UseFormHandleSubmit } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getNextExpiresDate, itemId } from "../lib/item/utils";
import { InputGroup } from "./InputGroup";
import { DatePickerGroup } from "./DatePickerGroup";
import { itemSchema, type ItemSchema, type FullItemSchema } from "../lib/item";
import { formatISO } from "date-fns";
import { TextareaGroup } from "./TextareaGroup";

const expires_at = formatISO(getNextExpiresDate(new Date()));

const defaultValues = {
  notes: "",
  location: "スクエア廊下",
  expires_at: expires_at.includes("+") ? expires_at.split("+")[0] : expires_at,
};

interface Props {
  defaultValues?: Partial<FullItemSchema>;
  onSubmit: Parameters<UseFormHandleSubmit<ItemSchema>>[0];
}

export const Form: FC<Props> = (props) => {
  const defaultValuesForReset = useMemo(
    () => ({
      id: itemId(),
      ...defaultValues,
      ...props.defaultValues,
    }),
    [props.defaultValues]
  );

  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<ItemSchema>({
    defaultValues: defaultValuesForReset,
    resolver: zodResolver(itemSchema, {}, { mode: "sync" }),
  });

  const handleReset = useCallback(() => {
    reset({ ...defaultValuesForReset });
  }, [reset, defaultValuesForReset]);

  return (
    <form onSubmit={submit(props.onSubmit)}>
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

        <TextareaGroup
          label="危険物など特記事項"
          hint="「薬品やバッテリー」などが危険物がある場合は分かりやすく記入してください。判断が難しい場合はTAに相談してください。"
          error={errors.notes?.message}
          register={register}
          registerName="notes"
          control={control}
          setValue={setValue}
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
