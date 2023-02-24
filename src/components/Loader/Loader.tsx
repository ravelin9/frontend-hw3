import React from "react";

import classNames from "classnames";

import styles from "./Loader.module.scss";
let cx = classNames.bind(styles);
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className = styles.loaderSizes,
}) => {
  const classes = cx(className, {
    [`styles.loaderSize${size}`]: true,
  });
  if (!loading) {
    return null;
  }

  return <div className={classes}></div>;
};
