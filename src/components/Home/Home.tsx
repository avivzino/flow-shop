import { ProductList } from "../ProductList/ProductList";
import { SMALL_SCREEN } from "../../utils/utils";
import "./Home.css";

export const Home = () => (
  <>
    <div className="home flex column align-items-center">
      <div className="hero flex align-items-center justify-content-space-between">
        <div>
          <h1 className="animate__animated animate__fadeInDown">
            Discover clothes that match your flow
          </h1>
          <h2 className="animate__animated animate__fadeInUpBig">
            Save up to 50%
          </h2>
        </div>
        <img src="/assets/woman.png" height={SMALL_SCREEN ? 350 : 800} />
      </div>
    </div>
    <ProductList />
  </>
);
