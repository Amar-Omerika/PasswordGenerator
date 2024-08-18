import React, { forwardRef } from "react";
import "../../styles/global.sass";
type CheckboxInputProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, checked, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    };

    return (
      <label>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="password-generator__checkbox-group__input"
          {...props}
        />
        {label}
      </label>
    );
  }
);

export default Checkbox;
