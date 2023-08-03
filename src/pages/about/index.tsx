import { AboutUI } from "components";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const About = () => {
  const navigate = useNavigate();

  const handleSignup = () => navigate(Routes.signup);

  return (
    <>
      <AboutUI handleSignup={handleSignup} />
    </>
  );
};

export { About };
