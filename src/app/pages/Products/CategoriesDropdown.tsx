import React, { useState, useEffect } from "react";

import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { useStores } from "@utils/hooks/useStores";

interface Props {
  onChange?: (categoryId: string) => void;
}

const CategoriesDropdown = ({ onChange }: Props) => {
  const { productsStore } = useStores();
  const [categories, setCategories] = useState<Option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const data = await response.json();
        const options = data.map((category: Option) => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(options);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (value: Option[]) => {
    setSelectedCategories(value);
    if (onChange) {
      if (value.length === 0) {
        productsStore.setSelectedCategory(""); // сбрасываем значение selectedCategory в ProductsStore
      } else {
        onChange(value[0].id);
        productsStore.setSelectedCategory(value[0].id.toString()); // обновляем selectedCategory в ProductsStore
      }
    }
  };

  return (
    <MultiDropdown
      options={categories}
      value={selectedCategories}
      onChange={handleCategoryChange}
      pluralizeOptions={(selectedCategories) =>
        `Filter: ${selectedCategories.length}`
      }
    />
  );
};

export default CategoriesDropdown;
