import { fetchAgentService, fetchProfileService } from "api";
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

  const fetchUser = () => {
    run(fetchProfileService());
  };

  useMemo(() => {
    if (response) {
      if (response.status === 200) {
        const id = localStorage.getItem("id") ?? "";
        const firstName = response.data.firstname;
        const lastName = response.data.lastname;
        const email = response.data.email;
        const avatar = response.data.display_photo;
        const role = response.data.role.toLowerCase();

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
        localStorage.clear();
      }
    }
  }, [response, error]);

  return {
    fetchUser,
    loading: requestStatus.isPending,
  };
};
