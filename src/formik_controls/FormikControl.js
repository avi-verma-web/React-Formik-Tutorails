import React from "react";
import Input from "../formik_controls/Input";
import Textarea from "../formik_controls/Textarea";
import Select from "../formik_controls/Select";
import RadioButtons from "../formik_controls/RadioButtons";

const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest}></Input>;
    case "textarea":
      return <Textarea {...rest}></Textarea>;
    case "select":
      return <Select {...rest}></Select>;
    case "radio":
      return <RadioButtons {...rest}></RadioButtons>;
    case "checkbox":
    case "date":
    default:
      return null;
  }
};

export default FormikControl;
