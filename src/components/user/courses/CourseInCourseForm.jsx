function CourseInCourseForm(props) {
  return (
    <>
      <div className="project-box-wrapper">
        <div className="project-box">
          <div className="project-box-header">
            <span>
              {"انتهاء الدورة: "}
              {props.course.endDate}
            </span>
            <div className="more-wrapper">
              {/* <button className="project-btn-more">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button> */}
            </div>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">{props.course.courseName}</p>
            <p className="box-content-subheader">
              {props.course.teachers.map((teacher, teacherIndex) => {
                if (props.teachers[teacher.id]) return props.teachers[teacher.id].nameArab + (props.course.teachers.length > teacherIndex + 1 ? " - " : "");
                else return teacher.id;
              })}
            </p>
            <p className="box-content-schedule">أحد • ثلاثاء • خميس</p>
          </div>

          <div className="box-progress-wrapper">
            <p className="box-progress-header">نسبة الجلسات المعطاة</p>
            <div className="box-progress-bar">
              <span className="box-progress" style={{ width: "40%" }}></span>
            </div>
            <p className="box-progress-percentage">12/15</p>
          </div>

          <div className="project-box-footer">
            <div className="participants">توقيت الدورة اليومي</div>

            <div className="days-left">عدد الجلسات المتبقية</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseInCourseForm;
