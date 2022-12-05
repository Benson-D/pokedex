import { useState } from 'react';

/**
 * Custom Hook for toggle options, useful for modals, popups, tooltips
 * 
 */
function useToggle(defaultValue?: boolean) {
    const [value, setValue] = useState<boolean>(defaultValue || false);

    const toggleValue = (value?: boolean) => {
        setValue(currentValue => typeof value === 'boolean' ? value: !currentValue);
    };

    return [value, toggleValue] as const;
};

export default useToggle;
