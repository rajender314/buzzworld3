import styled from 'styled-components';

export const SpDetailViewContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: 0px 24px;
  //justify-content: space-between;
  //height: 100%;
  .details-right {
    flex: 1;
    width: 100%;
    overflow: hidden;
    .pitabs-wrapper {
      height: 100%;
      margin: 0 14px;
      & > div {
        height: 100%;
      }
    }
  }
`;

export const SpLeftFilterContainer = styled.div`
  width: 275px;
  height: 100%;
  overflow: auto;
  border-right: 1px solid var(--greyCardBorder);
  padding-left: 1px;
`;
