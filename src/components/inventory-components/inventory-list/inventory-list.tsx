import { useEffect, useRef, useState } from "react";
import { Header } from "@app/components/Admin layout/adminLayouts.component";
import { triggerApi } from "@app/services/api-services";
import {
  DetailContent,
  TabContainer,
} from "@app/components/detail-view-content/detail-view-content.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import InventoryImg from "@app/assets/images/inventory.svg";
import StockCodeImg from "@app/assets/images/search_stock.svg";
import InventoryerrImg from "@app/assets/images/inventoryerror.svg";
import Loader from "@app/components/Loader/loader";
import search from "@app/assets/images/Search.svg";

import {
  ImgTag,
  RightContent,
  SecondaryHeaderContainer,
} from "@app/components/secondaryheader/secondaryheader.component";
import { LeftContent } from "@app/components/static-secondaryheader/staticSecondaryHeader.component";
import { PiTypography } from "pixel-kit";
import { AsyncSelect } from "@atlaskit/select";
import { ApiResponse } from "@app/services/schema/schema";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import { DetailWareHouse } from "@app/components/userRolePermissions/permissionBox/qc-control-component";
import AddLogo from "@app/assets/images/addIcon.svg";
import CreateStockItems from "@app/components/orders-components/create-stock-line-items-form/create-stock-line-items-form";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { getPermissionObject } from "@app/helpers/componentHelpers";
import AccesssDenied from "@app/modules/access-denied/component";
import {
  AsyncSelectDivs,
  StockCodeAddImgContainer,
  StockCodeErrorContainer,
} from "./inventory-list-components";
import InventoryWarehouse from "../InventoryWarehouse";
import InventoryInformation from "../InventoryInformation";

