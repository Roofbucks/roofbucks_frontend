import { ConnectFormUI } from "components";

const ConnectForm = ({ show, close }) => {
  return (
    <>
      <ConnectFormUI submit={console.log} show={show} close={close} />
    </>
  );
};

export { ConnectForm };
