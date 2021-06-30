import { StatesWrapper } from "../context/rankingContext";
import { ScoreWrapper } from "../context/scoreContext";
import "../styles/globals.scss";
import Header from "../components/Header";
import Menu from "../components/Menu";
import AlarmPop from "../components/AlarmPop";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StatesWrapper>
        <ScoreWrapper>
          <Header />
          <div className="contentDiv">
            <AlarmPop />
            <Component {...pageProps} />
          </div>
          <Menu />
        </ScoreWrapper>
      </StatesWrapper>
    </div>
  );
}

export default MyApp;
