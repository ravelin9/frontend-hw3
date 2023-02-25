import React from "react";

import classNames from "classnames";

import styles from "./Button.module.scss";
import Loader, { LoaderSize } from "../Loader/Loader";

let cx = classNames.bind(styles);

export type ButtonProps = React.PropsWithChildren<{
  /**
   * Если true, то внутри кнопки вместе с children отображается компонент Loader
   * Также кнопка должна переходить в состояние disabled
   */
  loading?: boolean;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  className,
  ...props
}) => {
  let classes = cx(
    styles.button,
    className,
    {
      [styles.button_disabled]: loading || disabled,
    },
    { [styles.button_loading]: loading }
  );

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Loader size={LoaderSize.s} />}
      {children}
    </button>
  );
};

export default React.memo(Button);
