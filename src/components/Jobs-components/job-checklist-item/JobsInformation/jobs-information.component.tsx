import styled from "styled-components";

const RepairInfoSections = styled.div`
  .hii {
    margin-top: 24px;
    min-height: 186px;
    border: 1px solid #e3eaf6;
    background: #fff;
    /* padding: 17px 24px; */
    padding: 16px;
    // padding-top: 24px;
  }
  // .hi {
  //   border-radius: 8px;
  //   margin: 20px 0;
  // }
  min-height: 186px;
  /* border: 1px solid #e3eaf6; */
  background: #fff;
  /* padding: 17px 24px; */
  padding: 16px;
  // margin: 20px 0;
  /*margin-top:0;*/
  border-radius: 16px;
  /*&#repair-info-id {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-radius: 8px;
  }
  &#repair-docs {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }*/

  .rep-label-typo {
    display: flex;
    gap: 10px;
    /* padding: 10px 0px; */
    h4,
    h6 {
      margin: 0;
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
    h4 {
      font-size: 22px;
    }
  }
  hr {
    border-top: 1px solid #e3eaf6;
    margin: 0;
  }
  .field-details {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    row-gap: 32px;
    margin-top: 24px;
    & > div {
      width: 100% !important;
      padding: 0 !important;
      /* height: unset !important; */
      height: 70px;
    }
    @media screen and (max-width: 1440px) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 24px;
    }
    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 575px) {
      grid-template-columns: repeat(1, 1fr);
    }
    /* display: flex;
    flex-wrap: wrap;
    row-gap: 22px; */
    /* padding: 22px 0px 22px 0px; */
    /* column-gap: 20px; */
    .pi-label,
    .pi-address {
      //width: 25%;
      /* padding: 20px 0; */
      .label-text {
        font-weight: 700;
        font-size: 14px;
        font-family: Inter;
        color: #4e586d;
      }
      .description {
        font-weight: normal;
        font-family: Inter;
        padding-left: 6px;
      }
    }
    .pi-address {
      padding-top: 18px;
    }
  }
  .justify-space-bwn {
    justify-content: space-between;
  }
  &.user-profile-card {
    margin-top: 10px;
    border-radius: 4px;
  }
  .option-items {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;
    padding-top: 10px;
  }
  .quote-option-del-icon {
    height: 32px;
    width: 32px;
    border: 2px solid #6d7992;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*position: relative;
    top: 64px;
    left: 90px;
    z-index: 1;*/
    cursor: pointer;
  }
  .internal-approvals {
    h4 {
      font-family: var(--themeFont);
      font-size: 16px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
      margin: 0;
      padding: 8px 4px;
    }
  }
`;

export default RepairInfoSections;
