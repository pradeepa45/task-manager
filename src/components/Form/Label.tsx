export default function Label({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <label className="" htmlFor={name}>
      {label}
    </label>
  );
}
