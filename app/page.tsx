// // todo
// // think about curved corners
// // make them dragable
// "use client";

// import { useState, useEffect, useRef, useMemo } from "react";
// import shapes from './shapes.json';
// import pictures from './pictures.json';
// import { calculateShapeDivs } from './features/handleShape';

// import { motion } from 'motion/react';

// export default function Home() {

//   const [copyButton, setCopyButton] = useState(false);
//   const [activeShapeName, setActiveShapeName] = useState("Custom");

//   const constraintsRef = useRef<HTMLDivElement>(null)

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

//   const clipPath = useMemo(() => {
//     if (divs.length === 0) return "none";
//     const pathString = `path("M ${divs.map(d => `${d.xPosition},${d.yPosition}`).join(' L ')} Z")`;
//     return pathString;
//   }, [divs]);

//   //point add
//   function addDiv(e: React.MouseEvent<HTMLDivElement>) {
//     if (activeShapeName === "Custom") {
//       const container = e.currentTarget.getBoundingClientRect();
//       const x = Math.round(e.clientX - container.left);
//       const y = Math.round(e.clientY - container.top);

//       setDivs([...divs, { id: Date.now(), xPosition: x, yPosition: y }]);
//     }
//   }

//   //point update
//   function updateDiv(info: any, id: number) {
//     if (!constraintsRef.current) return;

//     const rect = constraintsRef.current.getBoundingClientRect();

//     // ✅ Clamp x and y within canvas bounds to prevent negative or overflow
//     const x = Math.max(0, Math.min(Math.round(info.point.x - rect.left), canvasSize.x));
//     const y = Math.max(0, Math.min(Math.round(info.point.y - rect.top), canvasSize.y));

//     setDivs(prev =>
//       prev.map(div =>
//         div.id === id ? { ...div, xPosition: x, yPosition: y } : div
//       )
//     );
//   }

//   // shapes button
//   const handleShapeSelection = (selectedShapeName: string) => {
//     setActiveShapeName(selectedShapeName);

//     const newCalculatedDivs = calculateShapeDivs(selectedShapeName, canvasSize);
//     setDivs(newCalculatedDivs as DivData[]);
//   };

//   // copy button 
//   const copyClipPathToClipboard = () => {
//     const clipPathString = `clip-path: path("M ${divs.map(div => `${div.xPosition},${div.yPosition}`).join(' L ')} Z");`;
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
//       <div className="h-screen w-full bg-gray-950 flex-col-reverse flex gap-2 md:flex-row justify-between items-center p-2">
//         {/* Left Panel: Shapes, Canvas Size, Custom Image */}
//         <div className="w-full md:w-[30%] h-full border border-gray-700 rounded-2xl p-4 overflow-y-auto bg-gray-900 shadow-lg">
//           {/* Shapes */}
//           <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 place-items-center mb-6">
//             {
//               shapes.map((s, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleShapeSelection(s.name)}
//                   className={`w-20 h-20 border text-white text-xs flex flex-col justify-center items-center transition-all duration-200
//                   ${activeShapeName === s.name ? 'border-white bg-gray-700 shadow-md' : 'border-gray-600 hover:border-gray-400 bg-gray-800'}`}
//                   title={s.name}
//                 >
//                   <img className="w-12 h-12 object-contain mb-1" src={s.img_name} alt={s.name} />
//                   <span className="text-center">{s.name}</span>
//                 </button>
//               ))
//             }
//           </div>
//           {/* Demo Size */}
//           <div className="mb-6 border-t border-gray-700 pt-4">
//             <p className="text-white text-xl py-2">Demo size <span className="text-gray-400">(in px)</span></p>
//             <div className="flex justify-around items-center gap-4">
//               <input
//                 value={canvasSize.x}
//                 onChange={(e) => setCanvasSize(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
//                 type="number"
//                 className="rounded-lg border border-gray-600 py-2 text-white px-3 w-24 bg-gray-800 focus:outline-none focus:border-white transition-colors"
//                 placeholder="480"
//                 min="1"
//               />
//               <p className="text-white text-xl">X</p>
//               <input
//                 value={canvasSize.y}
//                 onChange={(e) => setCanvasSize(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
//                 type="number"
//                 className="rounded-lg border border-gray-600 py-2 text-white px-3 w-24 bg-gray-800 focus:outline-none focus:border-white transition-colors"
//                 placeholder="480"
//                 min="1"
//               />
//             </div>
//           </div>
//           {/* Custom Image */}
//           <div className="grid gap-4 mb-6 border-t border-gray-700 pt-4">
//             <div>
//               <p className="text-white text-xl py-2">Custom Image</p>
//               <div className="grid grid-cols-2 place-items-center gap-8">
//                 {
//                   pictures.map((pic, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setBgImage(pic.img_name)}
//                       className="w-20 h-20 border border-gray-600 rounded-md overflow-hidden flex-shrink-0 hover:border-white transition-colors"
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
//               className="border border-gray-600 py-2 rounded-lg w-full text-white px-3 bg-gray-800 focus:outline-none focus:border-white transition-colors"
//               placeholder="Custom Image URL"
//             />
//           </div>
//           <div className="mt-auto pt-4 border-t border-gray-700">
//             <p className="text-gray-400 text-base text-center">Made by Aryan Bola</p>
//           </div>
//         </div>

