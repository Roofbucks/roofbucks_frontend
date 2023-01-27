import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components/generalComponents";
import { ModalProps } from "types";
import { ArrowRight } from "assets";

interface RecoveryData {
  email: string;
}

const initialValues: RecoveryData = {
  email: "",
};

export interface RecoveryModalProps extends ModalProps {
  recovery: (data: RecoveryData) => void;
  login: () => void;
}

const RecoverySchema = yup
  .object({
    email: yup.string().email("Enter a valid email").required("Required"),
  })
  .required();

const RecoveryModalUI: React.FC<RecoveryModalProps> = ({
  show,
  closeModal,
  recovery,
  login,
}: RecoveryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryData>({
    resolver: yupResolver(RecoverySchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<RecoveryData> = (data) => recovery(data);

  return (
    <Modal className={styles.login} show={show} onHide={closeModal} centered>
      <Button
        onClick={() => {
          login();
        }}
        type="tertiary"
        className={styles.outsideBtn}
      >
        <ArrowRight /> Back to login
      </Button>
      <Modal.Body>
        <h1 className={styles.ttl}>Account Recovery</h1>
        <form className={styles.form}>
          <Input
            label="Email Address"
            placeholder="e.g. user@gmail.com"
            type="email"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
          />
          <p className={styles.info}>
            Enter your recovery email address with which you will recieve an OTP
          </p>
          <Button
            className={styles.continue}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export { RecoveryModalUI };
