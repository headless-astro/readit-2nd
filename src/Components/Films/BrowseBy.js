import React from "react";

function BrowseBy(props) {
  return (
    <div>
      <div className="w-full h-full bg-[#1b2228] flex flex-col sm:flex-row justify-center sm:justify-between items-center p-20">
        <div className="  flex flex-col sm:flex-row text-lg  text-[#899aa9] ">
          <p>FİLTRELEME</p>
          <div className="border-2 sm:mt-0 mt-4 border-[#232a31] flex text-center  sm:ml-4">
            <select
              onChange={(event) =>
                props.ChangeYear({ year: event.target.value })
              }
              className="bg-[#1b2127] w-[140px] border-r-2 border-[#232a31] focus:bg-[#D3D3D3] focus:text-black focus:text-opacity-60 "
            >
              <option>Yıla Göre</option>
              <option>2020 ve sonrası</option>
              <option>2010 ve sonrası</option>
              <option>2000 ve sonrası</option>
              <option>Daha da eski...</option>
            </select>
            <select
              onChange={(event) =>
                props.ChangeYear({ genre: event.target.value })
              }
              className="bg-[#1b2127] w-[140px]   focus:bg-[#D3D3D3]  focus:text-black focus:text-opacity-60 "
            >
              <option>Tür</option>
              <option>Aksiyon</option>
              <option>Komedi</option>
              <option>Dram</option>
              <option>Korku</option>
              <option>Bilim Kurgu</option>
              <option>Fantazi</option>
            </select>
          </div>
        </div>
        <div className=" flex  items-center sm:mt-0 mt-4 ">
          <p className="flex flex-row pl-2 sm:text-lg font-sans  text-[#899aa9] ">
            FİLM ARA
          </p>
          <input
            onChange={(event) => props.FilmName(event.target.value)}
            className="w-[250px] sm:ml-5 h-[40px] ml-2 bg-[#2c3440] rounded-lg focus:bg-slate-100 pl-2"
          ></input>
        </div>
      </div>
      <p className=" bg-[#1b2228] pl-16 text-xl text-[#63707d] hover:text-[#613573] w-full border-b-2 border-[#445566] hover:border-[#613573]">
        TÜM FİLMLER
      </p>
    </div>
  );
}

export default BrowseBy;
