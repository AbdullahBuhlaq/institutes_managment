// const { log } = require("console");

// let data = {
//   "2023-6-15": {
//     1: [
//       { courseId: 12, start: "09:30", end: "10:30" },
//       { courseId: 1243, start: "10:30", end: "12:30" },
//       { courseId: 112, start: "13:30", end: "14:30" },
//       { courseId: 1231, start: "15:30", end: "16:30" },
//     ],
//     2: [],
//     3: [],
//     4: [],
//     5: [],
//   },
// };

let configFieldTime = async (table, date, countRoom) => {
  if (!table[date]) {
    //this day is allow every time in this day
    let rooms = {};
    for (let i = 1; i <= countRoom; i++) {
      rooms[i] = [];
    }
    table[date] = rooms;
    let temp = {};
    await Promise.all(
      Object.keys(table)
        .sort()
        .map((item, index) => {
          temp[item] = table[item];
        })
    );
    table = temp;
  }
  return table;
};

let data = `{"2023-6-15":{"1":[{"courseId":12,"start":"09:30","end":"10:30"},{"courseId":1243,"start":"10:30","end":"12:30"},{"courseId":112,"start":"13:30","end":"14:30"},{"courseId":1231,"start":"15:30","end":"16:30"}],"2":[],"3":[],"4":[],"5":[]}}`;
let isTimeAvailable = async (table, info) => {
  let courses = table[info.date];
  if (!courses) return { success: true }; //this day is allow every time in this day

  courses = courses[info.room];
  let res = false;
  await Promise.all(
    courses.map((course) => {
      const { start, end } = course;
      if (info.startTime >= start && info.startTime < end)
        res = {
          success: false,
          courseId: course.courseId,
          error: "الوقت يتداخل مع بداية دورة موجودة",
        };
      if (info.endTime > start && info.endTime <= end)
        res = {
          success: false,
          courseId: course.courseId,
          error: "الوقت يتداخل مع نهاية دورة موجودة",
        };

      if (info.startTime <= start && info.endTime >= end)
        res = {
          success: false,
          courseId: course.courseId,
          error: "الوقت يتضمن بالكامل دورة موجودة",
        };
    })
  );
  if (res) return res;
  return { success: true, msg: "لا يوجد دورة في هذا الوقت" };
};

let addCourseToTable = async (data, info) => {
  let table = await configFieldTime(data, info.date, info.countRoom);

  let result = await isTimeAvailable(table, info);
  if (result.error) return { ...result };

  // "لا يوجد دورة في هذا الوقت"
  let courses = table[info.date][info.room];
  let index = courses.length;
  let found = false;

  await Promise.all(
    courses.map((course, courseIndex) => {
      // console.log(course.start, info.startTime);
      if (course.start > info.startTime && !found) {
        console.log(courseIndex);
        index = courseIndex;
        found = true;
      }
    })
  );

  if (index == courses.length)
    courses = [
      ...courses,
      {
        courseId: info.courseId,
        start: info.startTime,
        end: info.endTime,
      },
    ];
  else
    courses = [
      ...courses.slice(0, index),
      {
        courseId: info.courseId,
        start: info.startTime,
        end: info.endTime,
      },
      ...courses.slice(index),
    ];
  // courses.push({
  //   courseId: info.courseId,
  //   start: info.startTime,
  //   end: info.endTime,
  // });
  table[info.date][info.room] = courses;
  return table;
};

//delete if found ,but if noé found is not do any thing just return the table
let deleteCourseInTable = async (table, date, room, index) => {
  if (table[date] && table[date][room] && Array.isArray(table[date][room]) && table[date][room][index]) table[date][room].splice(index, 1);
  return table;
};

// let updateCourseInTable = (table, info) => {
//   let tableRecent = configFieldTime(table, info.recent.date, info.countRoom);

//   let tableNew = configFieldTime(table, info.new.date, info.countRoom);
//   ///check if the new time is available or not
//   let result = isTimeAvailable(tableNew, info.new);

//   //الوقت الجديد غير فارغ
//   if (result.error) return { ...result };

//   ///check if the recent time is found or not and deleted it

//   let b = false;
//   let index = null;
//   let courses = tableRecent[info.recent.date][info.recent.room];
//   for (let i in courses) {
//     if (courses[i].courseId === info.recent.courseId && courses[i].start === info.recent.startTime && courses[i].end === info.recent.endTime) {
//       b = true;
//       index = i;
//       break;
//     }
//   }
//   if (!b)
//     return {
//       success: false,
//       error: "تفاصيل الدورة المدخلة سابقة غير صحيحة ",
//     };

//   tableRecent = deleteCourseInTable(table, info.recent.date, info.recent.room, index);
//   //every things is good ,then update the course
//   table = addCourseToTable(tableRecent, {
//     ...info.new,
//     countRoom: info.countRoom,
//   });
//   return table;
// };

// //when add or update should pass the count room
// // ! Tests

// let info = {
//   recent: {
//     date: "2023-6-11",
//     startTime: "16:30",
//     courseId: 222,
//     endTime: "16:40",
//     room: 1,
//   },
//   new: {
//     courseId: 366,
//     date: "2023-6-11",
//     startTime: "09:30",
//     endTime: "10:40",
//     room: 2,
//   },
//   countRoom: 10,
// };

// res = deleteCourseInTable(data, "2023-2-15", 3, 2);

// console.log(2, updateCourseInTable(rr, info));

// console.log(
//   isTimeAvailable(JSON.parse(data), {
//     date: "2023-6-15",
//     startTime: "08:30",
//     endTime: "09:00",
//     room: 1,
//   })
// );

// let rr = addCourseToTable(JSON.parse(data), {
//   date: "2023-6-11",
//   startTime: "16:30",
//   courseId: 222,
//   endTime: "16:40",
//   room: 1,
//   countRoom: 5,
// });

export default addCourseToTable;
