import styled from "styled-components";

export const EditorContainer = styled.div`
  /* padding: 12px 0px; */
  margin-top: 10px;
  /* min-height: 200px;
  max-height: 400px;
  overflow: scroll; */
  &.item-specific-notes {
    .quill {
      margin-top: 6px;
    }
  }
  h4 {
    margin: 4px 4px;
  }
  .ql-editor {
    height: fit-content;
  }
`;
export const ScrollContainer = styled.div`
  min-height: 200px;
  max-height: 400px;
  overflow: scroll;
  border: 1px solid #e3eaf6;
  border-radius: 6px;
`;
export const CustomerNotesContainer = styled.div`
  /* border: 1px solid #e3eaf6; */
  /*padding: 20px;*/
  /* min-height: 200px;
   max-height: 400px;
  overflow: auto; */
  /* border-radius: 6px; */

  padding: 10px;

  &.error {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 200px;
  }
  &.flex-1 {
    flex: 1;
  }
`;
export const ItemList = styled.div`
  padding: 10px 0px;
  width: 100%;
  border-bottom: 1px solid #e3eaf6;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 20px;

  //&:last-child {
  //  border-bottom: none;
  //}
  img.notes-user-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  &:hover {
    .edit-control {
      display: flex;
    }
  }
`;

export const NotesUserInfo = styled.div`
  flex: 1;
  h6 {
    margin: 0;
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
  }
`;

export const MessageText = styled.div`
  margin: 0;
  font-family: Inter;
  font-size: 14px;
  padding: 3px 0;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #6d7992;
  min-height: 60px;
  height: fit-content;
  &.time-stamp {
    font-weight: 600;
    width: 150px;
    text-align: right;
  }
  &.whitespace-preinline {
    white-space: pre-line;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  &.view_more {
    white-space: pre-line;
    min-height: unset !important;
    max-height: 200px;
    overflow: auto;
  }

  &.message-subject {
    font-weight: 700;
  }
  &.item-internal-notes {
    display: -webkit-box;
    max-width: 400px;
    /* -webkit-line-clamp: 3; */
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const NotesMessageBoxForm = styled.form`
  .noteTextField {
    height: 54px;
    border-color: #e3eaf6 !important;
    padding-right: 6px;
    input::placeholder {
      font-family: Inter;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0px;
      text-align: left;
      color: #b6c1d6;
    }
  }
  .individual-noteTextField {
    height: 36px;
    padding-right: 6px;
  }
  .for-add-repair {
    margin: 4px 4px;
  }
  &.seperate-item-text-box > div {
    margin-top: unset !important;
  }
`;
export const MessageSubmitBtn = styled.button`
  cursor: pointer;
  height: 32px;
  width: 32px;
  background-color: var(--themeBlue900);
  border: none;
  border-radius: 4px;
  &.individual-send-btn {
    width: 20px;
    height: 20px;
    img {
      height: 10px;
      width: 10px;
    }
  }
`;
export const NotesUserTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h6 {
    margin: 0;
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
  }
`;
export const EditAndDelImg = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
export const EditAndDelWrapper = styled.div`
  display: none;
  gap: 15px;
`;
export const MessageBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  .upload-container {
    height: unset !important;
    border: unset !important;
    min-height: unset !important;
  }
`;
export const NotesUploadsWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
export const TextFieldWrapper = styled.div`
  width: 100%;
`;
export const NotesImgPreviewContainer = styled.div`
  padding: 2px 4px;
`;
export const AttacmentIconSection = styled.div`
  width: 32px;
  height: 32px;
  cursor: pointer;

  > div {
    background-color: transparent !important;
  }
  .upload-container {
    background-color: transparent !important;
  }
  .attch-icon {
    height: 18px;
  }
`;

export const ShowContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  > img {
    cursor: pointer;
  }
`;
export const ViewMoreContainer = styled.div`
  > div[role="presentation"] {
    position: relative;
  }
`;
export const ViewMoreInternalNotes = styled.div`
  position: absolute;
  bottom: -64px;
  right: 10px;
  > span {
    cursor: pointer;
  }
`;
export const NotesContainer = styled.div`
  border-radius: 6px;
  font-family: var(--themeFont) !important;
  border: 1px solid #d0daec !important;
  height: fit-content;
  min-height: 110px;
  padding: 8px;
  margin: 16px;
  line-height: 1.5;
`;
