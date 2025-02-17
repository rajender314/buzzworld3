import styled from 'styled-components';

export const UsersInnerBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 8px;
  margin-top: 10px;
`;
export const UserField = styled.div`
  width: calc(100% / 2 - 16px);
  &.profile-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }
  &.name-container {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
export const UsersFormFields = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px 0px 0px;
`;
