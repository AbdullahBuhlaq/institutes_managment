import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import CircleChart from "../CircleChart";

// parent Card
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return <>{expanded ? <ExpandedCard param={props} setExpanded={setExpanded} expanded={expanded} /> : <CompactCard param={props} setExpanded={setExpanded} expanded={expanded} />}</>;
};

// Compact Card
function CompactCard({ param, setExpanded, expanded }) {
  const Png = param.png;
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId={"expandableCard" + param.index}
      onClick={() => setExpanded(!expanded)}
      layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="radialBar">
        <CircularProgressbar value={param.barValue} text={param.value} />
        {/* <CircleChart percentage={param.barValue} color={"blue"} /> */}
        <span>{param.title}</span>
      </div>

      <div className="detail">
        <Png />
        <span>
          {param.value}
          <i>{param.unit}</i>
        </span>
        <span>Last Diagnosis</span>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded, expanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: param.categories,
      },
    },
  };
  try {
    return (
      <motion.div
        className="ExpandedCard"
        style={{
          background: param.color.backGround,
          boxShadow: param.color.boxShadow,
        }}
        layoutId={"expandableCard" + param.index}
        layoutTransition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
          <UilTimes onClick={() => setExpanded(!expanded)} />
        </div>
        <span>{param.title}</span>
        <div className="chartContainer">
          {console.log(param.series)}
          <Chart options={data.options} series={param.series} type="area" />
        </div>
        <span>All Diagnoses</span>
      </motion.div>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Card;
