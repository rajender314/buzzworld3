import { PiButton, PiInputForm, PiSideDrawer, PiTypography } from "pixel-kit";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@app/components/adminaddrowmodel/adminaddrowmodel.component";
import CrossLogo from "@app/assets/images/cross.svg";
import {
  RepairItemsRowRow,
  RepairItemsColumn,
} from "@app/components/RepairItems/repair-items.component";
import { useParams } from "react-router-dom";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import {
  RepairItemListProps,
  RouteParams,
  StoargeParamsProps,
  StorageLocationProps,
} from "@app/modules/repair-detail-view/schema/repairs";
import { Formik } from "formik";
import Validations from "@app/core/validations/validations";
import RepairsImg from "@app/assets/images/repairs.svg";
import { Width100 } from "@app/components/Quote-components/Forms/PartQuote/part-quote.component";
import InternalItemTextBox from "@app/components/RepairItems/internal-item-text-box";
import { FormBodyOverFlow } from "../assignLocation/assign-location.component";
import { SideDrawerFooter } from "../../selectItems/AddPartRepair/add-part-repair.component";
import { ImgAndTextInRow, SideDrawerW50 } from "./selectChecks.component";
import {
  SideDrawerContainer,
  SideDrawerHeader,
} from "../../selectItems/selectItemsModel/selectItem.component";

type EventDataProps = {
  close?: boolean;
  success?: boolean;
  msg?: string;
};
type Props = {
  repairsList: Array<RepairItemListProps>;
  // eslint-disable-next-line no-unused-vars
  sendEventData: (e: EventDataProps) => {};
};

