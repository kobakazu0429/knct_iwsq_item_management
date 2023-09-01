import { type FC, type FormEventHandler, type MouseEventHandler } from "react";
import { Stack, Cluster, Button } from "smarthr-ui";
import { InputGroup } from "../InputGroup";
import { DatePickerGroup } from "../DatePickerGroup";
import { TextareaGroup } from "../TextareaGroup";
import { type UseFormUnregister } from "react-hook-form";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onReset: MouseEventHandler<HTMLButtonElement>;
  data: {
    id: {
      register: UseFormUnregister<any>;
    };
  };
}

export const Form: FC<Props> = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Stack gap="XL">
        <InputGroup
          label="ID"
          readOnly
          // // @ts-expect-error
          // register={register}
          registerName="id"
        />

        <InputGroup
          label="物品名"
          hint="「IW イス パーツ」のように用途を分かりやすく記入してください"
          required
          // error={errors.name?.message}
          // // @ts-expect-error
          // register={register}
          registerName="name"
        />

        <TextareaGroup
          label="危険物など特記事項"
          hint="「薬品やバッテリー」などが危険物がある場合は分かりやすく記入してください。判断が難しい場合はTAに相談してください。"
          // error={errors.notes?.message}
          // // @ts-expect-error
          // register={register}
          registerName="notes"
          // // @ts-expect-error
          // control={control}
          // // @ts-expect-error
          // setValue={setValue}
        />

        <InputGroup
          label="保管場所"
          required
          // error={errors.location?.message}
          // // @ts-expect-error
          // register={register}
          registerName="location"
        />

        <InputGroup
          label="責任者の学生番号"
          required
          // error={errors.chief_id?.message}
          // // @ts-expect-error
          // register={register}
          registerName="chief_id"
        />

        <InputGroup
          label="責任者の名前"
          hint="「高専 太郎」のように入力してください"
          required
          // error={errors.chief_name?.message}
          // // @ts-expect-error
          // register={register}
          registerName="chief_name"
        />

        <InputGroup
          label="責任者の所属"
          hint="「E1 イスを作ろう」のように学年学科や部活名、テーマ名など入力してください"
          required
          // error={errors.chief_department?.message}
          // // @ts-expect-error
          // register={register}
          registerName="chief_department"
        />

        <InputGroup
          label="責任者のメールアドレス"
          hint="「e17-abcd」のように@kure.kosen-ac.jpで終わるメールアドレスの最初のみ入力してください"
          required
          // error={errors.chief_email?.message}
          // // @ts-expect-error
          // register={register}
          registerName="chief_email"
          trailingVisual="@kure.kosen-ac.jp"
        />

        <DatePickerGroup
          label="保管期限"
          hint="通常は学期末(夏休み前、春休み前)1週間前までです"
          required
          // // @ts-expect-error
          // register={register}
          registerName="expires_at"
          // // @ts-expect-error
          // control={control}
          // // @ts-expect-error
          // setValue={setValue}
        />

        <InputGroup
          label="TA名前"
          hint="物品の保管許可、変更、撤収などの確認をしたTAの名前を入力してください"
          required
          // error={errors.confirmed_ta_name?.message}
          // // @ts-expect-error
          // register={register}
          registerName="confirmed_ta_name"
        />

        <Cluster style={{ flexDirection: "row-reverse" }}>
          <Button type="submit" variant="primary">
            保存する
          </Button>
          <Button variant="danger" onClick={props.onReset}>
            リセットする
          </Button>
        </Cluster>
      </Stack>
    </form>
  );
};

// import {
//   createElement,
//   ReactElement,
//   ReactNode,
//   useCallback,
//   useMemo,
//   type FC,
// } from "react";
// import { Stack, Cluster, Button } from "smarthr-ui";
// import { useForm, type UseFormHandleSubmit } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { InputGroup } from "../InputGroup";
// import { DatePickerGroup } from "../DatePickerGroup";
// import { TextareaGroup } from "../TextareaGroup";
// import { ItemSchema } from "../../lib/item";

// type FormItem = (
//   | { type: "input" }
//   | { type: "textarea" }
//   | { type: "date" }
// ) & {
//   required: boolean;
//   label: string;
//   hint: string;
//   trailingVisual?: string;
//   registerName: string;
//   readOnly: boolean;
// };

// const Components: Record<FormItem["type"], any> = {
//   input: InputGroup,
//   textarea: TextareaGroup,
//   date: DatePickerGroup,
// };

// export type Props<EditableFormItem extends ItemSchema> = {
//   defaultValues?: Partial<ItemSchema>;
//   forms: FormItem[];
//   errors: any;
//   register: any;
//   control: any;
//   setValue: any;
//   onSubmit: Parameters<UseFormHandleSubmit<EditableFormItem>>[0];
// };

// export const buildForm = <EditableFormItem extends ItemSchema>(
//   props: Props<EditableFormItem>
// ) => {
//   // const defaultValuesForReset = useMemo(
//   //   () => ({
//   //     id: itemId(),
//   //     ...defaultValues,
//   //     ...props.defaultValues,
//   //   }),
//   //   [props.defaultValues]
//   // );
//   // const {
//   //   register,
//   //   control,
//   //   setValue,
//   //   reset,
//   //   handleSubmit: submit,
//   //   formState: { errors },
//   // } = useForm<ItemSchemaForCreate>({
//   //   defaultValues: defaultValuesForReset,
//   //   resolver: zodResolver(itemSchemaForCreate, {}, { mode: "sync" }),
//   // });
//   // const handleReset = useCallback(() => {
//   //   reset({ ...defaultValuesForReset });
//   // }, [reset, defaultValuesForReset]);

//   const handleReset = () => {};

//   return (
//     <form
//     // onSubmit={submit(props.onSubmit, (errors) => {
//     //   console.log(errors);
//     // })}
//     >
//       <Stack gap="XL">
//         {props.forms.map((formItem) => {
//           return createElement(Components[formItem.type], {
//             key: formItem.label,
//             label: formItem.label,
//             hint: formItem.hint,
//             trailingVisual: formItem.trailingVisual,
//             error: props.errors[formItem.registerName]?.message,
//             required: formItem.required,
//             readOnly: formItem.readOnly,
//             registerName: formItem.registerName,
//             register: props.register,
//             control: props.control,
//             setValue: props.setValue,
//           });
//         })}

//         <Cluster style={{ flexDirection: "row-reverse" }}>
//           <Button type="submit" variant="primary">
//             保存する
//           </Button>
//           <Button variant="danger" onClick={handleReset}>
//             リセットする
//           </Button>
//         </Cluster>
//       </Stack>
//     </form>
//   );
// };
