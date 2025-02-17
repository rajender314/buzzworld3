/* eslint-disable react/prop-types */
import { PiConfirmModel } from "pixel-kit";
import { useEffect, useState } from "react";
import OverRideData from "./over-ride-ui";

export default function OverRideConfirm({ confirmText, sendModelData }: any) {
  const [openConFirm, setConFirm] = useState(false);
  const optionsList = [
    {
      label: "Override",
      value: "override",
    },
    {
      label: "Exclude",
      value: "exclude",
    },
  ];
  const [selectedId, setSelectedId]: any = useState("");
  useEffect(() => {
    setConFirm(true);
    setSelectedId(confirmText.props.label === "sp-override" ? "override" : "");
  }, []);
  async function getConfirmModelEvent(e: string) {
    if (e === "accept") {
      const obj = {
        proceed: true,
        selectedId,
      };
      console.log(obj);
      sendModelData(obj);
    }
  }
  const triggerData = (e: any) => {
    console.log(e);
    setSelectedId(e);
  };
  return (
    <PiConfirmModel
      className={openConFirm ? "show" : ""}
      headerLabel="Confirmation"
      message={
        <OverRideData
          confirmText={confirmText}
          optionsList={optionsList}
          sendEventData={(e: any) => triggerData(e)}
        />
      }
      primaryBtnLabel={
        confirmText.props.label === "sp-override" ? "Accept" : "Override"
      }
      secondaryBtnLabel={
        confirmText.props.label === "sp-override" ? "Decline" : "Cancel"
      }
      onClose={() => {
        setConFirm(false);
        sendModelData("close");
      }}
      onAccept={(e: any) => getConfirmModelEvent(e)}
      onDecline={() => {
        setConFirm(false);
        sendModelData("close");
      }}
    />
  );
}
