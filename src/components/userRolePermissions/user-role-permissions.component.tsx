import styled from 'styled-components';

export const RolesAndPermissionContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  .menu-option {
    background: #f9fbff;
    .menu-item-single {
      margin: 0px 16px;
      padding: 12px !important;
      overflow: hidden;
    }
    .menu-item-single:first-child {
      margin-top: 16px;
    }
  }
`;

export const PermissionsWrapper = styled.div`
  width: 100%;
  padding: 20px;
  overflow: auto;
  flex: 1;
  h4 {
    margin-top: 0;
  }
`;
export const UserRoleSideHeading = styled.div`
  /* color: #2e374a; */
  color: #6d7992;
  //styleName: Fonts/Paragraph Highlight : 14, Bold;
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
`;

export const RoleHeadingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .add-row-text {
    font-family: Inter;
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;

    color: var(--themeBlue800);
    margin: 0px;
    display: inline-block;
    position: relative;
  }
  .add-row-text::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;

    /* background-color: #0087ca; */

    transition: transform 0.25s ease-out;
  }
  .add-row-text:hover::after {
    transform: scaleX(1);
    cursor: pointer;

    border-bottom: 2px solid var(--themeBlue800);
  }
`;
export const RoleHeadingTextDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  img {
    height: 6px;
    width: 10px;
    cursor: pointer;
  }
`;
export const RoleAddIconImg = styled.img`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;
export const PermissionFooter = styled.div`
  background: #fff;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #eaeaea;
  &.notes_container {
    padding: 12px 0px;
  }
`;

export const Permissions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserRolesFields = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eaeaea;

  > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  input[type="checkbox"] ~ span {
    color: #fff !important;
  }
`;

export const SortIconDiv = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 14px;
    width: 14px;
  }
`;
