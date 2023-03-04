import React, { useEffect, useState, useRef } from "react";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  id: string;
  name: string;
};

export type MultiDropdownProps = {
  options: Option[];
  value: Option[];
  onChange?: (value: Option[]) => void;
  disabled?: boolean;
  pluralizeOptions: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const handleOptionClick = (selectedOption: Option) => {
    const newValue: Option | undefined = options.find(
      (option) => option.id === selectedOption.id
    );
    if (onChange && newValue) {
      onChange([newValue]);
      setIsOpen(false); // добавляем вызов setIsOpen(false)
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header} onClick={toggle}>
        {pluralizeOptions(value)}
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {!disabled &&
            options.map((option) => (
              <li key={option.id} className={styles.option}>
                <label>
                  <input
                    className={styles.input}
                    type="checkbox"
                    checked={value.some((val) => val.id === option.id)}
                    onChange={() => handleOptionClick(option)}
                    readOnly
                  />
                  <span className={styles.checkbox}>{option.name}</span>
                </label>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(MultiDropdown);
