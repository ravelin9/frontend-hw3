import React, { useState } from "react";

import styles from "./MultiDropdown.module.scss";
export type Option = {
  key: string;
  value: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange?: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const handleOptionClick = (selectedOption: Option) => {
    let newValue;
    if (value.some((option) => option.key === selectedOption.key)) {
      newValue = value.filter((option) => option.key !== selectedOption.key);
    } else {
      newValue = [...value, selectedOption];
    }
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggle}>
        {pluralizeOptions(value)}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {!disabled &&
            options.map((option) => (
              <li
                key={option.key}
                className={styles.option}
                onClick={() => handleOptionClick(option)}
              >
                <label>
                  <input
                    className={styles.input}
                    type="checkbox"
                    checked={value.some((val) => val.key === option.key)}
                    readOnly
                  />
                  <span className={styles.checkbox}>{option.value}</span>
                </label>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
