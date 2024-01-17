import { listingsService } from "api";
import {
  ApartmentTypeFilterModal,
  BudgetFilterModal,
  CountryFilterModal,
  ListingsUI,
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
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";
import { propertyList } from "utils";

const Listings = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // States
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
  const [showApply, setShowApply] = React.useState(false);

  // API Request Hooks
  const { run, data, requestStatus, error } = useApiRequest({});

  const fetchProperties = (page?) => {
    run(
      listingsService({
        ...filter,
        page: page ?? pages.current,
        limit: "12",
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
          amount: `NGN ${item.total_property_cost}`,
          owner: "",
          images: item.images,
          id: item.id,
          amenities: {
            bedroom: item.number_of_bedrooms,
            toilet: item.number_of_toilets,
          },
          calendlyURL: "",
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
        from: "listings",
        url: Routes.listing,
      },
    });
  };

  const handleFilter = (data) => {
    setFilter({
      ...data,
    });
    setPages({ ...pages, current: 1 });
  };
  const showLoader = requestStatus.isPending;

  const [apartment, setApartment] = React.useState(false);
  const [budget, setBudget] = React.useState(false);
  const [country, setCountry] = React.useState(false);
  const [status, setStatus] = React.useState(false);

  return (
    <>
      <Preloader loading={showLoader} />
      <ApartmentTypeFilterModal
        show={apartment}
        close={() => setApartment(false)}
      />
      <BudgetFilterModal show={budget} close={() => setBudget(false)} />
      <CountryFilterModal show={country} close={() => setCountry(false)} />
      <StatusFilterModal show={status} close={() => setStatus(false)} />
      <ApplyForm show={showApply} close={() => setShowApply(false)} />
      <ListingsUI
        properties={properties}
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
        handleApply={(id) => setShowApply(true)}
        handleApartmentFilter={() => setApartment(true)}
        handleBudgetFilter={() => setBudget(true)}
        handleCountryFilter={() => setCountry(true)}
        handleStatusFilter={() => setStatus(true)}
      />
    </>
  );
};

export { Listings };
