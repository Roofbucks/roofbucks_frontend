import { ApplyFormUI } from "components";

const ApplyForm = ({ show, close }) => {
  return (
    <>
      <ApplyFormUI submit={console.log} show={show} close={close} />
    </>
  );
};

export { ApplyForm };
