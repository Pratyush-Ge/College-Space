import { useState } from 'react';
import Notes from '../Components/Notes';

const Academics = () => {
  const [selectedBranch, setSelectedBranch] = useState('Computer Related');

  const handleBranchChange = (branch) => {
    setSelectedBranch(branch);
  };

  return (
    <div className="w-full">
      <div className="drawer lg:drawer-open bg-gray-200 relative h-screen">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start w-full relative">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden z-30">Open drawer</label>

          <div className="header w-full bg-gray-600 h-20 flex justify-center items-center absolute">
            <h2 className="text-2xl font-bold">Notes</h2>
          </div>

          <div className="middleContent flex-grow w-full overflow-y-auto justify-center mt-20 flex items-center">
            <Notes branch={selectedBranch} />
          </div>

          <div className="footer w-full bg-gray-600 h-20 flex justify-center items-center">
            <h2 className="text-2xl font-bold">UniVerse</h2>
          </div>
        </div>

        <div className="drawer-side z-40">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="branches h-full menu acaMenu p-4 min-h-full bg-base-200 text-lg text-base-content flex flex-col items-center">

            <p className='text-2xl font-bold h-20 mt-4'>BRANCHES</p>

            <ul className="flex flex-col justify-center items-center gap-4">
              <li><a onClick={() => handleBranchChange('Computer Related')}>Computer Related</a></li>
              <li><a onClick={() => handleBranchChange('Electronics')}>Electronics/Core</a></li>
              <li><a onClick={() => handleBranchChange('Mechanical')}>Mechanical</a></li>
              <li><a onClick={() => handleBranchChange('Civil')}>Civil</a></li>
              <li><a onClick={() => handleBranchChange('Chemical')}>Chemical</a></li>
              <li><a onClick={() => handleBranchChange('Biotechnology')}>Biotechnology</a></li>
              <li><a onClick={() => handleBranchChange('IEM')}>IEM</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Academics;