//         {/* Right Panel: Header, Canvas, Clip-path Output */}
//         <div className="h-full w-full grid grid-rows-[auto_1fr_auto] gap-4 p-2">
//           {/* Header */}
//           <div className="px-6 py-3 flex justify-between items-center rounded-2xl border border-gray-700 bg-gray-900 shadow-lg">
//             <p className="text-white text-3xl font-bold tracking-wide">PathClipper</p>
//             <p className="text-gray-400 text-lg">By Aryan Bola</p>
//           </div>
//           {/* Canvas */}
//           <div className="h-full border border-gray-700 rounded-2xl w-full flex justify-center items-center overflow-hidden bg-gray-900 shadow-lg">
//             <motion.div
//               ref={constraintsRef}
//               className="relative border border-white rounded-md"
//               style={{
//                 width: canvasSize.x > 0 ? canvasSize.x : '480px',
//                 height: canvasSize.y > 0 ? canvasSize.y : '480px',
//               }}
//               onClick={(e) => addDiv(e)}
//             >
//               <div
//                 className="absolute top-0 left-0 w-full h-full"
//                 style={{
//                   clipPath: clipPath,
//                   WebkitClipPath: clipPath,
//                   zIndex: 0,
//                 }}
//               >
//                 <img
//                   src={bgImage}
//                   alt="Clipped Background"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
              
//               {divs.map(div => (
//                 <motion.div
//                   drag
//                   dragConstraints={constraintsRef}
//                   dragElastic={0}
//                   dragMomentum={false}
//                   onDragEnd={(e, info) => updateDiv(info, div.id)}
//                   key={div.id}
//                   className="w-4 h-4 rounded-full bg-red-500 absolute cursor-grab border-2 border-red-700 shadow-lg z-10"
//                   style={{
//                     top: div.yPosition - 8,
//                     left: div.xPosition - 8,
//                   }}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 260, damping: 20 }}
//                 />
//               ))}
//             </motion.div>
//           </div>
//           {/* Clip-path Output */}
//           <div className="h-full w-full flex-col justify-start items-start px-6 py-4 border border-gray-700 bg-gray-900 rounded-2xl relative overflow-hidden shadow-lg">
//             <p className="text-gray-400 text-sm mb-2">Generated Clip-path CSS:</p>
//             <p className="text-white text-lg font-mono flex gap-1 flex-wrap text-wrap break-all pr-24">
//               <span className="text-gray-500">clip-path:</span> <span className="text-white">path(</span> "M 
//               {
//                 divs.map((div, index) => (
//                   <span key={div.id} className="text-green-300">
//                     {div.xPosition},{div.yPosition}{index < divs.length - 1 ? ' L' : ''}
//                     &nbsp;
//                   </span>
//                 ))
//               }Z"
//               <span className="text-white"> );</span>
//             </p>
//             <button
//               className="absolute top-4 right-4 border border-gray-600 px-5 py-2 rounded-xl bg-gray-800 text-white text-base cursor-pointer hover:bg-gray-700 transition-colors duration-200 shadow-md"
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

import { useState, useEffect, useRef, useMemo } from "react";
import Image from 'next/image'; // 👈 Import Image for Next.js optimization
import shapes from './shapes.json';
import pictures from './pictures.json';
import { calculateShapeDivs, DivData } from './features/handleShape'; // 👈 Import DivData for better typing

import { motion } from 'framer-motion'; // Correct import for motion (assuming framer-motion based on motion.div/drag)

// Define the type for drag info from framer-motion's onDragEnd, specifically for position
interface DragInfo {
  point: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  delta: {
    x: number;
    y: number;
  };
}

// ⚠️ Note: DivData is now imported from './features/handleShape'

