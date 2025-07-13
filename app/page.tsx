// "use client";

// import { useState, useEffect } from "react";
// import shapes from './shapes.json';
// import pictures from './pictures.json';
// import { calculateShapeDivs } from './features/handleShape'; 

// import { motion } from 'motion/react';

// export default function Home() {
//   const [copyButton, setCopyButton] = useState(false);
//   const [activeShapeName, setActiveShapeName] = useState("Custom");

//   interface DivData {
//     id: number;
//     xPosition: number;
//     yPosition: number;
//   }

//   const [divs, setDivs] = useState<DivData[]>([]);
//   const [canvasSize, setCanvasSize] = useState({ x: 480, y: 480 });
//   const [bgImage, setBgImage] = useState('/Zoro.jpeg');

//   useEffect(() => {
//     if (copyButton) {
//       const timer = setTimeout(() => {
//         setCopyButton(false);
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [copyButton]);

//   function addDiv(e: React.MouseEvent<HTMLDivElement>) {
//     if (activeShapeName === "Custom") {
//       const container = e.currentTarget.getBoundingClientRect();
//       const x = Math.round(e.clientX - container.left);
//       const y = Math.round(e.clientY - container.top);

//       setDivs([...divs, { id: Date.now(), xPosition: x, yPosition: y }]);
//     }
//   }

//   const handleShapeSelection = (selectedShapeName: string) => {
//     setActiveShapeName(selectedShapeName); 

//     const newCalculatedDivs = calculateShapeDivs(selectedShapeName, canvasSize);
//     setDivs(newCalculatedDivs as DivData[]); 
//   };

//   const copyClipPathToClipboard = () => {
//     const clipPathString = `clip-path: path(${divs.map(div => `${div.xPosition}px,${div.yPosition}px`).join(' ')});`;
//     navigator.clipboard.writeText(clipPathString)
//       .then(() => {
//         setCopyButton(true);
//       })
//       .catch(err => {
//         console.error('Failed to copy: ', err);
//       });
//   };

//   return (
//     <>
//       <div className="h-screen w-full bg-black flex-col-reverse flex gap-2 md:flex-row justify-between items-center">
//         {/* Left Panel: Shapes, Canvas Size, Custom Image */}
//         <div className="w-[30%] h-full border border-white rounded-2xl p-4 overflow-y-auto">
//           {/* Shapes */}
//           <div className="grid grid-cols-4 gap-4 place-items-center mb-6">
//             {
//               shapes.map((s, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleShapeSelection(s.name)}
//                   className={`w-16 h-16 border rounded-md text-white text-xs flex flex-col justify-center items-center ${activeShapeName === s.name ? 'border-blue-500' : 'border-white'}`}
//                   title={s.name}
//                 >
//                   <img className="w-12 h-12 object-contain" src={s.img_name} alt={s.name} />
//                   {s.name}
//                 </button>
//               ))
//             }
//           </div>
//           {/* Demo Size */}
//           <div className="mb-6">
//             <p className="text-white text-xl py-2">Demo size <span className="text-gray-500">(in px)</span></p>
//             <div className="flex justify-around items-center gap-4">
//               <input
//                 value={canvasSize.x}
//                 onChange={(e) => setCanvasSize(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
//                 type="number"
//                 className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20 bg-transparent"
//                 placeholder="320"
//                 min="1"
//               />
//               <p className="text-white text-xl">X</p>
//               <input
//                 value={canvasSize.y}
//                 onChange={(e) => setCanvasSize(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
//                 type="number"
//                 className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20 bg-transparent"
//                 placeholder="320"
//                 min="1"
//               />
//             </div>
//           </div>
//           {/* Custom Image */}
//           <div className="grid gap-4 mb-6">
//             <div>
//               <p className="text-white text-xl py-2">Custom Image</p>
//               <div className="flex justify-between items-center ">
//                 {
//                   pictures.map((pic, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setBgImage(pic.img_name)}
//                       className="w-16 h-16 border-white border rounded-md overflow-hidden"
//                       title={pic.img_name}
//                     >
//                       <img src={`/${pic.img_name}`} alt={'Background Image'} className="w-full h-full object-cover" />
//                     </button>
//                   ))
//                 }
//               </div>
//             </div>
//             <input
//               value={bgImage}
//               onChange={(e) => setBgImage(e.target.value)}
//               type="text"
//               className="border border-white py-2 rounded-2xl w-full text-white px-4 overflow-hidden bg-transparent"
//               placeholder="Custom Image URL"
//             />
//           </div>
//           <div className="rounded-2xl mt-auto">
//             <p className="text-white text-xl py-2 px-4 text-center">Made by Aryan Bola</p>
//           </div>
//         </div>

