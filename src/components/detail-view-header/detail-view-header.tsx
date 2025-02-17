import { PiToast } from "pixel-kit";
import { useEffect, useState } from "react";
// import DetailView from '../../assets/images/detailview.svg'
import {
  RepairIdsDiv,
  HeaderContainer,
  BackSection,
  RepairIds,
} from "@app/components/detail-view-header/detail-view-header.component";
// import defaultImg from '@app/assets/images/defaultImg.svg'
import RepairsImg from "@app/assets/images/repairs_detail.svg";
import { useHistory } from "react-router-dom";
import ChevronLeft from "@app/assets/images/chevron_left.svg";
import { BackButton } from "../special-pricing-components/logHistoryDetailGrid/logHistoryDetailGrid.component";

export default function DetailViewHeader({ repairInfo }: any) {
  const [repairDetails, setRepairDetails] = useState(repairInfo);
  // const { id }: RouteParams = useParams()
  const [openSnackbar, setSnackbar] = useState(false);
  // const [toastMsg, setToastMsg] = useState('')
  const history = useHistory();
  // const [quoteStatusList, setQuoteStatusList]: any = useState([])
  // const getQuoteStatus = useCallback(() => {
  //  let arr: any = []
  //  const apiObject = {
  //    payload: {},
  //    method: 'GET',
  //    apiUrl: `${EndpointUrl.RepairStatuses}/${id}`,
  //    headers: {},
  //  }
  //  triggerApi(apiObject)
  //    .then(async (response: ApiResponse) => {
  //      if (response.result.success) {
  //        const data = response.result.data.list
  //        arr = await data.map((item: any) => {
  //          return {
  //            ...item,
  //            name: (
  //              <div className="Button-Icon-Display">
  //                <LinkWithIcon className="Icon-space">
  //                  <span className="link-icon-text">{item.name}</span>
  //                </LinkWithIcon>
  //              </div>
  //            ),
  //          }
  //        })
  //        setQuoteStatusList([...arr])
  //      } else {
  //      }
  //    })
  //    .catch((err: string) => {
  //      console.log(err)
  //    })
  // }, [id])
  useEffect(() => {
    setRepairDetails(repairInfo);
  }, [repairInfo]);

  // const updateDelivedStatus = (e: any) => {
  //  console.log(e)
  //  const params = {
  //    type: e.code,
  //    repairs_id: id,
  //  }
  //  const apiObject = {
  //    payload: params,
  //    method: 'PUT',
  //    apiUrl: `${EndpointUrl.ManuallyRepairStatusUpdate}/${id}`,
  //    headers: {},
  //  }
  //  triggerApi(apiObject)
  //    .then(async (response: any) => {
  //      if (response.result.success) {
  //        setToastMsg('Updated Successfully')
  //        setSnackbar(true)
  //        const obj = {
  //          success: true,
  //        }
  //        sendEventData(obj)
  //      }
  //    })
  //    .catch((err: string) => {
  //      console.log(err)
  //    })
  // }
  const closeModel = () => {
    // history.goBack()
    history.replace(`/${window.location.pathname.split("/")[1]}`);
  };
  return (
    <>
      <HeaderContainer>
        <BackSection>
          {/* <div>
            <PiBackSection
              backOptions={{
                name: "",
                route: "/repair-request",
              }}
            />
          </div> */}
          <RepairIdsDiv>
            <BackButton onClick={closeModel}>
              <img src={ChevronLeft} alt="loading" />
            </BackButton>
            <img
              className="repair-view-left-image"
              src={RepairsImg}
              alt="loading"
            />
            <RepairIds>
              <div className="quote-num-and-status">
                <div className="id-num">
                  #
                  {repairDetails && repairDetails.repair_info
                    ? repairDetails.repair_info.rma_number
                    : "-"}
                </div>
                {/* <QuoteActivityPill
                  className={getStatusClassName(
                    repairDetails.repair_info.status
                      ? repairDetails.repair_info.status.label
                      : '',
                  )}
                >
                  {repairDetails.repair_info.status
                    ? repairDetails.repair_info.status.label
                    : ''}
                </QuoteActivityPill> */}
                {/* {quoteStatusList &&
                  quoteStatusList.length > 0 &&
                  repairDetails.repair_info.status_code !== 'pending_qc' && (
                    <>
                      <DetailViewStatusDropdown>
                        <PiDropdownMenu
                          items={quoteStatusList}
                          label=""
                          onOpenChange={(e: any) => updateDelivedStatus(e)}
                        />
                      </DetailViewStatusDropdown>
                    </>
                  )} */}
              </div>

              <div
                className="repair-name"
                title={
                  repairDetails && repairDetails.customer_info
                    ? repairDetails.customer_info.customer_name.label
                    : "-"
                }
              >
                {repairDetails && repairDetails.customer_info
                  ? repairDetails.customer_info.customer_name.label
                  : "-"}
              </div>
            </RepairIds>
          </RepairIdsDiv>
        </BackSection>
        {/* <RightSideContent>
          <PiActionIcon appearance="print" onClick={function noRefCheck() {}} icontext="Print"/>
          <AnchorTag href='mailto:someone@example.com'>
          <PiActionIcon appearance="mail" onClick={function noRefCheck() {}} icontext="Mail"/>
          </AnchorTag>
          <PiActionIcon
            appearance="download"
            onClick={function noRefCheck() {}}
			icontext="Download"
          />
        </RightSideContent> */}
      </HeaderContainer>

      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel=""
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}
