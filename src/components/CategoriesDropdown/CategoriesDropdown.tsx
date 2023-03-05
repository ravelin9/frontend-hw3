import React, { useEffect } from "react";

import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { useStores } from "@utils/hooks/useStores";
import { observer } from "mobx-react-lite";

interface Props {
  onChange?: (categoryId: string) => void;
}

const CategoriesDropdown = observer(({ onChange }: Props) => {
  const { categoriesStore, productsStore } = useStores();

  useEffect(() => {
    const fetchCategories = async () => {
      await categoriesStore.fetchCategories();
    };
    fetchCategories();
  }, [categoriesStore]);

  const handleCategoryChange = (value: Option[]) => {
    categoriesStore.setSelectedCategoriesAndHandleChange(
      value,
      onChange,
      productsStore
    );
  };

  return (
    <MultiDropdown
      options={categoriesStore.categories}
      value={categoriesStore.selectedCategories}
      onChange={handleCategoryChange}
      pluralizeOptions={(selectedCategories) =>
        `Filter: ${selectedCategories.length}`
      }
    />
  );
});

export default CategoriesDropdown;
