import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { PiLeftMenu } from "pixel-kit";
// import PricingRuleConfigurator from '@app/components/special-pricing-components/pricing-rule-configuarotor/pricing-rule-configurator'
// import SPPreview from '@app/components/special-pricing-components/sp-preview/sp-preview'
// import LogHistoryDetailGrid from '@app/components/special-pricing-components/logHistoryDetailGrid/loghistory-detail-grid'
// import EditPricingRuleConfigurator from '@app/components/special-pricing-components/pricing-rule-configuarotor/edit-pricing-rule-configurator'
import UserProfile from "@app/components/usersComponents/UserProfile/user-profile";
import ErrorPage from "@app/components/page-not-found/page-not-found";
import PermissionApiComponent from "@app/components/permission-api-component";
import { SideMenuList } from "@app/components";
import { TableListContainer } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { SidenavProps } from "@app/services/schema/schema";
import { getAdminMenuList } from "@app/helpers/componentHelpers";
import { SideMenuContainer } from "@app/components/Admin layout/adminLayouts.component";
import { getLocalStorage } from "@app/core/localStorage/localStorage";
import { primaryHeaderOptions } from "@app/modules/organisations/component/organisationRenderdata";
import CommmonHeader from "@app/components/commonHeader";
import { getUserLoggedPermission } from "@app/helpers/helpers";

import PointofSales from "@app/modules/pastdueinvoices/point-of-sale";
import Langugae from "@app/core/language/language";
import LayoutSecondHeader from "./layout-second-header";

const Organisations = lazy(
  () => import("@app/modules/organisations/component")
);
const PricingRuleConfigurator = lazy(
  () =>
    import(
      "@app/components/special-pricing-components/pricing-rule-configuarotor/pricing-rule-configurator"
    )
);
const EditPricingRuleConfigurator = lazy(
  () =>
    import(
      "@app/components/special-pricing-components/pricing-rule-configuarotor/edit-pricing-rule-configurator"
    )
);
const SPPreview = lazy(
  () =>
    import("@app/components/special-pricing-components/sp-preview/sp-preview")
);
const Contacts = lazy(() => import("@app/modules/contacts/component"));
const AccountTypes = lazy(
  () => import("@app/modules/adminModules/accountTypes/component")
);
const LogHistoryDetailGrid = lazy(
  () =>
    import(
      "@app/components/special-pricing-components/logHistoryDetailGrid/loghistory-detail-grid"
    )
);
const Classification = lazy(
  () => import("@app/modules/adminModules/classification/component")
);
const Industry = lazy(
  () => import("@app/modules/adminModules/industry/component")
);
const SalesPotential = lazy(
  () => import("@app/modules/adminModules/salesPotential/component")
);
const ContactTypes = lazy(
  () => import("@app/modules/adminModules/contactTypes/component")
);
const PoMinQty = lazy(
  () => import("@app/modules/adminModules/poMinQty/component")
);
const Pricing = lazy(() => import("@app/modules/vendor/component"));
const SpecialPricing = lazy(
  () => import("@app/modules/specialPricing/component")
);
const DiscountCodes = lazy(
  () => import("@app/modules/discountCodes/component")
);

const RepairRequest = lazy(
  () => import("@app/modules/repairs/repair-request/component")
);
const RepairBilling = lazy(
  () => import("@app/modules/repairs/repair-billing/component")
);
const RepairShipped = lazy(
  () => import("@app/modules/repairs/repair-shipped/component")
);

const RepairCheckIn = lazy(
  () => import("@app/modules/repairs/repair-check-in/component")
);
const RepairEvaluation = lazy(
  () => import("@app/modules/repairs/repair-evaluation/component")
);
const RepairPendingQuote = lazy(
  () => import("@app/modules/repairs/repair-quote/component")
);
const RepairAddedToQuote = lazy(
  () => import("@app/modules/repairs/repair-added-to-quote/component")
);
const RepairInProgress = lazy(
  () => import("@app/modules/repairs/repair-in-progress/component")
);
const RepairQC = lazy(() => import("@app/modules/repairs/repair-qc/component"));
const RepairWaitingOnParts = lazy(
  () => import("@app/modules/repairs/repair-waiting-on-parts/component")
);
const MyRepairs = lazy(
  () => import("@app/modules/repairs/my-repairs/component")
);
const RepairDetails = lazy(
  () => import("@app/modules/repair-detail-view/component")
);
const AccessDenied = lazy(() => import("@app/modules/access-denied/component"));

