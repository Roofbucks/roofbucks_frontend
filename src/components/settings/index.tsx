import * as React from "react";
import styles from "./styles.module.css";
import { SecurityIcon, UserIcon } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components";

// Account
interface AccountData {
  displayName: string;
  agencyName: string;
  website: string;
}

const initialAccountValues: AccountData = {
  displayName: "",
  agencyName: "",
  website: "",
};

const accountSchema = yup
  .object({
    displayName: yup.string().required("Required"),
    agencyName: yup.string().required("Required"),
    website: yup.string(),
  })
  .required();

// Security
interface SecurityData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialSecurityValues: SecurityData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const passwordSchema = yup
  .string()
  .required("Required")
  .min(8, "Password should be at least 8 characters long")
  .matches(/[A-Z]/, "Password should contain an uppercase character")
  .matches(/[a-z]/, "Password should contain an lowercase character")
  .matches(/[0-9]/, "Password should contain at least one number");

const securitySchema = yup
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema.equals(
      [yup.ref("confirmPassword")],
      "Passwords do not match"
    ),
    confirmPassword: passwordSchema.equals(
      [yup.ref("newPassword")],
      "Passwords do not match"
    ),
  })
  .required();

interface SettingsProps {
  // account: AccountData;
  submitPassword: (data) => void;
  reset: boolean;
}

const SettingsUI: React.FC<SettingsProps> = ({ submitPassword, reset }) => {
  const [view, setView] = React.useState(1);

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    formState: { errors: errorsAccount },
  } = useForm<AccountData>({
    resolver: yupResolver(accountSchema),
    defaultValues: initialAccountValues,
  });

  const {
    register: registerSecurity,
    handleSubmit: handleSubmitSecurity,
    formState: { errors: errorsSecurity },
    reset: resetSecurity,
  } = useForm<SecurityData>({
    resolver: yupResolver(securitySchema),
    defaultValues: initialSecurityValues,
  });

  React.useEffect(() => {
    resetSecurity();
  }, [reset]);

  const onSubmitAccount: SubmitHandler<AccountData> = (data) => {
    console.log(data);
  };

  const onSubmitSecurity: SubmitHandler<SecurityData> = (data) => {
    submitPassword({
      current_password: data.currentPassword,
      new_password: data.newPassword,
    });
  };
  return (
    <>
      <h1 className={styles.ttl}>Settings</h1>
      <nav className={styles.nav}>
        <span
          onClick={() => setView(1)}
          role="button"
          className={view === 1 ? styles.activeNav : ""}
        >
          <UserIcon /> Account
        </span>
        <span
          onClick={() => setView(2)}
          role="button"
          className={view === 2 ? styles.activeNav : ""}
        >
          <SecurityIcon /> Security
        </span>
      </nav>
      <section className={styles.formWrap}>
        {view === 1 ? (
          <form className={styles.accountForm}>
            <Input
              label="Display Name"
              placeholder="e.g. Jane"
              type="text"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsAccount.displayName?.message}
              name="displayName"
              register={registerAccount}
            />
            <Input
              label="Company Name"
              placeholder="e.g. Doe Realty"
              type="text"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsAccount.agencyName?.message}
              name="agencyName"
              register={registerAccount}
            />
            <Input
              label="Business website"
              placeholder="e.g. www.roofbucks.com"
              type="text"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsAccount.website?.message}
              name="website"
              register={registerAccount}
            />
            <div className={styles.btnWrap}>
              <Button
                className={styles.btn}
                onClick={handleSubmitAccount(onSubmitAccount)}
                type="primary"
              >
                Save
              </Button>
            </div>
          </form>
        ) : (
          <form className={styles.securityForm}>
            <Input
              label="CURRENT PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.currentPassword?.message}
              name="currentPassword"
              register={registerSecurity}
            />
            <Input
              label="NEW PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.newPassword?.message}
              name="newPassword"
              register={registerSecurity}
            />
            <Input
              label="CONFIRM PASSWORD *"
              placeholder="********"
              type="password"
              parentClassName={styles.inputWrap}
              required
              validatorMessage={errorsSecurity.confirmPassword?.message}
              name="confirmPassword"
              register={registerSecurity}
            />
            <div className={styles.btnWrap}>
              <Button
                className={styles.btn}
                onClick={handleSubmitSecurity(onSubmitSecurity)}
                type="primary"
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export { SettingsUI };
