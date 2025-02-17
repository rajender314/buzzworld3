/* eslint-disable react/no-unstable-nested-components */
import {
  PiAttachmentList,
  PiButton,
  PiInput,
  PiLabelName,
  PiSelect,
  PiSideDrawer,
  PiSpinner,
  PiToast,
  PiTypography,
} from "pixel-kit";
import { ChangeEvent, useEffect, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  PartInfoFlagProps,
  RouteParams,
} from "@app/modules/repair-detail-view/schema/repairs";
import { useParams } from "react-router-dom";
import { deleteImage, downloadFile } from "@app/helpers/helpers";
import _ from "lodash";
import RepairsImg from "@app/assets/images/repairs.svg";
import {
  QuotePopupHeaderContainer,
  Width100,
} from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import { getRepairUsersList } from "@app/modules/repair-detail-view/helpers/repairs-helpers";
import InternalItemTextBox from "@app/components/RepairItems/internal-item-text-box";
import { FormBodyOverFlow } from "../checksIns/assignLocation/assign-location.component";
import {
  H4Heading,
  SideDrawerFooter,
} from "../selectItems/AddPartRepair/add-part-repair.component";
import {
  FormatOptionLabel,
  ManufacterName,
  PartItemDetails,
  PartNumber,
  RepairDetailsContainer,
  SerailNoEditField,
} from "./location-assign.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../selectItems/selectItemsModel/selectItem.component";
import AttchmentsContainer from "../addItems/viewItemInfo/viewItemInfo.component";

type SendEventProps = {
  success?: boolean;
  close?: boolean;
  msg?: string;
};

