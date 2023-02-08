import { useState } from "react";

export const useValue = () => {
  const [value] = useState(0);
  return { value };
};
