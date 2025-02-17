import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  border-bottom: 1px solid #e3eaf6;
`;
export const RepairIdsDiv = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  .repair-view-left-image {
    height: 40px;
    width: 40px;
  }
`;
export const BackSection = styled.div`
  display: flex;
  align-items: center;
`;
export const RepairIds = styled.div`
  .id-num {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    // line-height: 29px;
    letter-spacing: 0px;
    text-align: left;
  }
  .repair-name {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    // line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
    color: #4e586d;
  }
  .quote-num-and-status {
    display: flex;
    gap: 8px;
    align-items: center;
    label {
      margin-bottom: 0px !important;
    }
  }
`;
export const RightSideContent = styled.div`
  display: flex;
  align-items: center;
  /*margin-right: 12px;*/
  gap: 10px;
`;
export const AnchorTag = styled.a`
  text-decoration: none;
  display: flex;
`;
