import React, { useEffect, useState } from 'react';

const MenuComponent = () => {
  const [menu, setMenu] = useState({});
  const weekdays = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://skolmaten.se/api/3/menu/?school=282367002&client=a6ygunwugosz7iwcsqv1');
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchData();
  }, []);

  const currentDayIndex = new Date().getDay();
  const currentDay = weekdays[currentDayIndex];

  let huvudItem = 'Helg';
  let vegoItem = 'Helg';

  if (menu.weeks) {
    const currentWeek = menu.weeks[0];
    if (currentWeek && currentWeek.days && currentWeek.days[currentDayIndex - 1]) {  // Adjusted index here
      const items = currentWeek.days[currentDayIndex - 1].items;  // Adjusted index here
      if (items && items.length >= 2) {
        huvudItem = items[0];
        vegoItem = items[1];
      }
    }
  }

  return (
    <div>
      <h2>{currentDay}</h2>
      <p>Huvud: {huvudItem}</p>
      <p>Vego: {vegoItem}</p>
    </div>
  );
};

export default MenuComponent;
