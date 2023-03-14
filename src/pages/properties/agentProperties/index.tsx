import { AgentPropertiesUI, Toast } from "components";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const AgentProperties = () => {
  const navigate = useNavigate();

  const [toast, setToast] = React.useState({
    show: false,
    heading: "",
    text: "",
    type: false,
  });

  const addProperty = () => {
    navigate(Routes.addProperty);
  };
  return (
    <>
      <Toast
        {...toast}
        closeModal={() => setToast({ ...toast, show: false })}
      />
      <AgentPropertiesUI tableItems={[]} addProperty={addProperty} />
    </>
  );
};

export { AgentProperties };
