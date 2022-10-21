import {
  useCallback,
  useEffect,
  useId,
  useState,
  type FC,
  type ComponentPropsWithoutRef,
} from "react";
import { FormGroup, Text, DatePicker } from "smarthr-ui";
import {
  useWatch,
  type UseFormRegister,
  type UseFormSetValue,
  type Control,
} from "react-hook-form";
import { addYears, format } from "date-fns";
import { type Schema } from "./Form";
import styled from "styled-components";

export const DatePickerGroup: FC<{
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  register: UseFormRegister<Schema>;
  registerName: keyof Schema;
  control: Control<Schema>;
  setValue: UseFormSetValue<Schema>;
}> = ({
  label,
  required,
  error,
  hint,
  readOnly,
  register,
  registerName,
  control,
  setValue: setFormValue,
}) => {
  const id = useId();
  const reactHookFormValue = useWatch<Schema>({ control, name: registerName });

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
    (date, value) => {
      setValue(value);
      if (date) {
        setFormValue(registerName, date);
      }
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
