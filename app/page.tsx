"use client"; 

import { useState, useEffect } from "react";
import shapes from './shapes'; // Import the corrected shapes data
import pictures from './pictures.json'; // Ensure pictures.json exists and is valid

// If you plan to use framer-motion, uncomment this line and install it:
// npm install framer-motion or yarn add framer-motion
// import { motion } from 'framer-motion';

export default function Home() {
  const [copyButton, setCopyButton] = useState(false);
  const [activeShapeName, setActiveShapeName] = useState("Custom"); // New state to track active shape

  interface DivData {
    id: number;
    xPosition: number;
    yPosition: number;
  }

  const [divs, setDivs] = useState<DivData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ x: 480, y: 480 });
  const [bgImage, setBgImage] = useState('/Zoro.jpeg'); // Default background image

  // Effect to reset "Copied" message
  useEffect(() => {
    if (copyButton) {
      const timer = setTimeout(() => {
        setCopyButton(false);
      }, 2000); // Reset after 2 seconds
      return () => clearTimeout(timer); // Cleanup on component unmount or if copyButton changes before timeout
    }
  }, [copyButton]);

  // Function to add a single div point on canvas click
  function addDiv(e: React.MouseEvent<HTMLDivElement>) {
    // Only allow adding custom points if "Custom" shape is active
    if (activeShapeName === "Custom") {
      const container = e.currentTarget.getBoundingClientRect();
      const x = Math.round(e.clientX - container.left);
      const y = Math.round(e.clientY - container.top);

      setDivs([...divs, { id: Date.now(), xPosition: x, yPosition: y }]);
      // console.log(divs, 'divs'); // This will show the previous state due to closure
      // console.log(container, "container");
    }
  }

  // Function to handle shape button clicks
  const handleShapeSelection = (selectedShapeName: string) => {
    setActiveShapeName(selectedShapeName); // Set the new active shape

    let newDivs: DivData[] = [];
    switch (selectedShapeName) {
      case "Custom":
        newDivs = []; // Clear divs for custom drawing
        break;
      case "Triangle":
        newDivs = [
          { id: Date.now(), xPosition: Math.round(canvasSize.x / 2), yPosition: 0 },
          { id: Date.now() + 1, xPosition: 0, yPosition: canvasSize.y },
          { id: Date.now() + 2, xPosition: canvasSize.x, yPosition: canvasSize.y },
        ];
        break;
      case "Square":
        newDivs = [
          { id: Date.now(), xPosition: 0, yPosition: 0 },
          { id: Date.now() + 1, xPosition: canvasSize.x, yPosition: 0 },
          { id: Date.now() + 2, xPosition: canvasSize.x, yPosition: canvasSize.y },
          { id: Date.now() + 3, xPosition: 0, yPosition: canvasSize.y },
        ];
        break;
      case "Circle":
        // For a circle, you often use `circle()` in clip-path directly
        // but if you want points, you might approximate or use specific circle-based points
        // For simplicity, let's keep it empty or add some example points for now.
        // Or you might handle this via a different CSS property
        newDivs = []; // No points for CSS circle directly via 'path()'
        break;
      // Add more cases for other predefined shapes as needed
      // case "Ellipse":
      //   newDivs = [...];
      //   break;
      // case "Trapezoid":
      //   newDivs = [...];
      //   break;
      // ...
      default:
        newDivs = []; // Default to clearing if no specific shape logic
        break;
    }
    setDivs(newDivs);
  };

  // Function to copy the clip-path CSS to clipboard
  const copyClipPathToClipboard = () => {
    const clipPathString = `clip-path: path(${divs.map(div => `${div.xPosition}px,${div.yPosition}px`).join(' ')});`;
    navigator.clipboard.writeText(clipPathString)
      .then(() => {
        setCopyButton(true);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        // Optionally, show an error message to the user
      });
  };

  return (
    <>
      <div className="h-screen w-full bg-black flex-col-reverse flex gap-2 md:flex-row justify-between items-center">
        {/* Left Panel: Shapes, Canvas Size, Custom Image */}
        <div className="w-[30%] h-full border border-white rounded-2xl p-4 overflow-y-auto"> {/* Added p-4 and overflow-y-auto */}
          {/* Shapes */}
          <div className="grid grid-cols-4 gap-4 place-items-center mb-6"> {/* Added mb-6 for spacing */}
            {
              shapes.map((s, index) => (
                <button
                  key={index}
                  onClick={() => handleShapeSelection(s.name)}
                  className={`w-16 h-16 border rounded-md text-white text-xs flex flex-col justify-center items-center ${activeShapeName === s.name ? 'border-blue-500' : 'border-white'}`}
                  title={s.name} // Added title for hover info
                >
                  <img className="w-12 h-12 object-contain" src={s.img_name} alt={s.name} /> {/* object-contain for better image fitting */}
                  {s.name}
                </button>
              ))
            }
          </div>
          {/* Demo Size */}
          <div className="mb-6">
            <p className="text-white text-xl py-2">Demo size <span className="text-gray-500">(in px)</span></p>
            <div className="flex justify-around items-center gap-4">
              <input
                value={canvasSize.x}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                type="number" // Use type="number" for numerical inputs
                className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20 bg-transparent"
                placeholder="320" // Removed px from placeholder
                min="1" // Minimum size
              />
              <p className="text-white text-xl">X</p>
              <input
                value={canvasSize.y}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                type="number" // Use type="number"
                className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20 bg-transparent"
                placeholder="320"
                min="1"
              />
            </div>
          </div>
          {/* Custom Image */}
          <div className="grid gap-4 mb-6">
            <div>
              <p className="text-white text-xl py-2">Custom Image</p>
              <div className="flex justify-between items-center ">
                {
                  pictures.map((pic, index) => (
                    <button
                      key={index}
                      onClick={() => setBgImage(pic.img_name)}
                      className="w-16 h-16 border-white border rounded-md overflow-hidden" // Added rounded-md, overflow-hidden
                      title={pic.img_name} // Assuming 'name' might exist in pictures.json too
                    >
                      <img src={`/${pic.img_name}`} alt={'Background Image'} className="w-full h-full object-cover" /> {/* object-cover for filling button */}
                    </button>
                  ))
                }
              </div>
            </div>
            <input
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
              type="text"
              className="border border-white py-2 rounded-2xl w-full text-white px-4 overflow-hidden bg-transparent"
              placeholder="Custom Image URL"
            />
          </div>
          <div className="rounded-2xl mt-auto"> {/* mt-auto pushes it to the bottom */}
            <p className="text-white text-xl py-2 px-4 text-center">Made by Aryan Bola</p>
          </div>
        </div>

        {/* Right Panel: Header, Canvas, Clip-path Output */}
        <div className="h-full w-full grid grid-rows-12 gap-2 p-2"> {/* Added p-2 */}
          {/* Header */}
          <div className="px-4 py-2 flex justify-between items-center rounded-2xl border border-white row-span-1">
            <p className="text-white text-2xl font-semibold">PathClipper</p>
            <p className="text-white text-xl ">By Aryan Bola</p>
          </div>
          {/* Canvas */}
          <div className="h-full border border-white rounded-2xl w-full flex justify-center items-center row-span-10 overflow-hidden bg-gray-900"> {/* Added bg-gray-900 */}
            <div
              className="border border-white relative cursor-crosshair" // Added cursor-crosshair
              style={{
                width: canvasSize.x > 0 ? canvasSize.x : 1, // Prevent 0px size
                height: canvasSize.y > 0 ? canvasSize.y : 1, // Prevent 0px size
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // Optional: Add a subtle shadow or border for better visibility if image is light
                boxShadow: '0 0 5px rgba(255,255,255,0.3)'
              }}
              onClick={(e) => addDiv(e)}
            >
              {divs.map(div => (
                <div
                  key={div.id}
                  className="w-4 h-4 rounded-full bg-red-500 absolute cursor-move"
                  style={{
                    top: div.yPosition - 8, // Adjust for center of 16px (w-4 h-4 is 16px) dot
                    left: div.xPosition - 8, // Adjust for center of 16px dot
                  }}
                  // You might want to make these points draggable later using motion.div
                />
              ))}
            </div>
          </div>
          {/* Clip-path Output */}
          <div className="h-full w-full row-span-2 flex justify-start items-center px-4 border border-white bg-black rounded-2xl relative overflow-hidden">
            <p className="text-white text-lg font-medium flex gap-2 flex-wrap text-wrap break-all"> {/* Added text-wrap break-all for long lines */}
              clip-path: path(
              {
                divs.map(div => (
                  <span key={div.id}>{div.xPosition}px,{div.yPosition}px </span> // Added space for readability
                ))
              }
              );
            </p>
            <button
              className="absolute top-2 right-2 border border-white px-4 py-2 rounded-2xl bg-black text-white text-xl cursor-pointer hover:bg-gray-800 transition-colors duration-200" // Added hover effect
              onClick={copyClipPathToClipboard}
            >
              {copyButton ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}