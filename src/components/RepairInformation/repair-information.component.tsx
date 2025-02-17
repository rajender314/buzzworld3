import styled from 'styled-components';

export const UserNameField = styled.div`
  /* padding: 12px 4px; */
  p {
    margin: 5px 0px;
    font-weight: 400;
    font-size: 14px;
    font-family: Inter;
    color: #4e586d;
    /* color: #2e374a; */
    /* padding-left: 6px; */
  }
  &.calc-width-25 {
    width: calc(25% - 16px);
    /*> div {
      max-width: unset;
      width: unset;
    } */
  }
  &.calc-width-33 {
    width: calc(33% - 16px);
    gap: 10px;
    /* padding: 20px 0; */
    /* padding: 16px 0px; */
    height: 70px;
    & > div {
      /*max-width: unset;
      width: unset;*/
      /* padding: 0 !important; */
      /* padding-left: 6px !important; */
    }
  }
`;
export const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  /* padding-left: 6px !important; */

  > div {
    pointer-events: none;
  }
  .hide {
    display: none;
  }
  .user-name {
    font-weight: 600;
    color: #2e374a;
  }
  .css-c1ar99 {
    flex: 1;
  }
  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
`;

export const RepairImgTag = styled.img`
  cursor: pointer;
`;
export const LabelNameField = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
