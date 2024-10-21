import React, { useState } from "react";
import defaultImage from "../../public/defaultimg.png";

const ImageInput = ({
  src = "",
  alt = "Image",
  name,
  value = "",
  setValue,
  validationRules = {},
  validationMessages = {},
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [imageSrc, setImageSrc] = useState(src || defaultImage);
  const [isLoading, setIsLoading] = useState(false);

  // Handle image loading failure
  const handleImageError = () => {
    if (imageSrc !== defaultImage) {
      setImageSrc(defaultImage);
      setErrorMessage(
        validationMessages.errorMessage || "Image couldn't be loaded."
      );
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const validateImage = (file) => {
    const { required, maxSize } = validationRules;
    let isValid = true;

    // Required validation
    if (required && !file) {
      setErrorMessage(
        validationMessages.requiredMessage || "Profile picture is required."
      );
      isValid = false;
    } else {
      setErrorMessage("");
    }

    // Max size validation
    if (maxSize && file && file.size > maxSize) {
      setErrorMessage(
        validationMessages.maxSizeMessage ||
          `Image must be less than ${maxSize / 1024 / 1024} MB.`
      );
      isValid = false;
    }

    return isValid;
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setValue(file);
        validateImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(defaultImage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <label
        htmlFor={name}
        className="bg-green-600 text-white p-2 rounded-lg cursor-pointer mb-2 hover:bg-green-700"
      >
        Choose File
      </label>
      <input
        id={name}
        type="file"
        name={name}
        accept="image/*"
        onChange={handleFileChange}
        {...props}
        className="opacity-0 absolute inset-0 w-[50px] h-[30px] cursor-pointer"
      />

      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`mt-2 w-[300px] h-[200px] rounded-lg overflow-hidden object-contain ${
          isLoading ? "opacity-50" : "opacity-100"
        }`}
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default ImageInput;