type Props = {
  partInfo: PartInfoFlagProps;
  // eslint-disable-next-line no-unused-vars
  sendEventData: (e: SendEventProps) => {};
};
export default function LocationAssign({ partInfo, sendEventData }: Props) {
  const { id }: RouteParams = useParams();
  const [openSideDrawer, setSideDrawer] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [repairItemDetails, setRepairItemDetails]: any = useState({});
  const [attachmentsList, setAttachmentsList]: any = useState([]);
  const [openSnackbar, setSnackbar] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [selectedTechnician, setSelectedTechnician]: any = useState();
  const [usersList, setUsersList]: any = useState([]);
  const [selectedItemData, setSelectedItemData]: any = useState({
    serial_number: "",
  });
  const [locationValue, setLocationValue] = useState<string>();
  const [serialNoEdit, setSerialNoEdit] = useState(false);
  const [itemAttachments, setItemAttachments] = useState();
  useEffect(() => {
    (async () => {
      const users = await getRepairUsersList();

      const updatedUsersList = users.map((obj: any) => ({
        ...obj,
        value: obj.id,
        label: obj.name || "No Name",
      }));

      setUsersList([...updatedUsersList]);
    })();
  }, []);
  function getDataById(id2: string) {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.repairItems}/${id2}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          const { data } = response.result;
          data.attachments.map((obj: any) => {
            // obj['id'] = index
            obj.downloadUrl = obj.url;
            obj.largeimage = obj.url;
            obj.name = obj.filename;
            // obj['thumbnail'] = obj.url
            obj.size = obj.filesize.toString();
            return obj;
          });

          setAttachmentsList(attachmentsList);
          setLocationValue(data.storage_location);
          setRepairItemDetails(data);
          selectedItemData.serial_number = data.serial_number;
          setSelectedItemData(selectedItemData);
          // setSelectedTechnician(data.technician_id)
          setLoading(false);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  }
  useEffect(() => {
    setSideDrawer(true);
    setHeaderTitle("Repair Item Details");
    getDataById(partInfo.repairItemId ? partInfo.repairItemId : "");
  }, []);

  function closeModel() {
    setSideDrawer(false);
    sendEventData({
      close: true,
    });
  }

  const [serverMsg, setServerMsg]: any = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateStorage = () => {
    setIsSubmitted(true);

    if (partInfo.status === "receiving") {
      if (!locationValue) {
        return;
      }
    } else if (!selectedTechnician || !locationValue) {
      return;
    }
    if (!selectedItemData.serial_number) {
      setServerMsg("Please enter Serial No");
      return;
    }
    setServerMsg(null);

    const params = {
      storage_location: locationValue,
      technician: selectedTechnician,
      serial_number: repairItemDetails.serial_number,
      repairs_id: id,
      id: repairItemDetails.id,
      internal_item_notes: itemAttachments,
    };
    const apiObject = {
      payload: params || {},
      method: partInfo.status === "checkedin" ? "PUT" : "POST",
      apiUrl:
        partInfo.status === "checkedin"
          ? `${EndpointUrl.AssignTech}/${partInfo.repairItemId}`
          : `${EndpointUrl.itemStorageLocation}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then((response: ApiResponse) => {
        if (response.result.success) {
          setServerMsg(null);
          sendEventData({
            success: true,
            msg: "Updated Successfully",
          });
        } else {
          setServerMsg(response.result.data);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  const locationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationValue(e.target.value);
  };
  const deleteImgFile = async (e: any) => {
    const data = await deleteImage(e);
    if (data === true) {
      const indx = _.findIndex(attachmentsList, { id: e.id });
      attachmentsList.splice(indx, 1);
      setAttachmentsList([...attachmentsList]);
      // console.log(attachmentsList)
      setSnackbar(true);
      setToastMsg("Deleted Successfully");
    }
  };
  const selectTechnician = (e: any) => {
    setSelectedTechnician(e);
  };

  const triggerEventData = async (e: any) => {
    setItemAttachments(e);
  };
  function MemoizedFormatOptionLabel(data: any) {
    return (
      <FormatOptionLabel>
        <div className="cmpny_name">
          {data?.name || data?.label || "No Name"}
        </div>
        <div className="account_no">
          -&nbsp;
          {data?.total_hours}
        </div>
      </FormatOptionLabel>
    );
  }
  return (
    <>
      <PiSideDrawer isOpen={openSideDrawer} width="medium">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <QuotePopupHeaderContainer>
              <img src={RepairsImg} alt="loading" />
              <PiTypography component="h3">{headerTitle}</PiTypography>
            </QuotePopupHeaderContainer>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          <FormBodyOverFlow>
            {loading && (
              <SpinnerDiv style={{ height: "100%" }}>
                <PiSpinner color="primary" size={50} libraryType="atalskit" />
              </SpinnerDiv>
            )}
            {!loading && (
              <RepairDetailsContainer>
                <PartItemDetails>
                  <div className="part-parent">
                    <ManufacterName>
                      {repairItemDetails.manufacturer_id
                        ? repairItemDetails.manufacturer_id.label
                        : "-"}
                    </ManufacterName>
                    <PartNumber>
                      {repairItemDetails.part_number
                        ? repairItemDetails.part_number.label
                        : "-"}
                    </PartNumber>
                  </div>
                  <div className="card">
                    <div className="repair-description">
                      {repairItemDetails.description
                        ? repairItemDetails.description
                        : "-"}
                    </div>
                    <div className="quantity-parent">
                      <PiLabelName
                        description={
                          repairItemDetails.customer_part_number
                            ? repairItemDetails.customer_part_number
                            : "-"
                        }
                        label="Customer Part Number"
                      />
                      <PiLabelName
                        description={
                          repairItemDetails.quantity
                            ? repairItemDetails.quantity
                            : "-"
                        }
                        label="Quantity"
                      />
                      <PiLabelName
                        description={
                          repairItemDetails.priority
                            ? repairItemDetails.priority.label
                            : "-"
                        }
                        label="Priority"
                      />
                      {!serialNoEdit && (
                        <PiLabelName
                          description={
                            selectedItemData.serial_number
                              ? selectedItemData.serial_number
                              : "-"
                          }
                          label="Serial No"
                          isEditIcon
                          emitSave={() => {
                            setSerialNoEdit(true);
                          }}
                          isMandatory
                        />
                      )}
                      {serialNoEdit && (
                        <SerailNoEditField>
                          <PiInput
                            name="serial_no"
                            label="Serial No"
                            placeholder="Serial No"
                            onChange={(e: any) => {
                              selectedItemData.serial_number = e.target.value;
                              setSelectedItemData({ ...selectedItemData });
                            }}
                            value={selectedItemData.serial_number}
                            isMandatory
                            isIcons
                            emitSave={() => {
                              setSerialNoEdit(false);
                              repairItemDetails.serial_number =
                                selectedItemData.serial_number;
                              setRepairItemDetails({ ...repairItemDetails });
                            }}
                            emitUndo={() => {
                              setSerialNoEdit(false);
                              selectedItemData.serial_number =
                                repairItemDetails.serial_number;
                              setSelectedItemData({ ...selectedItemData });
                            }}
                          />
                          {/* {!selectedItemData.serial_number && isSubmitted && (
                          <small
                            className="validation-error"
                            style={{ marginTop: '0' }}
                          >
                            Please enter Serial No
                          </small>
                          )} */}
                        </SerailNoEditField>
                      )}
                      <PiLabelName
                        description={
                          repairItemDetails.customer_po
                            ? repairItemDetails.customer_po
                            : "-"
                        }
                        label="Customer PO"
                      />
                    </div>
                  </div>

                  {/* <StorageField
                    className="d-flex"
                    style={{ padding: '24px 0px' }}
                  >
                    <div className="width-50">
                      <PiInput
                        name="storage"
                        label="Storage Location"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Storage Location"
                        value={locationValue}
                        onChange={locationChange}
                        isMandatory
                      />
                      {!locationValue && isSubmitted && (
                        <small
                          className="validation-error"
                          style={{ marginTop: '0' }}
                        >
                          Please enter Storage Location
                        </small>
                      )}
                    </div>
                  </StorageField> */}
                  <div className="d-flex" style={{ marginTop: "18px" }}>
                    <div className="width-50">
                      <PiInput
                        name="storage"
                        label="Storage Location"
                        libraryType="atalskit"
                        type="text"
                        placeholder="Storage Location"
                        value={locationValue}
                        onChange={locationChange}
                        isMandatory
                      />
                      {!locationValue && isSubmitted && (
                        <small
                          className="validation-error"
                          style={{ marginTop: "0" }}
                        >
                          Please enter Storage Location
                        </small>
                      )}
                    </div>
                    {partInfo.status && partInfo.status === "checkedin" && (
                      <div className="width-50">
                        <PiSelect
                          libraryType="atalskit"
                          variant="outlined"
                          name="technicain"
                          label="Assign Technician"
                          onChange={(e) => selectTechnician(e)}
                          options={usersList}
                          placeholder="Select"
                          isMandatory
                          // menuIsOpen
                          formatOptionLabel={(data: any) =>
                            MemoizedFormatOptionLabel(data)
                          }
                        />
                        {!selectedTechnician && isSubmitted && (
                          <small
                            className="validation-error"
                            style={{ marginTop: "0" }}
                          >
                            Please select Technician
                          </small>
                        )}
                      </div>
                    )}

                    {/* <div className="width-50">
                        <PiSelect
                          libraryType="atalskit"
                          variant="outlined"
                          name="qc_control"
                          label="Assign QC"
                          onChange={(e) => selectQC(e)}
                          options={usersList}
                          placeholder="Select"
                          isMandatory
                        />
                        {!selectedQC && isSubmitted && (
                          <small
                            className="validation-error"
                            style={{ marginTop: '0' }}
                          >
                            Please select QC
                          </small>
                        )}
                      </div> */}
                  </div>

                  <Width100>
                    <InternalItemTextBox sendEventData={triggerEventData} />
                  </Width100>
                </PartItemDetails>
              </RepairDetailsContainer>
            )}
            {attachmentsList.length > 0 && (
              <AttchmentsContainer>
                <H4Heading>Documents</H4Heading>
                <PiAttachmentList
                  attachmentItems={attachmentsList}
                  onClickDelete={deleteImgFile}
                  onClickDownload={downloadFile}
                  onClickPreview={() => {}}
                />
              </AttchmentsContainer>
            )}
          </FormBodyOverFlow>
          <SideDrawerFooter>
            {serverMsg && (
              <div className="server-msg" title={serverMsg}>
                {serverMsg}
              </div>
            )}
            <PiButton
              appearance="primary"
              label={
                partInfo.status === "checkedin" ? "Assign" : "Update Location"
              }
              onClick={updateStorage}
            />
          </SideDrawerFooter>
        </SideDrawerContainer>
      </PiSideDrawer>
      {/* {openSnackbar && (
        <Snackbar
          message={toastMsg}
          triggerEvent={async () => setSnackbar(false)}
        />
      )} */}
      <PiToast
        className={openSnackbar ? "show" : ""}
        headerLabel={toastMsg}
        message=""
        onClose={async () => setSnackbar(false)}
      />
    </>
  );
}