const Branches = lazy(
  () => import("@app/modules/adminModules/branches/component")
);
const Regions = lazy(
  () => import("@app/modules/adminModules/regions/component")
);
const Territory = lazy(
  () => import("@app/modules/adminModules/territory/component")
);
const ZipCodes = lazy(
  () => import("@app/modules/adminModules/zipcodes/component")
);
const WareHouse = lazy(
  () => import("@app/modules/adminModules/warehouse/component")
);
const ProductClass = lazy(
  () => import("@app/modules/adminModules/product_class/component")
);
const ProductCategory = lazy(
  () => import("@app/modules/adminModules/product-category")
);

const VendorList = lazy(
  () => import("@app/modules/adminModules/vendorList/component")
);
const Users = lazy(() => import("@app/modules/adminModules/users/component"));
const UserRoles = lazy(
  () => import("@app/modules/adminModules/userRoles/component")
);
const RepairQuote = lazy(
  () => import("@app/modules/Quotes/Repair-Quotes/component")
);
const QuoteDetails = lazy(
  () => import("@app/modules/Quotes-detail-view/component")
);
const QuoteApproval = lazy(
  () => import("@app/modules/adminModules/quoteApproval/component")
);
const TermsConditions = lazy(
  () => import("@app/modules/adminModules/termsCondition/component")
);
const QuoteType = lazy(
  () => import("@app/modules/adminModules/quoteType/component")
);
const Orders = lazy(() => import("@app/modules/orders"));

const Form = lazy(() => import("@app/modules/adminModules/form/component"));
const OrdersDetailView = lazy(
  () => import("@app/modules/orders-detail-view/component/orders-detail-view")
);
const QuoteforRepair = lazy(
  () => import("@app/modules/Quotes/Quote-for-Repair/component")
);
const QcControl = lazy(
  () => import("@app/modules/adminModules/qcControl/component")
);
const RepairJobs = lazy(
  () => import("@app/modules/Jobs/Repair-jobs/component/repair-jobs")
);

const JobsDetailedView = lazy(
  () => import("@app/modules/jobs-detail-view/component")
);
const PartsPurchaseListView = lazy(
  () => import("@app/modules/parts-purchase-list-view")
);
const OrderedPartPurchaseListView = lazy(
  () => import("@app/modules/parts-purchase-list-view/ordered-pp")
);
const RequestedPartPurchaseListView = lazy(
  () => import("@app/modules/parts-purchase-list-view/requested-pp")
);
const PartiallyReceivedListView = lazy(
  () => import("@app/modules/parts-purchase-list-view/partially-received")
);
const ReceivedCompletedListView = lazy(
  () => import("@app/modules/parts-purchase-list-view/received-completed")
);
const CancelledPP = lazy(
  () => import("@app/modules/parts-purchase-list-view/cancelled-pp")
);
const PartsPurchaseDetailView = lazy(
  () =>
    import("@app/modules/parts-purchase-detail-view/parts-purchase-detail-view")
);
const Inventory = lazy(() => import("@app/modules/inventory"));
const SystemQuote = lazy(() => import("@app/modules/Quotes/system-quotes"));
const ExpiredQuote = lazy(
  () => import("@app/modules/Quotes/expired-archived-quotes/expired-quotes")
);
const ArchivedQuote = lazy(
  () => import("@app/modules/Quotes/expired-archived-quotes/archived-quotes")
);

const PastDueInvoices = lazy(
  () => import("@app/modules/pastdueinvoices/component")
);

