import styled from 'styled-components';

export const SideDrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  // gap: 11.6px;
  padding: 12px 24px;
  border-bottom: 1px solid #e3eaf6;
  h3 {
    margin: 0;
    color: #2e374a;
  }
  .HeaderFilter {
    display: flex;
    gap: 11.6px;
  }
`;
export const SideDrawerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .form {
    background-color: #f2f7ff;
  }
  .qcicon {
    height: 40px;
    width: 40px;
  }
  &.po-info-sidebar {
    & > form {
      flex: 1;
      height: unset !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
  }
  .confirm-popup-options-heading {
    color: #4e586d;
    font-weight: 600;
    font-family: var(--themeFont);
    font-size: 16px;
  }
`;

export const SideDrawerSearch = styled.div`
  /*padding: 14px 14px;*/
  padding: 14px 24px;
  padding-bottom: 0;
`;

export const NoItemsFound = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fff0d7;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  .first-msg {
    color: #f35531;
  }
  .second-msg {
    color: #2f6eb6;
    cursor: pointer;
  }
`;
