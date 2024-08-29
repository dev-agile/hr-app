import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import useAttendanceStore from "../../store/useAttendanceStore";
import {
  Box,
  Typography,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { tokens } from "../../theme";

const Calendar = () => {
  const { attendanceData, fetchAttendance } = useAttendanceStore();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [open, setOpen] = useState(false);

  // Function to format check-in and check-out times
  const formatCheckInOut = (date, time) => {
    if (!time) return null;
    return `${date}T${time}:00`; // Ensure correct ISO format
  };

  const events = attendanceData.map((entry, index) => {
    const formattedCheckIn = formatCheckInOut(entry.date, entry.checkIn);
    const formattedCheckOut = formatCheckInOut(entry.date, entry.checkOut);

    return {
      id: index.toString(),
      title: `${entry.dayType} | Check-In: ${entry.checkIn || 'N/A'} | Check-Out: ${entry.checkOut || 'N/A'}`,
      start: formattedCheckIn || `${entry.date}T00:00:00`,
      end: formattedCheckOut || `${entry.date}T23:59:59`,
      allDay: !entry.checkIn && !entry.checkOut,
      backgroundColor: entry.dayType === 'Working' ? '#4caf50' : entry.dayType === 'Weekends' ? '#ff9800' : '#2196f3',
      textColor: '#ffffff',
    };
  });

  const handleDatesSet = (dateInfo) => {
    const { start, end } = dateInfo;
    const startDate = start.toISOString().split('T')[0];
    const endDate = end.toISOString().split('T')[0];

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    fetchAttendance('02a607ae-2125-46cc-a7a7-ee8c1e70d7a1', startDate, endDate);
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    setSelectedEvent(selected.event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        datesSet={handleDatesSet}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        displayEventTime={false} // Remove time annotations
        height="auto"
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <Typography>Title: {selectedEvent.title}</Typography>
              <Typography>
                Date:{" "}
                {selectedEvent.start.toISOString().split('T')[0]}
              </Typography>
              <Typography>Check-In: {selectedEvent.extendedProps.checkIn || "N/A"}</Typography>
              <Typography>Check-Out: {selectedEvent.extendedProps.checkOut || "N/A"}</Typography>
              <Typography>Day Type: {selectedEvent.extendedProps.dayType}</Typography>
              <Typography>Working Hours: {selectedEvent.extendedProps.workingHours}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;