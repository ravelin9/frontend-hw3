import { useContext } from "react";

import { RootStoreContext } from "../../stores/RootStore";

export const useStores = () => useContext(RootStoreContext);
