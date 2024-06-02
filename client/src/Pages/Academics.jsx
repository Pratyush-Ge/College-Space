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
    <div className="w-full">
      <div className="bg-gray-200 relative h-screen">
        <div className="flex flex-col items-start w-full relative h-full">
          <div className="header w-full bg-gray-300  h-20 flex justify-center items-center absolute">
            <div className="flex justify-evenly w-full">
              {subjects.map((subject) => (
                <div key={subject} className="px-4 py-2">
                  <button 
                    onClick={() => handleBranchChange(subject)} 
                    className={`text-white focus:outline-none ${selectedBranch === subject ? 'bg-teal-600' : 'bg-gray-500 hover:bg-teal-600'} rounded-md px-4 py-2 transition-all duration-200 ease-in-out transform hover:scale-110`}
                  >
                    {subject}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="middleContent flex-grow w-full justify-center mt-20 flex items-center" style={{ overflowY: "auto", position: "relative" }}>
            <div className="absolute top-0 left-0 w-full h-full">
              <Notes branch={selectedBranch} />
            </div>
          </div>
          <div className="footer w-full bg-gray-600 h-10 flex justify-center items-center">
            <h2 className="text-2xl font-bold">UniVerse</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
