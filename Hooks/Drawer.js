import { useState } from "react";

export default function useDrawer() {
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen,
  };
}
