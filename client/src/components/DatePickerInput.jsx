import { useState, useEffect, useRef } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function DatePickerInput({ value, onChange, placeholder, label, minDate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Set initial month to selected date if exists
  useEffect(() => {
    if (value) setCurrentMonth(new Date(value + "T00:00:00"));
  }, [value]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const formatLocal = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSelect = (date) => {
    onChange(formatLocal(date));
    setIsOpen(false);
  };

  const isPast = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const min = minDate ? new Date(minDate + "T00:00:00") : today;
    return date < min;
  };

  const isSelected = (date) => {
    if (!value) return false;
    return date.toDateString() === new Date(value + "T00:00:00").toDateString();
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`e-${i}`} style={{ height: "36px" }} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const past = isPast(date);
      const selected = isSelected(date);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !past && handleSelect(date)}
          disabled={past}
          style={{
            height: "36px",
            width: "36px",
            borderRadius: "50%",
            border: "none",
            background: selected ? "var(--gold)" : "transparent",
            color: past ? "#ccc" : selected ? "var(--forest)" : "var(--charcoal)",
            fontWeight: selected ? 700 : 500,
            fontSize: "0.85rem",
            cursor: past ? "not-allowed" : "pointer",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => {
            if (!past && !selected) e.currentTarget.style.background = "rgba(217,164,65,0.15)";
          }}
          onMouseLeave={(e) => {
            if (!past && !selected) e.currentTarget.style.background = "transparent";
          }}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div ref={wrapperRef} style={{ position: "relative", flex: "1 1 200px", minWidth: 0 }}>
      {label && (
        <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--forest)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <Calendar
          size={18}
          color="var(--gold)"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <input
          type="text"
          readOnly
          placeholder={placeholder}
          value={displayValue}
          onClick={() => setIsOpen(true)}
          style={{
            width: "100%",
            padding: "0.85rem 0.75rem 0.85rem 2.5rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
            boxSizing: "border-box",
            color: "var(--charcoal)",
            background: "white",
            cursor: "pointer",
            minHeight: "48px",
          }}
        />

        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: 0,
              zIndex: 100,
              background: "white",
              borderRadius: "12px",
              boxShadow: "0 15px 40px -10px rgba(16,26,23,0.25)",
              border: "1px solid #eee",
              padding: "1rem",
              minWidth: "300px",
            }}
          >
            {/* Month navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--forest)", padding: "4px" }}
              >
                <ChevronLeft size={18} />
              </button>
              <strong style={{ fontSize: "0.9rem", color: "var(--forest)" }}>
                {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
              </strong>
              <button
                type="button"
                onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--forest)", padding: "4px" }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekday headers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                opacity: 0.5,
                marginBottom: "0.25rem",
                color: "var(--forest)",
              }}
            >
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>

            {/* Day grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", justifyItems: "center" }}>
              {renderDays()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}