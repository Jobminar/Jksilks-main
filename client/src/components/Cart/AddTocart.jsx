import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Recommend from "../Recommend";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const navigate = useNavigate();
  let setSelectedStars = 0;
  const reviews = 5;
  const [selectedImage, setSelectedImage] = useState(
    "https://file.rendit.io/n/ajLZlmyoEBogu1p60P82.png"
  );
  const [quantity, setQuantity] = useState(1);

  const productDetails = {
    id: 1, // Add a unique ID for each product
    name: "Bandhani Saree",
    fabric: "Silk",
    washCare: "Dry Clean Only",
    length: "6.25 - 6.40 meters",
    price: 2599,
    rating: 4.5,
    isPrime: true,
    sizeOptions: ["S", "M", "L", "XL"],
    colorOptions: ["Red", "Green", "Blue"],
    images: [
      "https://file.rendit.io/n/G71ME39dsh78TJ1DH4iK.png",
      "https://file.rendit.io/n/r9gVmmVbH6rbUAX1LcCb.png",
      "https://file.rendit.io/n/ajLZlmyoEBogu1p60P82.png",
      "https://file.rendit.io/n/r9gVmmVbH6rbUAX1LcCb.png",
    ],
  };

  const [cartItems, setCartItems] = useState([]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(
      (item) => item.id === productDetails.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCartItems.push({
        id: productDetails.id,
        name: productDetails.name,
        price: productDetails.price,
        quantity,
      });
    }

    setCartItems(updatedCartItems);
    // Update the cart total using backend logic or state management library
  };

  const handleBuyNow = () => {
    navigate("/cart");
    // Implement payment processing using a third-party gateway
  };

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value) || 1));
  };

  // Helper function to render star ratings
  const renderStarRatings = () => {
    const stars = [];
    const filledStars = Math.floor(productDetails.rating);
    const hasHalfStar = productDetails.rating % 1 !== 0;

    const handleStarClick = (index) => {
      // Allow only one click to select stars
      setSelectedStars(index + 1);
    };

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <AiFillStar
          key={i}
          color="#FFD700"
          size={30} // Adjust the size as needed
          onClick={() => handleStarClick(i)}
          style={{ cursor: "pointer" }}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <AiOutlineStar
          key={filledStars}
          color="#FFD700"
          size={30} // Adjust the size as needed
          onClick={() => handleStarClick(filledStars)}
          style={{ cursor: "pointer" }}
        />
      );
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <AiOutlineStar
          key={filledStars + i + (hasHalfStar ? 1 : 0)}
          color="#FFD700"
          size={30} // Adjust the size as needed
          onClick={() =>
            handleStarClick(filledStars + i + (hasHalfStar ? 1 : 0))
          }
          style={{ cursor: "pointer" }}
        />
      );
    }

    return stars;
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Main Product Image and Details */}
        <div className="col-md-12">
          <div className="card border-0">
            <div className="row g-0">
              {/* Thumbnail Gallery */}
              <div
                className="col-md-2 mr-0 p-0"
                style={{ overflowX: "hidden", width: "160px" }}
              >
                <div className="card-body">
                  <div className="d-flex flex-column align-items-start">
                    {productDetails.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`rounded-md shadow-md cursor-pointer ${
                          selectedImage === image
                            ? "border-2 border-orange-500"
                            : "opacity-50"
                        } mb-2`}
                        onClick={() => handleImageClick(image)}
                        style={{
                          width: "140px",
                          height: "140px",
                          marginBottom: "8px",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Selected Product Image */}
              <div className="col-md-3 ml-0">
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="img-fluid rounded-md shadow-md border-2 border-orange-500"
                  style={{
                    width: "600px",
                    height: "600px",
                    maxHeight: "800px",
                    marginTop: "15px",
                    marginLeft: "0px",
                  }}
                />
              </div>

              {/* Product Details */}
              <div
                className="col-md-7 d-flex flex-column justify-content-between ml-2"
                style={{ width: "810px" }}
              >
                <div className="card-body">
                  <h2 className="card-title text-4xl fw-bold">
                    {productDetails.name}
                  </h2>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <div className="flex flex-row gap-1 items-center">
                      {renderStarRatings()}
                      <span className="text-4xl fw-bold text-warning">
                        {productDetails.rating}
                      </span>
                      <span className="text-gray-500"> out of 5 stars</span>{" "}
                      <span className="text-2xl">
                        {" "}
                        ( {reviews} ) Reviews |{" "}
                      </span>
                      <span className="text-2xl"> Write a Review </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="flex flex-row ml-px gap-3 w-2/3 items-start">
                      <div className="text-4xl fw-bold text-dark">
                        <span
                          style={{ fontSize: "1.5rem" }}
                        >{`₹ ${productDetails.price.toFixed(2)}`}</span>
                        {productDetails.isPrime && (
                          <span className="px-3 py-1 text-dark rounded-md">
                            inclusive of all taxes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="card-text text-xl text-gray-600">
                    Fabric: {productDetails.fabric}
                  </p>
                  <p className="card-text text-xl text-gray-600">
                    Washcare: {productDetails.washCare}
                  </p>
                  <p className="card-text text-xl text-gray-600">
                    Length: {productDetails.length}
                  </p>

                  <h4
                    id="SKUSA1"
                    className="text-3xl font-semibold relative mt-24 font-weight-bold"
                  >
                    SKU:<span>SA6432</span>
                  </h4>
                </div>

                <div className="card-body d-flex flex-column align-items-start">
                  <div className="flex flex-row w-4/5 items-start">
                    <span className="text-xl font-weight-bold">
                      Availability:
                    </span>
                    <span className="text-xl" style={{ color: "#12ad05" }}>
                      In Stock
                    </span>
                  </div>

                  <div className="flex flex-col gap-px w-full items-start mt-2">
                    <div className="text-xl font-medium font-weight-bold">
                      DELIVERY OPTIONS:
                    </div>
                    <div className="font-sans text-[#9f9c9c] mt-1">
                      Please enter PIN code to check delivery time & COD
                      options!
                    </div>
                  </div>
                  {/* PIN Code Entry */}
                  <div className="input-group mb-3 mt-3 w-50">
                    <input
                      type="text"
                      className="form-control w-50"
                      placeholder="Enter Pincode"
                      aria-label="Enter Pincode"
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                    >
                      Check
                    </button>
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-4">
                    <span className="text-xl fw-bold">Quantity:</span>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary rounded-md"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="form-control rounded-md mx-2"
                        style={{ width: "60px" }}
                      />
                      <button
                        className="btn btn-outline-secondary rounded-md"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center mt-3">
                  <div className="col-6 m-1">
                    <button
                      className="btn btn-outline-light text-dark rounded-md w-100 border-black"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="col-6 m-1">
                    <button
                      className="btn btn-warning text-black rounded-md w-100 border-black"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="row m-auto mt-5">
        <div className="text-xl fw-medium ml-1">Recommended for you</div>
        <Recommend />
      </div>
    </div>
  );
};

export default AddToCart;
