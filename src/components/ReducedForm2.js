import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }

  return errors;
};
const ReducedForm2 = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" />
          <ErrorMessage name="name" component={TextError}></ErrorMessage>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" id="email" />
          <ErrorMessage name="email">
            {(errMsg) => <div className="error">{errMsg}</div>}
          </ErrorMessage>
        </div>
        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" name="channel" id="channel" />
          <ErrorMessage name="channel" component={TextError}></ErrorMessage>
        </div>

        {/*To change input to textarea*/}
        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" name="comments" id="comments"></Field>
        </div>

        {/*Render props*/}
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              return (
                <div>
                  <input type="text" id="address" {...field}></input>
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        {/*nested objects state*/}
        <div className="form-control">
          <label htmlFor="facebook">Facebook profile</label>
          <Field type="text" name="social.facebook" id="facebook" />
        </div>
        <div className="form-control">
          <label htmlFor="twitter">Twitter profile</label>
          <Field type="text" name="social.twitter" id="twitter" />
        </div>

        {/*Array state*/}
        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field type="text" name="phoneNumbers[0]" id="primaryPh" />
        </div>
        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary phone number</label>
          <Field type="text" name="phoneNumbers[1]" id="secondaryPh" />
        </div>

        {/*FieldArray component state*/}
        <div className="form-control">
          <label htmlFor="">List of Phone numbers</label>
          <FieldArray name="phNumbers">
            {(fieldArrayprops) => {
              const { push, remove, form } = fieldArrayprops;
              const { values } = form;
              const { phNumbers } = values;
              return (
                <div>
                  {phNumbers.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phNumbers[${index}]`}></Field>
                      <button type="button" onClick={() => remove(index)}>
                        -
                      </button>
                      <button type="button" onClick={() => push("")}>
                        +
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ReducedForm2;
