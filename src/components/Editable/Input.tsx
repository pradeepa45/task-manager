import { EditableInputProps } from "@/types/common";

export default function EditableInput({
  name,
  type = "text",
  value,
  readOnly,
  className,
  onChange,
}: EditableInputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      className={className}
    />
  );
}
