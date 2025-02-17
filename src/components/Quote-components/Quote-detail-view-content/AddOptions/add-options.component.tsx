import styled from "styled-components";

export const AddOptionsText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: 10px;
  p {
    margin: 0 10px;
  }
`;

export const ThemeBlueText = styled.div`
  p {
    color: var(--themeBlue800);
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DetailViewHeaderRightIcons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  .quote-option-del-icon {
    padding: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .no-dropdown {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  @media screen and (max-width: 1280px) {
    .no-dropdown {
      display: none;
    }
  }
  @media screen and (min-width: 1281px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 1281px) {
    .is_display {
      display: none;
    }
  }
`;
