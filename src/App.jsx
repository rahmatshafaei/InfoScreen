import React, {useState, useEffect} from 'react';
import './app.css';
import GetWeatherData from './Api/GetWeatherData';
import GetNewsData from './Api/GetNewsData';
import GetCalenderData from './Api/GetCalenderData';
import GetSkolmatData from './Api/GetSkolmatData';
import GetDocData from './Api/GetDocData';
import { format, getWeek, } from 'date-fns';
import { sv } from 'date-fns/locale';

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentDateTime));
  const [currentDay, setCurrentDay] = useState(format(currentDateTime, 'EEEE', { locale: sv }));
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
      setCurrentWeek(getWeek(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
    return (
<div className="wholePage">
    <div className="Skol">
      <h2>Skolhändelse</h2>
    </div>
    <div className="tid">
        <h3 className="inline">{currentDay}</h3>
        <span className="separator">||</span>
        <h3 className="inline">{currentDateTime.toLocaleDateString('sv-SE')}</h3>
        <h3 className="inline">{currentDateTime.toLocaleTimeString('sv-SE', { hour12: false })}</h3>
        <span className="separator">|</span>
        <h3 className="inline">Vecka:{currentWeek}</h3>
        <span className="separator">||</span>
    </div>
    <div className="weather"><GetWeatherData/></div>
    <div className="senaste">
      <h1>Senaste</h1>
    </div>
     <div className="news"><GetNewsData/></div> 
    <div className="mat"><GetSkolmatData/></div>
    <div className="calenderGoogle"><GetCalenderData/></div>
    <div className="fikaansvarig">
    <h2>Fika ansvarig</h2>
    </div>
    <div className="jsonfile"></div>
    <div className="mentorpunter"></div>
    <div className="doc"><GetDocData/></div>
</div>
);
}
export default App;