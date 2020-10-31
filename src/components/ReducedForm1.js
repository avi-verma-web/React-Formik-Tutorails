import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";

/////////////////////////////////////////////////////
// onChange={formik.handleChange}
//value={formik.values.channel}
//onBlur={formik.handleBlur}
//All above 3 lines is replaced by
//{...formik.getFieldProps("channel")}
/////////////////////////////////////////////////////
//FORMIK replaces USEFORMIK
// <Formik
//   initialValues={initialValues}
//   onSubmit={onSubmit}
//   validate={validate}
// ></Formik>;
// const formik = useFormik({
//   initialValues: initialValues,
//   onSubmit: onSubmit,
//   validate: validate,
// });
/////////////////////////////////////////////////////////
//Form replaces html form
/////////////////////////////////////////////////////////
//Field replaces html input tag
/////////////////////////////////////////////////////////
//ErrorMessage replaces div tag for displaying errors

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
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
const ReducedForm1 = () => {
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
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default ReducedForm1;
