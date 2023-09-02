import CircleChart from "../../general/CircleChart";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useState } from "react";
import { cardsData } from "../../../constants/Data";
import Card from "../../general/Card/Card";
import "../../../css/Cards.css";
function Statistics(props) {
  const [cardsDataState, setCardsDataState] = useState(cardsData);

  return (
    <>
      <div className="main-header-line">
        <h1 className="top-title">الإحصائيات</h1>
        <div className="action-buttons">
          <button
            className="open-right-area"
            onClick={() => {
              props.setRightShow(!props.rightShow);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </button>
          <button
            className="menu-button"
            onClick={() => {
              props.setLeftShow(!props.leftShow);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* <div className="chart-row three">
        <div className="chart-container-wrapper">
          <div className="chart-container">
            <div className="chart-info-wrapper">
              <h2>Applications</h2>
              <span>20.5 K</span>
            </div>
            <CircleChart percentage={30} color={"pink"} />
          </div>
        </div>
        <div className="chart-container-wrapper">
          <div className="chart-container">
            <div className="chart-info-wrapper">
              <h2>Shortlisted</h2>
              <span>5.5 K</span>
            </div>
            <CircleChart percentage={60} color={"blue"} />
          </div>
        </div>
        <div className="chart-container-wrapper">
          <div className="chart-container">
            <div className="chart-info-wrapper">
              <h2>On-hold</h2>
              <span>10.5 K</span>
            </div>
            <CircleChart percentage={90} color={"orange"} />
          </div>
        </div>
      </div> */}

      <div className="cards">
        {Object.keys(cardsDataState).map((cardKey, id) => {
          return (
            <div className="parentContainer" key={id}>
              <Card index={id} unit={cardsDataState[cardKey].unit} title={cardsDataState[cardKey].title} color={cardsDataState[cardKey].color} barValue={cardsDataState[cardKey].barValue} value={cardsDataState[cardKey].value} png={cardsDataState[cardKey].png} series={cardsDataState[cardKey].series} categories={cardsDataState[cardKey].categories} />
            </div>
          );
        })}
      </div>

      <div className="chart-row two">
        <div className="chart-container-wrapper big">
          <div className="chart-container">
            <div className="chart-container-header">
              <h2>Top Active Jobs</h2>
              <span>Last 30 days</span>
            </div>
            <Line
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [
                  {
                    label: "تكاليف",
                    backgroundColor: (context) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 450);
                      gradient.addColorStop(0, "rgba(0, 199, 214, 0.32)");
                      gradient.addColorStop(0.3, "rgba(0, 199, 214, 0.1)");
                      gradient.addColorStop(1, "rgba(0, 199, 214, 0)");

                      return gradient;
                    },
                    fill: true,
                    pointBackgroundColor: "#00c7d6",
                    borderWidth: 1,
                    borderColor: "#0e1a2f",
                    data: [60, 45, 80, 30, 35, 55, 25, 80, 40, 50, 80, 50],
                  },
                  {
                    label: "عوائد",
                    backgroundColor: (context) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 450);
                      gradient.addColorStop(0, "rgba(250, 109, 114, 0.32)");
                      gradient.addColorStop(0.3, "rgba(250, 109, 114, 0.1)");
                      gradient.addColorStop(1, "rgba(250, 109, 114, 0)");

                      return gradient;
                    },
                    fill: true,
                    pointBackgroundColor: "red",
                    borderWidth: 1,
                    borderColor: "rgba(250, 109, 114, 0.32)",
                    data: [50, 65, 30, 40, 35, 65, 35, 70, 20, 30, 70, 20],
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                  easing: "easeInOutQuad",
                  duration: 520,
                },
                scales: {
                  y: {
                    ticks: {
                      fontColor: "#5e6a81",
                    },
                    gridLines: {
                      color: "rgba(100, 250, 250, 0.08)",
                      lineWidth: 1,
                    },
                  },

                  x: {
                    ticks: {
                      fontColor: "#5e6a81",
                    },
                  },
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
              }}
            />
            <div className="chart-data-details">
              <div className="chart-details-header"></div>
            </div>
          </div>
        </div>

        <div className="chart-container-wrapper small">
          <div className="chart-container applicants">
            <div className="chart-container-header">
              <h2>New Applicants</h2>
              <span>Today</span>
            </div>

            <div className="applicant-line">
              <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
              <div className="applicant-info">
                <span>Emma Ray</span>
                <p>
                  Applied for <strong>Product Designer</strong>
                </p>
              </div>
            </div>

            <div className="applicant-line">
              <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" alt="profile" />
              <div className="applicant-info">
                <span>Ricky James</span>
                <p>
                  Applied for <strong>IOS Developer</strong>
                </p>
              </div>
            </div>

            <div className="applicant-line">
              <img src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
              <div className="applicant-info">
                <span>Julia Wilson</span>
                <p>
                  Applied for <strong>UI Developer</strong>
                </p>
              </div>
            </div>

            <div className="applicant-line">
              <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" alt="profile" />
              <div className="applicant-info">
                <span>Jess Watson</span>
                <p>
                  Applied for <strong>Design Lead</strong>
                </p>
              </div>
            </div>

            <div className="applicant-line">
              <img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80" alt="profile" />
              <div className="applicant-info">
                <span>John Pellegrini</span>
                <p>
                  Applied for <strong>Back-End Developer</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-container-header">
              <h2>Acquisitions</h2>
              <span href="#">This month</span>
            </div>

            <div className="acquisitions-bar">
              <span className="bar-progress rejected" style={{ width: "8%" }}></span>
              <span className="bar-progress on-hold" style={{ width: "10%" }}></span>
              <span className="bar-progress shortlisted" style={{ width: "18%" }}></span>
              <span className="bar-progress applications" style={{ width: "64%" }}></span>
            </div>

            <div className="progress-bar-info">
              <span className="progress-color applications"></span>
              <span className="progress-type">Applications</span>
              <span className="progress-amount">64%</span>
            </div>

            <div className="progress-bar-info">
              <span className="progress-color shortlisted"></span>
              <span className="progress-type">Shortlisted</span>
              <span className="progress-amount">18%</span>
            </div>

            <div className="progress-bar-info">
              <span className="progress-color on-hold"></span>
              <span className="progress-type">On-hold</span>
              <span className="progress-amount">10%</span>
            </div>

            <div className="progress-bar-info">
              <span className="progress-color rejected"></span>
              <span className="progress-type">Rejected</span>
              <span className="progress-amount">8%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statistics;