//         {/* Right Panel: Header, Canvas, Clip-path Output */}
//         <div className="h-full w-full grid grid-rows-12 gap-2 p-2">
//           {/* Header */}
//           <div className="px-4 py-2 flex justify-between items-center rounded-2xl border border-white row-span-1">
//             <p className="text-white text-2xl font-semibold">PathClipper</p>
//             <p className="text-white text-xl ">By Aryan Bola</p>
//           </div>
//           {/* Canvas */}
//           <div className="h-full border border-white rounded-2xl w-full flex justify-center items-center row-span-10 overflow-hidden bg-gray-900">
//             <div
//               className="border border-white relative cursor-crosshair"
//               style={{
//                 width: canvasSize.x > 0 ? canvasSize.x : 1,
//                 height: canvasSize.y > 0 ? canvasSize.y : 1,
//                 backgroundImage: `url(${bgImage})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 boxShadow: '0 0 5px rgba(255,255,255,0.3)'
//               }}
//               onClick={(e) => addDiv(e)}
//             >
//               {divs.map(div => (
//                 <div
//                   key={div.id}
//                   className="w-4 h-4 rounded-full bg-red-500 absolute cursor-move"
//                   style={{
//                     top: div.yPosition - 8,
//                     left: div.xPosition - 8,
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//           {/* Clip-path Output */}
//           <div className="h-full w-full row-span-2 flex justify-start items-center px-4 border border-white bg-black rounded-2xl relative overflow-hidden">
//             <p className="text-white text-lg font-medium flex gap-2 flex-wrap text-wrap break-all">
//               clip-path: path(
//               {
//                 divs.map(div => (
//                   <span key={div.id}>{div.xPosition}px,{div.yPosition}px </span>
//                 ))
//               }
//               );
//             </p>
//             <button
//               className="absolute top-2 right-2 border border-white px-4 py-2 rounded-2xl bg-black text-white text-xl cursor-pointer hover:bg-gray-800 transition-colors duration-200"
//               onClick={copyClipPathToClipboard}
//             >
//               {copyButton ? 'Copied!' : 'Copy'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import shapes from './shapes.json';
import pictures from './pictures.json';
import { calculateShapeDivs } from './features/handleShape';

import { motion } from 'motion/react';

