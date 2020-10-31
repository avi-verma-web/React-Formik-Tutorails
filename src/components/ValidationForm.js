import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TextError from "./TextError";

//VALIDATION
//Formik runs validation on 3 cases
//1 on change of field value
//2 on blur of field value
//3 on form submission

//DISABLE SUBMIT
// <button type="submit" disabled={!formik.isValid}>
//   Submit
// </button>;
//----------------------------------------
//To disable submit button from start
//1 validateOnMount={true}
//2 <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
// Submit
// </button>
//----------------------------------------
//DISABLE SUBMIT WHEN FORM IS SUBMITTING
// <button type="submit" disabled={formik.isSubmitting}>
//   Submit
// </button>;

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

const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  onSubmitProps.setSubmitting(false);
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

//Field level validation
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const ValidationForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      //   validateOnChange={false}
      //   validateOnBlur={false}
      //   validateOnMount={true}
    >
      {(formik) => {
        return (
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

            {/*Field level validation*/}
            {/*To change input to textarea*/}
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                name="comments"
                id="comments"
                validate={validateComments}
              ></Field>
              <ErrorMessage
                name="comments"
                component={TextError}
              ></ErrorMessage>
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
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
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

            {/*Manual form validation*/}
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate All
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button>

            {/*Disabling submit button*/}
            {/*<button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              Submit
            </button>*/}
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ValidationForm;
