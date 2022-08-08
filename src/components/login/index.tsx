import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components/generalComponents";
import { ModalProps } from "types";

interface LoginData {
  phone: string;
  password: string;
}

const initialValues: LoginData = {
  phone: "",
  password: "",
};

export interface LoginModalProps extends ModalProps {
  login: (data: LoginData) => void;
  forgotPassword: () => void;
  signup: () => void;
}

const loginSchema = yup
  .object({
    phone: yup
      .string()
      .required("Required")
      .min(10, "Enter a valid phone number")
      .matches(/^[0-9]+$/, "Phone number can only contain numbers"),
    password: yup.string().required("Required"),
  })
  .required();

const LoginModalUI: React.FC<LoginModalProps> = ({
  show,
  closeModal,
  login,
  forgotPassword,
  signup,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => login(data);

  return (
    <Modal className={styles.login} show={show} onHide={closeModal} centered>
      <Modal.Body>
        <h1 className={styles.ttl}>Login</h1>
        <form className={styles.form}>
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
          <button
            onClick={(e) => {
              e.preventDefault();
              forgotPassword();
              closeModal();
            }}
            className={styles.forgotPassword}
          >
            Forgot Password?
          </button>
          <Button
            className={styles.continue}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </form>

        <p className={styles.signup}>
          Dont have an account?
          <button
            onClick={(e) => {
              e.preventDefault();
              signup();
              closeModal();
            }}
            className={styles.forgotPassword}
          >
            Sign up
          </button>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export { LoginModalUI };
