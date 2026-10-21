import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomCalendar({ blockedIntervals, onSelectDates, selectedCheckIn, selectedCheckOut }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  // 1. NORMALIZE DATES (Ignore time completely)
  const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    // Return a number representing the exact day (YYYYMMDD)
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  };

  const checkInTime = normalizeDate(selectedCheckIn);
  const checkOutTime = normalizeDate(selectedCheckOut);

  // Check if a specific date falls inside a blocked interval
  const isDateBlocked = (date) => {
    return blockedIntervals.some(interval => {
      const start = new Date(interval.checkIn);
      const end = new Date(interval.checkOut);
      return date >= start && date < end;
    });
  };

  const handleDateClick = (date) => {
    if (isDateBlocked(date)) return;
    
    const dateTime = normalizeDate(date);

    // Start a new selection
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      onSelectDates(date, null);
    } 
    // Complete the selection
    else if (selectedCheckIn && !selectedCheckOut) {
      if (dateTime > checkInTime) {
        onSelectDates(selectedCheckIn, date);
      } else {
        // If they click a date before check-in, make it the new check-in
        onSelectDates(date, null);
      }
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];

    // Empty slots for days before the 1st
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ height: "40px" }}></div>);
    }

    // Actual days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isPast = date < new Date().setHours(0, 0, 0, 0);
      const blocked = isDateBlocked(date);
      
      const dateTime = normalizeDate(date);
      const isCheckIn = checkInTime && dateTime === checkInTime;
      const isCheckOut = checkOutTime && dateTime === checkOutTime;
      const isInRange = checkInTime && checkOutTime && dateTime > checkInTime && dateTime < checkOutTime;

      // Default styles
      let bgColor = "transparent";
      let color = "var(--charcoal)";
      let cursor = "pointer";
      let filter = "none";
      let fontWeight = 500;
      let opacity = 1;

      if (isPast || blocked) {
        color = "#ccc";
        cursor = "not-allowed";
        filter = "blur(1px)";
        opacity = 0.5;
      } else if (isCheckIn || isCheckOut) {
        // Selected Check-in & Check-out Dates (Solid Gold)
        bgColor = "var(--gold)"; 
        color = "var(--forest)"; 
        fontWeight = 700;
      } else if (isInRange) {
        // Dates in between (Soft Gold)
        bgColor = "rgba(217,164,65,0.2)"; 
        color = "var(--forest)";
        fontWeight = 600;
      }

      days.push(
        <div key={day} style={{ height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button
            onClick={() => !isPast && !blocked && handleDateClick(date)}
            disabled={isPast || blocked}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%", // Perfect circle
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: bgColor,
              color: color,
              cursor: cursor,
              filter: filter,
              fontWeight: fontWeight,
              opacity: opacity,
              fontSize: "0.9rem",
              border: "none",
              padding: 0,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isPast && !blocked && !isCheckIn && !isCheckOut) {
                e.currentTarget.style.background = "rgba(217,164,65,0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isPast && !blocked && !isCheckIn && !isCheckOut && !isInRange) {
                e.currentTarget.style.background = "transparent";
              } else if (isInRange) {
                e.currentTarget.style.background = "rgba(217,164,65,0.2)";
              }
            }}
          >
            {day}
          </button>
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ background: "var(--white)", padding: "1.5rem", borderRadius: "16px", border: "1px solid #eee" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <button onClick={handlePrevMonth} type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--forest)" }}>
          <ChevronLeft size={20}/>
        </button>
        <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--forest)" }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </strong>
        <button onClick={handleNextMonth} type="button" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--forest)" }}>
          <ChevronRight size={20}/>
        </button>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", fontSize: "0.75rem", fontWeight: 700, opacity: 0.5, marginBottom: "0.5rem", color: "var(--forest)" }}>
        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        {renderDays()}
      </div>
    </div>
  );
}