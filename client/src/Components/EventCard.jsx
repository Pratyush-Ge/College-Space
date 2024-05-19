import localImage from '../assets/local.jpg';
const EventCard = () => {
    const handleOnClick = () => {
        window.location.href = 'https://google.com';
    };

    return (
      <div>
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={localImage}
              alt="Event Image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Heading</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, excepturi?</p>
            <div className="card-actions justify-between">
              <h3>Scheduled On: DATE</h3>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOnClick}>Event Site</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default EventCard;
  