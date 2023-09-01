import { useCallback, useMemo, type FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ItemSchema,
  ItemSchemaForCreate,
  itemSchemaForCreate,
} from "../../lib/item";
import { Form } from "./presentation";

type EditableFormItem = Pick<
  ItemSchema,
  | "id"
  | "name"
  | "notes"
  | "location"
  | "chief_id"
  | "chief_name"
  | "chief_department"
  | "chief_email"
  | "expires_at"
  | "confirmed_ta_name"
>;

export const NewForm = () => {
  // const defaultValuesForReset = useMemo(
  //   () => ({
  //     id: itemId(),
  //     ...defaultValues,
  //     ...props.defaultValues,
  //   }),
  //   [props.defaultValues]
  // );

  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<EditableFormItem>({
    // defaultValues: defaultValuesForReset,
    defaultValues: {},
    resolver: zodResolver(itemSchemaForCreate, {}, { mode: "sync" }),
  });

  const handleReset = useCallback(() => {
    // reset({ ...defaultValuesForReset });
    reset();
  }, [
    reset,
    /*, defaultValuesForReset*/
  ]);

  // const Form = buildForm<EditableFormItem>({});

  return (
    <>
      <FormProvider>
        <Form></Form>
      </FormProvider>
    </>
  );
};
