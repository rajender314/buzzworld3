import {
  PiButton,
  PiGrid,
  PiSideDrawer,
  PiSpinner,
  PiTypography,
} from "pixel-kit";
import { useEffect, useState } from "react";
import {
  CloseButton,
  TableContainer,
} from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import { FormBodyOverFlow } from "@app/components/Repair-Components/checksIns/assignLocation/assign-location.component";
import { SideDrawerFooter } from "@app/components/Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "@app/components/Repair-Components/selectItems/selectItemsModel/selectItem.component";

import CrossLogo from "@app/assets/images/cross.svg";

import { QuotePopupHeaderContainer } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import Loader from "@app/components/Loader/loader";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import CmrNotes from "@app/assets/images/cmr_notes.svg";
import EmailInvoices from "@app/assets/images/email_invoices.svg";
import DateIcon from "@app/assets/images/date_picker_icon2.svg";
import VendorIcon from "@app/assets/images/vendor_logo.svg";
import Sales_order from "@app/assets/images/salesOrder.svg";
import TableGrid from "@app/components/tablegrid";
import { Count, PopupContainer } from "./reports-grid-pop-up-components";

type Props = {
  sendModelData: any;
  customerId: any;
  gridLabel: any;
};
export default function ReportsPopUp({
  sendModelData,
  customerId,
  gridLabel,
}: Props) {
  const closeModel = () => {
    sendModelData({ closeModel: true });
  };
  const [loading, setloading] = useState(false);
  const [columndata, setColumnData]: any = useState([]);
  const [rowData, setRowData]: any = useState();
  const [navigationLink, setNavigationLink] = useState<any>();
  const [navigationPreviousLink, setNavigationPreviousLink] = useState<any>("");
  const [opacity, setOpacity] = useState(false);
  const [displayCount, setDisplayCount] = useState<any>();

  async function getModifiedColumnData(data: any) {
    data.map((obj: any) => {
      if (obj.field === "date" || obj.field === "invoice_date") {
        obj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text" ><img src=${DateIcon} alt='loading'/ class='radius-none'></div>` +
          `<div class="label">${params.value}</div>`;
      }

      if (obj.field === "user") {
        obj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text" ><img src=${VendorIcon} alt='loading' class='radius-none'/></div>` +
          `<div class="label">${params.value}</div>`;
      }
      if (obj.field === "salesorder") {
        obj.cellClass = ["repair_id_text_cell"];

        obj.cellRenderer = (params: any) =>
          `<div class="cell-Icon-text" ><img src=${Sales_order} alt='loading'/></div>` +
          `<div class="label">${params.value}</div>`;
      }

      return obj;
    });
    return data;
  }
  function removeTags(str: string) {
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    let newStr = str;
    if (newStr === null || newStr === "") return false;
    newStr = newStr.toString();
    const cleanText = newStr.replace(/<.*?>|\r\n/g, (match) =>
      match === "\r\n" ? "\n" : ""
    );

    return cleanText;
  }
  function getAccountNotes() {
    setloading(true);
    const apiObject = {
      payload: {
        customer_id: customerId || "",
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getAccountNotes}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          let rows = response.result.data.list;
          const columnData = response.result.data.column_data;
          const data: any = await getModifiedColumnData(columnData);
          setColumnData([...data]);
          rows = rows.map((ele: any) => {
            if (ele.notes) {
              removeTags(ele.notes);
            }
            return ele;
          });
          setRowData([...rows]);
          setDisplayCount(
            response.result.data.display_count
              ? response.result.data.display_count
              : ""
          );
          setNavigationLink(
            response.result.data && response.result.data.nextLink
              ? response.result.data.nextLink
              : ""
          );
          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }

  function getEmailInvoices() {
    setloading(true);
    const apiObject = {
      payload: {
        customer_id: customerId || "",
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getEmailInvoices}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          const rows = response.result.data.list;
          let columnData = response.result.data.column_data;
          getModifiedColumnData(columnData);

          columnData = columnData.map((obj: any) => {
            obj.sort = "asc";
            return obj;
          });
          setColumnData(columnData);
          setRowData(rows);

          setloading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (gridLabel === "CRM Notes") {
      getAccountNotes();
    } else if (gridLabel === "Email Invoices") {
      getEmailInvoices();
    }
  }, []);

  const onNavigateToNext = () => {
    setOpacity(true);
    const apiObject = {
      payload: {
        link: navigationLink || "",
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getAccountNotes}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          let rows = response.result.data.list;
          setRowData(rowData);
          rows = rowData.map((ele: any) => {
            if (ele.notes) {
              removeTags(ele.notes);
            }
            return ele;
          });
          setRowData([...rows]);
          setNavigationLink(
            response.result.data && response.result.data.nextLink
              ? response.result.data.nextLink
              : ""
          );
          setNavigationPreviousLink(
            response.result.data && response.result.data.prevLink
              ? response.result.data.prevLink
              : ""
          );
          setDisplayCount(
            response.result.data.display_count
              ? response.result.data.display_count
              : ""
          );
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  const onNavigateToPrevious = () => {
    setOpacity(true);

    const apiObject = {
      payload: {
        link: navigationPreviousLink || "",
      },
      method: "POST",
      apiUrl: `${EndpointUrl.getAccountNotes}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: any) => {
        if (response.result.success && response.result.status_code === 200) {
          let rows = response.result.data.list;
          setRowData(rowData);
          rows = rowData.map((ele: any) => {
            if (ele.notes) {
              removeTags(ele.notes);
            }
            return ele;
          });
          setRowData([...rows]);
          setNavigationLink(
            response.result.data && response.result.data.nextLink
              ? response.result.data.nextLink
              : ""
          );
          setNavigationPreviousLink(
            response.result.data && response.result.data.prevLink
              ? response.result.data.prevLink
              : ""
          );
          setDisplayCount(
            response.result.data.display_count
              ? response.result.data.display_count
              : ""
          );
          setOpacity(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };

  return (
    <PopupContainer>
      <PiSideDrawer isOpen width="medium">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img
                src={gridLabel === "CRM Notes" ? CmrNotes : EmailInvoices}
                alt="loading"
                className="cmr-notes-img"
              />
              <PiTypography component="h3">{gridLabel}</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>

          <>
            <FormBodyOverFlow>
              {loading && <Loader />}
              {opacity && (
                <SpinnerDiv
                  style={{
                    position: "absolute",
                    left: "50%",
                    zIndex: "1",
                  }}
                  className="zindex"
                >
                  <PiSpinner color="primary" size={50} libraryType="atalskit" />
                </SpinnerDiv>
              )}
              {!loading && (
                <TableContainer
                  style={{ height: "100%" }}
                  className={opacity ? "opacity-on-load" : ""}
                >
                  <TableGrid>
                    <div className="ag-theme-alpine ag-style">
                      <PiGrid
                        columns={columndata}
                        mode="static"
                        rowData={rowData}
                        rowHeight={40}
                        overlayNoRowsTemplate="Data not available"
                        sideBar={false}
                      />
                    </div>
                  </TableGrid>
                </TableContainer>
              )}
            </FormBodyOverFlow>
            <SideDrawerFooter>
              <Count> {displayCount || ""}</Count>
              {navigationPreviousLink !== "" && (
                <PiButton
                  appearance="primary"
                  label="Previous"
                  onClick={onNavigateToPrevious}
                  isDisabled={opacity || loading}
                />
              )}
              {gridLabel === "CRM Notes" && navigationLink !== "" && (
                <PiButton
                  appearance="primary"
                  label="Next"
                  onClick={onNavigateToNext}
                  isDisabled={opacity || loading}
                />
              )}
            </SideDrawerFooter>
          </>
        </SideDrawerContainer>
      </PiSideDrawer>
    </PopupContainer>
  );
}
