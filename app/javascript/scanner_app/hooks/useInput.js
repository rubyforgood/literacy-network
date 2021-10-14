import { useState } from "react";

export default function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const onChange = setValue;
  const reset = () => setValue(initialValue);
  return { value, onChange, reset, set: setValue };
}