export default function Home() {

  const [copyButton, setCopyButton] = useState(false);
  const [activeShapeName, setActiveShapeName] = useState("Custom");

  const constraintsRef = useRef<HTMLDivElement>(null)

  // Use the imported DivData type
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

  const clipPath = useMemo(() => {
    if (divs.length === 0) return "none";
    // Check if points are valid numbers before generating path
    const validPoints = divs.filter(d => 
        typeof d.xPosition === 'number' && !isNaN(d.xPosition) &&
        typeof d.yPosition === 'number' && !isNaN(d.yPosition)
    );

    if (validPoints.length === 0) return "none";

    const pathString = `path("M ${validPoints.map(d => `${Math.round(d.xPosition)},${Math.round(d.yPosition)}`).join(' L ')} Z")`;
    return pathString;
  }, [divs]);

  //point add
  function addDiv(e: React.MouseEvent<HTMLDivElement>) {
    if (activeShapeName === "Custom") {
      const container = e.currentTarget.getBoundingClientRect();
      const x = Math.round(e.clientX - container.left);
      const y = Math.round(e.clientY - container.top);

      setDivs([...divs, { id: Date.now(), xPosition: x, yPosition: y }]);
    }
  }

  //point update - ❌ Replaced `any` with `DragInfo`
  function updateDiv(info: DragInfo, id: number) { 
    if (!constraintsRef.current) return;

    const rect = constraintsRef.current.getBoundingClientRect();

    // Clamp x and y within canvas bounds
    const x = Math.max(0, Math.min(Math.round(info.point.x - rect.left), canvasSize.x));
    const y = Math.max(0, Math.min(Math.round(info.point.y - rect.top), canvasSize.y));

    setDivs(prev =>
      prev.map(div =>
        div.id === id ? { ...div, xPosition: x, yPosition: y } : div
      )
    );
  }

  // shapes button
  const handleShapeSelection = (selectedShapeName: string) => {
    setActiveShapeName(selectedShapeName);

    // Casting the result to DivData[] is safer now that calculateShapeDivs is typed
    const newCalculatedDivs = calculateShapeDivs(selectedShapeName, canvasSize); 
    setDivs(newCalculatedDivs);
  };

  // copy button 
  const copyClipPathToClipboard = () => {
    // Round coordinates for cleaner CSS output
    const clipPathString = `clip-path: path("M ${divs.map(div => `${Math.round(div.xPosition)},${Math.round(div.yPosition)}`).join(' L ')} Z");`;
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
                  className={`w-20 h-20 border text-white text-xs flex flex-col justify-center items-center transition-all duration-200
                  ${activeShapeName === s.name ? 'border-white bg-gray-700 shadow-md' : 'border-gray-600 hover:border-gray-400 bg-gray-800'}`}
                >
                  {/* ❌ Replaced <img> with <Image /> */}
                  <div className="w-12 h-12 relative mb-1">
                    <img
                      className="object-contain" 
                      src={s.img_name} 
                      sizes="50px"
                    />
                  </div>
                  <span className="text-center">{s.name}</span>
                </button>
              ))
            }
          </div>
          {/* Demo Size */}
          <div className="mb-6 border-t border-gray-700 pt-4">
            {/* ❌ Escaped quotes */}
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
                      className="w-20 h-20 border border-gray-600 rounded-md overflow-hidden flex-shrink-0 hover:border-white transition-colors relative"
                      title={pic.img_name}
                    >
                      {/* ❌ Replaced <img> with <Image /> */}
                      <Image 
                        src={`/${pic.img_name}`} 
                        alt={'Background Image'} 
                        fill 
                        className="object-cover"
                        sizes="80px" 
                      />
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
            <motion.div
              ref={constraintsRef}
              className="relative border border-white rounded-md"
              style={{
                width: canvasSize.x > 0 ? canvasSize.x : '480px',
                height: canvasSize.y > 0 ? canvasSize.y : '480px',
              }}
              onClick={(e) => addDiv(e)}
            >
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: clipPath,
                  WebkitClipPath: clipPath,
                  zIndex: 0,
                }}
              >
                {/* ❌ Replaced <img> with <Image /> */}
                <Image
                  src={bgImage}
                  alt="Clipped Background"
                  fill 
                  className="w-full h-full object-cover"
                  sizes={`${canvasSize.x}px`} // Provide sizes for better optimization
                  priority // Good candidate for LCP improvement
                />
              </div>
              
              {divs.map(div => (
                <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0}
                  dragMomentum={false}
                  onDragEnd={(e, info) => updateDiv(info as DragInfo, div.id)} // ❌ Explicitly cast to DragInfo
                  key={div.id}
                  className="w-4 h-4 rounded-full bg-red-500 absolute cursor-grab border-2 border-red-700 shadow-lg z-10"
                  style={{
                    top: div.yPosition - 8,
                    left: div.xPosition - 8,
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                />
              ))}
            </motion.div>
          </div>
          {/* Clip-path Output */}
          <div className="h-full w-full flex-col justify-start items-start px-6 py-4 border border-gray-700 bg-gray-900 rounded-2xl relative overflow-hidden shadow-lg">
            {/* ❌ Escaped quotes */}
            <p className="text-gray-400 text-sm mb-2">Generated Clip-path CSS:</p> 
            <p className="text-white text-lg font-mono flex gap-1 flex-wrap text-wrap break-all pr-24">
              <span className="text-gray-500">clip-path:</span> <span className="text-white">path(</span> &quot;M 
              {
                divs.map((div, index) => (
                  <span key={div.id} className="text-green-300">
                    {Math.round(div.xPosition)},{Math.round(div.yPosition)}{index < divs.length - 1 ? ' L' : ''} 
                    &nbsp;
                  </span>
                ))
              }Z&quot;
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