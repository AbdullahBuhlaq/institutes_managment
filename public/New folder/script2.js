document.addEventListener("DOMContentLoaded", function () {
  var modeSwitch = document.querySelector(".mode-switch");

  modeSwitch.addEventListener("click", function () {
    document.documentElement.classList.toggle("dark");
  });
});

function openModal() {
  let modal = document.querySelector("#modal-window");
  modal.classList.add("showModal");
}

function closeM() {
  let m = document.querySelector("#modal-window");
  m.classList.remove("showModal");
}

document.getElementsByClassName(".mode-switch").onclick = function () {
  document.body.classList.toggle("dark");
};

var chart = document.getElementById("chart").getContext("2d"),
  gradient = chart.createLinearGradient(0, 0, 0, 450);

gradient.addColorStop(0, "rgba(0, 199, 214, 0.32)");
gradient.addColorStop(0.3, "rgba(0, 199, 214, 0.1)");
gradient.addColorStop(1, "rgba(0, 199, 214, 0)");

var data = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Applications",
      backgroundColor: gradient,
      pointBackgroundColor: "#00c7d6",
      borderWidth: 1,
      borderColor: "#0e1a2f",
      data: [60, 45, 80, 30, 35, 55, 25, 80, 40, 50, 80, 50],
    },
  ],
};

var options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    easing: "easeInOutQuad",
    duration: 520,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: "#5e6a81",
        },
        gridLines: {
          color: "rgba(200, 200, 200, 0.08)",
          lineWidth: 1,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          fontColor: "#5e6a81",
        },
      },
    ],
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  legend: {
    display: false,
  },
  point: {
    backgroundColor: "#00c7d6",
  },
  tooltips: {
    titleFontFamily: "Poppins",
    backgroundColor: "rgba(0,0,0,0.4)",
    titleFontColor: "white",
    caretSize: 5,
    cornerRadius: 2,
    xPadding: 10,
    yPadding: 10,
  },
};

var chartInstance = new Chart(chart, {
  type: "line",
  data: data,
  options: options,
});

document.querySelector(".open-right-area").addEventListener("click", function () {
  document.querySelector(".app-right").classList.add("show");
});

document.querySelector(".close-right").addEventListener("click", function () {
  document.querySelector(".app-right").classList.remove("show");
});

document.querySelector(".menu-button").addEventListener("click", function () {
  document.querySelector(".app-left").classList.add("show");
});

document.querySelector(".close-menu").addEventListener("click", function () {
  document.querySelector(".app-left").classList.remove("show");
});

// note Creator

const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  console.log("hi from show menu");
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();

    let noteInfo = { title, description, date: `${month} ${day}, ${year}` };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});
