"use client";

import { CloseIcon } from "@/src/shared/constants/icons/close-icon";
import { SearchIcon } from "@/src/shared/constants/icons/explore-icon";
import React, { useRef, useState } from "react";

export interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const SearchInput: React.FC<SearchProps> = ({
  placeholder = "جستجو",
  value,
  onChange,
  onClick,
  disabled = false,
  fullWidth = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // controlled + uncontrolled
  const inputValue = value !== undefined ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    if (value === undefined) setInternalValue("");
    onChange?.("");
    inputRef.current?.focus();
  };

  const showCloseIcon = isFocused && inputValue.length > 0 && !disabled;

  return (
    // TODO add logic and feature base component
    <div
      onClick={onClick}
      className={`flex items-center gap-3 rounded-full border border-secondary bg-transparent px-6 py-1 text-xl text-secondary shadow-sm transition-all duration-200 ${
        fullWidth ? "w-full" : "w-[27.292vw]"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {/* Search Icon */}
      <div className="flex-shrink-0">
        <SearchIcon size="md" />
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="text-md h-full w-full bg-transparent outline-none placeholder:text-secondary disabled:cursor-not-allowed"
      />

      {/* Close Icon */}
      {showCloseIcon && (
        <button
          type="button"
          className="flex-shrink-0 cursor-pointer"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
        >
          <CloseIcon size="xs" />
        </button>
      )}
    </div>
  );
};
