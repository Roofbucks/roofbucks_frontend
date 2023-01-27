import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components/generalComponents";
import { ModalProps } from "types";

interface LoginData {
  email: string;
  password: string;
}

const initialValues: LoginData = {
  email: "",
  password: "",
};

export interface LoginModalProps extends ModalProps {
  login: (data: LoginData) => void;
  forgotPassword: () => void;
  signup: () => void;
}

const loginSchema = yup
  .object({
    email: yup.string().required("Required").email("Enter a valid email"),
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
            label="Email"
            placeholder="e.g. user@email.com"
            type="email"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
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
