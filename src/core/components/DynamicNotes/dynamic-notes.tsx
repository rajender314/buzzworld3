import { PiSpinner } from "pixel-kit";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerDiv } from "@app/components/fileuploadModel/fileuploadModel.component";
import {
  CustomerNotesContainer,
  ItemList,
  NotesUserInfo,
  MessageText,
  ScrollContainer,
} from "@app/components/RepairNotes/repair-notes.component";
import { NoUserFound } from "@app/components/usersComponents/userslist/userslist.component";
import EndpointUrl from "@app/core/apiEndpoints/endPoints";
import {
  CustomerNotesProps,
  RouteParams,
} from "@app/modules/repair-detail-view/schema/repairs";
import { triggerApi } from "@app/services";
import { ApiResponse } from "@app/services/schema/schema";
import Avatar from "@app/assets/images/avator.svg";
import Notes from "@app/assets/images/Exclude.svg";

export default function DynamicNotes() {
  const { id }: RouteParams = useParams();
  const [loading, setLoading] = useState(true);
  const [cutomerNotes, setCutomerNotes]: any = useState([]);
  const getCustomerNotesNotes = () => {
    const apiObject = {
      payload: {},
      method: "GET",
      apiUrl: `${EndpointUrl.QuoteCustomerNotesDynamics}?quote_id=${id}`,
      headers: {},
    };
    triggerApi(apiObject)
      .then(async (response: ApiResponse) => {
        if (response.result.success) {
          setLoading(false);
          const { data } = response.result;
          // cutomerNotes.map((obj: any) => {
          //  var parser = new DOMParser();
          //  var doc = parser.parseFromString(obj.note, 'text/html');
          //  console.log(doc)
          // })
          setCutomerNotes([...data]);
        }
      })
      .catch((err: string) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCustomerNotesNotes();
  }, []);

  return (
    <ScrollContainer>
      <CustomerNotesContainer className="error">
        {!loading &&
          cutomerNotes.map((obj: CustomerNotesProps) => (
            <ItemList>
              <img
                className="notes-user-img"
                src={obj.image_url ? obj.image_url : Avatar}
                alt="loading"
              />
              <NotesUserInfo>
                <h6>{obj.full_name}</h6>
                <MessageText className="message-subject">
                  {obj.subject}
                </MessageText>
                <MessageText
                  className="whitespace-preinline"
                  dangerouslySetInnerHTML={{ __html: obj.note }}
                />
              </NotesUserInfo>
              <MessageText className="time-stamp">
                {obj.last_modified_date}
              </MessageText>
            </ItemList>
          ))}
        {!loading && cutomerNotes.length === 0 && (
          <NoUserFound>
            <div>
              <img
                src={Notes}
                alt=""
                style={{ display: "block", width: "24px" }}
              />
            </div>
            <div> Notes Not Available from Dynamics</div>
          </NoUserFound>
        )}
        {loading && (
          <SpinnerDiv style={{ height: "100%" }}>
            <PiSpinner color="primary" size={50} libraryType="atalskit" />
          </SpinnerDiv>
        )}
      </CustomerNotesContainer>
    </ScrollContainer>
  );
}
