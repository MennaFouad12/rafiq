"use client";

import { useEffect, useState } from "react";
import SearchIcon from "@/components/icons/search-icon";

type Props = {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
  defaultValue?: string;
};

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  delay = 300,
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, onSearch]);

  return (
    <div className="relative w-full sm:w-72">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchIcon />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 rounded-md bg-surface-highest"
      />
    </div>
  );
}