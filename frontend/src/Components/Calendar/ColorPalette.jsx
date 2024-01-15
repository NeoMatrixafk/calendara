import React, { useState } from "react";
import { TwitterPicker } from "react-color";

const ColorPalette = ({ onSelectColor, initialColor }) => {
    const [color, setColor] = useState(initialColor || "#3174ad"); // Default color

    const handleChange = (selectedColor) => {
        setColor(selectedColor.hex);
    };

    const handleSelect = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        onSelectColor(color);
        console.log(`Color selected: ${color}`);
    };

    return (
        <div>
            <div>
                <TwitterPicker color={color} onChange={handleChange} />
            </div>
            <div
                style={{ width: "51%" }}
                className="d-flex justify-content-center"
            >
                <button
                    className="btn mt-3"
                    onClick={handleSelect}
                    style={{ backgroundColor: color }}
                >
                    Select Color
                </button>
            </div>
        </div>
    );
};

export default ColorPalette;
