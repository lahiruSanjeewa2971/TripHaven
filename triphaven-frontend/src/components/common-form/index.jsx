import React from "react";
import FormControls from "./form-controls";
import { Button } from "../ui/button";

const CommonForm = ({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonStyleDisabled = false,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControls
        formData={formData}
        setFormData={setFormData}
        formControls={formControls}
        isButtonStyleDisabled={isButtonStyleDisabled}
      />
      <Button
        type="submit"
        className={`mt-5 w-full hover:bg-black hover:text-white ${isButtonStyleDisabled && ' bg-black text-white'}`}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
