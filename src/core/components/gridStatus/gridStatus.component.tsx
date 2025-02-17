import styled from 'styled-components';

export const StatusStyles = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 0;
  }
`;
export const QuoteActivityPill = styled.div`
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  margin: 4px 0px;
  text-transform: uppercase;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  float: right;
  &.open {
    background-color: #fff0d7;
    color: #a26a11;
  }
  &.pending_approval {
    background-color: #e3f2fd;
    color: var(--themeBlue900);
  }
  &.approved {
    background-color: #ccede5;
    color: #19836a;
  }
  &.rejected {
    background-color: #f8dbd9;
    color: #af1515;
  }
  &.cancelled {
    background-color: #f8dbd9;
    color: #af1515;
  }
  &.inprogress {
    background-color: #d9dcff;
    color: #0f1d99;
  }
  &.success {
    background-color: #e3fcef;
    color: #006644;
  }
  &.removed {
    background-color: #ffebe6;
    color: #bf2600;
  }
  &.moved {
    background-color: #fff0b3;
    color: #172b4d;
  }
  &.requested {
    background-color: #fff0d7;
    color: #a26a11;
  }
  &.Ordered {
    background-color: #dee4f4;
    color: #11508e;
  }
  &.Partially {
    background-color: #deebff;
    color: #134c85;
  }
  &.hi {
    background: red;
  }
  &.scrap {
    background-color: #fef0c7;
    color: #93370d;
  }
  &.recycle {
    background-color: #ffe8e8;
    color: #da0202;
  }
  &.return {
    background-color: #f2f4f7;
    color: #1d2939;
  }
  &.outsource {
    background-color: #abb7e1;
    color: #062285;
  }
  &.closed {
    background-color: #dfdfdf;
    color: #5e5e5e;
  }
  &.completed {
    background-color: #dcfae6;
    color: #085d3a;
  }
`;
