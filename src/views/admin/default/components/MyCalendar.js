import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const publicHolidays = [new Date(2024, 5, 1), new Date(2024, 5, 25)];

const generateWeekends = (year, month) => {
  const weekends = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    if (date.getDay() === 6 || date.getDay() === 0) {
      weekends.push(new Date(date));
    }
    date.setDate(date.getDate() + 1);
  }
  return weekends;
};

const weekends = generateWeekends(2024, 5).map((date) => ({
  title: "Weekend",
  start: date,
  end: date,
  allDay: true,
}));

const generateWorkingHours = (year, month, employeeLeaves) => {
  const workingHours = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isHoliday = publicHolidays.some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
    const isEmployeeLeave = employeeLeaves.some(
      (leave) => date >= leave.start && date <= leave.end
    );

    if (!isWeekend && !isHoliday && !isEmployeeLeave) {
      const start = new Date(year, month, date.getDate(), 9, 0);
      const end = new Date(year, month, date.getDate(), 17, 0);
      workingHours.push({
        title: "Working Hours",
        start,
        end,
        allDay: false,
      });
    }
    date.setDate(date.getDate() + 1);
  }
  return workingHours;
};

const events = [
  {
    title: "Meeting",
    start: new Date(),
    end: new Date(moment().add(1, "hours").toDate()),
    allDay: false,
  },
  {
    title: "Vacation",
    start: new Date(2024, 5, 14),
    end: new Date(2024, 5, 17),
    allDay: true,
  },
  ...weekends,
  ...publicHolidays.map((date) => ({
    title: "Public Holiday",
    start: date,
    end: date,
    allDay: true,
  })),
];

export const MyCalendar = ({ employeeLeaves = [] }) => {
  const workingHours = generateWorkingHours(2024, 5, employeeLeaves);
  const allEvents = [...events, ...workingHours, ...employeeLeaves];

  const dayPropGetter = (date) => {
    const isHoliday = publicHolidays.some(
      (holiday) => holiday.toDateString() === date.toDateString()
    );
    const isEmployeeLeave = employeeLeaves.some(
      (leave) => date >= leave.start && date <= leave.end
    );
    const isWeekend = weekends.some(
      (weekend) => weekend.start.toDateString() === date.toDateString()
    );

    if (isHoliday || isEmployeeLeave || isWeekend) {
      return {
        style: {
          backgroundColor: "#FA632A",
        },
      };
    }
  };

  return (
    <div style={{ height: "70vh" }}>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", padding: "20px", borderRadius: "5px" }}
        dayPropGetter={dayPropGetter}
      />
    </div>
  );
};
