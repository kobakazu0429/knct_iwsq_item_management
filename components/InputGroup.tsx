import { useId, type FC } from "react";
import { FormGroup, Input, Text } from "smarthr-ui";
import { type UseFormRegister } from "react-hook-form";
import { type Schema } from "./Form";

export const InputGroup: FC<{
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  readOnly?: boolean;
  trailingVisual?: string;
  register?: UseFormRegister<Schema>;
  registerName?: keyof Schema;
}> = ({
  label,
  required,
  error,
  hint,
  readOnly,
  register,
  registerName,
  trailingVisual,
}) => {
  const id = useId();
  const statusLabelProps = required
    ? [
        {
          type: "red" as const,
          children: "必須" as const,
        },
      ]
    : undefined;

  const form = (register && registerName && register(registerName)) ?? {};

  return (
    <div>
      <FormGroup
        title={label}
        titleType="subSubBlockTitle"
        statusLabelProps={statusLabelProps}
        htmlFor={id}
        errorMessages={error}
      >
        <Input
          type="text"
          id={id}
          width="100%"
          readOnly={readOnly}
          disabled={readOnly}
          suffix={trailingVisual}
          error={!!error}
          {...form}
        />
      </FormGroup>
      <Text color="TEXT_GREY">{hint}</Text>
    </div>
  );
};
