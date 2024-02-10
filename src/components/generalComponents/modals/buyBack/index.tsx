import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components";
import { CloseIcon2 } from "assets";
import { ModalProps, optionType } from "types";
import { initialOptionType } from "utils";

interface BuyBackData {
  percent: optionType;
}

const initialValues: BuyBackData = {
  percent: initialOptionType,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object({
    percent: optionTypeSchema,
  })
  .required();

interface BuyBackProps extends ModalProps {
  submit: (percent: number) => void;
  propertyName: string;
  percentageOwned: number;
  marketValue: number;
}

const BuyBackModal: React.FC<BuyBackProps> = ({
  show,
  closeModal,
  propertyName,
  percentageOwned,
  marketValue,
  submit,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BuyBackData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<BuyBackData> = (data) =>
    submit(data.percent.value);

  const generateOptions = (multipleOf5): optionType[] => {
    const result: optionType[] = [];
    let currentNumber = 5;

    while (currentNumber <= multipleOf5) {
      result.push({ label: currentNumber, value: currentNumber });
      currentNumber += 5;
    }

    return result;
  };

  const percentCost = marketValue / 100;

  return (
    <>
      <Modal
        contentClassName={styles.modal}
        centered
        onHide={closeModal}
        show={show}
      >
        <CloseIcon2
          onClick={closeModal}
          className={styles.closeBtn}
          role="button"
        />
        <h1 className={styles.ttl}>{propertyName}</h1>
        <div className={styles.info}>
          <div>
            <p>{percentageOwned}%</p>
            <p>Percentage owned</p>
          </div>
          <div>
            <p>NGN {percentCost}</p>
            <p>Cost per percentage</p>
          </div>
        </div>
        <form className={styles.form}>
          <CustomSelect
            onChange={(x) => setValue("percent", x)}
            validatorMessage={errors.percent?.value?.message?.toString() ?? ""}
            name={"percent"}
            placeholder={"Please Select"}
            label="How many percentage to buy"
            options={generateOptions(100 - percentageOwned)}
            value={watch("percent")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />

          {watch("percent").value > 0 ? (
            <p className={styles.txt}>
              Cost: <b>NGN {percentCost * watch("percent").value} </b>
            </p>
          ) : (
            ""
          )}
          <p className={styles.note}>
            Transaction charges may apply, read{" "}
            <a target="_blank">terms of use</a>
          </p>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className={styles.btn}
          >
            Checkout
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { BuyBackModal };
