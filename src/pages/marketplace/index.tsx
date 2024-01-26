import { marketplaceService } from "api";
import {
  CompleteProfilePrompt,
  LoginPrompt,
  MarketplaceUI,
  Preloader,
  PropertyCardData,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import { ConnectForm } from "pages";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Routes } from "router";
import { propertyList } from "utils";

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });
  const [filter, setFilter] = React.useState({
    country: "",
    state: "",
    budget: "",
    type: "",
    status: "",
  });
  const [showConnect, setShowConnect] = React.useState({ show: false, id: "" });
  const [login, setLogin] = React.useState(false);
  const [completeProfile, setCompleteProfile] = React.useState(false);
  const { role } = useAppSelector((state) => state.user);

  const { run, data, requestStatus, error } = useApiRequest({});

  const fetchProperties = (page?) => {
    run(
      marketplaceService({
        ...filter,
        page: page ?? pages.current,
        limit: "10",
        search,
      })
    );
  };

  React.useEffect(() => {
    fetchProperties();
  }, [debouncedSearchTerm, filter]);

  const properties = React.useMemo<PropertyCardData[]>(() => {
    if (data) {
      if (data.status === 200) {
        window.scrollTo(-0, -0);
        console.log(data);
        setPages({
          ...pages,
          total: data.data.total,
        });

        return data?.data.results.map((item) => ({
          name: item.name,
          discount: item.percentage_discount,
          amount: `NGN${item.total_property_cost}`,
          owner: item.company_name,
          images: item.image_album
            ? item.image_album.media.map((item) => item.image)
            : [],
          id: item.id,
          amenities: {
            bedroom: item.number_of_bedrooms,
            toilet: item.number_of_toilets,
          },
        }));
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

  const handleView = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "marketplace",
        url: Routes.marketplace,
      },
    });
  };

  const handleFilter = (data) => {
    setFilter({
      ...data,
    });
    setPages({ ...pages, current: 1 });
  };

  const handleInvest = (id) => {
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
    } else if (incompleteProfile) {
      setCompleteProfile(true);
    } else {
      setShowConnect({ show: true, id });
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
      />
      <ConnectForm
        {...showConnect}
        close={() => setShowConnect({ show: false, id: "" })}
      />
      <MarketplaceUI
        properties={propertyList}
        pagination={{
          hide: properties.length === 0 || showLoader,
          current: pages.current,
          total: pages.total,
          handleChange: handlePageChange,
          count: {
            ...getCount(),
            total: pages.total,
          },
          name: "Properties",
        }}
        handleView={handleView}
        search={{
          value: search,
          onChange: handleSearch,
        }}
        submitFilter={handleFilter}
        handleConnect={handleInvest}
      />
    </>
  );
};

export { Marketplace };
