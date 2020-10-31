import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
//formik_control_folder
import FormikControl from "../formik_controls/FormikControl";

const FormikContainer = () => {
  const dropdownOptions = [
    { key: "Select an option", value: "" },
    { key: "Option 1", value: "option1" },
    { key: "Option 2", value: "option2" },
    { key: "Option 3", value: "option3" },
  ];
  const radioOptions = [
    { key: "Option 1", value: "roption1" },
    { key: "Option 2", value: "roption2" },
    { key: "Option 3", value: "roption3" },
  ];
  const initialValues = {
    email: "",
    description: "",
    selectOption: "",
    radioOption: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    selectOption: Yup.string().required("Required"),
    radioOption: Yup.string().required("Required"),
  });
  const onSubmit = (values) => console.log(values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <FormikControl
            control="input"
            type="email"
            name="email"
            label="Email"
          ></FormikControl>
          <FormikControl
            control="textarea"
            type="textarea"
            name="description"
            label="Description"
          ></FormikControl>
          <FormikControl
            control="select"
            name="selectOption"
            label="Select a topic"
            options={dropdownOptions}
          ></FormikControl>
          <FormikControl
            control="radio"
            name="radioOption"
            label="Radio Topic"
            options={radioOptions}
          ></FormikControl>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
