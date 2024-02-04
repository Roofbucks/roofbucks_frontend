import {
  Preloader,
  PropertyCardData,
  ShareHolderPropertiesUI,
  ShareholderPropertyData,
} from "components";
import * as React from "react";
import { SellShares } from "../sellShares";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { BuyBack } from "../buyBack";
import { PayRent } from "../payRent";
import { buyBackService, fetchShareholderPropertiesService } from "api";
import { getErrorMessage } from "helpers";
import { useApiRequest } from "hooks";
import { updateToast } from "redux/actions";
import { useAppDispatch } from "redux/hooks";

const ShareHolderProperties = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [sellShares, setSellShares] = React.useState({ show: false, id: "" });
  const [buyBack, setBuyBack] = React.useState({
    show: false,
    id: "",
    name: "",
    marketValue: 0,
    percentageOwned: 0,
  });
  const [payRent, setPayRent] = React.useState({
    show: false,
    id: "",
    name: "",
    rent: 0,
  });
  const [tab, setTab] = React.useState("properties");

  const [search, setSearch] = React.useState("");
  const [pages, setPages] = React.useState({
    total: 1,
    current: 1,
  });

  const {
    run: runProperties,
    data: propertiesResponse,
    requestStatus: propertiesStatus,
    error: propertiesError,
  } = useApiRequest({});

  const fetchProperties = (page?) => {
    runProperties(
      fetchShareholderPropertiesService({ search, page: page ?? pages.current })
    );
  };

  const fetchApplications = (page?) => console.log();

  React.useEffect(() => {
    tab === "properties" ? fetchProperties(1) : fetchApplications(1);
  }, [tab]);

  const properties = React.useMemo<ShareholderPropertyData[]>(() => {
    if (propertiesResponse) {
      if (propertiesResponse.status === 200) {
        setPages({
          ...pages,
          total: propertiesResponse.data.pages,
        });

        return propertiesResponse.data.results.map((item) => ({
          images: item.images,
          amenities: { bedroom: item.bedrooms, toilet: item.toilets },
          discount: `${item.percentage_ownership}% owned`,
          owner: item.agent_name,
          name: item.name,
          address: item.address,
          description: item.description,
          amount: item.amount,
          id: item.id,
          calendlyURL: item.agent_link,
          investorType: "home_owner",
          rent: 0,
          marketValue: 0,
          percentageOwned: item.percentage_ownership,
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
    tab === "properties" ? fetchProperties(x) : fetchApplications(x);
    setPages({ ...pages, current: x });
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
    navigate(Routes.propertyID(id), {
      state: {
        from: "properties",
        url: Routes.properties,
      },
    });
  };

  const showLoader = propertiesStatus.isPending;

  return (
    <>
      <Preloader loading={showLoader} />
      <SellShares
        show={sellShares.show}
        closeModal={() => setSellShares({ show: false, id: "" })}
      />
      <BuyBack
        show={buyBack.show}
        percentageOwned={buyBack.percentageOwned}
        propertyId={buyBack.id}
        propertyName={buyBack.name}
        marketValue={buyBack.marketValue}
        closeModal={() =>
          setBuyBack({
            show: false,
            id: "",
            name: "",
            marketValue: 0,
            percentageOwned: 0,
          })
        }
      />
      <PayRent
        show={payRent.show}
        propertyId={payRent.id}
        propertyName={payRent.name}
        rent={payRent.rent}
        closeModal={() =>
          setPayRent({ show: false, id: "", name: "", rent: 0 })
        }
      />
      <ShareHolderPropertiesUI
        properties={properties}
        handleView={handleView}
        handleSellShares={(id) => setSellShares({ show: true, id })}
        handleBuyBack={({ id, name, marketValue, percentageOwned }) =>
          setBuyBack({
            show: true,
            id,
            name,
            marketValue,
            percentageOwned,
          })
        }
        handlePayRent={({ id, name, rent }) =>
          setPayRent({ show: true, id, name, rent })
        }
        tab={{
          value: tab,
          handleChange: setTab,
        }}
        count={{
          all: propertiesResponse?.data?.total ?? 0,
          applications: 0,
        }}
        pagination={{
          ...pages,
          handleChange: handlePageChange,
          count: {
            ...getCount(),
            total:
              tab === "properties" ? propertiesResponse?.data?.total ?? 0 : 0,
          },
        }}
      />
    </>
  );
};

export { ShareHolderProperties };
