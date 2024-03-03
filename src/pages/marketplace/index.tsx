import { marketplaceService } from "api";
import {
  CompleteProfilePrompt,
  LoginPrompt,
  MarketplacePropertyData,
  MarketplaceUI,
  Preloader,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import { ConnectForm } from "pages";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";
import { optionType } from "types";
import { initialOptionType, propertyList } from "utils";

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [pages, setPages] = React.useState({
    count: 0,
    current: 1,
    totalPages: 1,
  });
  const [showConnect, setShowConnect] = React.useState({
    show: false,
    id: "",
    percentage: 0,
    resellId: "",
  });
  const [login, setLogin] = React.useState(false);
  const [completeProfile, setCompleteProfile] = React.useState(false);
  const [apartment, setApartment] = React.useState<optionType[]>([]);
  const [budget, setBudget] = React.useState({ min: "", max: "" });
  const [country, setCountry] = React.useState<optionType>(initialOptionType);
  const [status, setStatus] = React.useState<optionType>(initialOptionType);

  const { role ,verifiedProfile} = useAppSelector((state) => state.user);
  const { run, data, requestStatus, error } = useApiRequest({});

  const fetchProperties = (page?) => {
    run(
      marketplaceService({
        page: page ?? pages.current,
        limit: "10",
        search,
        completion_status: status.value,
        country: country.value,
        apartment_type: apartment.map((item) => item.value).join(),
        budget_range:
          budget.min && budget.max ? `${budget.min},${budget.max}` : "",
      })
    );
  };

  React.useEffect(() => {
    fetchProperties();
    setPages({ ...pages, current: 1 });
  }, [debouncedSearchTerm, country, status, apartment, budget]);

  const properties = React.useMemo<MarketplacePropertyData[]>(() => {
    if (data) {
      if (data.status === 200) {
        window.scrollTo(-0, -0);
        setPages({
          ...pages,
          totalPages: data.data.pages,
          count: data.data.total,
        });

        return data?.data.results.map((item) => {
          const amount = item.market_value ?? item.total_property_cost ?? 0;
          return {
            name: item.name,
            percentageAvailable: item.percentage_available,
            amount:
              item.resell_price ?? (amount * item.percentage_available) / 100,
            owner: item.company_name,
            images: item.images,
            id: item.id,
            amenities: {
              bedroom: item.number_of_bedrooms,
              toilet: item.number_of_toilets,
            },
            calendlyURL: item.agent.calendry_link,
            resellId: item.resell_id,
            email: item.agent.email,
          };
        });
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: error ?? data,
              message:
                "Failed to fetch marketplace properties, please try again later",
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

  const getCount = () => {
    let start = 0;
    let end = 0;

    start = pages.current * 10 - 9;
    end = pages.current * 10;

    if (data?.data?.total < end) {
      end = data?.data?.total;
    }

    return { start, end };
  };

  const handleView = ({ id, percentAvailable, resellId }) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "marketplace",
        url: Routes.marketplace,
        percentAvailable: percentAvailable,
        resellId: resellId,
      },
    });
  };

  const handleFilter = ({ country, apartment, budget, status }) => {
    setApartment(apartment);
    setStatus(status);
    setCountry(country);
    setBudget(budget);
    setPages({ ...pages, current: 1 });
  };
  const stages = JSON.parse(
    localStorage.getItem("profileCompletion") ?? "{}"
  );

  const incompleteProfile = !(stages.profile && stages.billing);
  const handleInvest = ({ id, percentage, resellId }) => {
    const isLoggedIn =
      localStorage.getItem("roofbucksAccess") &&
      localStorage.getItem("roofbucksRefresh") &&
      localStorage.getItem("profileCompletion") &&
      role;

    const stages = JSON.parse(
      localStorage.getItem("profileCompletion") ?? "{}"
    );

    const incompleteProfile = !(stages.profile && stages.billing);

    if (!isLoggedIn) {
      setLogin(true);
    } else if (incompleteProfile || !verifiedProfile) {
      setCompleteProfile(true);
    } else {
      setShowConnect({ show: true, id, percentage, resellId });
    }
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
      <ConnectForm
        {...showConnect}
        close={() =>
          setShowConnect({ show: false, id: "", percentage: 0, resellId: "" })
        }
      />
      <MarketplaceUI
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
        submitFilter={handleFilter}
        filter={{ country, apartment, status, budget }}
        handleConnect={handleInvest}
        isAgent={role === "agent"}
      />
    </>
  );
};

export { Marketplace };
