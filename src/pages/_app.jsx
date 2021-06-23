import { StatesWrapper } from "../context/rankingContext";
import { ScoreWrapper } from "../context/scoreContext";
import "../styles/globals.scss";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Clocky from '../components/Clocky';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StatesWrapper>
        <ScoreWrapper>
          <Header />
          <div className="contentDiv">
            <Clocky />
            <Component {...pageProps} />
          </div>
          <Menu />
        </ScoreWrapper>
      </StatesWrapper>
    </div>
  );
}

export default MyApp;
