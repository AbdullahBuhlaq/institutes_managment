import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../../../css/styleCalendar.css";
import _ from "lodash";

const Calendar = (props) => {
  const [editSchedule, setEditSchedule] = useState(false);

  const handleEvents = async (events) => {
    let newEvents = [];
    await Promise.all(
      events.map((event) => {
        newEvents = [...newEvents, { id: event.id, start: event.startStr, end: event.endStr, title: event.title, courseId: event.courseId }];
      })
    );
    await Promise.resolve(props.setCurrentSchedule({ ...props.currentSchedule, [props.currentClassSession]: { data: [...newEvents] } }));
    //send to server newEvents
  };

  const handleDateSelect = (selectInfo) => {
    // let title = prompt("Please enter a name of patient");
    let title = props.courseName;
    let courseId = props.courseId;
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();
    const id = props.currentSchedule[props.currentClassSession].data.length ? parseInt(props.currentSchedule[props.currentClassSession].data[props.currentSchedule[props.currentClassSession].data.length - 1].id) + 1 : 1;
    if (title) {
      calendarApi.addEvent({
        id: id,
        title,
        courseId,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm("هل أنت متأكد من الحذف")) {
      clickInfo.event.remove();
    }
  };

  const handleEventContent = (info) => {
    try {
      return (
        <>
          <div className={"project-detail develop" + (info.view.type == "timeGridDay" ? " im-day" : "")}>{info.timeText + " - " + info.event.title}</div>
        </>
      );
    } catch (err) {
      console.log(err);
    }
  };

  const [duringAdd, setDuringAdd] = useState(false);
  // const handleSendToBack = async () => {
  //   const newData = { username: props.profile.username, gender: props.profile.gender, name: props.profile.name, address: props.profile.address, medicalSpecialty: props.profile.medicalSpecialty, schedule: { data: [...props.currentSchedule] } };
  //   const infoRequestOptions = {
  //     ...requestOptions,
  //     headers: { ...requestOptions.headers, authorization: props.userInformation.token },
  //     method: "PUT",
  //     body: JSON.stringify({
  //       ...newData,
  //       schedule: JSON.stringify(newData.schedule),
  //     }),
  //   };

  //   setDuringAdd(true);
  //   const response = await fetch(`${import.meta.env.VITE_URL}/doctor/update`, infoRequestOptions);

  //   const data = await response.json();

  //   if (data.success) {
  //     props.setProfile({ ...props.profile, schedule: { data: [...props.currentSchedule] } });
  //     setEditSchedule(false);

  //     props.toast.success("Schedule Edited", {
  //       position: props.toast.POSITION.TOP_CENTER,
  //     });
  //   } else {
  //     console.log(data.error);
  //     props.toast.error(data.error, {
  //       position: props.toast.POSITION.TOP_CENTER,
  //     });
  //   }
  //   setDuringAdd(false);
  //   //send
  // };

  const calendarRef = useRef();
  const [key, setKey] = useState(0);

  // const handleCancel = () => {
  //   props.setCurrentSchedule(_.cloneDeep(props.schedule.data));
  //   setKey(key + 1);
  //   setEditSchedule(false);
  //   props.toast.success("Changes Canceled", {
  //     position: props.toast.POSITION.TOP_CENTER,
  //   });
  // };

  const [currentView, setCurrentView] = useState("timeGridWeek");
  const handleViewChange = (view) => {
    setCurrentView(view.view.type);
  };

  useEffect(() => {
    console.log(props.currentSchedule[props.currentClassSession], props.currentClassSession);
  }, []);

  try {
    return (
      <>
        <div className="calendar-container">
          <div>
            <FullCalendar
              key={key}
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              views={{
                timeGridDay: {
                  type: "timeGrid",
                  duration: { days: 1 },
                },
              }}
              allDaySlot={false}
              initialView={currentView}
              slotDuration={"00:15:00"}
              selectable={true}
              editable={true}
              //   eventDragStart={handleEditStart}
              //   eventDrop={handleEditEnd}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={true}
              nowIndicator={true}
              initialEvents={props.currentSchedule[props.currentClassSession].data}
              eventsSet={handleEvents}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventContent={handleEventContent}
              viewDidMount={handleViewChange}
              eventOverlap={false}
            />
          </div>
        </div>
        {/* <div className="app-content-actions" style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            className="action-button"
            onClick={() => {
              setEditSchedule(true);
            }}
            disabled={editSchedule || duringAdd}
          >
            Edit Schedule
          </button>
          <button
            className="action-button"
            onClick={() => {
              handleSendToBack();
            }}
            disabled={!editSchedule || duringAdd}
          >
            Save Changes
          </button>
          <button
            className="action-button"
            onClick={() => {
              handleCancel();
            }}
            disabled={!editSchedule || duringAdd}
          >
            Cancel Changes
          </button>
        </div> */}
      </>
    );
  } catch (err) {
    console.log(err);
  }
};

export default Calendar;
