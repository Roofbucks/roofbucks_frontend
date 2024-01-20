import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { optionType } from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  connectFocusOptions,
  connectInvestAsOptions,
  connectTimelineOptions,
  initialOptionType,
} from "utils";
import { Button, CustomSelect, Input } from "components";
import { CloseIcon2 } from "assets";
import { Link } from "react-router-dom";
import { Routes } from "router";
import { useEffect } from "react";

interface ConnectFormData {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  smLink: string;
  timeline: optionType;
  focus: optionType;
  roi: string;
  investingAs: optionType;
}

const initData: ConnectFormData = {
  firstName: "",
  lastName: "",
  email: "",
  location: "",
  smLink: "",
  timeline: initialOptionType,
  focus: initialOptionType,
  roi: "",
  investingAs: initialOptionType,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object()
  .shape({
    email: yup.string().required("Required").email("Enter a valid email"),
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    location: yup.string().required("Required"),
    smLink: yup.string().required("Required").url("Enter a valid url"),
    timeline: optionTypeSchema,
    focus: optionTypeSchema,
    investingAs: optionTypeSchema,
    amount: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Enter a valid number"),
  })
  .required();

interface ConnectFormUIProps {
  show: boolean;
  close: () => void;
  submit: (data) => void;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  // totalCost: number;
  // property: string;
}

const ConnectFormUI: React.FC<ConnectFormUIProps> = ({
  submit,
  show,
  close,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ConnectFormData>({
    resolver: yupResolver(schema),
    defaultValues: { ...initData, ...userData },
  });

  useEffect(() => {
    reset({ ...initData, ...userData });
  }, [userData]);

  const onSubmit: SubmitHandler<ConnectFormData> = (data) => submit(data);
  return (
    <>
      <Modal
        size="lg"
        contentClassName={styles.modal}
        show={show}
        fullscreen="lg-down"
        centered
        onHide={close}
      >
        <CloseIcon2 className={styles.closeBtn} role="button" onClick={close} />
        <h1 className={styles.ttl}>Invest In a Property</h1>
        <p className={styles.txt}>
          Please complete the form below and a roofbucks representative will be
          in contact with you
        </p>
        <form className={styles.form}>
          <Input
            label="First name"
            placeholder="Your first name"
            type="text"
            parentClassName={styles.halfInput}
            required
            validatorMessage={errors.firstName?.message}
            name="firstName"
            register={register}
            disabled
          />
          <Input
            label="Last name"
            placeholder="Your last name"
            type="text"
            parentClassName={styles.halfInput}
            required
            validatorMessage={errors.lastName?.message}
            name="lastName"
            register={register}
            disabled
          />
          <Input
            label="Email"
            placeholder="e.g. user@email.com"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.email?.message}
            name="email"
            register={register}
            disabled
          />
          <Input
            label="Current location Address"
            placeholder="Enter your current address"
            type="text"
            parentClassName={styles.input}
            required
            validatorMessage={errors.location?.message}
            name="location"
            register={register}
          />
          <Input
            label="Social media link"
            placeholder="Enter a social media link"
            type="url"
            parentClassName={styles.input}
            required
            validatorMessage={errors.smLink?.message}
            name="smLink"
            register={register}
          />
          <CustomSelect
            onChange={(x) => setValue("timeline", x)}
            validatorMessage={errors.timeline?.value?.message?.toString() ?? ""}
            name={"reason"}
            placeholder={"Please Select"}
            label={"What is your expected investment timeline?"}
            options={connectTimelineOptions}
            value={watch("timeline")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <CustomSelect
            onChange={(x) => setValue("focus", x)}
            validatorMessage={errors.focus?.value?.message?.toString() ?? ""}
            name={"focus"}
            placeholder={"Please Select"}
            label={"What is your main focus?"}
            options={connectFocusOptions}
            value={watch("focus")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <Input
            label="What is your expected ROI? (%)"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.roi?.message}
            name="roi"
            register={register}
          />
          <CustomSelect
            onChange={(x) => setValue("investingAs", x)}
            validatorMessage={
              errors.investingAs?.value?.message?.toString() ?? ""
            }
            name={"investingAs"}
            placeholder={"Please Select"}
            label={"What are you investing as?"}
            options={connectInvestAsOptions}
            value={watch("investingAs")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <p className={styles.txt2}>
            Please read the{" "}
            <Link target="_blank" to={Routes.terms}>
              terms of use
            </Link>{" "}
            before completing your purchase
          </p>
          <Button
            className={styles.btn}
            type="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Proceed to pay for investment
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { ConnectFormUI };
