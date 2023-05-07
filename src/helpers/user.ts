import { fetchAgentService } from "api";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { run, data: response, requestStatus, error } = useApiRequest({});

  const fetchAgent = () => {
    run(fetchAgentService({}));
  };

  useMemo(() => {
    if (response) {
      if (response.status === 200) {
        const role = localStorage.getItem("role") ?? "";
        const id = localStorage.getItem("id") ?? "";
        const firstName = response.data.firstname;
        const lastName = response.data.lastname;
        const email = response.data.email;
        const avatar = response.data.display_photo;

        dispatch(
          updateUser({
            role,
            firstName,
            lastName,
            email,
            id,
            avatar,
          })
        );
      } else {
        navigate(Routes.login);
      }
    }
  }, [response, error]);

  return {
    fetchAgent,
  };
};
