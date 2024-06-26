import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components/generalComponents";
import { ModalProps, optionType } from "types";
import { Routes } from "router";
import { Link } from "react-router-dom";
import { WarningIcon } from "assets";
import { initialOptionType } from "utils";

const accountTypeOptions: optionType[] = [
  {
    label: "Agent",
    value: "agent",
  },
  {
    label: "Homebuyer/Investor",
    value: "shareholder",
  },
];

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: optionType;
  agreement: boolean;
}

const initialValues: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  accountType: initialOptionType,
  agreement: false,
};

export interface SignupModalProps extends ModalProps {
  signup: (data: SignupData) => void;
  login: () => void;
  closeMobileNav: () => void;
}

const optionTypeSchemaReq = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const signupSchema = yup
  .object({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    password: yup
      .string()
      .required("Required")
      .min(8, "Password should be at least 8 characters long")
      .matches(/[A-Z]/, "Password should contain an uppercase character")
      .matches(/[a-z]/, "Password should contain an lowercase character")
      .matches(/[0-9]/, "Password should contain at least one number")
      .matches(
        /@|\$|#|&]/,
        "Password should contain at least special character (e.g. @, #, &, $)"
      ),
    email: yup.string().email("Enter valid email").required("Required"),
    agreement: yup
      .boolean()
      .required("Accept the terms and conditions to continue")
      .oneOf([true], "Accept the terms and conditions to continue."),
    accountType: optionTypeSchemaReq,
  })
  .required();

const SignupModalUI: React.FC<SignupModalProps> = ({
  show,
  closeModal,
  signup,
  login,
  closeMobileNav,
}: SignupModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => signup(data);

  const uppercaseCheck = /[A-Z]/.test(watch("password"));
  const lowercaseCheck = /[a-z]/.test(watch("password"));
  const numberCheck = /[0-9]/.test(watch("password"));
  const specialCharCheck = /@|\$|#|&]/.test(watch("password"));
  const lengthCheck = watch("password").length >= 8;

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
          <CustomSelect
            onChange={(x) => setValue("accountType", x)}
            validatorMessage={errors.accountType?.message ?? ""}
            name={"accountType"}
            placeholder={"Please Select"}
            label={"Account Type"}
            options={accountTypeOptions}
            value={watch("accountType")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <Input
            label="Email"
            placeholder="e.g. johndoe@gmail.com"
            type="email"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
          />
          <Input
            label="Enter Password"
            placeholder="---------"
            type="password"
            parentClassName={styles.input}
            required
            validatorMessage={errors.password?.message}
            name="password"
            register={register}
          />
          <div className={styles.passwordGuide}>
            <p className={uppercaseCheck ? styles.check : ""}>
              One uppercase character
            </p>
            <p className={lowercaseCheck ? styles.check : ""}>
              One lowercase character
            </p>
            <p className={lengthCheck ? styles.check : ""}>
              8 characters minimum
            </p>
            <p className={numberCheck ? styles.check : ""}>One number</p>
            <p className={specialCharCheck ? styles.check : ""}>
              One special character (@, #, &, $)
            </p>
          </div>
          <div className={styles.check}>
            <label>
              <input
                checked={watch("agreement")}
                onChange={() => {
                  setValue("agreement", !watch("agreement"));
                  setError("agreement", { message: "" });
                }}
                type="checkbox"
              />
              <span className={styles.mark}></span>
            </label>
            <span>
              I agree to Roofbuck’s{" "}
              <Link
                onClick={() => {
                  closeModal();
                  closeMobileNav();
                }}
                to={Routes.terms}
              >
                Terms of Service
              </Link>
            </span>{" "}
          </div>
          {errors.agreement?.message && (
            <p className={styles.errorMsg}>
              <WarningIcon /> {errors.agreement?.message}
            </p>
          )}
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
          <button
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
            className={styles.forgotPassword}
          >
            Sign in
          </button>
        </p>
      </Modal.Body>
    </Modal>
  );
};

export { SignupModalUI };
