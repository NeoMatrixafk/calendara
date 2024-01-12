import React, { useState } from "react";
import { GithubPicker } from "react-color";

const ColorPalette = ({ onSelectColor, initialColor }) => {
  const [color, setColor] = useState(initialColor || "#3174ad"); // Default color

  const handleChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleSelect = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSelectColor(color);
    alert(`Color selected: ${color}`);
  };

  return (
    <div>
      <GithubPicker color={color} onChange={handleChange} />
      <button className="btn" onClick={handleSelect} style={{backgroundColor: color}}>Select Color</button>
    </div>
  );
};

export default ColorPalette;
