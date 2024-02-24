import { useState } from "react";
import { useFormik } from "formik";
import { mapObjIndexed, keys, map } from "ramda";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";

import messages from "./messages";
import styles from "./index.module.css";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { Subtitle } from "../../components/Texts";
import Button from "../../components/Button";
import { isObjectEmpty } from "../../helpers/functions";
import { isEmailValid } from "../../helpers/validators";
import Routes from "../../helpers/routes";
import { useLoading } from "../../hooks/loading";
import api from "../../helpers/api";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = ({ validate, handleSubmit }) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles.contact_form_container}>
        {!isObjectEmpty(formik?.initialValues) &&
          map(
            (inputKey) => (
              <div
                key={inputKey}
                className={styles.contact_form_input_container}
              >
                {inputKey === "message" ? (
                  <TextArea
                    label={messages.contactForm.inputs[inputKey].label}
                    placeholder={
                      messages.contactForm.inputs[inputKey].placeholder
                    }
                    error={
                      formik.touched[inputKey] &&
                      (formik.errors[inputKey] ||
                        !!formik?.status?.errors[inputKey])
                    }
                    name={messages.contactForm.inputs[inputKey].name}
                    values={formik.values[inputKey]}
                    value={formik.values[inputKey]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    fullWidth
                    type={messages.contactForm.inputs[inputKey].type}
                  />
                ) : (
                  <Input
                    label={messages.contactForm.inputs[inputKey].label}
                    placeholder={
                      messages.contactForm.inputs[inputKey].placeholder
                    }
                    error={
                      formik.touched[inputKey] &&
                      (formik.errors[inputKey] ||
                        !!formik?.status?.errors[inputKey])
                    }
                    name={messages.contactForm.inputs[inputKey].name}
                    values={formik.values[inputKey]}
                    value={formik.values[inputKey]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    fullWidth
                    backgroundColor="#FFF"
                    type={messages.contactForm.inputs[inputKey].type}
                  />
                )}
              </div>
            ),
            keys(formik?.initialValues)
          )}
        <Button
          onClick={formik.handleSubmit}
          disabled={
            !isObjectEmpty(formik.errors) || isObjectEmpty(formik.touched)
          }
        >
          {messages.contactForm.action}
        </Button>
      </div>
    </form>
  );
};

const ContactFormEnd = () => {
  const rooter = useRouter();

  function handleHomeRedirect() {
    return rooter.push(Routes.HOME_PAGE);
  }

  return (
    <div className={styles.contact_form_after_container}>
      <div>
        <CheckCircleIcon className={styles.contact_form_after_validate_icon} />
      </div>
      <div className={styles.contact_form_after_title}>
        {messages.contactForm.after.title}
      </div>
      <div className={styles.contact_page_section_content}>
        {messages.contactForm.after.content}
      </div>
      <Button onClick={handleHomeRedirect}>
        <div>{messages.contactForm.after.action}</div>
      </Button>
    </div>
  );
};

const ContactContainer = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { setGlobalLoading } = useLoading();

  async function handleSubmit(values) {
    setGlobalLoading(true);
    const res = await api.post("/Customers/contact-form", values, {});
    setGlobalLoading(false);
    setEmailSent(true);
  }

  function handleEmptyFieldInValidate(values) {
    const errors = {};
    mapObjIndexed((_, key) => {
      if (!values[key]) errors[key] = messages.contactForm.errors.empty;
    }, values);
    return errors;
  }

  function handleValidate(values) {
    const errors = handleEmptyFieldInValidate(values);
    if (values?.email && !isEmailValid(values.email))
      errors.email = messages.contactForm.errors.email;
    return errors;
  }

  return (
    <div className={styles.contact_page_container}>
      <section className={styles.contact_page_information}>
        <h1 className={styles.contact_page__title}>{messages.title}</h1>
        <span className={styles.contact_page_subtitle}>
          {messages.subtitle}
        </span>
        <section className={styles.contact_page_contact_section_container}>
          <span className={styles.contact_page_section_title}>
            {messages.contact.title}
          </span>
          <a
            target="_blank"
            href={` http://maps.google.com/?q=${messages.contact.address.street} ${messages.contact.address.city}`}
            className={styles.contact_page_section_content}
          >
            {messages.contact.address.street}
          </a>
          <a
            target="_blank"
            href={` http://maps.google.com/?q=${messages.contact.address.street} ${messages.contact.address.city}`}
            className={styles.contact_page_section_content}
          >
            {messages.contact.address.city}
          </a>
          <a
            href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}`}
            className={styles.contact_page_section_content}
          >
            {process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER}
          </a>
        </section>
        <section className={styles.contact_page_contact_section_container}>
          <span className={styles.contact_page_section_title}>
            {messages.schedules.title}
          </span>
          <span className={styles.contact_page_section_content}>
            {messages.schedules.week.days}
          </span>
          <span className={styles.contact_page_section_content}>
            {messages.schedules.week.schedule}
          </span>
          <span className={styles.contact_page_section_content}>
            {messages.schedules.weekEnd.days}
          </span>
          <span className={styles.contact_page_section_content}>
            {messages.schedules.weekEnd.schedule}
          </span>
        </section>
      </section>
      <section className={styles.contact_page_form}>
        {!emailSent ? (
          <ContactForm validate={handleValidate} handleSubmit={handleSubmit} />
        ) : (
          <ContactFormEnd />
        )}
      </section>
    </div>
  );
};

export default ContactContainer;
