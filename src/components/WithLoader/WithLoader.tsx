import React from "react";

import { Loader } from "../Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  children,
  loading,
}) => {
  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
};
