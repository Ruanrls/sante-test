import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";

type InputProps = {
  onSearch: (event: React.MouseEvent) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const DEFAULT_PLACEHOLDER_TEXT = "Search...";

export const SearchInput = ({
  onSearch,
  placeholder = DEFAULT_PLACEHOLDER_TEXT,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-1 gap-x-2">
      <Input {...props} placeholder={placeholder} />
      <Button onClick={onSearch}>
        <Search height={22} />
      </Button>
    </div>
  );
};
