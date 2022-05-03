import React, { useState, Fragment, useEffect } from "react";
import {
  PiTypography,
  PiButton,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiModalFooter,
  PiGrid,
  PiLabelName
} from "pixel-kit";
import {
  LabelNamesDiv,
  ModelGridDiv
} from "src/components/modelGrid/modelgrid.component";
import CrossLogo from "../../assets/images/cross.svg"
import { AccountTypePricing, } from "src/services/schema/schema";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import { PopupHeaderDiv } from "../fileuploadModel/fileuploadModel.component";
type FileProps = {
  success: boolean;
};
type Props = {
  data: AccountTypePricing;
  ColumnData: any[];
  onFileSelect: (e?: FileProps) => {};
};
export default function ModelGrid(props: Props) {
  console.log(props);
  // let [columndata, setColumnData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    let data = {
      success: false
    };
    props.onFileSelect(data);
  }

  function onGridReady(e: any) {
    console.log(e)
  }
  return (
    <Fragment>
      <PiModal isOpen={openModel} width={794} >
        <PiModalHeader>
          <PopupHeaderDiv>
            {
              <CloseButton
                onClick={() => closeModel()}
                title="close"
                className="Hover"
              >
                {" "}
                <img src={CrossLogo} alt="loading"></img>{" "}
              </CloseButton>
            }
            <PiTypography component="h4">Account Type Pricing</PiTypography>
            <hr />
          </PopupHeaderDiv>
        </PiModalHeader>
        <PiModalBody>
          <LabelNamesDiv>
            <div className="div">
              <PiLabelName description={props.data.name} label="Stock Code" />
              <PiLabelName
                description={props.data.list_price}
                label="List Price"
              />
              <PiLabelName
                description={props.data.discount_code}
                label="Discount Code"
              />
            </div>
            <PiLabelName
              description={props.data.description}
              label="Description"
            />
          </LabelNamesDiv>
          <ModelGridDiv>
            <PiGrid
              className="model-ag-grid"
              columns={props.ColumnData}
              mode="static"
              onGridReady={onGridReady}
              rowData={props.data.acc_type_pricelist}
              rowHeight={40}
            />
          </ModelGridDiv>
        </PiModalBody>
      </PiModal>
    </Fragment>
  );
}
