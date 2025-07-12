"use client"
import { useState } from "react";
import shapes from './shapes.json'
import pictures from './pictures.json'

export default function Home() {
  const [copyButton, setCopyButton] = useState(false)

  interface DivData {
    id: number,
    xPosition:number,
    yPosition:number
  };

  const [divs, setDivs] = useState<DivData[]>([]);
  const [canvasSize, setCanvasSize] = useState({x:480,y:480})
  const [bgImage,setBgImage] = useState('/Zoro.jpeg')

  function addDiv(e: React.MouseEvent<HTMLDivElement>) {

    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    setDivs([...divs, { id: Date.now(),xPosition:x, yPosition:y }]);
    console.log(divs,'divs')
    console.log(container,"container")
  }

  return (
    <>
    <div className="h-screen w-full bg-black flex-col-reverse flex gap-2 md:flex-row justify-between items-center">
      <div className="w-[30%] h-full border border-white rounded-2xl">
        {/* shapes */}
        <div className="p-4 grid grid-cols-4 gap-4 place-items-center">
          {
            shapes.map((i,index)=>(
              <button key={index} className="w-16 h-16 border border-white text-white text-xs flex flex-col justify-center items-center"><img className="w-12 h-12" src={i.img_name} alt='' />{i.name}</button>
            ))
          }
        </div>
        {/* demo sixe */}
        <div className="px-4">
          <p className="text-white text-xl py-2">Demo size <span className="text-gray-500">(in px)</span></p>
          <div className="flex justify-around items-center gap-4">
            <input value={canvasSize.x} onChange={(e) => setCanvasSize(prev => ({...prev, x: parseInt(e.target.value)}))} type="text" className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20" placeholder="320px"/>
            <p className="text-white text-xl">X</p>
            <input value={canvasSize.y} onChange={(e) => setCanvasSize(prev => ({...prev, y: parseInt(e.target.value)}))} type="text" className="rounded-2xl border border-white py-2 text-white px-4 overflow-hidden w-20" placeholder="320px"/>
          </div>
        </div>
        {/* custum image */}
        <div className="px-4 grid gap-4">
          <div>
            <p className="text-white text-xl py-2">Custum Image</p>
            <div className="flex justify-between items-center ">
              {
                pictures.map((pic,index)=>(
                  <button key={index} onClick={()=>setBgImage(pic.img_name)} className="w-16 h-16 border-white border"><img src={pic.img_name} alt="" /></button>
                ))
              }
            </div>
          </div>
          <p></p>
          <input value={bgImage} onChange={(e)=>setBgImage(e.target.value)} type="text" className="border border-white py-2 rounded-2xl w-full text-white px-4 overflow-hidden" placeholder="Custom URL" />
        </div>
        <div className="rounded-2xl px-4">
          <p className="text-white text-xl py-2 px-4 text-center">Made by Aryan Bola</p>
        </div>
      </div>
      <div className="h-full w-full grid gap-2">
        <div className="row-span-12 h-full w-full grid gap-2">
          <div className="px-4 py-2 flex justify-between items-center rounded-2xl border border-white row-span-1">
            <p className="text-white text-2xl font-semibold /80">PathClipper</p>
            <p className="text-white text-xl ">By Aryan Bola</p>
          </div>
          <div className="h-full border border-white rounded-2xl w-full flex justify-center items-center row-span-10 overflow-hidden">
            <div 
              className="w-80 h-80 border border-white relative" 
              style={{
                width:canvasSize.x,
                height:canvasSize.y,
                backgroundImage:`url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} 
              onClick={(e)=>addDiv(e)}
            >
              {divs.map((div, index) => (
                <div key={div.id} className="w-4 h-4 rounded-full bg-red-500 absolute" style={{top:div.yPosition,left:div.xPosition}} />
              ))}
            </div>
          </div>
        </div>
        <div className="h-full w-full row-span-2 flex justify-start items-center px-4 border border-white bg-black rounded-2xl relative overflow-hidden">
          <p className="text-white text-lg font-medium flex gap-2 flex-wrap">
            clip-path: path(
            {
              divs.map(div=>(
                <span key={div.id}>{div.xPosition},{div.yPosition}</span>
              ))
            }
            );
          </p>
          <button className="absolute top-2 right-2 border border-white px-4 py-2 rounded-2xl bg-black text-white tex-xl cursor-pointer" onClick={()=>setCopyButton(true)}>{copyButton ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
    </div>
    </>
  );
}
