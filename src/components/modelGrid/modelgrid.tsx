import { useState, useEffect } from "react";
import {
  PiTypography,
  PiModal,
  PiModalHeader,
  PiModalBody,
  PiGrid,
  PiLabelName,
} from "pixel-kit";
import {
  LabelNamesDiv,
  ModelGridDiv,
} from "@app/components/modelGrid/modelgrid.component";
import { AccountTypePricing } from "@app/services/schema/schema";
import CrossLogo from "../../assets/images/cross.svg";
import { CloseButton } from "../adminaddrowmodel/adminaddrowmodel.component";
import {
  PopupHeaderContentDiv,
  PopupHeaderDiv,
} from "../fileuploadModel/fileuploadModel.component";

type Props = {
  data: AccountTypePricing;
  ColumnData: any[];
  onFileSelect: any;
};
export default function ModelGrid(props: Props) {
  const { data, ColumnData, onFileSelect } = props;
  // let [columndata, setColumnData] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  useEffect(() => {
    setOpenModel(true);
  }, []);
  function closeModel() {
    // console.log(222);
    setOpenModel(false);
    const obj = {
      success: false,
    };
    onFileSelect(obj);
  }

  return (
    <PiModal isOpen={openModel} width={794}>
      <PopupHeaderContentDiv>
        <PiModalHeader>
          <PopupHeaderDiv>
            <PiTypography component="h3">Account Type Pricing</PiTypography>
            <CloseButton
              onClick={() => closeModel()}
              title="close"
              className="Hover"
            >
              {" "}
              <img src={CrossLogo} alt="loading" />
            </CloseButton>
          </PopupHeaderDiv>
        </PiModalHeader>
      </PopupHeaderContentDiv>
      <PiModalBody>
        <LabelNamesDiv>
          <div className="div">
            <PiLabelName description={data.name} label="Stock Code" />
            <PiLabelName description={data.list_price} label="List Price" />
            <PiLabelName
              description={data.discount_code}
              label="Discount Code"
            />
          </div>
          <PiLabelName description={data.description} label="Description" />
        </LabelNamesDiv>
        <ModelGridDiv style={{ margin: "16px 0px" }}>
          <PiGrid
            className="model-ag-grid"
            columns={ColumnData}
            mode="static"
            rowData={data.acc_type_pricelist}
            rowHeight={40}
          />
        </ModelGridDiv>
      </PiModalBody>
    </PiModal>
  );
}
