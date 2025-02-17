import styled from "styled-components";

const UserRoleDropdown = styled.div`
  width: 100%;
  &.admin {
    .pi-select-wrapper {
      margin-top: 20px;
    }
  }
  .field-label-div label {
    /* padding-left: 6px !important; */
    line-height: 20px !important;
    margin-bottom: 6px !important;
  }
`;
export default UserRoleDropdown;
