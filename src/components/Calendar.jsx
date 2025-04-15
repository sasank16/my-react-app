import React from "react";

const Calendar = () => {
  return (
    <div>
      <h2>Google Calendar</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <iframe
          style={{ width: "95%", height: "600px", border: "none" }}
          src="https://calendar.google.com/calendar/embed?src=b27afcc9b3ee7d62be001aa5d57f077d6443c0e877cad8ce93b71973da1685b4%40group.calendar.google.com&ctz=Asia%2FKolkata"
          frameBorder="0"
          scrolling="no"
          title="Google Calendar"
        ></iframe>
      </div>
    </div>
  );
};

export default Calendar;
