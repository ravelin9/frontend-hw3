import { useContext } from "react";

import { RootStoreContext } from "../../store/RootStore";

export const useStores = () => useContext(RootStoreContext);
