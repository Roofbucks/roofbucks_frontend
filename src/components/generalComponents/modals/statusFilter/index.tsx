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

interface StatusData {
  status: optionType;
}

const initData: StatusData = {
  status: initialOptionType,
};

const optionTypeSchema = yup.object({
  label: yup.string().required("Required"),
  value: yup.string().required("Required"),
});

const schema = yup
  .object()
  .shape({
    status: optionTypeSchema,
  })
  .required();

interface Props {
  show: boolean;
  close: () => void;
}

const StatusFilterModal: React.FC<Props> = ({ show, close }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StatusData>({
    resolver: yupResolver(schema),
    defaultValues: initData,
  });

  const onSubmit: SubmitHandler<StatusData> = (data) => console.log(data);
  const statusOptions: optionType[] = [
    {
      label: "Completed",
      value: "Completed",
    },
    { label: "In progress", value: "in-progress" },
  ];
  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Country:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <form className={styles.form}>
        <CustomSelect
          onChange={(x) => setValue("status", x)}
          validatorMessage={errors.status?.value?.message?.toString() ?? ""}
          name={"status"}
          placeholder={"Please Select"}
          label={"Select a status"}
          options={statusOptions}
          value={watch("status")}
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

export { StatusFilterModal };
