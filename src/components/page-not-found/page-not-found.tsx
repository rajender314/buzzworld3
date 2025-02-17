import ErrorImg from "@app/assets/images/Error404.svg";
import { ErrorContainer, ErrorImgContainer } from "./page-not-found.component";

export default function ErrorPage({ errorMsg }: any) {
  return (
    <ErrorContainer>
      <ErrorImgContainer>
        <img src={ErrorImg} alt="" />

        <p>{errorMsg || "Page Not Found"}</p>
      </ErrorImgContainer>
    </ErrorContainer>
  );
}
