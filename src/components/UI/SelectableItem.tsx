import { useState } from "react";
import Button from "./Button";

interface SelectableItemProps {
  label: string;
  onSelect: (label: string) => void;
  active: boolean;
}

export default function SelectableItem({
  label,
  onSelect,
  active,
}: SelectableItemProps) {

  const handleClick = () => {
    onSelect(label);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={active}
      className={active ? "!bg-blue-500 text-white !hover:bg-blue-500" : ""}
    >
      {label}
    </Button>
  );
}
