import React, { useState, useEffect } from "react";
import "./Hostelpics.css"; // Create a corresponding CSS file for styling
import image1 from "../hostel/image1.jpeg";
import image2 from "../hostel/image2.jpeg";
import image3 from "../hostel/image3.jpeg";
import image4 from "../hostel/image4.jpeg";
import image5 from "../hostel/image5.jpeg";
import image6 from "../hostel/image6.jpeg";
import image7 from "../hostel/image7.jpeg";
import image8 from "../hostel/image8.jpeg";
import image9 from "../hostel/image9.jpeg";
import image10 from "../hostel/image10.jpeg";
import image11 from "../hostel/image11.jpeg";
import image12 from "../hostel/image12.jpeg";

const Hostelpics = () => {
  const [imageRows, setImageRows] = useState([
    // Each row contains an array of image URLs
    [image1, image2, image3, image4],
    [image5, image6, image7, image8],
    [image9, image10, image11, image12],
  ]);

  // Function to rotate images in each row
  const rotateImages = () => {
    setImageRows((prevRows) =>
      prevRows.map((row) => {
        const rotatedRow = [...row];
        const lastImage = rotatedRow.pop();
        rotatedRow.unshift(lastImage);
        return rotatedRow;
      })
    );
  };

  useEffect(() => {
    // Rotate images every 3 seconds
    const intervalId = setInterval(rotateImages, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="image-carousel">
      <h2>SV Hostel Images</h2>
      {imageRows.map((row, rowIndex) => (
        <div key={rowIndex} className="image-row">
          {row.map((imageUrl, imageIndex) => (
            <img
              key={imageIndex}
              src={imageUrl}
              alt={`Image ${imageIndex + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Hostelpics;
