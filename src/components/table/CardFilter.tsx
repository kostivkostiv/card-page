import { Input } from "@/components/ui/input";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const CardFilter = ({ value, onChange }: Props) => {
  return (
    <Input
      type="text"
      placeholder="Search by brand or last 4 digits..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-sm"
    />
  );
};
