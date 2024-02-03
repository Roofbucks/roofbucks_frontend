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
        const data = response.data;
        const business = data.business_details;

        dispatch(
          updateUser({
            id,
            role: data.role.toLowerCase(),
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            avatar: data.display_photo,
            city: data.city,
            country: data.country,
            address: data.address,
            number: data.phone,
            business: data.business_details
              ? {
                  city: business.city,
                  country: business.country,
                  number: business.phone,
                  email: business.email,
                  description: business.description,
                  website: business.website,
                  logo: "",
                }
              : undefined,
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