export default function Home() {
  const [copyButton, setCopyButton] = useState(false);
  const [activeShapeName, setActiveShapeName] = useState("Custom");

  interface DivData {
    id: number;
    xPosition: number;
    yPosition: number;
  }

  const [divs, setDivs] = useState<DivData[]>([]);
  const [canvasSize, setCanvasSize] = useState({ x: 480, y: 480 });
  const [bgImage, setBgImage] = useState('/Zoro.jpeg');

  useEffect(() => {
    if (copyButton) {
      const timer = setTimeout(() => {
        setCopyButton(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyButton]);

  function addDiv(e: React.MouseEvent<HTMLDivElement>) {
    if (activeShapeName === "Custom") {
      const container = e.currentTarget.getBoundingClientRect();
      const x = Math.round(e.clientX - container.left);
      const y = Math.round(e.clientY - container.top);

      setDivs([...divs, { id: Date.now(), xPosition: x, yPosition: y }]);
    }
  }

  const handleShapeSelection = (selectedShapeName: string) => {
    setActiveShapeName(selectedShapeName);

    const newCalculatedDivs = calculateShapeDivs(selectedShapeName, canvasSize);
    setDivs(newCalculatedDivs as DivData[]);
  };

  const copyClipPathToClipboard = () => {
    const clipPathString = `clip-path: path(${divs.map(div => `${div.xPosition}px,${div.yPosition}px`).join(' ')});`;
    navigator.clipboard.writeText(clipPathString)
      .then(() => {
        setCopyButton(true);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <>
      <div className="h-screen w-full bg-gray-950 flex-col-reverse flex gap-2 md:flex-row justify-between items-center p-2">
        {/* Left Panel: Shapes, Canvas Size, Custom Image */}
        <div className="w-full md:w-[30%] h-full border border-gray-700 rounded-2xl p-4 overflow-y-auto bg-gray-900 shadow-lg">
          {/* Shapes */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 place-items-center mb-6">
            {
              shapes.map((s, index) => (
                <button
                  key={index}
                  onClick={() => handleShapeSelection(s.name)}
                  className={`w-20 h-20 border rounded-md text-white text-xs flex flex-col justify-center items-center transition-all duration-200
                  ${activeShapeName === s.name ? 'border-white bg-gray-700 shadow-md' : 'border-gray-600 hover:border-gray-400 bg-gray-800'}`}
                  title={s.name}
                >
                  <img className="w-12 h-12 object-contain mb-1" src={s.img_name} alt={s.name} />
                  <span className="text-center">{s.name}</span>
                </button>
              ))
            }
          </div>
          {/* Demo Size */}
          <div className="mb-6 border-t border-gray-700 pt-4">
            <p className="text-white text-xl py-2">Demo size <span className="text-gray-400">(in px)</span></p>
            <div className="flex justify-around items-center gap-4">
              <input
                value={canvasSize.x}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                type="number"
                className="rounded-lg border border-gray-600 py-2 text-white px-3 w-24 bg-gray-800 focus:outline-none focus:border-white transition-colors"
                placeholder="480"
                min="1"
              />
              <p className="text-white text-xl">X</p>
              <input
                value={canvasSize.y}
                onChange={(e) => setCanvasSize(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                type="number"
                className="rounded-lg border border-gray-600 py-2 text-white px-3 w-24 bg-gray-800 focus:outline-none focus:border-white transition-colors"
                placeholder="480"
                min="1"
              />
            </div>
          </div>
          {/* Custom Image */}
          <div className="grid gap-4 mb-6 border-t border-gray-700 pt-4">
            <div>
              <p className="text-white text-xl py-2">Custom Image</p>
              <div className="grid grid-cols-2 place-items-center gap-8">
                {
                  pictures.map((pic, index) => (
                    <button
                      key={index}
                      onClick={() => setBgImage(pic.img_name)}
                      className="w-20 h-20 border border-gray-600 rounded-md overflow-hidden flex-shrink-0 hover:border-white transition-colors"
                      title={pic.img_name}
                    >
                      <img src={`/${pic.img_name}`} alt={'Background Image'} className="w-full h-full object-cover" />
                    </button>
                  ))
                }
              </div>
            </div>
            <input
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
              type="text"
              className="border border-gray-600 py-2 rounded-lg w-full text-white px-3 bg-gray-800 focus:outline-none focus:border-white transition-colors"
              placeholder="Custom Image URL"
            />
          </div>
          <div className="mt-auto pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-base text-center">Made by Aryan Bola</p>
          </div>
        </div>

        {/* Right Panel: Header, Canvas, Clip-path Output */}
        <div className="h-full w-full grid grid-rows-[auto_1fr_auto] gap-4 p-2">
          {/* Header */}
          <div className="px-6 py-3 flex justify-between items-center rounded-2xl border border-gray-700 bg-gray-900 shadow-lg">
            <p className="text-white text-3xl font-bold tracking-wide">PathClipper</p>
            <p className="text-gray-400 text-lg">By Aryan Bola</p>
          </div>
          {/* Canvas */}
          <div className="h-full border border-gray-700 rounded-2xl w-full flex justify-center items-center overflow-hidden bg-gray-900 shadow-lg">
            <div
              className="relative cursor-crosshair border border-gray-500 rounded-md"
              style={{
                width: canvasSize.x > 0 ? canvasSize.x : '480px', // Default if 0
                height: canvasSize.y > 0 ? canvasSize.y : '480px', // Default if 0
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 0 15px rgba(255,255,255,0.05)', // Subtle white shadow
              }}
              onClick={(e) => addDiv(e)}
            >
              {divs.map(div => (
                <motion.div
                  key={div.id}
                  className="w-4 h-4 rounded-full bg-red-500 absolute cursor-grab border-2 border-red-700 shadow-lg"
                  style={{
                    top: div.yPosition - 8,
                    left: div.xPosition - 8,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              ))}
            </div>
          </div>
          {/* Clip-path Output */}
          <div className="h-full w-full flex-col justify-start items-start px-6 py-4 border border-gray-700 bg-gray-900 rounded-2xl relative overflow-hidden shadow-lg">
            <p className="text-gray-400 text-sm mb-2">Generated Clip-path CSS:</p>
            <p className="text-white text-lg font-mono flex gap-1 flex-wrap text-wrap break-all pr-24">
              <span className="text-gray-500">clip-path:</span> <span className="text-white">path(</span> "M 
              {
                divs.map((div, index) => (
                  <span key={div.id} className="text-green-300">
                    {div.xPosition},{div.yPosition}{index < divs.length - 1 ? ' L' : ''}
                    &nbsp;
                  </span>
                ))
              }Z"
              <span className="text-white"> );</span>
            </p>
            <button
              className="absolute top-4 right-4 border border-gray-600 px-5 py-2 rounded-xl bg-gray-800 text-white text-base cursor-pointer hover:bg-gray-700 transition-colors duration-200 shadow-md"
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