const WaitingOnMe = lazy(() => import("@app/modules/Quotes/Waiting-on-me"));
const QuotedBy = lazy(() => import("@app/modules/Quotes/Quoted-By"));
const QuotesForMyCustomers = lazy(
  () => import("@app/modules/Quotes/Quotes-for-my-customers")
);
const AllQuotes = lazy(() => import("@app/modules/Quotes/all-quotes"));
const ReceivingRepairs = lazy(
  () => import("@app/modules/repairs/receiving-repairs/component")
);
// const PointOfSales = lazy(
//   () => import("@app/modules/pastdueinvoices/point-of-sale")
// );
// import PointOfSales from '@app/components/pointOfSales-components/point-of-sales-list';

export default function Layout() {
  const routes = [
    {
      path: "/organizations",
      component: Organisations,
      type: "organisation",
    },

    {
      path: "/contacts",
      component: Contacts,
      type: "organisation",
    },
    {
      path: "/account-type",
      component: AccountTypes,
      type: "admin",
    },
    {
      path: "/classification",
      component: Classification,
      type: "admin",
    },
    {
      path: "/industry",
      component: Industry,
      type: "admin",
    },
    {
      path: "/sales_potential",
      component: SalesPotential,
      type: "admin",
    },
    {
      path: "/contact_types",
      component: ContactTypes,
      type: "admin",
    },
    {
      path: "/po_min_qty",
      component: PoMinQty,
      type: "admin",
    },
    {
      path: "/language",
      component: Langugae,
    },
    {
      path: "/pricing",
      component: Pricing,
      type: "pricing",
    },
    {
      path: "/discount-codes",
      component: DiscountCodes,
      type: "pricing",
    },
    {
      path: "/special-pricing",
      component: SpecialPricing,
      type: "pricing",
    },

    {
      path: "/repair-request",
      component: RepairRequest,
      type: "repairs",
    },
    {
      path: "/shipped",
      component: RepairShipped,
      type: "repairs",
    },
    {
      path: "/billing",
      component: RepairBilling,
      type: "repairs",
    },
    {
      path: "/billing/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/check_in",
      component: RepairCheckIn,
      type: "repairs",
    },
    {
      path: "/check_in/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/evaluation",
      component: RepairEvaluation,
      type: "repairs",
    },
    {
      path: "/evaluation/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/qc",
      component: RepairQC,
      type: "repairs",
    },
    {
      path: "/qc/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/repair_in_progress",
      component: RepairInProgress,
      type: "repairs",
    },
    {
      path: "/repair_in_progress/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/waiting_on_parts",
      component: RepairWaitingOnParts,
      type: "repairs",
    },
    {
      path: "/waiting_on_parts/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/my-repairs",
      component: MyRepairs,
      type: "repairs",
    },
    {
      path: "/receiving",
      component: ReceivingRepairs,
      type: "repairs",
    },
    {
      path: "/receiving/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/my-repairs/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/pending_quote",
      component: RepairPendingQuote,
      type: "repairs",
    },

    {
      path: "/added_to_quote",
      component: RepairAddedToQuote,
      type: "repairs",
    },
    {
      path: "/pending_quote/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/added_to_quote/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/repair-request/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "/branches",
      component: Branches,
      type: "admin",
    },
    {
      path: "/regions",
      component: Regions,
      type: "admin",
    },
    {
      path: "/territory",
      component: Territory,
      type: "admin",
    },
    {
      path: "/zipcodes",
      component: ZipCodes,
      type: "admin",
    },
    {
      path: "/warehouse",
      component: WareHouse,
      type: "admin",
    },
    {
      path: "/product_class",
      component: ProductClass,
      type: "admin",
    },
    {
      path: "/product_category",
      component: ProductCategory,
      type: "admin",
    },
    {
      path: "/vendors",
      component: VendorList,
      type: "admin",
    },
    {
      path: "/users",
      component: Users,
      type: "admin",
    },
    {
      path: "/user_roles",
      component: UserRoles,
      type: "admin",
    },
    {
      path: "/user-profile",
      component: UserProfile,
      type: "userProfile",
    },
    {
      path: "/access-denied",
      component: AccessDenied,
      type: "accessDenied",
    },
    {
      path: "/qc_control",
      component: QcControl,
      type: "admin",
    },
    {
      path: "/special-pricing/pricing-rule-configurator",
      component: PricingRuleConfigurator,
    },
    {
      path: "/special-pricing/pricing-rule-configurator/preview",
      component: SPPreview,
    },
    {
      path: "/special-pricing/log-history/:id",
      component: LogHistoryDetailGrid,
    },
    {
      path: "/quote_for_parts",
      component: RepairQuote,
    },
    {
      path: "/repair-quotes/:id",
      component: QuoteDetails,
    },
    {
      path: "/jobs",
      component: RepairJobs,
    },
    {
      path: "/jobs/:id",
      component: JobsDetailedView,
    },

    { path: "/orders", component: Orders },
    { path: "/inventory", component: Inventory },

    {
      path: "/quote_for_parts/:id",
      component: QuoteDetails,
    },
    {
      path: "/quote-approval",
      component: QuoteApproval,
      type: "admin",
    },
    {
      path: "/terms-conditions",
      component: TermsConditions,
      type: "admin",
    },
    {
      path: "/quote-type",
      component: QuoteType,
      type: "admin",
    },
    {
      path: "/form",
      component: Form,
      type: "admin",
    },
    {
      path: "/quote_for_repair",
      component: QuoteforRepair,
    },
    {
      path: "/quotes_for_my_customers",
      component: QuotesForMyCustomers,
    },
    {
      path: "/all_quotes",
      component: AllQuotes,
    },
    {
      path: "/quotes_for_my_customers/:id",
      component: QuoteDetails,
    },
    {
      path: "/all_quotes/:id",
      component: QuoteDetails,
    },
    {
      path: "/quoted_by",
      component: QuotedBy,
    },
    {
      path: "/quoted_by/:id",
      component: QuoteDetails,
    },
    {
      path: "/waiting_on_me",
      component: WaitingOnMe,
    },
    {
      path: "/waiting_on_me/:id",
      component: QuoteDetails,
    },
    {
      path: "/quote_for_repair/:id",
      component: QuoteDetails,
    },
    // {
    //   path: "/part-purchase-request-form",
    //   component: PartsPurchaseRequestForm,
    // },
    {
      path: "/part-purchase",
      component: PartsPurchaseListView,
    },
    {
      path: "/ordered",
      component: OrderedPartPurchaseListView,
    },
    {
      path: "/requested",
      component: RequestedPartPurchaseListView,
    },
    {
      path: "/partially_received",
      component: PartiallyReceivedListView,
    },
    {
      path: "/received_and_completed",
      component: ReceivedCompletedListView,
    },
    {
      path: "/cancelled",
      component: CancelledPP,
    },
    { path: "/orders-detail-view/:id", component: OrdersDetailView },
    {
      path: "/parts-purchase-detail-view/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/requested/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/ordered/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/partially_received/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/received_and_completed/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/cancelled/:id",
      component: PartsPurchaseDetailView,
    },
    {
      path: "/special-pricing/pricing-rule-configurator/:id",
      component: EditPricingRuleConfigurator,
    },
    // {
    //  path: "/admin",
    //  component: AdminLayout2,
    // },
    {
      path: "/page-not-found",
      component: ErrorPage,
    },
    {
      path: "/loading...",
      component: PermissionApiComponent,
    },
    {
      path: "/system_quotes",
      component: SystemQuote,
    },
    {
      path: "/quote_expired",
      component: ExpiredQuote,
    },
    {
      path: "/quote_archived",
      component: ArchivedQuote,
    },
    {
      path: "/system_quotes/:id",
      component: QuoteDetails,
    },
    {
      path: "/quote_expired/:id",
      component: QuoteDetails,
    },
    {
      path: "/quote_archived/:id",
      component: QuoteDetails,
    },
    { path: "/past-due-invoices", component: PastDueInvoices, type: "reports" },
    { path: "/point-of-sales", component: PointofSales, type: "reports" },
    {
      path: "/repair-request/:id/:id",
      component: RepairDetails,
      type: "repairs",
    },
    {
      path: "*",
      component: ErrorPage,
    },
  ];
  // const [routeInputs, setRouteInputs] = useState()
  const [gridInteraction, setGridInteraction] = useState();

  const triggerSecondaryLayoutEvent = (e: any) => {
    console.log(e);
    const obj: any = {
      ...e,
    };
    setGridInteraction(obj);
  };
  const [sidemenuList, setSideMenuList]: any = useState([]);
  const localStorageData = getLocalStorage("userPermission");

  // const sidemenuList = sideList
  useEffect(() => {
    (async () => {
      const list = await getAdminMenuList();
      setSideMenuList(list);
    })();
  }, [localStorageData]);
  const [active, setActive] = useState("");
  const [activated, setActivated] = useState("");
  const [showAdminHeader, setAdminHeader]: any = useState();
  const [routePath, setRoutePath] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (getUserLoggedPermission() === false) {
      history.push("/access-denied");
    }
    console.log(window.location.pathname.substring(1).split("/")[0]);
    const path = window.location.pathname.substring(1).split("/")[0];
    setRoutePath(path);
    setActivated(window.location.pathname.substring(1));
    console.log(activated);
    if (
      path === "account-type" ||
      path === "classification" ||
      path === "contact_types" ||
      path === "industry" ||
      path === "po_min_qty" ||
      path === "sales_potential" ||
      path === "users" ||
      path === "user_roles" ||
      path === "branches" ||
      path === "vendors" ||
      path === "quote-approval" ||
      path === "quote-type" ||
      path === "qc_control" ||
      path === "Admin" ||
      path === "regions" ||
      path === "territory" ||
      path === "zipcodes" ||
      path === "terms-conditions" ||
      path === "warehouse" ||
      path === "product_class" ||
      path === "product_category"
    ) {
      setAdminHeader(true);
    } else {
      setAdminHeader(false);
    }
  }, [activated, routePath]);
  const [headerOptions, setHeaderOptions] = useState<any>(primaryHeaderOptions);

  function onItemClick(obj: SidenavProps) {
    setActive(obj.key);
    setActivated(obj.key);
    history.push(`/${obj.key}`);
    const options = headerOptions.map((ele: any) => {
      if (ele.label === "Admin") {
        ele.key = obj.key;
      }
      return ele;
    });
    console.log(options);
    setHeaderOptions([...options]);
  }
  async function triggerCommonHeader(e: any) {
    console.log(e);
    setRoutePath(e.path);
  }
  const [adminGridData, setAdminGridData] = useState(0);

  const triggerAdminEvent = async (e: any) => {
    console.log(e, 1000);
    setAdminGridData(e);
  };
  return (
    <>
      {getUserLoggedPermission() && (
        <CommmonHeader
          headerOptionsData={headerOptions}
          active={active}
          activated={activated}
          sendEventData={(e: any) => triggerCommonHeader(e)}
        />
      )}

      {showAdminHeader === false && (
        <Switch>
          {routes.map((route) => (
            <Route exact path={route.path} key={route.path}>
              <Suspense fallback={null}>
                <route.component />
              </Suspense>
            </Route>
          ))}
        </Switch>
      )}
      {showAdminHeader === true && (
        <>
          <LayoutSecondHeader
            routePath={routePath}
            adminGridData={adminGridData}
            sendEvent={triggerSecondaryLayoutEvent}
          />
          <TableListContainer>
            <SideMenuContainer>
              <SideMenuList isActive={active} className="active menu-list">
                <PiLeftMenu
                  activeKey={activated}
                  onMenuClick={(e) => onItemClick(e)}
                  options={sidemenuList}
                />
              </SideMenuList>
            </SideMenuContainer>
            <Switch>
              {routes.map((route) => (
                <Route exact path={route.path} key={route.path}>
                  <Suspense fallback={null}>
                    <route.component
                      gridInteraction={gridInteraction}
                      sendAdminEvent={triggerAdminEvent}
                    />
                  </Suspense>
                </Route>
              ))}
            </Switch>
          </TableListContainer>
        </>
      )}
    </>
  );
}
