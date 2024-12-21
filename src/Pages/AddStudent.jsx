import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const AddStudent = () => {
  const [formData, setFormData] = useState({
    date_joined: '',
    student_name: '',
    cohort: '',
    courses: [],
    last_login: '',
    status: false
  });

  const [courseInput, setCourseInput] = useState('');
  const nevigate=useNavigate();
  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 16); 
    setFormData((prev) => ({
      ...prev,
      date_joined: currentDate,
      last_login:currentDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCourse = () => {
    if (courseInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        courses: [...prev.courses, courseInput.trim()]
      }));
      setCourseInput('');
    }
  };

  const handleRemoveCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://instinctive-back.onrender.com/add-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const res=await response.json()
      if (res.success) {
        alert("Inserted Sucessfully")
        nevigate("/")
      } else {  
        alert(response.statusText);
      }

    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 pt-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Student Registration</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Joined
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                name="date_joined"
                value={formData.date_joined}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                readOnly
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name
            </label>
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cohort
            </label>
            <input
              type="text"
              name="cohort"
              placeholder='AY 20XX-20YY'
              value={formData.cohort}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Courses
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={courseInput}
                onChange={(e) => setCourseInput(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter course name"
              />
              <button
                type="button"
                onClick={handleAddCourse}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="pt-1 max-h-[100px] overflow-y-auto gap-3 flex flex-wrap ">
              {formData.courses.map((course, index) => (
                <div key={index} className="flex items-center justify-center gap-2 h-10  bg-gray-50 p-2 rounded-md">
                  <span>{course}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCourse(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>


          <div className="flex items-center space-x-2">
            <input
              type="checkbox" name="status"
              checked={formData.status}
              onChange={handleChange} className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"   />
            <label className="text-sm font-medium text-gray-700">
              Active Status
            </label>
          </div>

          <button type="submit"  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"  >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
