/* eslint-disable no-restricted-syntax */
import { useState, useEffect, lazy, Suspense, useContext } from "react";
import { PiHeaderMenu, PiToast } from "pixel-kit";
import { ApiResponse, PiMenuOptions } from "@app/services/schema/schema";
import Logo from "@app/assets/images/Buzzworldlogo.png";
import TabLogo from "@app/assets/images/IIDMIcon.svg";
import AvatarIcon from "@app/assets/images/new_avatar.svg";

import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@app/core/localStorage/localStorage";
import { useHistory, useParams } from "react-router-dom";

import {
  headerDropdownOptions,
  primaryHeaderOptions,
  profileOptions,
  sideList,
} from "@app/modules/organisations/component/organisationRenderdata";
import { triggerApi, UserPermissionsSubscribe } from "@app/services";
import { AuthContext } from "@app/providers";
// import RmaModel from '../rmaModel'
// import PartQuote from '../Quote-components/Forms/PartQuote/part-quote'
// import JobModel from '../Jobs-components/job-check-list/jobModel'
import _ from "lodash";
import PartsPurchaseForm from "../parts-purchase-components/parts-purchase-form.tsx/parts-purchase-form";

const JobModel = lazy(
  () => import("../Jobs-components/job-check-list/jobModel")
);
const RmaModel = lazy(() => import("../rmaModel"));
const PartQuote = lazy(
  () => import("../Quote-components/Forms/PartQuote/part-quote")
);
export default function CommmonHeader({
  headerOptionsData,
  activated,
  sendEventData,
}: any) {
  const [token, setToken] = useState("");
  const [headerLinkactive, setHeaderLinkactive] = useState("pricing");
  const authcontextvalue = useContext(AuthContext);
  const [createOptions, setCreateOptions]: any = useState([]);
  const [openCreatejob, setCreateJob] = useState(false);
  const [showpartsurchaseForm, setShowPartsPurchaseForm] =
    useState<boolean>(false);
  const { id }: any = useParams();
  const history = useHistory();
  const profileOptionsData = profileOptions;
  const [headerOptions, setHeaderOptions] = useState<any>(primaryHeaderOptions);
  let routePath: any;
  function activeLinks() {
    if (
      routePath === "account-type" ||
      routePath === "classification" ||
      routePath === "contact_types" ||
      routePath === "industry" ||
      routePath === "po_min_qty" ||
      routePath === "sales_potential" ||
      routePath === "users" ||
      routePath === "user_roles" ||
      routePath === "branches" ||
      routePath === "vendors" ||
      routePath === "quote-approval" ||
      routePath === "quote-type" ||
      routePath === "qc_control" ||
      routePath === "Admin" ||
      routePath === "regions" ||
      routePath === "territory" ||
      routePath === "zipcodes" ||
      routePath === "terms-conditions" ||
      routePath === "warehouse" ||
      routePath === "product_class" ||
      routePath === "product_category"
    ) {
      setHeaderLinkactive(routePath);
      setCreateOptions([]);
    } else if (
      routePath === "pricing" ||
      routePath === "discount-codes" ||
      routePath === "special-pricing"
    ) {
      setHeaderLinkactive("pricing");
      setCreateOptions([]);
    } else if (routePath === "organizations" || routePath === "contacts") {
      setHeaderLinkactive("organizations");
      setCreateOptions([]);
    } else if (routePath === "repair-request") {
      setHeaderLinkactive("repair-request");
      setCreateOptions(headerDropdownOptions);
    } else if (
      routePath === "billing" ||
      routePath === "check_in" ||
      routePath === "evaluation" ||
      routePath === "my-repairs" ||
      routePath === "qc" ||
      routePath === "pending_quote" ||
      routePath === "repair_in_progress" ||
      routePath === "shipped" ||
      routePath === "waiting_on_parts" ||
      routePath === "added_to_quote" ||
      routePath === "receiving"
    ) {
      setHeaderLinkactive("repair-request");
      setCreateOptions(headerDropdownOptions);
    } else if (routePath === "quote_for_parts") {
      setHeaderLinkactive("quote_for_parts");
      setCreateOptions(headerDropdownOptions);
      // setCreateOptions(quoteHeaderDropdown)
    } else if (routePath === "quote_for_repair") {
      setHeaderLinkactive("quote_for_parts");
      setCreateOptions(headerDropdownOptions);
    } else if (
      routePath === "system_quotes" ||
      routePath === "quote_expired" ||
      routePath === "quote_archived" ||
      routePath === "waiting_on_me" ||
      routePath === "quoted_by" ||
      routePath === "quotes_for_my_customers" ||
      routePath === "all_quotes"
    ) {
      setHeaderLinkactive("quote_for_parts");
      setCreateOptions(headerDropdownOptions);
      // setCreateOptions(quoteHeaderDropdown)
    } else if (routePath === "jobs") {
      setHeaderLinkactive("jobs");
      // setCreateOptions(headerDropdownOptions);
    } else if (routePath === "orders") {
      setHeaderLinkactive("orders");
    } else if (routePath === "part-purchase") {
      setHeaderLinkactive("part-purchase");
    } else if (routePath === "inventory") {
      setHeaderLinkactive("inventory");
    } else if (routePath === "orders-detail-view") {
      setHeaderLinkactive("orders");
    } else if (
      routePath === "parts-purchase-detail-view" ||
      routePath === "ordered" ||
      routePath === "requested" ||
      routePath === "partially_received" ||
      routePath === "received_and_completed" ||
      routePath === "cancelled"
    ) {
      setHeaderLinkactive("part-purchase");
    } else if (
      routePath === "past-due-invoices" ||
      routePath === "point-of-sales"
    ) {
      setHeaderLinkactive("reports");
      setCreateOptions(headerDropdownOptions);
    } else {
      setHeaderLinkactive("");
      setCreateOptions([]);
    }
  }
  const [userPermissionsData, setuserPermissionsData]: any = useState();
  const [headerLoading, setHeaderLoading] = useState<any>(true);
  const [userInfoImage, setUserImage]: any = useState(null);
  const [userPermResponse, setUserPermResponse]: any = useState();
  const [openAddRepair, setOpenAddRepair] = useState<boolean>(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  console.log(id);
  async function userPermissions() {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.userPermissions}`,
      headers: {},
    };
    await triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          // let user_perm_data: any;
          const user_perm_data = response.result.data.permissions;
          setuserPermissionsData(user_perm_data);
          setUserPermResponse(response.result.data);
          setLocalStorage(
            "userPermission",
            JSON.stringify(response.result.data)
          );

          headerOptions.map((obj: any) => {
            if (response && response.result.data.user_type === "1") {
              if (obj.key === "my-repairs") {
                obj.key = "repair-request";
              }
              if (obj.key === "all_quotes") {
                obj.key = "quote_for_parts";
              }
              if (
                Object.prototype.hasOwnProperty.call(user_perm_data, obj.key)
              ) {
                if (obj.children) {
                  obj.display = user_perm_data[obj.key].is_display;
                  obj.children.map((child: any) => {
                    if (
                      Object.prototype.hasOwnProperty.call(
                        user_perm_data[obj.key],
                        child.key
                      )
                    ) {
                      if (
                        child.key === "past-due-invoices" ||
                        child.key === "point-of-sales"
                      ) {
                        child.display = user_perm_data[obj.key][child.key].Yes;
                      } else {
                        child.display = user_perm_data[obj.key][child.key].View;
                        child.none = user_perm_data[obj.key][child.key].None;
                        child.edit = user_perm_data[obj.key][child.key].Edit;
                      }
                    }
                    return user_perm_data[obj.key];
                  });
                } else {
                  obj.display = user_perm_data[obj.key][obj.key].View;
                  obj.none = user_perm_data[obj.key][obj.key].None;
                  obj.edit = user_perm_data[obj.key][obj.key].Edit;
                }
              }
              if (
                Object.prototype.hasOwnProperty.call(user_perm_data, "admin") &&
                (user_perm_data.admin[obj.key] || obj.key === "loading...")
              ) {
                obj.display = user_perm_data.admin.is_display;
                if (user_perm_data.admin[obj.key]) {
                  obj.none = user_perm_data.admin[obj.key].None;
                  obj.edit = user_perm_data.admin[obj.key].Edit;
                }
                // for (const element of Object.keys(
                //  userPermissionsData['admin'],
                // )) {
                //  if (userPermissionsData['admin'][element]['View'] === true) {
                //    obj.key = element
                //    //setHeaderLinkactive(element)
                //    break
                //  }
                // }
                setCreateOptions([]);
              }
              if (
                Object.prototype.hasOwnProperty.call(
                  user_perm_data,
                  "repairs"
                ) &&
                user_perm_data.repairs[obj.key]
              ) {
                obj.display = user_perm_data.repairs.is_display;
                obj.none = user_perm_data.repairs[obj.key].None;
                obj.edit = user_perm_data.repairs[obj.key].Edit;

                headerDropdownOptions.map((ele: any) => {
                  if (ele.module === "repairs") {
                    ele.display = user_perm_data.repairs[obj.key].Edit;
                  }
                  return ele;
                });
                setCreateOptions(headerDropdownOptions);
              }

              if (
                Object.prototype.hasOwnProperty.call(
                  user_perm_data,
                  "quotes"
                ) &&
                user_perm_data.quotes[obj.key]
              ) {
                obj.display = user_perm_data.quotes.is_display;
                obj.none = user_perm_data.quotes[obj.key].None;
                obj.edit = user_perm_data.quotes[obj.key].Edit;

                headerDropdownOptions.map((ele: any) => {
                  if (ele.module === "quotes") {
                    ele.display = user_perm_data.quotes[obj.key].Edit;
                  }
                  return ele;
                });
                setCreateOptions(headerDropdownOptions);
              }
              if (
                Object.prototype.hasOwnProperty.call(user_perm_data, "jobs") &&
                user_perm_data.jobs[obj.key]
              ) {
                obj.display = user_perm_data.jobs.is_display;
                obj.none = user_perm_data.jobs[obj.key].None;
                obj.edit = user_perm_data.jobs[obj.key].Edit;

                headerDropdownOptions.map((ele: any) => {
                  if (ele.module === "jobs") {
                    ele.display = user_perm_data.jobs[obj.key].Edit;
                  }
                  return ele;
                });
                setCreateOptions(headerDropdownOptions);
              }
              if (
                Object.prototype.hasOwnProperty.call(
                  user_perm_data,
                  "part-purchase"
                ) &&
                user_perm_data["part-purchase"][obj.key]
              ) {
                obj.display = user_perm_data["part-purchase"].is_display;
                obj.none = user_perm_data["part-purchase"][obj.key].None;
                obj.edit = user_perm_data["part-purchase"][obj.key].Edit;

                headerDropdownOptions.map((ele: any) => {
                  if (ele.module === "part-purchase") {
                    ele.display = user_perm_data["part-purchase"][obj.key].Edit;
                  }
                  return ele;
                });
                setCreateOptions(headerDropdownOptions);
              }
            } else if (response && response.result.data.user_type === "2") {
              if (obj.children) {
                obj.children.map((child: any) => {
                  child.display = true;
                  return child;
                });
              }
              if (
                obj.key === "jobs" ||
                obj.key === "orders" ||
                obj.key === "part-purchase" ||
                obj.key === "inventory" ||
                obj.key === "pricing" ||
                obj.key === "account-type"
              ) {
                obj.display = false;
              } else {
                obj.display = true;
              }

              // headerDropdownOptions.map((obj: any) => {
              //  if (obj.module === 'part-purchase' || obj.module === 'jobs') {
              //    obj['display'] = false
              //  } else {
              //    obj['display'] = true
              //  }
              //  return obj
              // })
              // setCreateOptions(headerDropdownOptions)
            }
            return headerOptions;
          });
          setHeaderOptions([...headerOptions]);
          UserPermissionsSubscribe.sendData(headerOptions);
          const info = response.result.data.user_info;
          setUserImage(info.image_url);
          setHeaderLoading(false);
          activeLinks();
          console.log(headerDropdownOptions, userPermissionsData);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  const [openCreateQuote, setCreateQuote] = useState(false);
  useEffect(() => {
    (async () => {
      await userPermissions();
    })();
  }, [authcontextvalue]);

  useEffect(() => {
    console.log(headerOptionsData, activated, headerOptions);
    if (headerOptionsData && activated) {
      // const data = headerOptionsData.map((obj: any) => {
      //  if (obj.label === 'Admin') {
      //        console.log( window.location.pathname.substring(1).split('/')[0], activated)

      //    obj.key = activated || window.location.pathname.substring(1).split('/')[0]
      //  }
      //  return obj
      // })
      // console.log(data)

      for (let i = 0; i < headerOptionsData.length; i += 1) {
        if (headerOptionsData[i].label === "Admin") {
          headerOptionsData[i].key =
            activated || window.location.pathname.substring(1).split("/")[0];
          break;
        }
      }
      setHeaderOptions([...headerOptionsData]);
    } else {
      const indx = _.findIndex(sideList, {
        key: window.location.pathname.substring(1).split("/")[0],
      });
      if (indx > -1) {
        for (let i = 0; i < headerOptionsData.length; i += 1) {
          if (headerOptionsData[i].label === "Admin") {
            console.log(
              activated,
              window.location.pathname.substring(1).split("/")[0]
            );
            headerOptionsData[i].key = sideList[indx].key;
            break;
          }
        }
        setHeaderOptions([...headerOptionsData]);
      }
    }
  }, [headerOptionsData]);

  // useEffect(() => {
  //  ;(async () => {
  //  headerOptions = headerOptions.map((obj: any) => {
  //      if (obj.label === 'Admin') {
  //        obj.key =activated
  //      }
  //      return obj
  //    })
  //    console.log(headerOptions)
  //    setHeaderOptions([...headerOptions])
  //    setHeaderLinkactive(activated)
  //  })()
  // }, [activated])

  const hasWindow = typeof window !== "undefined";
  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions]: any = useState(
    getWindowDimensions()
  );
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);
  useEffect(() => {
    (async () => {
      // eslint-disable-next-line prefer-destructuring
      routePath = window.location.pathname.substring(1).split("/")[0];
      const val = getLocalStorage("token") as string;
      setToken(val);
      activeLinks();

      // if (
      //  routePath === "account-type" ||
      //  routePath === "classification" ||
      //  routePath === "contact_types" ||
      //  routePath === "industry" ||
      //  routePath === "po_min_qty" ||
      //  routePath === "sales_potential" ||
      //  routePath === "users" ||
      //  routePath === "user_roles" ||
      //  routePath === "branches" ||
      //  routePath === "vendors" ||
      //  routePath === "quote-approval" ||
      //  routePath === "quote-type" ||
      //  routePath === "Admin" ||
      //  routePath === "regions" ||
      //  routePath === "territory" ||
      //  routePath === "zipcodes"
      // ) {
      //  setHeaderLinkactive("account-type");
      // } else {
      //  routePath = window.location.pathname.substring(1).split("/")[0];
      //  //setHeaderLinkactive(routePath);
      //  if (routePath === "quote_for_repair") {
      //    setHeaderLinkactive("quote_for_parts");
      //    //setCreateOptions(quoteHeaderDropdown)
      //  } else if (routePath === "orders-detail-view") {
      //    setHeaderLinkactive("orders");
      //  } else if (routePath === "parts-purchase-detail-view") {
      //    setHeaderLinkactive("part-purchase");
      //  } else if (routePath === "past-due-invoices") {
      //    setHeaderLinkactive("reports");
      //    setCreateOptions(headerDropdownOptions);
      //  }
      // }
      // setCreateOptions(headerDropdownOptions);
      console.log(1212222);

      const obj = {
        path: routePath,
      };
      sendEventData(obj);
    })();
  }, [
    authcontextvalue,
    getLocalStorage("userPermission"),
    window.location.pathname,
  ]);

  // eslint-disable-next-line require-jsdoc
  const MenuClick = async (menu: any) => {
    console.log(menu, userPermissionsData);
    removeLocalStorage("globalSearch");
    removeLocalStorage("requestInfo");
    localStorage.removeItem("search");
    if (menu.key === "repair-request") {
      if (
        userPermResponse &&
        (userPermResponse.user_role === "repair_technician" ||
          userPermResponse.user_role === "repair_manager")
      ) {
        history.push("/my-repairs");
      } else {
        history.push("/repair-request");
      }
    } else if (menu.key === "quote_for_parts") {
      history.push("/all_quotes");
    } else if (menu.label === "Admin") {
      for (const element of Object.keys(userPermissionsData.admin)) {
        if (userPermissionsData.admin[element].View === true) {
          menu.key = element;
          // setHeaderLinkactive(element)
          history.push(`/${menu.key}`);
          break;
        }
      }
      history.push(`/${menu.key}`);
    } else {
      history.push(`/${menu.key}`);
    }

    await userPermissions();
    if (
      menu.key === "account-type" ||
      menu.key === "classification" ||
      menu.key === "contact_types" ||
      menu.key === "industry" ||
      menu.key === "po_min_qty" ||
      menu.key === "sales_potential" ||
      menu.key === "users" ||
      menu.key === "user_roles" ||
      menu.key === "branches" ||
      menu.key === "vendors" ||
      menu.key === "quote-approval" ||
      menu.key === "quote-type" ||
      menu.key === "qc_control" ||
      menu.key === "Admin" ||
      menu.key === "warehouse" ||
      menu.key === "product_class" ||
      menu.key === "product_category"
    ) {
      let options = [];
      options = headerOptions.map((obj: any) => {
        if (obj.label === "Admin") {
          obj.key = menu.key;
        }
        return obj;
      });
      setHeaderOptions([...options]);
      setHeaderLinkactive(menu.key);
      setCreateOptions([]);
    } else if (
      menu.key === "pricing" ||
      menu.key === "discount-codes" ||
      menu.key === "special-pricing"
    ) {
      setHeaderLinkactive("pricing");
      setCreateOptions([]);
    } else if (menu.key === "organizations" || menu.key === "contacts") {
      setHeaderLinkactive("organizations");
      setCreateOptions([]);
    } else if (menu.key === "repair-request") {
      console.log(2323232);
      setHeaderLinkactive("repair-request");
      setCreateOptions(headerDropdownOptions);
    } else if (menu.key === "quote_for_parts") {
      setHeaderLinkactive("quote_for_parts");
      setCreateOptions(headerDropdownOptions);
      // setCreateOptions(quoteHeaderDropdown)
    } else if (menu.key === "quote_for_repair") {
      setHeaderLinkactive("quote_for_repair");
      setCreateOptions(headerDropdownOptions);
      // setCreateOptions(quoteHeaderDropdown)
    } else if (menu.key === "jobs") {
      setHeaderLinkactive("jobs");
      setCreateOptions(headerDropdownOptions);
    } else if (menu.key === "orders") {
      setHeaderLinkactive("orders");
      setCreateOptions(headerDropdownOptions);
    } else if (menu.key === "part-purchase") {
      setHeaderLinkactive("part-purchase");
      setCreateOptions(headerDropdownOptions);
    } else if (menu.key === "inventory") {
      setHeaderLinkactive("inventory");
      setCreateOptions(headerDropdownOptions);
    } else if (
      menu.key === "past-due-invoices" ||
      menu.key === "point-of-sales"
    ) {
      setHeaderLinkactive("reports");
      setCreateOptions(headerDropdownOptions);
    }
    const obj = {
      path: menu.key,
    };
    sendEventData(obj);
  };

  // eslint-disable-next-line require-jsdoc
  function ProfileClick(pro: PiMenuOptions) {
    if (pro.id === "logout") {
      window.location.href =
        `${process.env.REACT_APP_API_URL}` +
        `${EndpointUrl.logoutApi}?token=${token}&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
      removeLocalStorage("token");
      removeLocalStorage("userPermission");
    } else if (pro.id === "user_profile") {
      console.log(pro);
      setHeaderLinkactive("");
      history.push("/user-profile");
      const obj = {
        path: "user-profile",
      };
      sendEventData(obj);
    }
  }

  const onOpenChange = (e: any) => {
    if (e.module === "repairs") {
      setOpenAddRepair(true);
    } else if (e.module === "quotes") {
      setCreateQuote(true);
    } else if (e.module === "jobs") {
      setCreateJob(true);
    } else if (e.module === "part-purchase") {
      setShowPartsPurchaseForm(true);
    }
  };

  async function getRmaModelEvent(e: any) {
    console.log(e);
    if (e.module === "repairs" && e.success) {
      setPopupMessageShow(true);
      // sendEventData(true)
      setTimeout(() => {
        history.replace("");
        history.replace(`repair-request/${e.id}`);
        setHeaderLinkactive("repair-request");
      }, 500);
    } else if (e.module === "quotes" && e.success) {
      setPopupMessageShow(true);
      setTimeout(() => {
        history.replace("");
        history.replace(`${e.id.redirect_route}${e.id.id}`);
        setHeaderLinkactive("quote_for_parts");
      }, 500);
    } else if (e.module === "jobs" && e.success) {
      setPopupMessageShow(true);
      setTimeout(() => {
        history.replace("");
        history.replace(`jobs/${e.id}`);
        setHeaderLinkactive("jobs");
      }, 500);
    }
    setOpenAddRepair(false);
    setCreateQuote(false);
    setCreateJob(false);
    // setShowPartsPurchaseForm(false);
  }
  async function getPartsPurchaseModelEvent(e: any) {
    if (e && e.success) {
      setShowPartsPurchaseForm(false);
    } else {
      setShowPartsPurchaseForm(false);
    }
  }
  return (
    <>
      {!headerLoading && (
        <PiHeaderMenu
          activeKey={headerLinkactive}
          image={windowDimensions.width <= 1190 ? TabLogo : Logo}
          onMenuClick={(e: any) => MenuClick(e)}
          onProfileClick={(e: any) => ProfileClick(e)}
          options={headerOptions}
          profileOptions={profileOptionsData}
          xsImage="/Logo.svg"
          userImage={userInfoImage || AvatarIcon}
          headerDropdownOptions={createOptions}
          onOpenChange={onOpenChange}
        />
      )}
      {openAddRepair && (
        <Suspense fallback={null}>
          <RmaModel
            sendModelData={(e: any) => getRmaModelEvent(e)}
            paramData={undefined}
          />
        </Suspense>
      )}
      {openCreateQuote && (
        <Suspense fallback={null}>
          <PartQuote sendModelData={(e: any) => getRmaModelEvent(e)} />
        </Suspense>
      )}
      {openCreatejob && (
        <Suspense fallback={null}>
          <JobModel sendModelData={(e: any) => getRmaModelEvent(e)} />
        </Suspense>
      )}
      {showpartsurchaseForm && (
        <PartsPurchaseForm
          sendModelData={(e: any) => getPartsPurchaseModelEvent(e)}
          repairItemId=""
        />
      )}

      {/* {popupMessageShow === true && (
        <Snackbar
          message={"Added Successfully"}
          triggerEvent={async () => setPopupMessageShow(false)}
        />
      )}  */}
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="Created Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
    </>
  );
}
