import { useEffect, useState } from "react";
import { PiButton, PiSelect } from "pixel-kit";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { SideDrawerFooter } from "../Repair-Components/selectItems/AddPartRepair/add-part-repair.component";
import { SpFilterPanelDiv } from "../special-pricing-components/sp-left-filter/sp-left-filter.component";

export default function POSLeftFilter({ sendData }: any) {
  const [reportsList, setReportsList] = useState([]);
  const [monthsList, setMonthsList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [selectedReport, setSelectedReport]: any = useState();
  const [selectedMonth, setSelectedMonth]: any = useState();
  const [selectedYear, setSelectedYear]: any = useState();
  const [filterParams, setFilterParams]: any = useState({});
  const [listLoader, setListLoader] = useState(true);
  const getSalesReportsFilters = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.getSalesReportFilters}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const res = response.result.data;
          setReportsList(res.reports);
          setMonthsList(res.months);
          setYearList(res.years);
          setListLoader(false);
        } else {
          setListLoader(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getSalesReportsFilters();
  }, []);

  const clearFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedReport(null);
    sendData(null);
  };
  const applyFilters = () => {
    sendData(filterParams);
  };
  const onMonthChange = (e: any) => {
    setSelectedMonth(e);

    setFilterParams({
      ...filterParams,
      month: e,
    });
  };

  const onYearChange = (e: any) => {
    setSelectedYear(e);
    setFilterParams({
      ...filterParams,
      year: e,
    });
  };
  const onReportChange = (e: any) => {
    setSelectedReport(e);
    setFilterParams({
      ...filterParams,
      report: e,
    });
  };
  return (
    <>
      <SpFilterPanelDiv>
        <div className="pi-select-wrapper">
          <PiSelect
            name="month"
            label="Month"
            placeholder="Select Month"
            options={monthsList}
            onChange={onMonthChange}
            value={selectedMonth}
            classNamePrefix={`${"react-select"}`}
            isLoading={listLoader}
          />
        </div>
        <div className="pi-select-wrapper">
          <PiSelect
            name="year"
            label="Year"
            placeholder="Select Year"
            options={yearList}
            onChange={onYearChange}
            value={selectedYear}
            classNamePrefix={`${"react-select"}`}
            isLoading={listLoader}
          />
        </div>
        <div className="pi-select-wrapper">
          <PiSelect
            name="report"
            label="Report"
            placeholder="Select Report"
            options={reportsList}
            onChange={onReportChange}
            value={selectedReport}
            classNamePrefix={`${"react-select"}`}
            isLoading={listLoader}
          />
        </div>
      </SpFilterPanelDiv>
      <SideDrawerFooter className="sp-filter-footer-btns">
        <PiButton
          appearance="secondary"
          label="Cancel"
          onClick={clearFilters}
        />
        <PiButton
          appearance="primary"
          label="Apply"
          onClick={applyFilters}
          isDisabled={!!(!selectedMonth || !selectedYear || !selectedReport)}
        />
      </SideDrawerFooter>
    </>
  );
}
