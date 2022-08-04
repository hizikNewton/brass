import Banner from "components/Banner";
import Content from "components/Content";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <Content>
      <Banner />
      <div className="container">
        <div className={styles.HomeHeaderTopPanel}>{"home"}</div>
      </div>
    </Content>
  );
};

export default Home;
