import React from 'react';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-3xl font-semibold">Welcome to the Student Help Page</h1>
        <p className="text-lg">Find all the help you need for assignments, grades, and more.</p>
      </header>

      <main className="container mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-600">General Help</h2>
          <p className="mt-4 text-gray-700">Here are some common topics you might need assistance with:</p>
          <ul className="mt-4 space-y-3">
            <li className="text-gray-600">How to access your student portal</li>
            <li className="text-gray-600">How to submit assignments</li>
            <li className="text-gray-600">How to check your grades</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600">Grading System</h2>
          <p className="mt-4 text-gray-700">Your grades are color-coded based on performance:</p>

          <div className="mt-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-500 text-white flex items-center justify-center rounded-full">
                <span className="font-bold">A</span>
              </div>
              <p className="text-gray-600">Excellent (Grade A): Your performance is outstanding!</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-400 text-white flex items-center justify-center rounded-full">
                <span className="font-bold">B</span>
              </div>
              <p className="text-gray-600">Good (Grade B): You are doing well!</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-300 text-white flex items-center justify-center rounded-full">
                <span className="font-bold">C</span>
              </div>
              <p className="text-gray-600">Average (Grade C): There is room for improvement.</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-200 text-white flex items-center justify-center rounded-full">
                <span className="font-bold">D</span>
              </div>
              <p className="text-gray-600">Needs Improvement (Grade D): Additional effort is required.</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 text-white flex items-center justify-center rounded-full">
                <span className="font-bold">F</span>
              </div>
              <p className="text-gray-600">Fail (Grade F): Please review the material and seek assistance.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p>For further help, <a href="mailto:support@school.com" className="text-blue-400 hover:underline">contact support</a>.</p>
      </footer>
    </div>
  );
};

export default HelpPage;
