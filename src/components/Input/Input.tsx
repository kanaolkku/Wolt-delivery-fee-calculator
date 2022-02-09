import React, { useState } from "react";
import "./input.css";

interface MyProps {
  value: any;
  handler: Function;
  numbervalidation?: boolean;
  placeholder?: string;
}

const Input = ({
  value,
  handler,
  numbervalidation,
  placeholder,
}: MyProps): JSX.Element => {
  const [isValid, setIsValid] = useState(true);

  // check if string contains only numbers or decimals and no letters or special characters
  // source https://stackoverflow.com/questions/12117024/decimal-number-regular-expression-where-digit-after-decimal-is-optional
  const isNumeric = (val: string): boolean => {
    return /^\d*\.?\d*$/.test(val);
  };

  const inputHandler = (value: string): void => {
    if (numbervalidation) {
      if (isNumeric(value) && value.length > 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
    handler(value);
  };

  return (
    <div className="input-container">
      <input
        value={value}
        onChange={(e) => {
          inputHandler(e.target.value);
        }}
        className={`input ${!isValid ? "invalid" : null}`}
        placeholder={placeholder}
      />
      {!isValid && (
        <span className="error-message">please enter a valid number</span>
      )}
    </div>
  );
};

export default Input;
