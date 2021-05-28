import { StatesWrapper } from "../context/rankingContext";
import "../styles/globals.scss";
import Header from "../components/Header";
import Menu from "../components/Menu";

function MyApp({ Component, pageProps }) {
  return (
    <StatesWrapper>
      <div className="headerDiv">
        <Header />
      </div>
      <div className="contentDiv">
        <Component {...pageProps} />
      </div>
      <div className="footerDiv">
        <Menu />
      </div>
    </StatesWrapper>
  );
}

export default MyApp;
