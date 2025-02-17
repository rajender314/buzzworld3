import styled from 'styled-components';

export const ItemDetailCardContainer = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: var(--greyCardBgColor);
  border: 1px solid var(--greyCardBorder);
  padding: 24px 24px;
  box-sizing: border-box;
  //margin-top: 18px;
  h4 {
    color: #2e374a;
    padding: 0 0 12px 4px;
  }
`;
export const UserRolesField = styled.div`
  // padding: 20px;
  /* border-bottom: 1px solid #eaeaea; */
`;
export const DetailsContainer = styled.div`
  display: flex;
`;
export const RepairDetailsContain = styled.div`
  .qcdata {
    display: flex;
    gap: 8px;
    flex-direction: column;
    font-size: 14px;
  }
  // .css-111wzdl {
  //   padding: 0px 0px 22px 27px;
  // }
`;

export const PartItemDetails = styled.div`
  .part-parent {
    padding: 18px 0;
  }
  .repair-description {
    //styleName: Fonts/Regular Paragraph : 14;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #2e374a;
  }
  .quantity-parent {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    .pi-label {
      padding: 3px;
      width: 33%;
      max-width: calc(33% - 12px);
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
  }
`;
export const ItemImg = styled.img`
  width: 172px;
  height: 172px;
`;

export const ItemData = styled.div`
  &.d-flex {
    display: flex;
    flex-wrap: wrap;
  }
  div {
    display: flex;
    flex-wrap: wrap;
  }
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
`;
export const ItemImgDiv = styled.div``;
export const ScrollContainer = styled.div`
  height: 600px;
  overflow: auto;
`;
export const ItemSelectDiv = styled.div`
  width: 40%;
  padding: 0 0 13px 0;
  .css-re7y6x {
    padding-left: 4px;
  }
`;
export const PickerDiv = styled.div`
  width: calc(50% - 6px);
`;

export const FieldsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 16px 0 0 0;
  .assigne-name {
    width: calc(50% - 4px);
  }
`;

export const UnderlineText = styled.p`
  color: #3176d2;
  font-weight: 600;
  font-size: 14px;
  text-decoration: underline;
  float: right;
  cursor: pointer;
`;
