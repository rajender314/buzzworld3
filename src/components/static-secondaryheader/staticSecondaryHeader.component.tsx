import styled from 'styled-components';

export const SecondaryHeaderContainer = styled.div`
  align-items: center;
  .css-15pswuj {
    width: 30%;
    padding: 0px 14px;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    font-family: Inter;
  }
  .css-283000 {
    width: 50%;
  }
  display: flex;
  // border-bottom: 2px solid #eaeaea;
  padding: 24px;
  width: 100%;
  // flex:1;
`;
export const LeftContent = styled.div`
  width: 272px;
  display: flex;
  align-items: center;
  padding-left: 0px;
  img {
    height: 32px;
    width: 32px;
  }
  h1,
  .page-label {
    padding: 0 8px !important;
    font-family: Inter !important;
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 24px !important;
    line-height: 36px !important;
    color: #2e374a !important;
    width: unset !important;
  }
  &.add-users {
    flex: 1;
  }
`;
export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .save-view {
    position: absolute;
    right: 24px;
    margin-right: 0px;
    margin-left: 0px;
  }
  .add-Icon {
    display: flex;
    position: absolute;
    right: 24px;
    /* gap: 14px; */
    /* display: grid;
    grid-template-columns: auto auto auto; */
    /* gap: 8px; */
  }
  @media screen and (max-width: 1280px) {
    .add-Icon {
      gap: 8px;
      .pi-toggle > div > label {
        margin: 3px 0px;
      }
    }
  }
  .quote-search-width {
    width: 40%;
  }
`;

export const SearchDiv = styled.div`
  width: 42%;
`;
export const IconDiv = styled.div`
  .css-8q8sbr {
    margin-right: 24px;
  }
`;
export const SelectDiv = styled.div`
  width: 30%;
`;
export const DropdownDelete = styled.div`
  // .css-8q8sbr {
  //   float: right;
  //   position: relative;
  //   top: 29px;
  // }
`;
export const DropdownDiv = styled.div`
  display: flex;

  .sc-furwcr {
    display: flex;
  }
`;
export const SaveViewDiv = styled.div`
  display: flex;
  text-align-last: center;
  .sc-furwcr {
    display: flex;
  }
`;
export const ImgDiv = styled.div`
  padding: 16px 24px;
  cursor: pointer;
  display: flex;
`;

export const ExportAnchor = styled.a``;
export const ButtonsGroup = styled.div`
  float: right;
  display: flex;
  margin: 0 29px;
  .save-view {
    margin-right: 16px;
  }
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  /*margin: 0 44px 0 26px;*/
  .filter-text {
    font-family: "Inter";
    font-size: 14px;
    font-weight: 600;
    color: var(--themeBlue900);
  }
`;

export const AddUserRightContent = styled.div`
  display: flex;
  align-items: center;
`;