export default function InventoryList() {
  const [serverMsg, setServerMsg] = useState(null);
  const [showData, setShowData] = useState(true);
  const [loading, setloading] = useState(false);
  const [stockLineDetails, setStockLineDeatils]: any = useState();
  const [showStocklineModel, setShowStocklineModel] = useState(false);
  const { current }: any = useRef({ timer: 0 });
  const [inventoryInfo, setInventoryInfo] = useState([]);
  const [inventoryware, setInventoryWare] = useState([]);
  const [inventorySearch, setInventorySearch]: any = useState();
  const [searchValues, setSearchValue] = useState("");

  const [page] = useState(1);
  const perPage = 25;
  const [permissionObject, setpermissionObject] = useState<any>();
  const localStorageData = getLocalStorage("userPermission");
  const getRepairList = async (searchValue: string, flag: string) => {
    let list: any = [];
    if (searchValue.length >= 3) {
      const apiObject = {
        payload: {},
        method: "GET",
        apiUrl:
          flag === "GetInventoryList"
            ? `${EndpointUrl.GetInventoryQuery}?stockCode=${searchValue}`
            : `${EndpointUrl.GetInventoryList}?page=${page}&perPage=${perPage}&search=${searchValue}`,

        headers: {},
      };
      await triggerApi(apiObject)
        .then((response: ApiResponse) => {
          if (response.result.status_code === 200 && response.result.success) {
            list = response.result.data.list;
          } else if (response.result.status_code === 422) {
            setServerMsg(response.result.data);
          }
          return response.result.data.list;
        })
        .catch((err: string) => {
          console.log(err);
        });
      return list;
    }
    return list;
  };
  useEffect(() => {
    (async () => {
      const permission = await getPermissionObject("inventory");
      setpermissionObject(permission);
    })();
  }, [localStorageData]);
  const promiseOptions = (searchValue: string) =>
    new Promise((resolve) => {
      if (current.timer) clearTimeout(current.timer);
      current.timer = setTimeout(() => {
        resolve(
          getRepairList(
            searchValue ? encodeURIComponent(searchValue) : "",
            "customer"
          )
        );
      }, 1000);
    });
  const onSelectItemChange = (fieldLabel: any, values: any) => {
    if (values === null) {
      setInventorySearch([]);
      getRepairList("", "");
    } else {
      setServerMsg(null);
      setSearchValue(values);
      setInventorySearch(values);
      getRepairList(values, "GetInventoryList");
    }
  };
  function usersList(searchValue: any) {
    setloading(true);
    const stockCode: any = [searchValue.label];
    const stockCodeId: any = [searchValue.value];
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.GetInventoryQuery}?stockCode=${stockCode ? encodeURIComponent(stockCode) : ""}&stockCodeId=${stockCodeId}`,

      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.status_code === 200 && response.result.success) {
          setInventoryInfo(response.result.data);
          setInventoryWare(response.result.data.stockItemInfo.warehouse);
          setServerMsg(null);
          setloading(false);
        } else if (response.result.status_code === 422) {
          setServerMsg(response.result.data);
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const handleInputChanges = (newValue: string) => {
    if (newValue.length >= 3) {
      return newValue;
    }
    return newValue;
  };
  useEffect(() => {
    if (inventorySearch) {
      setShowData(false);
      usersList(inventorySearch);
    }
  }, [inventorySearch]);

  const addItem = (stockCode: any) => {
    setloading(true);

    const apiObject = {
      payload: {
        stock_code: stockCode || "",
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getStockitemDetails}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          const result = response.result.data;
          setStockLineDeatils(...result);
          setTimeout(() => {
            setShowStocklineModel(true);
            setloading(false);
          }, 500);
        } else if (response.result.success === false) {
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  async function onSoaction(e: any) {
    if (e && e.closeModel && e.inventoryStockItem) {
      setTimeout(() => {
        setShowStocklineModel(false);
        usersList(inventorySearch);
      }, 1000);
    } else if (e && e.closeModel) {
      setShowStocklineModel(false);
    }
  }
  return (
    <>
      <Header>
        <SecondaryHeaderContainer>
          <LeftContent>
            <img src={InventoryImg} alt="loading" />
            <PiTypography className="page-label" component="h1">
              Inventory
            </PiTypography>
          </LeftContent>
          {permissionObject && !permissionObject.None && (
            <RightContent className="icon">
              <div className="globalsearch-width input">
                <img src={search} alt="" />

                <AsyncSelectDivs className="multi">
                  <AsyncSelect
                    name="order_id"
                    inputId="async-select-example"
                    classNamePrefix="react-select"
                    onInputChange={handleInputChanges}
                    loadOptions={promiseOptions}
                    placeholder=" Search by Stock Code"
                    onChange={(e) => {
                      onSelectItemChange("order_id", e);
                    }}
                    className="multiple"
                    noOptionsMessage={(obj: any) =>
                      !obj.inputValue
                        ? "Search by Stock Code "
                        : "For the searched stock code, inventory is not available "
                    }
                    searchValues={searchValues}
                    isClearable
                    isDisabled={
                      !(
                        (permissionObject && permissionObject.View) ||
                        (permissionObject && permissionObject.Edit)
                      )
                    }
                  />
                </AsyncSelectDivs>
              </div>
            </RightContent>
          )}
        </SecondaryHeaderContainer>
      </Header>

      <>
        {permissionObject && permissionObject.View && (
          <DetailWareHouse className="inventory">
            <DetailContent>
              {loading && <Loader />}
              {!loading && (
                <TabContainer>
                  {inventorySearch && inventoryInfo && !serverMsg && (
                    <>
                      <InventoryInformation stockInfo={inventoryInfo} />
                      <InventoryWarehouse stockInfo={inventoryware} />
                    </>
                  )}
                  {showData && (
                    <NoUserFound className="stock">
                      <img src={StockCodeImg} alt="loading" />
                    </NoUserFound>
                  )}
                  {serverMsg && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "600px",
                      }}
                    >
                      <div className="inv">
                        <img src={InventoryerrImg} alt="loading" />
                      </div>
                      <StockCodeErrorContainer>
                        {serverMsg === "The stock code field is required."
                          ? serverMsg
                          : `Stock Code ${serverMsg} not available in inventory`}

                        {serverMsg === "The stock code field is required." ? (
                          ""
                        ) : (
                          <div>
                            {permissionObject && permissionObject.Edit && (
                              <StockCodeAddImgContainer
                                className=" open"
                                title="Add Item In Syspro"
                                onClick={() => {
                                  addItem(serverMsg);
                                }}
                              >
                                <ImgTag src={AddLogo} />
                              </StockCodeAddImgContainer>
                            )}
                          </div>
                        )}
                      </StockCodeErrorContainer>
                    </div>
                  )}
                </TabContainer>
              )}
            </DetailContent>
          </DetailWareHouse>
        )}
        {permissionObject && !permissionObject.View && <AccesssDenied />}
      </>
      {showStocklineModel && (
        <CreateStockItems
          sendModelData={(e: any) => onSoaction(e)}
          getStocklineDetails={stockLineDetails || ""}
        />
      )}
    </>
  );
}
