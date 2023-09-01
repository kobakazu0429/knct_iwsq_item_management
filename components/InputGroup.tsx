import { useId, useMemo, type FC } from "react";
import { FormGroup, Input, Text } from "smarthr-ui";
import { useFormContext } from "react-hook-form";
import { type ItemSchema } from "../lib/item";

interface Props {
  label: string;
  required?: boolean;
  hint?: string;
  readOnly?: boolean;
  trailingVisual?: string;
  registerName: keyof ItemSchema;
}

export const InputGroup: FC<Props> = ({
  label,
  required,
  hint,
  readOnly,
  registerName,
  trailingVisual,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ItemSchema>();

  const error = useMemo(() => {
    const e = errors[registerName]?.message;
    if (typeof e === "string") return e;
    console.log(e);
    return "";
  }, [errors, registerName]);

  const id = useId();

  const statusLabelProps = required
    ? [
        {
          type: "red" as const,
          children: "必須" as const,
        },
      ]
    : undefined;

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
          {...register(registerName)}
        />
      </FormGroup>
      <Text color="TEXT_GREY">{hint}</Text>
    </div>
  );
};