export default function SelectCheckInList({
  repairsList,
  sendEventData,
}: Props) {
  const { id }: RouteParams = useParams();
  const [checkedItems, setCheckedItems] = useState<Array<RepairItemListProps>>(
    []
  );
  const [serverMsg, setServerMsg] = useState(null);
  const [validationSchema, setValidationSchema]: any = useState([]);

  const formik = useRef<any>(null);
  const [initialValues, setInitialValues] = useState<any>({});
  const [itemAttachments, setItemAttachments] = useState();

  const getCheckedList = useCallback(() => {
    // let list = []
    const list = repairsList.filter(
      (obj: RepairItemListProps) => obj.isChecked
    );
    const checkedlist = list;
    setCheckedItems(checkedlist);
  }, [repairsList]);
  useEffect(() => {
    getCheckedList();
  }, [getCheckedList]);

  useEffect(() => {
    const json: any = {};
    const messages: any = {};

    for (let i = 0; i < checkedItems.length; i += 1) {
      initialValues[`storage_${i}`] = "";
      json[`storage_${i}`] = "required|min:2|trim";
      messages[`storage_${i}`] = {
        required: "Please enter Storage Location",
        min: "Atleast two characters required",
      };
      initialValues[`serial_${i}`] = checkedItems[i].serial_number;
      json[`serial_${i}`] = "required|min:2|trim";
      messages[`serial_${i}`] = {
        required: "Please enter Serial No",
        min: "Atleast two characters required",
      };
    }
    const validation = Validations(json, messages);
    setValidationSchema(validation);
    setInitialValues(initialValues);
  }, [checkedItems, initialValues]);

  function closeModel() {
    sendEventData({
      close: true,
    });
  }
  function handleRef(e: any) {
    console.log(e);

    formik.current = e;
  }

  const locationChange = (e: ChangeEvent<HTMLInputElement>, indx: number) => {
    checkedItems[indx].storage_location = e.target.value;
    setCheckedItems([...checkedItems]);
  };
  const serialNoChange = (e: ChangeEvent<HTMLInputElement>, indx: number) => {
    checkedItems[indx].serial_number = e.target.value;
    setCheckedItems([...checkedItems]);
  };

  function checkInParts() {
    const params: StoargeParamsProps = {
      storage_location_array: [],
      repairs_id: id,
      internal_item_notes: itemAttachments,
    };
    checkedItems.map((ele: any) => {
      const obj: StorageLocationProps = {
        id: ele.id,
        storage_location: ele.storage_location,
        serial_number: ele.serial_number,
      };
      params.storage_location_array.push(obj);
      // const obj2: SerialNumberProps = {
      //  id: ele.id,
      //  serial_number: ele.serial_number,
      // }
      // params['serial_number_array'].push(obj2)
      return obj;
    });
    const apiObject = {
      payload: params || {},
      method: "POST",
      apiUrl: `${EndpointUrl.itemStorageLocation}`,
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
  }
  function handleSubmit() {
    checkInParts();
  }
  const triggerEventData = async (e: any) => {
    setItemAttachments(e);
  };
  return (
    <SideDrawerW50>
      <PiSideDrawer isOpen width="medium">
        <SideDrawerContainer>
          <SideDrawerHeader>
            <PiTypography component="h3">Check In Selected Items</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </SideDrawerHeader>
          <Formik
            validationSchema={validationSchema}
            onSubmit={() => handleSubmit()}
            initialValues={initialValues}
            innerRef={(e: any) => handleRef(e)}
          >
            {({ ...formikProps }: any) => (
              <>
                <FormBodyOverFlow
                  style={{ padding: "unset", margin: "0 24px" }}
                >
                  <RepairItemsRowRow className="CheckInSelectedHeader">
                    {/* {repairItemsData.headers.map((obj: any) => {
                          return (
                            <RepairItemsColumn
                              className="header-label"
                              style={obj.styles ? obj.styles : null}
                            >
                              {obj.name}
                            </RepairItemsColumn>
                          )
                        })} */}
                    <RepairItemsColumn
                      className="header-label"
                      style={{ textAlign: "left" }}
                    >
                      Part Number
                    </RepairItemsColumn>
                    <RepairItemsColumn
                      className="header-label min-width-200 flexed"
                      style={{ paddingTop: "0px" }}
                    >
                      Description
                    </RepairItemsColumn>
                    <RepairItemsColumn className="header-label">
                      Manufacturer
                    </RepairItemsColumn>
                    <RepairItemsColumn
                      className="header-label max-width-140"
                      style={{ paddingTop: "0px" }}
                    >
                      Serial No
                    </RepairItemsColumn>
                    <RepairItemsColumn
                      className="header-label max-width-140"
                      style={{ paddingTop: "0px" }}
                    >
                      Storage Location
                    </RepairItemsColumn>
                  </RepairItemsRowRow>
                  {checkedItems.map((obj: any, index: number) => (
                    <RepairItemsRowRow
                      className="data CheckInSelected"
                      style={{ padding: "8px 16px" }}
                    >
                      <RepairItemsColumn
                        title={obj.part_number ? obj.part_number : "-"}
                        className="text-ellipsis"
                      >
                        <ImgAndTextInRow>
                          <img src={RepairsImg} alt="loading" />
                          <p className="text-ellipsis">
                            {obj.part_number ? obj.part_number : "-"}
                          </p>
                        </ImgAndTextInRow>
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        title={obj.description ? obj.description : "-"}
                        className="line-clamp three-lines min-width-200 flexed"
                        style={{ paddingTop: "0px" }}
                      >
                        {obj.description ? obj.description : "-"}
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        title={obj.manufacturer ? obj.manufacturer : "-"}
                        className="text-ellipsis"
                      >
                        {obj.manufacturer ? obj.manufacturer : "-"}
                      </RepairItemsColumn>
                      <RepairItemsColumn
                        className="text-ellipsis max-width-140"
                        style={{ paddingTop: "0px" }}
                      >
                        <div className="check-in-field">
                          <PiInputForm
                            name={`serial_${index}`}
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter"
                            onChange={(e) => serialNoChange(e, index)}
                            value={
                              obj.storage_location ? obj.storage_location : ""
                            }
                            maxLength={15}
                          />
                        </div>
                      </RepairItemsColumn>

                      <RepairItemsColumn
                        className="text-ellipsis max-width-140"
                        style={{ paddingTop: "0px" }}
                      >
                        <div className="check-in-field">
                          <PiInputForm
                            name={`storage_${index}`}
                            libraryType="atalskit"
                            type="text"
                            placeholder="Enter"
                            onChange={(e) => locationChange(e, index)}
                            value={
                              obj.storage_location ? obj.storage_location : ""
                            }
                          />
                        </div>
                      </RepairItemsColumn>
                    </RepairItemsRowRow>
                  ))}
                  <Width100>
                    <InternalItemTextBox sendEventData={triggerEventData} />
                  </Width100>
                </FormBodyOverFlow>
                <SideDrawerFooter>
                  {serverMsg && (
                    <div className="server-msg" title={serverMsg}>
                      {serverMsg}
                    </div>
                  )}
                  <PiButton
                    appearance="primary"
                    label="Save"
                    onClick={formikProps.handleSubmit}
                  />
                </SideDrawerFooter>
              </>
            )}
          </Formik>
        </SideDrawerContainer>
      </PiSideDrawer>
    </SideDrawerW50>
  );
}
