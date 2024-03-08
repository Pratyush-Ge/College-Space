/* eslint-disable react/prop-types */
// import React from 'react';

const FeedCard = ({ thread, username }) => {
    return (
      <div className="card w-96 glass">
        {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!"/></figure> */}
        <div className="card-body">
          <h2 className="card-title text-black">{thread}</h2>
          <p className="text-black">{`Posted by ${username}`}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Learn now!</button>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default FeedCard;
  
  
  