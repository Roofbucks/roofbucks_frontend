import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "components/generalComponents/button";
import { CloseIcon2 } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Input } from "components";
import { useEffect } from "react";

interface BudgetData {
  min: string;
  max: string;
}

const initData: BudgetData = {
  min: "",
  max: "",
};

const schema = yup
  .object()
  .shape({
    min: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Enter a valid number"),
    max: yup
      .string()
      .required("Required")
      .matches(/[0-9]/, "Enter a valid number"),
  })
  .required();

interface Props {
  show: boolean;
  close: () => void;
  value: BudgetData;
  submit: (data: BudgetData) => void;
}

const BudgetFilterModal: React.FC<Props> = ({ show, close, value, submit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<BudgetData>({
    resolver: yupResolver(schema),
    defaultValues: initData,
  });

  useEffect(() => {
    reset(value);
  }, [value]);

  const onSubmit: SubmitHandler<BudgetData> = (data) => submit(data);

  const onReset = () => {
    reset(initData);
    submit(initData);
  };

  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Budget:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <form className={styles.form}>
        <Input
          label="From (NGN)"
          placeholder="Enter a minimum value"
          type="number"
          parentClassName={styles.input}
          required
          validatorMessage={errors.min?.message}
          name="min"
          register={register}
        />
        <Input
          label="To (NGN)"
          placeholder="Enter a maximum value"
          type="number"
          parentClassName={styles.input}
          required
          validatorMessage={errors.max?.message}
          name="max"
          register={register}
        />
      </form>
      <div className={styles.btns}>
        <Button type="secondary" onClick={onReset}>
          Reset
        </Button>
        <Button type="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export { BudgetFilterModal };
