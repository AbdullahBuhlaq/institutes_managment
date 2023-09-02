import { GiHeartOrgan, GiCoolSpices } from "react-icons/gi";
import { BsDropletHalf } from "react-icons/bs";
import { BsFillHeartPulseFill } from "react-icons/bs";

export const cardsData = {
  blood_pressure: {
    unit: "mmHg",
    title: "Blood Pressure",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 90,
    value: "100",
    png: BsFillHeartPulseFill,
    series: [
      {
        name: "Blood Pressure",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    categories: ["12-13-2020", "12-14-2020", "12-15-2020", "12-16-2020", "12-17-2020", "12-18-2020", "12-19-2020", "12-20-2020"],
  },
  sugar: {
    unit: "mmol/L",
    title: "Glucose Level",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 100,
    value: "40",
    png: GiCoolSpices,
    series: [
      {
        name: "Glucose Level",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
    categories: ["12-13-2020", "12-14-2020", "12-15-2020", "12-16-2020", "12-17-2020", "12-18-2020", "12-19-2020", "12-20-2020"],
  },
  heart_beat: {
    unit: "BPM",
    title: "Heart Beat",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 100,
    value: "40",
    png: GiHeartOrgan,
    series: [
      {
        name: "Heart Beat",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
    categories: ["12-13-2020", "12-14-2020", "12-15-2020", "12-16-2020", "12-17-2020", "12-18-2020", "12-19-2020", "12-20-2020"],
  },
  cholesterol: {
    unit: "mg/dL",
    title: "Cholesterol",
    color: {
      backGround: "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 100,
    value: "20",
    png: BsDropletHalf,
    series: [
      {
        name: "Cholesterol",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
    categories: ["12-13-2020", "12-14-2020", "12-15-2020", "12-16-2020", "12-17-2020", "12-18-2020", "12-19-2020", "12-20-2020"],
  },
};
