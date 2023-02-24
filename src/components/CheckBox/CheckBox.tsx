import React from "react";

import classNames from "classnames";

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  disabled,
  checked,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };
  const classes = classNames("checkbox", className, {
    checkbox_disabled: disabled,
  });
  return (
    <label className="container">
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      <span className={classes}></span>
    </label>
  );
};
