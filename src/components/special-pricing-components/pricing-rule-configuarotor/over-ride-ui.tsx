import { PiRadioGroup } from "pixel-kit";
import { useState } from "react";
import { DetailsContent } from "../sp-detail-grid/sp-detail-grid.component";
import {
  RowsOverrideContainer,
  RowsOverrideItemsContainer,
  RowsOverrideItems,
  OverrideRadioBtns,
} from "./pricing-rule-configurator.component";

export default function OverRideData({
  confirmText,
  optionsList,
  sendEventData,
}: any) {
  const [selectedId, setSelectedId]: any = useState(
    confirmText.props.label === "sp-override" ? "override" : ""
  );
  const onNcrChanged = (e: any) => {
    setSelectedId(e.target.value);
    sendEventData(e.target.value);
  };
  return (
    <div>
      {(confirmText.props.label === "sp-override" ||
        confirmText.props.label === "sp-check") &&
        confirmText.content.map((obj: any) => (
          <RowsOverrideContainer>
            <DetailsContent style={{ flexDirection: "column" }}>
              <p className="text">{obj.msg}</p>
              {obj.items && (
                <RowsOverrideItemsContainer>
                  <div className="label">Items:</div>
                  <RowsOverrideItems>
                    <ul>
                      {obj.items &&
                        obj.items.length > 0 &&
                        obj.items.map((obj2: any) => <li>{obj2}</li>)}
                    </ul>
                  </RowsOverrideItems>
                </RowsOverrideItemsContainer>
              )}
              {/* {obj.discount_codes && (
                    <div>
                      <span className="label">Discount Code(s):</span>
                      <span className="text" title={obj.discount_codes}>
                        {obj.discount_codes}
                      </span>
                    </div>
                  )} */}
              {obj.discount_codes && (
                <RowsOverrideItemsContainer>
                  <div className="label">Discount Code(s):</div>
                  <RowsOverrideItems>
                    <ul>
                      {obj.discount_codes &&
                        obj.discount_codes.length > 0 &&
                        obj.discount_codes.map((obj2: any) => <li>{obj2}</li>)}
                    </ul>
                  </RowsOverrideItems>
                </RowsOverrideItemsContainer>
              )}
            </DetailsContent>
            {/* {obj.items && ( */}
            {confirmText.props.label === "sp-override" && (
              <OverrideRadioBtns>
                <div>Are you sure the records will be Override/Exclude ?</div>
                <PiRadioGroup
                  libraryType="atalskit"
                  name="radio"
                  value={selectedId}
                  onChange={(e: any) => onNcrChanged(e)}
                  options={optionsList}
                />
              </OverrideRadioBtns>
            )}
            {/* )} */}
          </RowsOverrideContainer>
        ))}
    </div>
  );
}
