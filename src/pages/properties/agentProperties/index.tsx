import { fetchPropertiesService, fetchStaysService } from "api";
import {
  AddStayModal,
  AgentPropertiesUI,
  Pagination,
  Preloader,
  PropertyTableItem,
  StayData,
  ViewStayModal,
} from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";

const AgentProperties = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });
  const debouncedSearchTerm = useDebounce(search, 500);
  const [showStays, setShowStays] = React.useState(false);
  const [showAddStays, setShowAddStays] = React.useState(false);

  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});

  const {
    run: runFetchStays,
    data: fetchStaysResponse,
    requestStatus: fetchStaysStatus,
    error: fetchStaysError,
  } = useApiRequest({});

  const addProperty = () => {
    navigate(Routes.addProperty);
  };

  const fetchProperties = (page?) => {
    runProperties(
      fetchPropertiesService({ search, page: page ?? pages.current })
    );
  };

  React.useEffect(() => {
    fetchProperties();
  }, [debouncedSearchTerm]);

  const properties = React.useMemo<PropertyTableItem[]>(() => {
    if (propertiesResponse) {
      if (propertiesResponse.status === 200) {
        setPages({
          ...pages,
          total: propertiesResponse.data.pages,
        });

        return propertiesResponse.data.results.map((item) => ({
          propertyID: item.id,
          propertyName: item.name,
          status: item.moderation_status.toLowerCase(),
          amount: item.total_property_cost,
          date: new Date(item.created_at).toLocaleDateString(),
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: propertiesError ?? propertiesResponse,
              message: "Failed to fetch properties, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [propertiesResponse, propertiesError]);

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

    if (propertiesResponse?.data?.total < end) {
      end = propertiesResponse?.data?.total;
    }

    return { start, end };
  };

  const editProperty = (id) => {
    navigate(Routes.editPropertyID(id));
  };

  const viewProperty = (id) => {
    navigate(Routes.propertyID(id), {
      state: {
        from: "properties",
        url: Routes.properties,
      },
    });
  };

  const fetchStays = (id) => {
    runFetchStays(fetchStaysService(id));
  };

  const stays = React.useMemo<StayData[]>(() => {
    if (fetchStaysResponse) {
      if (fetchStaysResponse.status === 200) {
        console.log(fetchStaysResponse);
        setShowStays(true);
        return fetchStaysResponse.data.map((item) => ({
          start: item[0],
          end: item[1],
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: propertiesError ?? fetchStaysResponse,
              message: "Failed to fetch stays, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [fetchStaysResponse, propertiesError]);

  const showLoader = propertiesStatus.isPending || fetchStaysStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <AddStayModal
        show={showAddStays}
        close={() => setShowAddStays(false)}
        submit={console.log}
      />
      <ViewStayModal
        show={showStays}
        close={() => setShowStays(false)}
        stays={stays}
        handleAdd={() => {
          setShowStays(false);
          setShowAddStays(true);
        }}
        deleteStay={function (x: any): void {
          throw new Error("Function not implemented.");
        }}
      />
      <AgentPropertiesUI
        tableItems={properties}
        addProperty={addProperty}
        search={{
          value: search,
          onChange: handleSearch,
        }}
        hide={showLoader}
        editProperty={editProperty}
        viewProperty={viewProperty}
        viewStays={fetchStays}
      />

      <Pagination
        hide={properties.length === 0 || showLoader}
        current={pages.current}
        total={pages.total}
        handleChange={handlePageChange}
        count={{
          ...getCount(),
          total: propertiesResponse?.data?.total ?? 0,
        }}
      />
    </>
  );
};

export { AgentProperties };
