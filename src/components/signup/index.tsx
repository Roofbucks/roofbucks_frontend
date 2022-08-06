import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components/generalComponents";
import { ModalProps } from "types";

interface SignupData {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

const initialValues: SignupData = {
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
};

export interface SignupModalProps extends ModalProps {
  signup: (data: SignupData) => void;
}

const signupSchema = yup
  .object({
    phone: yup
      .string()
      .required("Required")
      .min(10, "Enter a valid phone number")
      .matches(/^[0-9]+$/, "Phone number can only contain numbers"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(6, "Password should be at least 6 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password should contain at least one of the following special characters: !, @, #, $, %, ^, &,*"
      ),
  })
  .required();

const SignupModalUI: React.FC<SignupModalProps> = ({
  show,
  closeModal,
  signup,
}: SignupModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => signup(data);

  return (
    <Modal className={styles.login} show={show} onHide={closeModal} centered>
      <Modal.Body>
        <h1 className={styles.ttl}>Sign Up</h1>
        <form className={styles.form}>
          <Input
            label="First Name"
            placeholder="E.g Jane"
            type="text"
            parentClassName={`${styles.input} ${styles.halfInput}`}
            required
            validatorMessage={errors.firstName?.message}
            name="firstName"
            register={register}
          />
          <Input
            label="Last Name"
            placeholder="E.g Doe"
            type="text"
            parentClassName={`${styles.input} ${styles.halfInput}`}
            required
            validatorMessage={errors.lastName?.message}
            name="lastName"
            register={register}
          />
          <Input
            label="Phone Number"
            placeholder="e.g. 0814 000 0000"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.phone?.message}
            name="phone"
            register={register}
          />
          <Input
            label="Enter Password"
            placeholder="*********"
            type="password"
            parentClassName={styles.input}
            required
            validatorMessage={errors.password?.message}
            name="password"
            register={register}
          />

          <Button
            className={styles.continue}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </form>

        <p className={styles.signup}>
          Already have an account?
          <button className={styles.forgotPassword}>Sign in</button>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export { SignupModalUI };