import React, {useState, Component} from "react"
import {Form, Formik, FormikProps} from "formik"
import factory from "../contracts/factory"

interface NewInterface {
  errorMessage: string
}

class New extends Component<{}, NewInterface> {
  state: NewInterface = {
    errorMessage: "",
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{message: ""}}
          onSubmit={async (values, {setSubmitting}) => {
            setSubmitting(true)
            try {
              // @ts-ignore
              const accounts = await window.web3.eth.getAccounts()
              await factory.methods.createContract(values.message).send({
                from: accounts[0],
              })
              setSubmitting(false)
            } catch (err) {
              setSubmitting(false)
              this.setState({errorMessage: err.message})
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="message"
                name="message"
                onChange={handleChange}
                value={values.message}
              />
              {errors.message && touched.message && errors.message}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

export default New
