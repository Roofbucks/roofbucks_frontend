import { AgentPropertiesUI, Toast } from "components";
import * as React from "react";

const AgentProperties = () => {
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

  return (
    <>
      <Toast
        {...toast}
        closeModal={() => setToast({ ...toast, show: false })}
      />
      <AgentPropertiesUI
        tooLarge={tooLarge}
        closeForm={() => {}}
        tableItems={[]}
      />
    </>
  );
};

export { AgentProperties };
