import styled from "styled-components";

export const NotesEditorContainer = styled.div`
  margin: 16px;
  height: 100%;
  display: flex;
  flex-direction: 1;
  flex: 1;
  overflow: auto;
  flex-direction: column;
`;

export const UserLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NotesCreatedByWrapper = styled.div``;

export const NotesCreatedDateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const ItemNotesMessageBoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  position: relative;
  border: 2px solid #d0daec;
  .upload-container {
    height: unset !important;
    border: unset !important;
    min-height: unset !important;
  }
  textarea {
    max-width: 86%;
    border: none;
    background: #fff !important;
    &:hover {
      background: #ffffff !important;
    }
    &:focus {
      background: #ffffff !important;
      border: none !important;
    }
    &.internal-item-notes {
      max-width: 92%;
    }
    &.w-100 {
      max-width: 100%;
    }
    &.w-92 {
      max-width: 92%;
    }
    overflow: auto !important;
    min-height: 56px !important;
    max-height: 500px !important;
  }
  &.notes-chat-container {
    width: 100%;
    textarea {
      max-width: 92%;
    }
  }
`;
export const SendAndAttchIconWrapper = styled.div`
  position: absolute;
  right: 6px;
  display: flex;
  align-items: center;
  bottom: 12px;
`;
export const TechNotesHeader = styled.div`
  padding: 12px 20px;
`;

export const ReadViewDiv = styled.div`
  font-size: 14px;
  font-family: var(--themeFont);
  line-height: 1.2;
`;

export const EditViewDiv = styled.div`
  .ql-container {
    max-height: unset !important;
  }
`;
