import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { Button, CustomSelect, Input } from "components";
import { CloseIcon2, SellIcon } from "assets";
import { ModalProps, optionType } from "types";
import { initialOptionType } from "utils";
import { sellSharesRequestData } from "api";

interface SellSharesData {
  percent: optionType;
  price: number;
}

const initialValues: SellSharesData = {
  percent: initialOptionType,
  price: 0,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object({
    percent: optionTypeSchema,
    price: yup.number().required("Required"),
  })
  .required();

interface SellSharesProps extends ModalProps {
  submit: (data: sellSharesRequestData) => void;
  propertyName: string;
  percentageOwned: number;
  marketValue: number;
}

const SellSharesModal: React.FC<SellSharesProps> = ({
  show,
  closeModal,
  propertyName,
  percentageOwned,
  marketValue,
  submit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm<SellSharesData>({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  const percentCost = marketValue / 100;

  const onSubmit: SubmitHandler<SellSharesData> = (data) => {
    if (data.price > data.percent.value * percentCost) {
      setError("price", {
        message: "Selling price cannot be above the market value",
      });
      return;
    }
    const submitData: sellSharesRequestData = {
      percentage: data.percent.value,
      price: Math.ceil(data.price)
    };
    submit(submitData);
  };

  const generateOptions = (multipleOf5): optionType[] => {
    const result: optionType[] = [];
    let currentNumber = 5;

    while (currentNumber <= multipleOf5) {
      result.push({ label: currentNumber, value: currentNumber });
      currentNumber += 5;
    }

    return result;
  };

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
            <p>Price per percentage</p>
          </div>
        </div>
        <form className={styles.form}>
          <CustomSelect
            onChange={(x) => {
              setValue("percent", x);
              setValue("price", x.value * percentCost);
            }}
            validatorMessage={errors.percent?.value?.message?.toString() ?? ""}
            name={"percent"}
            placeholder={"Please Select"}
            label="No of percentages to sell"
            options={generateOptions(percentageOwned)}
            value={watch("percent")}
            inputClass={styles.select}
            parentClassName={styles.input}
          />
          <Input
            label="Price (NGN)"
            placeholder=""
            type="number"
            parentClassName={styles.input}
            required
            validatorMessage={errors.price?.message}
            name={`price`}
            register={register}
            value={`${Math.ceil(watch("price"))}`}
          />
          <p className={styles.note}>Transaction charges may apply</p>

          <Button
            onClick={handleSubmit(onSubmit)}
            type="primary"
            className={styles.btn}
          >
            <SellIcon />
            Sell
          </Button>
        </form>
      </Modal>
    </>
  );
};

export { SellSharesModal };
