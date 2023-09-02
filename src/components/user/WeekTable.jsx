import { Fragment } from "react";
import convertTime from "../../functions/converTime";

function WeekTable(props) {
  let onHour = parseFloat(props.openHour.slice(0, 2)) + parseFloat(props.openHour.slice(3)) / 100;
  let offHour = parseFloat(props.closeHour.slice(0, 2)) + parseFloat(props.closeHour.slice(3)) / 100;
  let prev = onHour;
  let prevString = props.openHour;
  return (
    <div className="table-wapper">
      <table>
        <tbody>
          <tr>
            <td>
              <p>{props.date}</p>
              {new Date(props.date).toLocaleString("ar-SA", { weekday: "long" })}
            </td>
            {props.sessions.map((session, index) => {
              let start = parseFloat(session.start.slice(0, 2)) + parseFloat(session.start.slice(3)) / 100;
              let end = parseFloat(session.end.slice(0, 2)) + parseFloat(session.end.slice(3)) / 100;
              let pprev = prev;
              let pprevString = prevString;
              prev = end;
              prevString = session.end;

              return (
                <Fragment key={index}>
                  {Math.max(onHour, pprev) - Math.min(offHour, start) ? (
                    <td
                      className="available"
                      onClick={() => {
                        props.type == 1 && props.setState({ ...props.state, date: props.date, start: Math.max(onHour, pprev) == onHour ? props.openHour : pprevString, end: Math.min(offHour, start) == offHour ? props.closeHour : session.start });
                      }}
                    >
                      {convertTime(Math.max(onHour, pprev) == onHour ? props.openHour : pprevString)} {" - "} {convertTime(Math.min(offHour, start) == offHour ? props.closeHour : session.start)}
                    </td>
                  ) : null}
                  <td
                    className="busy"
                    onClick={() => {
                      console.log(props.type, session.courseId, props.courseId);
                      if (props.type == 1 || (props.type == 2 && (session.courseId == props.courseId.id || session.courseId == -1))) props.setState({ ...props.state, date: props.date, start: session.start, end: session.end, index: index });
                    }}
                    style={{ backgroundColor: session.courseId == props.courseId.id || session.courseId == -1 ? "#deb209" : "#FF1154" }}
                  >
                    {convertTime(session.start)} {" - "}
                    {convertTime(session.end)} <br /> {session.courseId != -1 ? props.courses[session.courseId].courseName : props.courseName}
                  </td>
                </Fragment>
              );
            })}
            {prev - offHour ? (
              <td
                className="available"
                onClick={() => {
                  props.type == 1 && props.setState({ ...props.state, date: props.date, start: prevString, end: props.closeHour });
                }}
              >
                {convertTime(prevString)}
                {" - "}
                {convertTime(props.closeHour)}
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeekTable;
