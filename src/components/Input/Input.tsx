import React, { FC } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";
let cx = classNames.bind(styles);
export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const classes = cx(styles.input, className, {
    [styles.input_disabled]: disabled,
  });

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
