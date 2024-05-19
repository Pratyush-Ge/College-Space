/* eslint-disable no-unused-vars */
import EventCard from "../Components/EventCard";

const Events = () => {
  // Sample data for events
  const eventData = [
    {
      eventName: 1,
      title: "Event One",
      eventDescription: "2024-01-01",
      eventDate: "New York",
      eventImage: "Description of Event One.",
      eventLink : "null"
    },
    {
      eventName: 1,
      title: "Event One",
      eventDescription: "2024-01-01",
      eventDate: "New York",
      eventImage: "Description of Event One.",
      eventLink : "null"
    },
    {
      eventName: 1,
      title: "Event One",
      eventDescription: "2024-01-01",
      eventDate: "New York",
      eventImage: "Description of Event One.",
      eventLink : "null"
    },
  ];

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventName = e.target.eventName.value;
    const eventDescription = e.target.eventDescription.value;
    const eventDate = e.target.eventDate.value;
    const eventImage = e.target.eventImage.value;
    const eventLink = e.target.eventLink.value;
    // console.log(eventName, eventDescription, eventDate, eventImage);
    const eventObj = {
      eventName,
      eventDescription,
      eventDate,
      eventImage,
      eventLink
    };
    console.log(eventObj);
  };
  return (
    <div>
      <div className="flex flex-wrap justify-center align-middle">
        {eventData.map((event) => (
          <div key={event.id} className="mr-4 mb-4">
            <EventCard
              title={event.title}
              date={event.date}
              description={event.description}
            />
          </div>
        ))}
      </div>
      <div className="flex">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add Event
        </button>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div>
            <form
              className="max-w-sm mx-auto"
              onSubmit={handleSubmit}
              action="post"
            >
              <div className="mb-5">
                <label
                  htmlFor="eventName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter name of the Event"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="eventDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter name of the Event"
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="eventDescription"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {" "}
                  Description
                </label>
                <textarea
                  id="eventDescription"
                  name="eventDescription"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the Description for the event"
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="eventLink"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Organization Link
                </label>
                <input
                  type="text"
                  id="eventLink"
                  name="eventLink"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Organization Link"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="eventImage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Thumbnail Image
                </label>
                <input
                  type="file"
                  id="eventImage"
                  name="eventImage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex items-start mb-5"></div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Events;
