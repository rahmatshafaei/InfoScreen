import React, { useState, useEffect } from "react";
import axios from "axios";

const GetCalendarData = () => {
  const [events, setEvents] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const calendarId =
        "c_773682f1be8c378fe0118c40d052f771219f4819f18e5d9c0735655c6b1823ee@group.calendar.google.com";
      const API_KEY = "AIzaSyDNbzHBrC-jBg_IztH4DzP39BsrQAC7ve0";
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`;

      try {
        const response = await axios.get(url);
        setEvents(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="div5">
      <h2 className="calendarheading">Events</h2>
      <ul className="calendarlist">
        {events.map((event) => (
          <li className="calendaritem" key={event.id}>
            <strong className="calendarevent-name">{event.summary}</strong> -{" "}
            {event.start.dateTime
              ? new Date(event.start.dateTime).toLocaleString()
              : new Date(event.start.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetCalendarData;



















