import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Button } from "components/generalComponents/button";
import { CloseIcon2 } from "assets";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { CustomSelect, Input } from "components";
import { optionType } from "types";
import { countryOptions, initialOptionType } from "utils";

interface CountryData {
  country: optionType;
}

const initData: CountryData = {
  country: initialOptionType,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object()
  .shape({
    country: optionTypeSchema,
  })
  .required();

interface Props {
  show: boolean;
  close: () => void;
}

const CountryFilterModal: React.FC<Props> = ({ show, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CountryData>({
    resolver: yupResolver(schema),
    defaultValues: initData,
  });

  const onSubmit: SubmitHandler<CountryData> = (data) => console.log(data);

  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Country:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <form className={styles.form}>
        <CustomSelect
          onChange={(x) => setValue("country", x)}
          validatorMessage={errors.country?.value?.message?.toString() ?? ""}
          name={"country"}
          placeholder={"Please Select"}
          label={"Select a country"}
          options={countryOptions}
          value={watch("country")}
          inputClass={styles.select}
          parentClassName={styles.input}
        />
      </form>
      <div className={styles.btns}>
        <Button type="secondary" onClick={console.log}>
          Reset
        </Button>
        <Button type="primary" onClick={console.log}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export { CountryFilterModal };
