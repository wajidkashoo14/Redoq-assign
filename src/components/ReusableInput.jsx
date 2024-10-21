import React, { useEffect, useState } from "react";

const ReusableInput = ({
  type = "text",
  name,
  value,
  placeholder,
  onValueChange,
  validationRules = {},
  validationMessages = {},
  isFormSubmitting,
}) => {
  const [error, setError] = useState("");

  const defaultErrorMessages = {
    required: "This field is required",
    min: `Value must be greater than ${validationRules.min}`,
    max: `Value must be less or equal to ${validationRules.max}`,
    regex: "The input does not match the required format",
  };

  const validate = () => {
    const { min, max, required, regex } = validationRules;

    // check if user types no input
    if (!value && required) {
      setError(
        validationMessages.requiredMessage || defaultErrorMessages.required
      );
      return false;
    }

    if (min && value.length < min) {
      setError(
        validationMessages.minMessage || `Value must be ${min} characters`
      );
      return false;
    }

    if (max && value.length > max) {
      setError(
        validationMessages.maxMessage ||
          `Value must be less than ${max} characters `
      );
      return false;
    }

    if (regex && !new RegExp(regex).test(value)) {
      setError(validationMessages.regexMessage || defaultErrorMessages.regex);
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    if (isFormSubmitting) {
      validate();
    }
  }, [isFormSubmitting]);

  const handleBlur = () => {
    validate();
  };

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onValueChange(e.target.value)}
        onBlur={handleBlur}
        className={`border relative border-green-800 focus:outline-none p-2 rounded-lg w-[300px] ${
          error ? "border border-red-600" : ""
        }`}
      />
      {error && (
        <p className="absolute text-red-500 text-xs -bottom-5 left-0">
          {error}
        </p>
      )}
    </div>
  );
};

export default ReusableInput;
