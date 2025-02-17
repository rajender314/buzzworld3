import styled from 'styled-components';

export const TabContainer = styled.div`
  .stock {
    // padding-top: 10%;
    // width: 300px;
    // height: 330px;
    // left: 490px;
    // top: 200px;
    margin: 150px 10px 10px 10px;
  }
  /*padding: 12px 14px;*/
  //background: #B6C1D6;
  /*padding-top:0;
  padding-right:0;*/
  flex: 1;
  /*overflow: auto;*/
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .pi-tabgroup-class,
  .pitabs-wrapper {
    width: 100% !important;
    & > div {
      height: 100% !important;
      /* margin: 0 14px; */
      background: #fff;
    }
    & > div [role="tabpanel"] {
      flex-direction: column !important;
    }
  }
`;
export const RepairInfoSection = styled.div`
  .hii {
    margin-top: 24px;
    min-height: 186px;
    /* border: 1px solid #eee; */
    border: 1px solid #e3eaf6;
    background: #fff;
    /* padding: 17px 24px; */
    padding: 24px;
    /* padding-bottom: 32px; */
  }
  min-height: 186px;
  /* border: 1px solid #e3eaf6; */
  background: #fff;
  /* padding: 17px 24px; */
  padding: 24px;
  /* padding-bottom: 32px; */
  border-radius: 16px;
  .rep-label-typo {
    display: flex;
    gap: 10px;
    /* padding: 10px 0px; */
    h4,
    h6 {
      margin: 0;
      font-family: Inter;
      font-size: 22px;
      font-weight: 600;
      /* line-height: 30px; */
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
  /*div[role="tablist"]::before {
    background: #ebecf0 !important;
  }*/
  .user-field-details {
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    gap: 24px;
    /* row-gap: 32px; */
    /* margin-top: 24px; */
    & > div {
      width: 100% !important;
      padding: 0 !important;
      /* height: unset !important; */
      height: 70px;
    }
    @media screen and (max-width: 1544px) {
      grid-template-columns: repeat(3, minmax(150px, 1fr));
    }
    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(1, minmax(150px, 1fr));
    }
    @media screen and (max-width: 575px) {
      grid-template-columns: repeat(1, minmax(150px, 1fr));
    }
    .field-label-div {
      .label-text {
        font-weight: 400;
      }
    }
    p.description {
      font-weight: 700;
    }
  }
  .field-details {
    /* display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 20px; */
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    gap: 24px;
    row-gap: 0px;
    margin-top: 24px;
    & > div {
      width: 100% !important;
      padding: 0 !important;
      /* height: unset !important; */
      height: 70px;
    }
    @media screen and (max-width: 1544px) {
      grid-template-columns: repeat(3, minmax(150px, 1fr));
      row-gap: 16px;
    }
    @media screen and (max-width: 991px) {
      grid-template-columns: repeat(2, minmax(150px, 1fr));
    }
    @media screen and (max-width: 575px) {
      grid-template-columns: repeat(1, minmax(150px, 1fr));
    }
    .pi-label,
    .pi-address {
      //width: 25%;
      /* padding: 20px 0; */
      .label-text {
        font-weight: 400;
        font-size: 14px;
        font-family: Inter;
        color: #4e586d;
      }
      .description {
        font-weight: 600;
        font-family: Inter;
        color: #2e374a;
        /* padding-left: 6px; */
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
    /* @media screen and (min-width: 1544px) {
      width: 984px;
    } */
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
    cursor: pointer;
    &.edit-icon {
      border: 2px solid var(--themeBlue900);
    }
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
      padding-left: 0px;
    }
  }
  .notes_red_dot {
    &::after {
      content: "";
      height: 8px;
      width: 8px;
      background-color: red;
      border-radius: 50%;
      display: inline-block;
    }
  }
  .quote-address {
    .pi-address {
      padding-top: unset;
    }
  }
`;
export const DetailPageSection = styled.div`
  /* background: #f2f7ff; */
  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 24px;
  .grid {
    height: 400px;
  }
  > div {
    > div.pitabs-wrapper {
      height: 100% !important;
      overflow: hidden;
      div[role="tablist"] {
        padding: 0 10px;
      }
    }
  }
  @media screen and (min-width: 1544px) {
    margin: 0 auto;
    width: 1554px;
  }
`;
export const TabGroup = styled.div`
  padding: 0 15px;
`;
export const RepStatusLozenge = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.repiar-infosection-items {
    width: calc(33% - 16px);
  }
  //p {
  //  margin: 0;
  //}
`;
export const RightDetailContent = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
`;
export const DetailContent = styled.div`
  .hii {
    min-height: 186px;
    border: 1px solid #e3eaf6;
    background: #fff;
    padding: 16px;
    margin-top: 24px;
  }
  /* display: grid;
  grid-template-columns: 1fr auto; */
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
`;
