export default function jsonParse(string) {
    let res = string;
  
    while (typeof res == "string") {
      res = JSON.parse(res);
    }
  
    return res;
  }
  