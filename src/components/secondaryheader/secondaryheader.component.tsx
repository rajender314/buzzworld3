import styled from "styled-components";

export const SecondaryHeaderContainer = styled.div`
  .css-15pswuj {
    width: 30%;
    padding: 0px 14px;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    color: #2e374a;
  }
  .css-283000 {
    width: 50%;
  }
  .css-152ppnk-ButtonBase {
    margin-right: 16px;
  }
  display: flex;
  // border-bottom: 2px solid #eaeaea;
  padding: 0 24px;
  // padding-right: 1% !important;
  // width: 80%;
  flex: 1;
  // padding-right: inherit;
  @media only screen and (max-width: 1366px) {
    .css-15pswuj {
      width: 30%;
      padding: 0px 14px;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 36px;
      color: #2e374a;
    }
    .css-283000 {
      width: 50%;
    }
    .css-152ppnk-ButtonBase {
      margin-right: 16px;
    }
    display: flex;
    // border-bottom: 2px solid #eaeaea;
    // padding: 8px 1.5%;
    // padding-right: 1% !important;
    // width: 80%;
    flex: 1;
    // padding-right: inherit;
  }
`;
export const LeftContent = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  padding-left: 0px;
`;
export const RightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;
export const SearchDiv = styled.div`
  width: 100%;
  margin-left: 0;
  .css-1ya7m8d {
    width: 40% !important;
    margin-left: 3% !important;
  }
  @media only screen and (min-width: 1440px) {
    width: 100%;
    margin-left: 0;
    .css-1ya7m8d {
      width: 35% !important;
      margin-left: 0% !important;
    }
  }
  @media only screen and (max-width: 1366px) {
    width: 100%;
    margin-left: 0;
    .css-1ya7m8d {
      width: 40% !important;
      margin-left: 0% !important;
    }
  }
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
  .sc-furwcr {
    display: flex;
  }
`;
export const ImgDiv = styled.div`
  padding: 16px 24px;
  cursor: pointer;
  display: flex;
  img {
    width: 16px;
    height: 16px;
  }
  @media only screen and (max-width: 1366px) {
  }
`;

export const ExportAnchor = styled.a`
  text-decoration: none;
  // padding-right: 6px;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 2px solid #11508e;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-right: 1%;
`;

export const ImgTag = styled.img`
display: flex;
cursor: pointer;
text-decoration: none;

// width: 36px;
// height: 36px;
// background: transparent;
// border: 2px solid #11508e;
// box-sizing: border-box;
// display: flex;
// align-items: center;
// justify-content: center;
// border-radius: 4px;
// margin-right: 4%;
}
`;

export const TextTag = styled.span`
  color: #1976d2;
  padding: 8px;
  width: 45px;
`;

export const AllAlign = styled.div`
  display: flex;
`;

export const ImageIconDiv = styled.div`
  width: 36px;
  height: 36px;
  background: transparent;
  border: 2px solid #11508e;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  // margin-right: 4%;
`;
export const ButtonsGroup = styled.div`
  z-index: 1;
  position: relative;
  // right: 3%;
  float: right;
  display: flex;
  margin: 0;
  .More-Options{
    display: none;
  }
  .Button-Icon-Display{
    display: flex;
    width: max-content;
  }
  .Icon-space{
    margin-right: 16px;
  }
  .css-1h65th5-ButtonBase {
    margin-right: 16px !important;
  }
  button{
    margin-right: 16px !important;
  }
  .save-view:hover {
    // border: 2px   solid grey;
  }
  .Import-Icon:hover {
    border: 2px solid grey;
  }
  .Export-Icon:hover {
    border: 2px solid grey;
  }
  .Export-Image {
    // padding-top: 25%;
  }
  .hover {
    visibility: hidden;
  }
  .hover:hover {
    visibility: visible;
  }
  .save-view {
    // margin-right: 10px !important;
  }
  // .ImportItems .css-wrk4co-Positioner{

  //     margin-top: 0%;

  // }
  @media only screen and (max-width: 768px) {
    .More-Options{
      display: flex;
    }
    .Button-Icon-Display{
      display: none;
    }
  }
`;

export const ExportDiv = styled.div`
  width: 150px;
  display: flex;
  .export-text {
    padding-left: 10px;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    margin: 5px 0px;
    color: #134c85 !important;
    font-family: Inter !important;
    font-style: normal !important;
    text-decoration: none;
  }
`;

export const LinkWithIcon = styled.a`
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #6d7992;
  text-decoration: none;
  img {
    margin-right: 8px;
  }
  &:hover {
    color: #1976d2;
  }
`;

export const ExportIconPopup = styled.div`
min-height: 100px;
display: flex;
font-family: 'Inter';
align-items: center;
justify-content: center;
font-weight: 500;
text-align: center;
font-size: 14px;
line-height: 1.75;
color: #6D7992;
padding: 0 40px;
p{
  margin: 0;
}
`;

export const ExportIconPopupHeader = styled.div`
display: flex;
    height: 50px;
    flex-direction: column;
`;

