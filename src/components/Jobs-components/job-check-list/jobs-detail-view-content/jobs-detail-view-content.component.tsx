import styled from 'styled-components';

export const TabContainer = styled.div`
  /*padding: 12px 14px;*/
  //background: #B6C1D6;
  /*padding-top:0;
  padding-right:0;*/
  flex: 1;
  /*overflow: auto;*/
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
  min-height: 186px;
  border: 1px solid #e3eaf6;
  background: #fff;
  /* padding: 17px 24px; */
  padding: 16px;
  /*margin: 20px 0;*/
  /*margin-top:0;*/
  .rep-label-typo {
    display: flex;
    gap: 10px;
    h4,
    h6 {
      margin: 0;
      font-family: Inter;
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: 0px;
      text-align: left;
      color: #2e374a;
    }
  }
  hr {
    border-top: 1px solid #e3eaf6;
  }
  .field-details {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .css-kwt1xk {
      //width: 25%;
      padding: 20px 0;
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
  }
`;
export const DetailPageSection = styled.div`
  background: #f2f7ff;
  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 24px;
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
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
`;
