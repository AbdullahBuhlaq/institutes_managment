const operators = {
  text: [
    { name: "يساوي", value: "equal" },
    { name: "لا يساوي", value: "not equal" },
    { name: "يحتوي", value: "contain" },
  ],
  number: [
    { name: "يساوي", value: "equal" },
    { name: "لا يساوي", value: "not equal" },
    { name: "أكبر من", value: "gt" },
    { name: "أكبر أو يساوي", value: "gte" },
    { name: "أصغر من", value: "lt" },
    { name: "أصغر أو يساوي", value: "lte" },
  ],
  select: [
    { name: "يساوي", value: "equal" },
    { name: "لا يساوي", value: "not equal" },
  ],
  array: [
    { name: "يحتوي", value: "contain" },
    { name: "لا يحتوي", value: "not contain" },
  ],
  date: [
    { name: "يساوي", value: "equal" },
    { name: "لا يساوي", value: "not equal" },
    { name: "بعد", value: "gt" },
    { name: "قبل", value: "lt" },
  ],
  "": [],
};

export default operators;
