import React, { useState } from "react";
import { CirclePicker } from "react-color";

const ColorPalette = ({ onSelectColor, initialColor }) => {
    const [color, setColor] = useState(initialColor || "#2196f3"); // Default color

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
                <CirclePicker color={color} onChange={handleChange} />
            </div>
            <div className="d-flex justify-content-start">
                <button
                    className="btn mt-3"
                    onClick={handleSelect}
                    style={{ backgroundColor: color, marginLeft: "4rem" }}
                >
                    Select Color
                </button>
            </div>
        </div>
    );
};

export default ColorPalette;
