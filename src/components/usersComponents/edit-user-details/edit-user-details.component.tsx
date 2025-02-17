import styled from 'styled-components';

export const FormFlexWrapper = styled.div`
  /* justify-content: space-between; */
  /* justify-content: center; */
  align-items: center;
  display: flex;
  position: relative;

  /* width: 90%; */
`;
export const ProfileDetails = styled.div`
  &.profile .pi-label:first-child {
    p {
      font-size: 16px !important;
      font-weight: 700 !important;
    }
  }
`;
export const ImgUploadDiv = styled.div`
  width: 100px;
  height: 100px;
  background: #f5f7f7;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 0.5px solid #f5f7f7;
  //h4{
  //  margin: 0;
  //  font-size: 16px;
  //  color: #68787A;
  // font-weight: 500;
  //}
  .css-s32gra {
    background: transparent;
    position: absolute;
    width: 160px;
    height: 160px;
    z-index: 99;
  }
  .upload-container {
    top: 0;
    border: 0;
    padding: 0;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    color: #68787a;
    outline: none;
    position: absolute;
    z-index: 999;
    cursor: pointer;
    height: 100%;
    width: 100%;
    svg {
      display: none;
    }
  }
  //.files-list li{
  //  padding: 6px;
  //  font-weight: 500;
  //  font-size: 12px;
  //  color: #68787A;
  //  display: none;
  //}
  .profile-pic-actions {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(30 80 142 / 50%);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    p {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      margin: 0;
    }
  }
  &:hover {
    .profile-pic-actions {
      opacity: 1;
      visibility: visible;
    }
  }

  .notes-cross-img {
    width: 14px;
    position: absolute;
    top: 0%;
    right: 0;
    height: 14px;
    cursor: pointer;
  }
`;

export const ProfilePicAvatar = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 50px;
`;

export const EditUserRoleFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 11px;
  > div {
    width: calc(50% - 8px);
  }
`;
