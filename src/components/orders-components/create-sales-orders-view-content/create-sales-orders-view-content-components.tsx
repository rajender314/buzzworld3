import styled from 'styled-components';

export const CreateSalesOrderTabContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .pi-tabgroup-class,
  .pitabs-wrapper {
    width: 100% !important;
    & > div {
      height: 100% !important;
      background: #fff;
    }
    & > div [role="tabpanel"] {
      flex-direction: column !important;
    }
  }
`;

export const CreateSalesOrderInfoSection = styled.div`
  min-height: 186px;
  border: 1px solid #e3eaf6;
  background: #fff;
  /* padding: 17px 24px; */
  padding: 16px;

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
export const CreateSalesOrderDetailPageSection = styled.div`
  background: #f2f7ff;
  flex: 1;
  overflow: hidden;
  display: flex;
  gap: 24px;
`;

export const CreateSalesOrderDetailContent = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;
