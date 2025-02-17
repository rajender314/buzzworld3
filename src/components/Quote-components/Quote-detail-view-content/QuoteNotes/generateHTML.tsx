import { PiEditor } from "pixel-kit";
import { useEffect, useRef, useState } from "react";
import { EditViewDiv } from "@app/components/RepairItems/item-internal-notes.component";
import { getPermissionObject } from "@app/helpers/componentHelpers";

function GenerateHTML({
  notesFor,
  detailViewNotes,
  notesToCustomer,
  sendData,
}: any) {
  const [editValue, setEditValue] = useState("");
  const { current }: any = useRef({ timer: 0 });
  const [permissionObject, setpermissionObject] = useState<any>({});
  const [readOnly, setReadOnly] = useState(false);
  useEffect(() => {
    (async () => {
      const permission: any = await getPermissionObject(notesFor);
      setpermissionObject(permission);
      console.log(permission, notesFor, permissionObject, detailViewNotes);

      if (
        notesFor === "quote_for_parts" &&
        detailViewNotes &&
        (detailViewNotes.status_code === "approved" ||
          detailViewNotes.status_code === "delivered_to_customer" ||
          detailViewNotes.status_code === "won" ||
          detailViewNotes.status_code === "lost" ||
          detailViewNotes.status_code === "quote_expired" ||
          detailViewNotes.status_code === "quote_archived" ||
          detailViewNotes.status_code === "won_so_created" ||
          detailViewNotes.is_revised === true ||
          permission.Edit === false)
      ) {
        setReadOnly(true);
      } else if (notesFor === "repair-request" && permission.Edit === false) {
        setReadOnly(true);
      } else if (
        notesFor === "repair-request" &&
        detailViewNotes.is_edit === false
      ) {
        setReadOnly(true);
      } else {
        setReadOnly(false);
      }
    })();
  }, []);
  const onChangeNotes = (e: any) => {
    setEditValue(e);
    if (current.timer) clearTimeout(current.timer);
    current.timer = setTimeout(() => {
      if (
        e !== "" &&
        e !== (detailViewNotes.customer_notes || detailViewNotes.technical_note)
      ) {
        sendData(e);
      }
    }, 500);
  };
  useEffect(() => {
    setEditValue(notesToCustomer);
  }, []);

  return (
    <div>
      <EditViewDiv>
        <PiEditor
          libraryType="atalskit"
          onChange={onChangeNotes}
          value={editValue}
          readOnly={readOnly}
        />
      </EditViewDiv>
    </div>
  );
}
export default GenerateHTML;
