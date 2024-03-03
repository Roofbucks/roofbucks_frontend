import { listingsService } from "api";
import {
  ApartmentTypeFilterModal,
  BudgetFilterModal,
  CompleteProfilePrompt,
  CountryFilterModal,
  ListingsUI,
  LoginPrompt,
  Preloader,
  PropertyCardData,
  StatusFilterModal,
} from "components";
import { getErrorMessage } from "helpers";
import { useDebounce, useApiRequest } from "hooks";
import { ApplyForm } from "pages";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";
import { optionType } from "types";
import { initialOptionType } from "utils";

const Listings = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // States
  const [search, setSearch] = React.useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [pages, setPages] = React.useState({
    count: 0,
    current: 1,
    totalPages: 1,
  });
  const [showApply, setShowApply] = React.useState({
    show: false,
    id: "",
    totalCost: 0,
  });
  const [apartment, setApartment] = React.useState<{
    show: boolean;
    data: optionType[];
  }>({
    show: false,
    data: [],
  });
  const [budget, setBudget] = React.useState({ show: false, min: "", max: "" });
  const [country, setCountry] = React.useState({
    show: false,
    data: initialOptionType,
  });
  const [status, setStatus] = React.useState({
    show: false,
    data: initialOptionType,
  });
  const [login, setLogin] = React.useState(false);
  const [completeProfile, setCompleteProfile] = React.useState(false);
  const { role, verifiedProfile } = useAppSelector((state) => state.user);

  // API Request Hooks
  const { run, data, requestStatus, error } = useApiRequest({});

  const fetchProperties = (page?) => {
    run(
      listingsService({
        page: page ?? pages.current,
        limit: "12",
        search,
        completion_status: status.data.value,
        country: country.data.value,
        apartment_type: apartment.data.map((item) => item.value).join(),
        budget_range:
          budget.min && budget.max ? `${budget.min},${budget.max}` : "",
      })
    );
  };

  React.useEffect(() => {
    fetchProperties(1);
    setPages({ ...pages, current: 1 });
  }, [
    debouncedSearchTerm,
    country.data,
    status.data,
    apartment.data,
    budget.min,
    budget.max,
  ]);

  const properties = React.useMemo<PropertyCardData[]>(() => {
    if (data) {
      if (data.status === 200) {
        window.scrollTo(-0, -0);
        setPages({
          ...pages,
          totalPages: data.data.pages,
          count: data.data.total,
        });

        return data?.data.results.map((item) => ({
          name: item.name,
          discount: item.percentage_discount,
          amount: item.market_value ?? item.total_property_cost,
          owner: `${item.agent.firstname} ${item.agent.lastname}`,
          images: item.images,
          id: item.id,
          amenities: {
            bedroom: item.number_of_bedrooms,
            toilet: item.number_of_toilets,
          },
          calendlyURL: item.agent.calendry_link,
          email: item.agent.email,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? data,
              message: "Failed to fetch properties, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [data, error]);

  const handlePageChange = (x: number) => {
    fetchProperties(x);
    setPages({ ...pages, current: x });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPages({ ...pages, current: 1 });
  };

  const getCount = (): { start: number; end: number } => {
    let start = 0;
    let end = 0;

    start = pages.current * 10 - 9;
    end = pages.current * 10;

    if (data?.data?.total < end) {
      end = data?.data?.total;
    }

    return { start, end };
  };

  const handleView = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "listings",
        url: Routes.listing,
      },
    });
  };

  const stages = JSON.parse(localStorage.getItem("profileCompletion") ?? "{}");

  const incompleteProfile = !(stages.profile && stages.billing);

  const handleBuy = ({ id, totalCost }) => {
    const isLoggedIn =
      localStorage.getItem("roofbucksAccess") &&
      localStorage.getItem("roofbucksRefresh") &&
      localStorage.getItem("profileCompletion") &&
      role;

    if (!isLoggedIn) {
      setLogin(true);
    } else if (incompleteProfile || !verifiedProfile) {
      setCompleteProfile(true);
    } else {
      setShowApply({ show: true, id, totalCost });
    }
  };

  const handleReset = () => {
    setCountry((prev) => ({ ...prev, data: initialOptionType }));
    setApartment((prev) => ({ ...prev, data: [] }));
    setBudget((prev) => ({ ...prev, min: "", max: "" }));
    setStatus((prev) => ({ ...prev, data: initialOptionType }));
  };

  const showLoader = requestStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <LoginPrompt show={login} close={() => setLogin(false)} />
      <CompleteProfilePrompt
        show={completeProfile}
        close={() => setCompleteProfile(false)}
        type={incompleteProfile ? "incomplete" : "unverified"}
      />
      <ApartmentTypeFilterModal
        show={apartment.show}
        close={() => setApartment({ show: false, data: [] })}
        submit={(data) => setApartment({ show: false, data })}
        value={apartment.data}
      />
      <BudgetFilterModal
        show={budget.show}
        close={() => setBudget((prev) => ({ ...prev, show: true }))}
        value={{ min: budget.min, max: budget.max }}
        submit={(data) => setBudget({ ...data, show: false })}
      />
      <CountryFilterModal
        show={country.show}
        country={country.data}
        close={() => setCountry({ show: false, data: initialOptionType })}
        submit={(data) => setCountry({ show: false, data })}
      />
      <StatusFilterModal
        show={status.show}
        status={status.data}
        close={() => setStatus({ show: false, data: initialOptionType })}
        submit={(data) => setStatus({ show: false, data })}
      />
      <ApplyForm
        {...showApply}
        close={() => setShowApply({ show: false, id: "", totalCost: 0 })}
      />
      <ListingsUI
        properties={properties}
        pagination={{
          hide: properties.length === 0 || showLoader,
          current: pages.current,
          total: pages.totalPages,
          handleChange: handlePageChange,
          count: {
            ...getCount(),
            total: pages.count,
          },
          name: "Properties",
        }}
        handleView={handleView}
        search={{
          value: search,
          onChange: handleSearch,
        }}
        handleApply={handleBuy}
        handleApartmentFilter={() =>
          setApartment((prev) => ({ ...prev, show: true }))
        }
        handleBudgetFilter={() =>
          setBudget((prev) => ({ ...prev, show: true }))
        }
        handleCountryFilter={() =>
          setCountry((prev) => ({ ...prev, show: true }))
        }
        handleStatusFilter={() =>
          setStatus((prev) => ({ ...prev, show: true }))
        }
        isAgent={role === "agent"}
        filters={{
          country: country.data.value !== "",
          apartment: apartment.data.length > 0,
          status: status.data.value !== "",
          budget: budget.max !== "" && budget.min !== "",
          reset: handleReset,
        }}
      />
    </>
  );
};

export { Listings };
