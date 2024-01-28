import { Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { CheckBox } from "components/generalComponents/checkBox";
import { propertyTypeOptions } from "utils";
import { Button } from "components/generalComponents/button";
import { CloseIcon2 } from "assets";
import { useEffect, useState } from "react";
import { optionType } from "types";

interface Props {
  show: boolean;
  close: () => void;
  submit: (data: optionType[]) => void;
  value: optionType[];
}

const ApartmentTypeFilterModal: React.FC<Props> = ({
  show,
  close,
  submit,
  value,
}) => {
  const [state, setState] = useState<optionType[]>([]);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (data: optionType) => {
    if (state.find((item2) => data.value === item2.value)) {
      setState((prev) => prev.filter((item) => item.value !== data.value));
    } else {
      setState((prev) => [...prev, data]);
    }
  };

  const onSubmit = () => {
    submit(state);
  };

  const onReset = () => {
    setState([]);
    submit([]);
  };
  return (
    <Modal show={show} onHide={close} contentClassName={styles.content}>
      <div className={styles.heading}>
        <h1 className={styles.ttl}>Filter by Apartment Type:</h1>
        <CloseIcon2 role="button" onClick={close} />
      </div>
      <div className={styles.checkList}>
        {propertyTypeOptions.map((item) => (
          <CheckBox
            label={item.label}
            check={
              state.find((item2) => item.value === item2.value) ? true : false
            }
            onChange={() => handleChange(item)}
          />
        ))}
      </div>
      <div className={styles.btns}>
        <Button type="secondary" onClick={onReset}>
          Reset
        </Button>
        <Button disabled={state.length === 0} type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Modal>
  );
};

export { ApartmentTypeFilterModal };
