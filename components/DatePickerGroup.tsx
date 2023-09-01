import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FC,
  type ComponentPropsWithoutRef,
  useMemo,
} from "react";
import { FormGroup, Text, DatePicker } from "smarthr-ui";
import {
  useWatch,
  type UseFormRegister,
  type UseFormSetValue,
  type Control,
  useFormContext,
} from "react-hook-form";
import { addYears, format } from "date-fns";
import styled from "styled-components";
import type { OmitByValue } from "utility-types";
import { type ItemSchema } from "../lib/item";

type OnlyStringValueItemSchema = OmitByValue<ItemSchema, boolean>;

export const DatePickerGroup: FC<{
  label: string;
  required?: boolean;
  // error?: string;
  hint?: string;
  readOnly?: boolean;
  // register: UseFormRegister<ItemSchema>;
  registerName: keyof OnlyStringValueItemSchema;
  // control: Control<OnlyStringValueItemSchema>;
  // setValue: UseFormSetValue<OnlyStringValueItemSchema>;
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
    setValue: setFormValue,
    formState: { errors },
  } = useFormContext<ItemSchema>();

  const error = useMemo(() => {
    const e = errors[registerName]?.message;
    if (typeof e === "string") return e;
    console.log(e);
    return "";
  }, [errors, registerName]);

  // const reactHookFormValue = useWatch<OnlyStringValueItemSchema>({
  //   control,
  //   name: registerName,
  // });

  const reactHookFormValue = watch(registerName) as string;

  const formatter = (date: Date | string) => {
    if (typeof date === "string") {
      return date;
    } else if (date instanceof Date) {
      return format(date, "yyyy/MM/dd");
    }
    return "";
  };

  const [value, setValue] = useState<string>(formatter(reactHookFormValue));

  useEffect(() => {
    setValue(formatter(reactHookFormValue));
  }, [reactHookFormValue]);

  const handleChangeDate: NonNullable<
    ComponentPropsWithoutRef<typeof DatePicker>["onChangeDate"]
  > = useCallback(
    (_date, value) => {
      setValue(value);
      setFormValue(registerName, value);
    },
    [registerName, setFormValue]
  );

  const statusLabelProps = required
    ? [
        {
          type: "red" as const,
          children: "必須" as const,
        },
      ]
    : undefined;

  const form = (register && registerName && register(registerName)) ?? {};

  const today = new Date();
  const from = today;
  const to = addYears(today, 1);
  return (
    <div>
      <FormGroup
        title={label}
        titleType="subBlockTitle"
        statusLabelProps={statusLabelProps}
        htmlFor={id}
        errorMessages={error}
      >
        <FullWidthDatePicker
          value={value}
          type="date"
          id={id}
          width="100%"
          from={from}
          to={to}
          readOnly={readOnly}
          disabled={readOnly}
          error={!!error}
          onChangeDate={handleChangeDate}
          {...form}
        />
      </FormGroup>
      <Text color="TEXT_GREY">{hint}</Text>
    </div>
  );
};

const FullWidthDatePicker = styled(DatePicker)`
  width: 100%;
`;
