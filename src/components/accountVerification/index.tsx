import * as React from "react";
import styles from "./styles.module.css";
import { Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, Input } from "components/generalComponents";
import { ModalProps } from "types";
import { ArrowRight } from "assets";

interface VerificationData {
  code: string;
}

export interface VerificationModalProps extends ModalProps {
  submit: (data: VerificationData) => void;
  resendEmail: () => void;
  signup: () => void;
  email: string;
}

const VerificationSchema = yup
  .object({
    info: yup.string().required("Required"),
  })
  .required();

const VerificationModalUI: React.FC<VerificationModalProps> = ({
  show,
  closeModal,
  submit,
  resendEmail,
  signup,
  email,
}: VerificationModalProps) => {
  const [enableResend, setEnableResend] = React.useState(false);
  const [otp, setOTP] = React.useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });
  const { first, second, third, fourth, fifth, sixth } = otp;
  const [count, setCount] = React.useState(
    document.getElementById("countDown")?.innerText
  );

  const onSubmit = () => {
    const keys = Object.keys(otp);
    let code = "";
    keys.forEach((key) => (code += otp[key]));

    submit({ code });
  };

  const GoToNextInput = (event) => {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);
    index < 5 && form.elements[index + 1].focus();
    event.preventDefault();
  };

  const GoToPrevInput = (event) => {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);
    index > 0 && form.elements[index - 1].focus();
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const regex = RegExp(/[^0-9]/);
    if (regex.test(value)) {
      return;
    }

    setOTP({
      ...otp,
      [name]: value,
    });

    if (name !== "sixth") GoToNextInput(e);
  };

  const handleKeyDown = (event) => {
    const { name } = event.target;

    if (event.key === "Backspace") {
      setOTP({
        ...otp,
        [name]: "",
      });

      if (name !== "first") GoToPrevInput(event);
    } else if (event.key === "ArrowLeft") {
      GoToPrevInput(event);
    } else if (event.key === "ArrowRight") {
      GoToNextInput(event);
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("resendCount")) {
      setTimeout(() => {
        setEnableResend(true);
      }, 60000);

      var timeleft = 60;
      var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(downloadTimer);
        }
        if (!timeleft) {
          localStorage.setItem("resendCount", "true");
        }
        setCount(`${timeleft}`);
        timeleft -= 1;
      }, 1000);
    } else {
      setEnableResend(true);
    }
  }, []);

  const close = () => {
    closeModal();
    setOTP({
      first: "",
      second: "",
      third: "",
      fourth: "",
      fifth: "",
      sixth: "",
    });
  };

  const showSubmit = Object.keys(otp).every((key) => otp[key] !== "");
  return (
    <Modal className={styles.login} show={show} onHide={close} centered>
      <Button
        onClick={() => {
          // close();
          signup();
        }}
        type="tertiary"
        className={styles.outsideBtn}
      >
        <ArrowRight /> Back to signup
      </Button>
      <Modal.Body>
        <h1 className={styles.ttl}>Verify your account</h1>
        <p className={styles.info}>Enter the code we’ve sent to {email}</p>
        <form className={styles.otpGroup}>
          <input
            name="first"
            type="text"
            onChange={handleChange}
            value={first}
            autoFocus
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
          <input
            name="second"
            type="text"
            onChange={handleChange}
            value={second}
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
          <input
            name="third"
            type="text"
            onChange={handleChange}
            value={third}
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
          <input
            name="fourth"
            type="text"
            onChange={handleChange}
            value={fourth}
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
          <input
            name="fifth"
            type="text"
            onChange={handleChange}
            value={fifth}
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
          <input
            name="sixth"
            type="text"
            onChange={handleChange}
            value={sixth}
            onKeyDown={handleKeyDown}
            maxLength={1}
            required
          />
        </form>
        {showSubmit && (
          <Button
            className={styles.submitBtn}
            type={"primary"}
            onClick={onSubmit}
          >
            Submit
          </Button>
        )}
        <p className={styles.info}>
          Haven’t received an Email?{" "}
          {enableResend ? (
            <span onClick={resendEmail} className={styles.resend}>Send again</span>
          ) : (
            <span>
              Resend in <span id="countDown">{count}</span>s
            </span>
          )}
        </p>
      </Modal.Body>
    </Modal>
  );
};

export { VerificationModalUI };
