import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const RadioButtons = (props) => {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label>{label}</label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  value={option.value}
                  checked={field.value === option.value}
                  {...field}
                  {...rest}
                ></input>
                <label htmlFor={option.value}>{option.key}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError}></ErrorMessage>
    </div>
  );
};

export default RadioButtons;
