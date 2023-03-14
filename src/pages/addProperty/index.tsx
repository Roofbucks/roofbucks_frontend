import { AddPropertyUI, Toast } from "components";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const AddProperty = () => {
  const navigate = useNavigate();
  const [toast, setToast] = React.useState({
    show: false,
    heading: "",
    text: "",
    type: false,
  });

  const tooLarge = () =>
    setToast({
      show: true,
      heading: "File size error",
      text: "Failed to attach file greater than 8MB. Please reduce size and try again.",
      type: false,
    });

  const closeForm = () => {
    navigate(Routes.properties);
  };

  return (
    <>
      <Toast
        {...toast}
        closeModal={() => setToast({ ...toast, show: false })}
      />
      <AddPropertyUI tooLarge={tooLarge} closeForm={closeForm} />
    </>
  );
};

export { AddProperty };
