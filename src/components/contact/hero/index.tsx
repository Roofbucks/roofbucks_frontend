import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input, Textarea } from "components";
import { LocationIconOutline, MailIcon, PhoneIconOutline } from "assets";
import { contactUsRequestData } from "api/services/general";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  country: string;
  message: string;
}

const initialValues: ContactData = {
  name: "",
  email: "",
  phone: "",
  country: "",
  message: "",
};

const contactSchema = yup
  .object({
    email: yup.string().email("Email is not valid").required("Required"),
    name: yup.string().required("Required"),
    message: yup.string().required("Required"),
    country: yup.string().required("Required"),
    phone: yup
      .string()
      .required("Required")
      .min(10, "Enter a valid phone number"),
  })
  .required();

interface HeroSectionProps {
  clear: boolean;
  submit: (data: contactUsRequestData) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ clear, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>({
    resolver: yupResolver(contactSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    reset();
  }, [clear]);

  const handleEnter = (event) => {
    if (event.key.toLowerCase() === "enter") {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const onSubmit: SubmitHandler<ContactData> = (data) => {
    const submitData: contactUsRequestData = {
      email: data.email,
      phone: data.phone,
      name: data.name,
      country: data.country,
      body: data.message,
    };
    submit(submitData);
  };

  return (
    <section className={`appContainer ${styles.contact}`}>
      <div className={styles.hero}>
        <h1 className={styles.ttl}>
          Reach out to <span>our team</span>
        </h1>
        <p className={styles.txt}>
          We always love to help, have questions about how to use the platform
          or experiencing any technical difficulties.
          <br />
          Please do not hesitate to contact us.
        </p>
      </div>
      <div className={styles.contactWrap}>
        <form className={styles.form}>
          <Input
            label="Name *"
            placeholder="Your name"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.name?.message}
            name="name"
            register={register}
            onKeyDown={handleEnter}
          />
          <Input
            label="Email *"
            placeholder="janedoe@gmail.com"
            type="email"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
            onKeyDown={handleEnter}
          />
          <Input
            label="Phone *"
            placeholder="E.g. +(234) 000 000 0000"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.phone?.message}
            name="phone"
            register={register}
            onKeyDown={handleEnter}
          />
          <Input
            name={"country"}
            placeholder={"E.g. Nigeria"}
            label={"Country *"}
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.country?.message}
            register={register}
            onKeyDown={handleEnter}
          />
          <Textarea
            label="How can we help?"
            placeholder="Your message"
            className={styles.textarea}
            required
            validatorMessage={errors.message?.message}
            name="message"
            register={register}
            parentClassName={styles.textarea}
          />
          <Button type="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <MailIcon />
            <div className={styles.contactTxtSec}>
              <p className={styles.contactTtl}>Send us a message</p>
              <p className={styles.contactTxt}>
                Our friendly team is always here to help
              </p>
              <a
                className={styles.contactTxt2}
                href="mailto:hello@roofbucks.com"
              >
                hello@roofbucks.com
              </a>
            </div>
          </div>
          <div className={styles.contactItem}>
            <LocationIconOutline />
            <div className={styles.contactTxtSec}>
              <p className={styles.contactTtl}>Office</p>
              <p className={styles.contactTxt}>
                Come say hello at our office HQ
              </p>
              <p className={styles.contactTxt2}>Lorem ipsum, Ghana.</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <PhoneIconOutline />
            <div className={styles.contactTxtSec}>
              <p className={styles.contactTtl}>Phone</p>
              <p className={styles.contactTxt}>Mon- Fri from 8am to 5pm</p>
              <a className={styles.contactTxt2} href="tel:2340000000000">
                +(234) 000 000 0000
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
