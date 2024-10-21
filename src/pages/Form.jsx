import React, { useState } from "react";
import ReusableInput from "../components/ReusableInput";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [validateFields, setValidateFields] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    const isFormValid =
      validateFields.username &&
      validateFields.email &&
      validateFields.password;

    if (isFormValid) {
      console.log("Form Submitted Successfully", formData);
      // Reset form data
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      // Reset validation states
      setValidateFields({
        username: false,
        email: false,
        password: false,
      });
      setIsFormSubmitting(false);
    } else {
      console.log("Form has Errors");
    }
  };

  const validationMessages = {
    username: "Username must be at least 3 characters long.",
    email: "Please enter a valid email address.",
    password: "Password must be at least 6 characters long. ",
  };

  const validationRules = {
    username: { required: true, min: 3 },
    email: { required: true, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, min: 6 },
  };

  return (
    <div className="flex flex-col items-center justify-start">
      <form
        onSubmit={handleSubmit}
        className="min-w-[300px] flex flex-col gap-8 mt-5 shadow-xl min-h-[350px] p-10 rounded-lg"
      >
        <ReusableInput
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onValueChange={(val) => handleInputChange("username", val)}
          validationRules={validationRules.username}
          validationMessages={validationMessages.username}
          isFormSubmitting={isFormSubmitting}
        />
        <ReusableInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onValueChange={(val) => handleInputChange("email", val)}
          validationRules={validationRules.email}
          validationMessages={validationMessages.email}
          isFormSubmitting={isFormSubmitting}
        />

        <ReusableInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onValueChange={(val) => handleInputChange("password", val)}
          validationRules={validationRules.password}
          validationMessages={validationMessages.password}
          isFormSubmitting={isFormSubmitting}
        />

        <button
          type="submit"
          className="outline-none w-full bg-blue-500 text-white p-2 rounded-lg font-medium mt-5 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
