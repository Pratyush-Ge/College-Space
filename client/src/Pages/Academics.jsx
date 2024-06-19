import { useState } from 'react';
import Notes from '../Components/Notes';

const Academics = () => {
  const subjects = [
    'Computer Related',
    'Electronics',
    'Mechanical',
    'Civil',
    'Chemical',
    'Biotechnology',
    'IEM'
  ];

  const [selectedBranch, setSelectedBranch] = useState('Computer Related');

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="w-full ">
      <div className="relative h-screen">
        <div className="flex flex-col items-start w-full relative h-full">
          <div className="header w-full h-20 flex justify-center items-center absolute ">
              {subjects.map((subject) => (
                <div key={subject} className="px-4 py-2 z-10">
                  <button 
                    onClick={() => handleBranchChange(subject)} 
                    className={`text-white focus:outline-none ${selectedBranch === subject ? 'bg-teal-600' : 'bg-gray-700 hover:bg-teal-600'} rounded-md px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-110`}
                  >
                    {subject}
                  </button>
                </div>
              ))}
          </div>
          <div className="middleContent flex-grow w-full justify-center mt-20 flex items-center m-auto bg-gray-800 rounded-lg" style={{ overflowY: "auto", position: "relative", width:"80%"}}>
            <div className="absolute top-0 left-0 w-full h-full">
              <Notes branch={selectedBranch} />
            </div>
          </div>
          <div className="footer w-full bg-gray-700 h-10 mt-7 flex justify-center items-center">
            <h2 className="text-2xl text-white font-bold">UniVerse</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
