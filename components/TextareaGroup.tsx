import {
  useState,
  useCallback,
  useEffect,
  useId,
  type FC,
  type ComponentPropsWithoutRef,
  useMemo,
} from "react";
import { FormGroup, Textarea, Text } from "smarthr-ui";
import {
  useWatch,
  useFormContext,
  type UseFormRegister,
  type UseFormSetValue,
  type Control,
} from "react-hook-form";
import { ItemSchemaForCreate, type ItemSchema } from "../lib/item";
import styled from "styled-components";

export const TextareaGroup: FC<{
  label: string;
  required?: boolean;
  // error?: string;
  hint?: string;
  readOnly?: boolean;
  // register: UseFormRegister<ItemSchema>;
  registerName: keyof ItemSchema;
  // control: Control<ItemSchema>;
  // setValue: UseFormSetValue<ItemSchema>;
}> = ({
  label,
  required,
  // error,
  hint,
  readOnly,
  // register,
  registerName,
  // control,
  // setValue: setFormValue,
}) => {
  const id = useId();

  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ItemSchema>();

  const error = useMemo(() => {
    const e = errors[registerName]?.message;
    if (typeof e === "string") return e;
    console.log(e);
    return "";
  }, [errors, registerName]);

  const reactHookFormValue = watch(registerName) as string;

  const handleChange: NonNullable<
    ComponentPropsWithoutRef<typeof Textarea>["onChange"]
  > = useCallback(
    (e) => {
      setValue(registerName, e.target.value);
    },
    [registerName, setValue]
  );

  const statusLabelProps = required
    ? [
        {
          type: "red" as const,
          children: "必須" as const,
        },
      ]
    : undefined;

  const { onChange, ...form } =
    (register && registerName && register(registerName)) ?? {};

  return (
    <div>
      <FormGroup
        title={label}
        titleType="subSubBlockTitle"
        statusLabelProps={statusLabelProps}
        htmlFor={id}
        errorMessages={error}
      >
        <StyledTextarea
          id={id}
          width="100%"
          readOnly={readOnly}
          disabled={readOnly}
          error={!!error}
          value={reactHookFormValue}
          onChange={handleChange}
          {...form}
        />
      </FormGroup>
      <Text color="TEXT_GREY">{hint}</Text>
    </div>
  );
};

const StyledTextarea = styled(Textarea)`
  resize: vertical;
`;
