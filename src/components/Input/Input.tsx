import React, { FC, useCallback } from "react";

import classNames from "classnames/bind";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const classes = cx("input", className, { input_disabled: disabled });

  return (
    <input
      type="text"
      className={classes}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default React.memo(Input);
