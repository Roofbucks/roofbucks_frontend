import { fetchAgentsService } from "api";
import { AgentData, AgentListUI, Pagination, Preloader } from "components";
import { getErrorMessage } from "helpers";
import { useApiRequest, useDebounce } from "hooks";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";
import { Routes } from "router";

const AgentList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });

  const {
    run: runAgents,
    data: agentsResponse,
    requestStatus: agentsStatus,
    error: agentsError,
  } = useApiRequest({});

  const fetchAgents = (page?) => {
    runAgents(fetchAgentsService({ search, page: page ?? pages.current }));
  };

  React.useEffect(() => {
    fetchAgents();
  }, [debouncedSearchTerm]);

  const agents = React.useMemo<AgentData[]>(() => {
    if (agentsResponse) {
      if (agentsResponse.status === 200) {
        window.scrollTo(-0, -0)
        console.log(agentsResponse);
        setPages({
          ...pages,
          total: agentsResponse.data.pages,
        });

        return agentsResponse?.data.results.map((item) => ({
          avatar: item.display_photo ?? "",
          name: `${item.firstname} ${item.lastname}`,
          description: item.summary,
          email: item.email,
          number: item.phone ?? "",
          location: `${item.city}, ${item.country}`,
          id: item.id,
        }));
      } else {
        dispatch(
          updateToast({
            show: true,
            heading: "Sorry",
            text: getErrorMessage({
              error: agentsError ?? agentsResponse,
              message: "Failed to fetch agents, please try again later",
            }),
            type: false,
          })
        );
      }
    }
    return [];
  }, [agentsResponse, agentsError]);

  const handlePageChange = (x: number) => {
    fetchAgents(x);
    setPages({ ...pages, current: x });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPages({ ...pages, current: 1 });
  };

  const handleView = (id: string) => {
    navigate(Routes.profileID(id));
  };

  const getCount = () => {
    let start = 0;
    let end = 0;

    start = pages.current * 10 - 9;
    end = pages.current * 10;

    if (agentsResponse?.data?.total < end) {
      end = agentsResponse?.data?.total;
    }

    return { start, end };
  };

  const showLoader = agentsStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <AgentListUI
        agents={agents}
        handleView={handleView}
        search={{
          value: search,
          onChange: handleSearch,
        }}
        pagination={{
          hide: agents.length === 0 || showLoader,
          current: pages.current,
          total: pages.total,
          handleChange: handlePageChange,
          count: {
            ...getCount(),
            total: agentsResponse?.data?.total ?? 0,
          },
          name: "Agents",
        }}
      />
    </>
  );
};

export { AgentList };
