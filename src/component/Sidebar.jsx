import React from 'react'
import Quyl from "../assets/Quyl.jpg"
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import dashboard from "../assets/dashboard.svg"
import students from "../assets/student.svg"
import chapter from "../assets/chapter.svg"
import help from "../assets/help.svg"
import report from "../assets/report.svg"
import setting from "../assets/setting.svg"

const Sidebar = () => {
    const sidebarcontent=[
        {
            "title":"Dashboard",
            "link":"/Dashboard",
            "src":dashboard
        },
        {
            "title":"Students",
            "link":"/Students",
            "src":students
        },
        {
            "title":"Chapter",
            "link":"/Chapter",
            "src":chapter
        },
        {
            "title":"Help",
            "link":"/Help",
            "src":help
        },
        {
            "title":"Reports",
            "link":"/Reports",
            "src":report
        },
        {
            "title":"Settings",
            "link":"/Settings",
            "src":setting
        }
    ]
    const handle_nevigate=(link)=>{
        console.log(link);
    }
  return (
    <>
    <div className="w-1/5 max-[900px]:hidden max-[1000px]:py-5 max-[1000px]:px-0
     px-5 bg-white shadow-lg">
        <div className="py-4 text-lg">
            <img src={Quyl} className='w-24' alt="" />
        </div>
        <nav className="">
          <div className='flex flex-col gap-3 overflow-y-auto'>
            {
                sidebarcontent.map((item,index)=>{
                 return ( 
                    <div onClick={()=>handle_nevigate(item.link)} className='hover:bg-gray-200 rounded-md hover:cursor-pointer p-2 flex gap-2'>
                        <img src={item.src} alt="" />
                        <p id={index}  className=" text-lg px-2 rounded-md font-medium">{item.title}</p> 
                    </div>
                 )
                    
                })
            }
     
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar