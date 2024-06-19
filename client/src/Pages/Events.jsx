import { useState, useEffect } from 'react';
import { BiCalendar, BiTime, BiMap } from 'react-icons/bi';
import axios from 'axios';
import BASE_API from '../api';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 



const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API}/events/getEvents`);
        const sortedEvents = response.data.sort((a, b) => {
          const dateA = new Date(a.eventDate);
          const dateB = new Date(b.eventDate);
          return dateA - dateB;
        });
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  const trimDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="EventsContainer w-full flex flex-col justify-center items-center gap-5">

      <div className="carouselContainer w-1/2 h-1/2 mt-6">
      <Carousel
      autoPlay
      interval={2500}
      transitionTime={1000} 
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      className="rounded-xl"
    >
      {events.map(event => (
        <div key={event._id} className="h-full w-full">
          <img 
            src={event.eventImage} 
            alt={event.name} 
            className="h-full w-full object-cover rounded-xl" 
          />
        </div>
      ))}
    </Carousel>
      </div>

      <div className="timeLine w-1/2 mb-20 p-8 rounded-lg bg-gray-200">
      <h1 className="text-3xl mb-4 font-extrabold text-black text-center">Timeline</h1>

        <ol className="relative border-l border-gray-300 dark:border-gray-700">
          {events.map(event => (
            <li key={event._id} className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <div className="flex items-center mb-1 text-lg font-semibold leading-none text-gray-700">
                <BiCalendar className="inline-block mr-1" /> {trimDate(event.eventDate)}
              </div>
              <div className="flex items-center mb-1 text-lg font-semibold leading-none text-gray-700">
                <BiTime className="inline-block mr-1" /> {event.eventTime}
              </div>
              <div className="flex items-center mb-1 text-lg font-semibold leading-none text-gray-700">
                <BiMap className="inline-block mr-1" /> {event.venue}
              </div>
              <h3 className="text-2xl font-extrabold text-black">{event.eventName} - {event.clubName}</h3>
              <p className="mb-4 text-lg font-normal text-gray-800">{event.eventDescription}</p>
              <a href="#" className="inline-flex items-center px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                Register
                <svg className="w-4 h-4 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );

};

export default Events;
