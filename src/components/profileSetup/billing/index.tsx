import * as React from "react";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components";
import { addBillingServiceRequestData } from "api";
import { optionType } from "types";
import { initialOptionType } from "utils";

interface BillingData {
  bank: optionType;
  country: string;
  accountName: string;
  accountNumber: string;
}

const initialBillingValues: BillingData = {
  bank: initialOptionType,
  country: "",
  accountName: "",
  accountNumber: "",
};

const billingSchema = yup
  .object({
    bank: yup.object({
      label: yup.string().required("Required"),
      value: yup.string().required("Required"),
    }),
    country: yup.string().required("Required"),
    accountName: yup.string().required("Required"),
    accountNumber: yup.string().required("Required"),
  })
  .required();

interface BillingFormUIProps {
  submit: (data: addBillingServiceRequestData) => void;
  banks: optionType[];
}

const BillingFormUI: React.FC<BillingFormUIProps> = ({ submit, banks }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BillingData>({
    resolver: yupResolver(billingSchema),
    defaultValues: initialBillingValues,
  });

  const onSubmit: SubmitHandler<BillingData> = (data) => {
    const submitData: addBillingServiceRequestData = {
      bank_information: {
        account_name: data.accountName,
        account_number: data.accountNumber,
        bank_name: data.bank.label,
        bank_code: data.bank.value,
        country: data.country,
      },
    };

    submit(submitData);
  };

  return (
    <>
      <section className={styles.formWrapper}>
        <form className={`appContainer ${styles.form}`}>
          <section className={styles.subSec}>
            <h2 className={styles.secTtl}>Payment Method</h2>
            <p className={styles.secTxt}>
              Please ensure that your account name tallies with your ID Card.
            </p>
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
              validatorMessage={
                errors.bank?.message ??
                errors.bank?.value?.message?.toString() ??
                ""
              }
              value={watch("bank")}
              onChange={(val) => setValue("bank", val)}
              options={banks}
              name={"bank"}
              parentClassName={`${styles.input} ${styles.select} ${styles.sideMargin}`}
            />
            <Input
              label="Account Number"
              showRequired={true}
              placeholder="E.g. 0000000000"
              type="url"
              parentClassName={`${styles.input} ${styles.noMargin}`}
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
          </section>
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
      </section>
    </>
  );
};

export { BillingFormUI };
