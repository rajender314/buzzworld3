import { useEffect, useState } from "react";
import AddLogo from "@app/assets/images/Plus.svg";
import { useHistory } from "react-router-dom";
import { getUserPermissions } from "@app/helpers/componentHelpers";
import { PiToast } from "pixel-kit";
import {
  LinkWithIcon,
  ImgTag,
} from "../secondaryheader/secondaryheader.component";
import RmaModel from "../rmaModel";

export default function RepairsHeader() {
  const [openAddRepair, setOpenAddRepair] = useState<boolean>(false);
  const [popupMessageShow, setPopupMessageShow] = useState(false);
  const history = useHistory();
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  useEffect(() => {
    (async () => {
      const Allowed = await getUserPermissions("repair-request", "Edit");
      setIsAllowed(Allowed);
    })();
  }, []);

  async function getRmaModelEvent(e: any) {
    console.log(e);
    if (e.success) {
      setOpenAddRepair(false);

      setPopupMessageShow(true);
      setTimeout(() => {
        // sendEventData({ success: true })
        // history.push('')
        history.push(`repair-request/${e.id}`);
      }, 2000);
    }
  }
  const openAddRow = () => {
    setOpenAddRepair(true);
  };
  return (
    <>
      {isAllowed && (
        <div className="Button-Icon-Display">
          <LinkWithIcon className="Icon-space" onClick={openAddRow}>
            <ImgTag src={AddLogo} alt="loading" />
            <span className="link-icon-text">RMA</span>
          </LinkWithIcon>
        </div>
      )}

      {openAddRepair && (
        <RmaModel
          sendModelData={(e: any) => getRmaModelEvent(e)}
          paramData={undefined}
        />
      )}
      <PiToast
        className={popupMessageShow ? "show" : ""}
        headerLabel="Created Successfully"
        message=""
        onClose={async () => setPopupMessageShow(false)}
      />
    </>
  );
}
