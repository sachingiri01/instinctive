import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import message from "../assets/message.svg"
import help from "../assets/help.svg"
import nev from "../assets/nev.svg"
import woman from "../assets/woman.png"
import notification from "../assets/notification.svg"
import search from "../assets/search.svg"
import green from "../assets/circle.png"
import red from "../assets/circle.png"
import Sidebar from '../component/Sidebar';
function Dashboard() {
    const nevigate=useNavigate()
    const [list, setlist] = useState([])
    const [search_bar, setsearch_bar] = useState("");
    const [classs, setclasss] = useState("")
    const [cohortt, setcohortt] = useState("")
  const get_data = async (e) => {
  
    try {
      const response = await fetch('https://instinctive-back.onrender.com/students', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res=await response.json()
      if (res.success) {
       setlist(res.data);
      } else {  
        alert(response.message);
      }

    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };
  useEffect(() => {
      const gett=async()=>{
         await get_data();
      }
      gett()
  }, [])
  const handle_class_fetch = async (course) => {
    if (course.length==0||course!="Select Class") {
      return;
    }

    try {
      const response = await fetch(`https://instinctive-back.onrender.com/students-by-course?course=${course}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        console.log(data);
        setlist(data.data);
      } else {
        alert(data.message || 'Failed to fetch students');
        setlist([]);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  const handle_class=async(e)=>{
            await handle_class_fetch(e.target.value)
            
  }

  const handleFetchStudents = async () => {

    if (!cohortt||cohortt!="Select Year") {
      return;
    }

    try {
      const response = await fetch(`https://instinctive-back.onrender.com/students-by-cohort?cohort=${encodeURIComponent(cohortt)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) { 
        setlist(data.data);
      } else {
        alert(data.message || 'Failed to fetch students');
        setlist([]); 
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  const handle_search=(e)=>{
    setsearch_bar(e.target.value);
    
  }
  const handle_cohort=(e)=>{
      setcohortt(e.target.value)
      
  }
  useEffect(() => {
      const handle=async()=>{
        await handle_class_fetch(search_bar)
      }
      handle();
  }, [search_bar])

  useEffect(() => {
    const handle=async()=>{
      await handleFetchStudents()
    }
    handle();
}, [cohortt])

  return (
    <div className="flex h-screen  bg-slate-200">
      <Sidebar/>

      <div className="flex flex-col overflow-y-auto bg-slate-200  flex-1 p-6">
     
        <div className="flex justify-between  items-center  p-3 bg-slate-200  rounded-lg mb-5">
          <div className='flex gap-0 bg-white pl-2 rounded-md w-full max-[1000px]:w-6/12 max-[700px]:w-4/12'>
          <img src={search} className='w-6 bg-white py-2  border-0 rounded-l-md' alt="" />
          <input type="text"  placeholder="Search your course" onChange={handle_search}   className="outline-none placeholder:text-slate-500 border-gray-300 p-2 border-0 rounded-r-md max-[1000px]:w-full w-6/12"   />
          </div>
          <div className="flex w-6/12  max-[700px]:w-full bg-slate-200 items-center justify-around">
            <img src={help} className='cursor-pointer max-[600px]:hidden' alt="help" />
            <img src={message} className='cursor-pointer' alt="message" />
            <img src={nev} className='cursor-pointer max-[600px]:hidden' alt="sync" />
            <img src={notification} className='cursor-pointer' alt="notification" />
            <div className='flex  items-center gap-5'>
            <img   src={woman}  alt="User Avatar" className="w-10 max-[700px]:w-6 max-[700px]:h-6 h-10 rounded-full"   />
            <span className="font-medium max-[700px]:text-sm">koushik parimi</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <select onChange={handle_cohort} className=" font-bold px-1 bg-slate-300 border-0 border-gray-300 p-2 rounded-lg">
            <option readonly >Select Year</option>
              <option>AY 2024-25</option>
              <option>AY 2023-24</option>
              <option>AY 2022-23</option>
              <option>AY 2021-22</option>
            </select>
            <select onChange={handle_class} className=" border-0 bg-slate-300 font-bold px-1 border-gray-300 p-2 rounded-lg">
            <option readonly >Select Class</option>
              <option>CBSE 9</option>
              <option>CBSE 10</option>
              <option>CBSE 11</option>
              <option>CBSE 12</option>
            </select>
          </div>
          <button onClick={()=>nevigate("/add-student")} className="bg-gray-500 max-[600px]:text-sm max-[600px]:px-1 text-white px-4 py-2 rounded-lg">+ Add new Student</button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto overflow-y-auto scrollbar-hidden ">
          <table className="table-auto  w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Student Name</th>
                <th className="text-left p-4">Cohort</th>
                <th className="text-left p-4">Courses</th>
                <th className="text-left p-4">Date Joined</th>
                <th className="text-left p-4">Last Login</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody className=''>
              {list.map((student, index) => (
                <tr
                  key={index} className={`hover:bg-gray-100`}    >
                  <td className="p-4  font-medium">{student.student_name}</td>
                  <td className="p-4">{student.cohort}</td>
                  <td className="p-4 w-[450px] scrollbar-hidden overflow-x-auto flex gap-2 ">
                    {student.courses.map((course, i) => (
                      <div key={i} className='bg-slate-200 min-w-40 text-sm rounded-md p-1 flex text-center items-center gap-1'>
                        <img src={woman} className='w-8' alt="pic" />
                        <p>{course.toUpperCase()}</p>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{student.date_joined.substring(0,18)}</td>
                  <td className="p-4">{student.last_login.substring(0,18)}</td>
                  <td className="p-4 flex justify-center items-center ">
                    {student.status?(
                      <span
                      className="inline-block w-3 h-3 rounded-full bg-green-500"
                    ></span>
                    ):(
                      <span
                      className="inline-block w-3 h-3 rounded-full bg-red-500"
                    ></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
