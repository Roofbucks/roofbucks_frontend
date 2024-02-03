import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components";
import { addBankAccountRequestData, addBillingServiceRequestData } from "api";
import { optionType } from "types";
import { Modal, ModalHeader } from "react-bootstrap";
import { CloseIcon2 } from "assets";

interface BillingData {
  bank: string;
  country: string;
  accountName: string;
  accountNumber: string;
}

const initialBillingValues: BillingData = {
  bank: "",
  country: "",
  accountName: "",
  accountNumber: "",
};

const billingSchema = yup
  .object({
    bank: yup.string().required("Required"),
    country: yup.string().required("Required"),
    accountName: yup.string().required("Required"),
    accountNumber: yup.string().required("Required"),
  })
  .required();

interface AddBankAccountUIProps {
  submit: (data: addBankAccountRequestData) => void;
  banks: optionType[];
  show: boolean;
  close: () => void;
  clear: boolean;
}

const AddBankAccountUI: React.FC<AddBankAccountUIProps> = ({
  submit,
  banks,
  show,
  close,
  clear,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<BillingData>({
    resolver: yupResolver(billingSchema),
    defaultValues: initialBillingValues,
  });

  React.useEffect(() => {
    reset();
  }, [clear]);

  const onSubmit: SubmitHandler<BillingData> = (data) => {
    const submitData: addBankAccountRequestData = {
      bank_information: {
        account_name: data.accountName,
        account_number: data.accountNumber,
        bank_name: data.bank,
        country: data.country,
      },
    };

    submit(submitData);
  };

  const onClose = () => {
    close();
    reset();
  };

  return (
    <>
      <Modal show={show} onHide={close}>
        <ModalHeader className={styles.header}>
          <h1>Add a new Bank Account </h1>
          <CloseIcon2
            role="button"
            onClick={onClose}
            className={styles.closeBtn}
          />
        </ModalHeader>
        <form className={styles.form}>
          <Input
            label="Country"
            showRequired={true}
            placeholder="E.g. Nigeria"
            type="text"
            parentClassName={`${styles.input} ${styles.loneInput}`}
            required
            validatorMessage={errors.country?.message}
            name="country"
            register={register}
          />
          <CustomSelect
            label="Bank"
            placeholder="Bank Name"
            validatorMessage={errors.bank?.message ?? ""}
            value={{ label: watch("bank"), value: watch("bank") }}
            onChange={(val) => setValue("bank", val.value)}
            options={banks}
            name={"bank"}
            parentClassName={`${styles.input} ${styles.select}`}
          />
          <Input
            label="Account Number"
            showRequired={true}
            placeholder="E.g. 0000000000"
            type="url"
            parentClassName={`${styles.input}`}
            required
            validatorMessage={errors.accountNumber?.message}
            name="accountNumber"
            register={register}
          />
          <Input
            label="Account Name"
            showRequired={true}
            placeholder="E.g. Jane Doe"
            type="url"
            parentClassName={styles.input}
            required
            validatorMessage={errors.accountName?.message}
            name="accountName"
            register={register}
          />
          <section className={styles.btnSec}>
            <Button
              className={styles.saveBtn}
              type={"primary"}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </section>
        </form>
      </Modal>
    </>
  );
};

export { AddBankAccountUI };
