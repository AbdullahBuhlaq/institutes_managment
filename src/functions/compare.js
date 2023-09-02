async function compare(type, operator, value1, value2) {
  if (type === "" || operator === "" || value1 === "" || value2 === "") return true;
  if (type.type == "text") {
    value1 = value1.toLowerCase();
    value2 = value2.toLowerCase();
    if (operator == "equal") {
      return value1 == value2;
    } else if (operator == "not equal") {
      return value1 != value2;
    } else if (operator == "contain") {
      return value1.indexOf(value2) !== -1;
    }
  } else if (type.type == "number") {
    value1 = +value1;
    value2 = +value2;
    if (operator == "equal") {
      return value1 == value2;
    } else if (operator == "not equal") {
      return value1 != value2;
    } else if (operator == "gt") {
      return value1 > value2;
    } else if (operator == "gte") {
      return value1 >= value2;
    } else if (operator == "lt") {
      return value1 < value2;
    } else if (operator == "lte") {
      return value1 <= value2;
    }
  } else if (type.type == "select") {
    if (value1 == "true" || value1 == "false") value1 = value1 == "true";
    if (value2 == "true" || value2 == "false") value2 = value2 == "true";
    if (operator == "equal") {
      return value1 == value2;
    } else if (operator == "not equal") {
      return value1 != value2;
    }
  } else if (type.type == "array") {
    if (operator == "contain") {
      return value1.includes(value2);
    } else if (operator == "not contain") {
      return !value1.includes(value2);
    }
  } else if (type.type == "date") {
    if (operator == "equal") {
      return value1 == value2;
    } else if (operator == "not equal") {
      return value1 != value2;
    } else if (operator == "gt") {
      return value1 > value2;
    } else if (operator == "lt") {
      return value1 < value2;
    }
  }
  return true;
}

export default compare;
