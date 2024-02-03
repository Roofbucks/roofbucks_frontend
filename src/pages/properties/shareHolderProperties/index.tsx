import { PropertyCardData, ShareHolderPropertiesUI } from "components";
import * as React from "react";
import { SellShares } from "../sellShares";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { BuyBack } from "../buyBack";
import { PayRent } from "../payRent";
import { fetchShareholderPropertiesService } from "api";
import { getErrorMessage } from "helpers";
import { useDebounce, useApiRequest } from "hooks";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

const ShareHolderProperties = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sellShares, setSellShares] = React.useState(false);
  const [buyBack, setBuyBack] = React.useState(false);
  const [payRent, setPayRent] = React.useState(false);
  const [tab, setTab] = React.useState("properties");

  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });
  const debouncedSearchTerm = useDebounce(search, 500);

  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});

  const addProperty = () => {
    navigate(Routes.addProperty);
  };

  const fetchProperties = (page?) => {
    runProperties(
      fetchShareholderPropertiesService({ search, page: page ?? pages.current })
    );
  };

  const fetchApplications =(page?) => console.log()

  React.useEffect(() => {
    tab === "properties" ? fetchProperties(1) : fetchApplications(1);
  }, [debouncedSearchTerm, tab]);

  const properties = React.useMemo<PropertyCardData[]>(() => {
    if (propertiesResponse) {
      if (propertiesResponse.status === 200) {
        setPages({
          ...pages,
          total: propertiesResponse.data.pages,
        });

        return propertiesResponse.data.results.map((item) => ({
          propertyID: item.id,
          propertyName: item.name,
          status: "", //item.moderation_status.toLowerCase(),
          amount: item.total_property_cost,
          date: "", // new Date(item.created_at).toLocaleDateString(),
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

  const handleView = (id) => {
    navigate(Routes.propertyID(id));
  };

  const handleTab = (tab) => {
    setTab(tab);
    // setDate({ start: "", end: "" });
    // setPages((prev) => ({
    //   ...prev,
    //   currentPage: 1,
    // }));
    // tab === "properties"
    //   ? fetchProperties(1, { start: "", end: "" })
    //   : fetchApplications(1, { start: "", end: "" });
  };

  return (
    <>
      <SellShares show={sellShares} closeModal={() => setSellShares(false)} />
      <BuyBack show={buyBack} closeModal={() => setBuyBack(false)} />
      <PayRent show={payRent} closeModal={() => setPayRent(false)} />
      <ShareHolderPropertiesUI
        properties={properties}
        handleView={handleView}
        handleSellShares={() => setSellShares(true)}
        handleBuyBack={() => setBuyBack(true)}
        handlePayRent={() => setPayRent(true)}
        tab={{
          value: tab,
          handleChange: handleTab,
        }}
        count={{
          all: 0,
          applications: 0,
        }}
      />
    </>
  );
};

export { ShareHolderProperties };
