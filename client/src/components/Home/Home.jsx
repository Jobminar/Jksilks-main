import { useNavigate } from "react-router-dom";
import "./hoome.css";
import Homedata from "./Homedata/homedata";
import mainimg from "./images/main-img.png";
import line from "./images/Line 15line.png";
import handloomes from "./images/handlooomes.png";
import exclusive from "./images/Rectangle 138.png";
import bestseller1 from "./images/Frame 224.png";
import bestseller2 from "./images/Frame 226.png";
import bestseller3 from "./images/Frame 29.png";
import bestseller4 from "./images/Frame 223.png";
import ratings from "./images/ratings.png";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar/>
      <div className="home-con">
        <div className="main-img">
          <img src={mainimg} alt="mainimg" />
        </div>
        {/* new arrivals */}
        <div className="new-arrivals">
          <div className="headding">
            <h1>New Arrivals</h1>
            <div>
            <img src={line} alt="line" />
            </div>
            
          </div>
          <div className="newarrivals-main-section">
            <div className="handloomes-section">
              <img src={handloomes} alt="handloomes" />
            </div>
            <div
              className="newarrivals-main-con"
              // onClick={() => {
              //   navigate("/addtocart");
              // }}
            >
              {Homedata.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="newarrivals-image"
                  />
                  <p className="newarrivalname">{item.name}</p>
                  <p>{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* exclusive bridal ware */}
        <div className="exclusive">
          <img src={exclusive} alt="exclusive" />
          <p>
            Exclusive Bridal Wear
            <br /> Sarees
          </p>
        </div>
        {/* Best sellers */}
        <div className="Best-sellers-con">
          <div className="headding">
            <h1>Best Sellers</h1>
            <div>
              <img src={line} alt="line" /> 
            </div>
         
          </div>
          <div className="best-sellers">
            <div className="best-sellers-sub">
              <img src={bestseller2} alt="bestseller1" />
              <p>Assam Silk Saree</p>
              <p>₹ 2599.00 </p>
            </div>
            <div className="best-sellers-sub">
              <img src={bestseller1} alt="bestseller1" />
              <p>Assam Silk Saree</p>
              <p>₹ 2599.00 </p>
            </div>
            <div className="best-sellers-sub">
              <img src={bestseller3} alt="bestseller1" />
              <p>Assam Silk Saree</p>
              <p>₹ 2599.00 </p>
            </div>
            <div className="best-sellers-sub">
              <img src={bestseller4} alt="bestseller1" />
              <p>Assam Silk Saree</p>
              <p>₹ 2599.00 </p>
            </div>
          </div>
        </div>
        {/* Happy customers */}
        <div className="headding">
          <h1>Happy customers</h1>
          <img src={line} alt="line" />
        </div>
        <div className="happy-customers">
          <div className="happy-customers-sub">
            <img src={ratings} alt="ratings" />
            <p>
              Wore this lovely red saree with a woollen skivi for a winter
              morning function. Looked elegant and is extremely comfortable to
              wear.
            </p>
            <h2>Archan M.S</h2>
          </div>
          <div className="happy-customers-sub">
            <img src={ratings} alt="ratings" />
            <p>
              Wore this lovely red saree with a woollen skivi for a winter
              morning function. Looked elegant and is extremely comfortable to
              wear.
            </p>
            <h2>Archan M.S</h2>
          </div>
          <div className="happy-customers-sub">
            <img src={ratings} alt="ratings" />
            <p>
              Wore this lovely red saree with a woollen skivi for a winter
              morning function. Looked elegant and is extremely comfortable to
              wear.
            </p>
            <h2>Archan M.S</h2>
          </div>
          <div className="happy-customers-sub">
            <img src={ratings} alt="ratings" />
            <p>
              Wore this lovely red saree with a woollen skivi for a winter
              morning function. Looked elegant and is extremely comfortable to
              wear.
            </p>
            <h2>Archan M.S</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
