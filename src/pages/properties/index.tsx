import { AgentProperties } from "./agentProperties";
import * as React from "react";
import { ShareHolderProperties } from "./shareHolderProperties";
import { useAppSelector } from "redux/hooks";

const Properties = () => {
  const { role: user } = useAppSelector((state) => state.user);

  return (
    <>{user === "agent" ? <AgentProperties /> : <ShareHolderProperties />}</>
  );
};

export { Properties };
