import * as React from "react";
import styles from "./styles.module.css";
import { UseFormRegister } from "react-hook-form";
import { EyeIconOutline, EyeIconSlashOutline, WarningIcon } from "assets";

interface InputProps {
  type?: string;
  dataTestID?: string;
  placeholder: string;
  className?: string;
  parentClassName?: string;
  name: string;
  id?: string;
  required?: boolean;
  minLength?: number;
  validatorMessage: string | undefined;
  label?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconClassName?: string;
  iconFunction?: () => void;
  register: UseFormRegister<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  readOnly?: boolean;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showRequired?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  dataTestID,
  placeholder,
  className,
  parentClassName,
  name,
  id,
  required,
  minLength,
  validatorMessage,
  label,
  Icon,
  iconClassName,
  iconFunction,
  register,
  onChange,
  min,
  readOnly,
  value,
  onKeyDown,
  showRequired,
  disabled,
}) => {
  const [show, setShow] = React.useState(false);

  if (type === "password") {
    Icon = show ? EyeIconSlashOutline : EyeIconOutline;
    iconFunction = () => setShow((prev) => !prev);
  }
  return (
    <div
      className={`${styles.inputWrapper} ${parentClassName} ${
        validatorMessage ? styles.error : ""
      }`}
    >
      {label && (
        <label className={styles.label}>
          {label}
          {showRequired ? <span className={styles.req}>*</span> : ""}
        </label>
      )}
      {Icon ? (
        <Icon
          role={iconFunction ? "button" : "none"}
          onClick={iconFunction && iconFunction}
          className={`${iconClassName} ${styles.icon}`}
          id="icon"
        />
      ) : (
        ""
      )}
      <input
        data-testid={dataTestID}
        className={`${styles.input} ${className}`}
        type={show ? "text" : type}
        placeholder={placeholder}
        id={id}
        {...register(name, {
          required: required,
          minLength: minLength,
          onChange: onChange,
          min: min,
        })}
        min={min}
        readOnly={readOnly}
        value={value}
        onKeyDown={onKeyDown}
        disabled={disabled}
      />

      {validatorMessage && (
        <small className={styles.message}>
          <WarningIcon /> {validatorMessage}
        </small>
      )}
    </div>
  );
};

const Textarea: React.FC<InputProps> = ({
  dataTestID,
  placeholder,
  className,
  parentClassName,
  name,
  id,
  required,
  minLength,
  validatorMessage,
  label,
  Icon,
  iconClassName,
  iconFunction,
  register,
  onChange,
  min,
  readOnly,
  value,
}) => {
  return (
    <div
      className={`${styles.inputWrapper} ${parentClassName} ${
        validatorMessage ? styles.error : ""
      }`}
    >
      {label && <label className={styles.label}>{label}</label>}
      {Icon ? (
        <Icon
          role={iconFunction ? "button" : "none"}
          onClick={iconFunction && iconFunction}
          className={`${iconClassName} ${styles.icon}`}
          id="icon"
        />
      ) : (
        ""
      )}
      <textarea
        data-testid={dataTestID}
        className={`${styles.textarea} ${className}`}
        placeholder={placeholder}
        id={id}
        {...register(name, {
          required: required,
          minLength: minLength,
          onChange: onChange,
          min: min,
        })}
        readOnly={readOnly}
        value={value}
      />

      {validatorMessage && (
        <small className={styles.message}>
          <WarningIcon /> {validatorMessage}
        </small>
      )}
    </div>
  );
};

export { Input, Textarea };
