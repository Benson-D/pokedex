import { useState } from "react";

/**
 * Custom Hook for toggle options, useful for modals, popups, tooltips
 *
 */
function useToggle(defaultValue?: boolean): [boolean, (v?: boolean) => void] {
  const [value, setValue] = useState<boolean>(!!defaultValue);

  const toggleValue = (value?: boolean) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue,
    );
  };

  return [value, toggleValue];
}

export default useToggle;
