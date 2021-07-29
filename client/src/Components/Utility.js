import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.kolkataking.site/api",
  //baseURL: "http://localhost:5000/api",
});

export function GetCurrentDate(separator = "/") {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`;
}

export function calculateDate(days) {
  const newDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  return newDate.getTime();
}

export function jsonToArray(data) {
  let result = [];
  if (data) {
    for (let i = 0; i < data.length; i++) {
      result.push(Object.values(data[i]));
    }
  }

  return result;
}

export function ordinal(number) {
  const english_ordinal_rules = new Intl.PluralRules("en", {
    type: "ordinal",
  });
  const suffixes = {
    one: "st",
    two: "nd",
    few: "rd",
    other: "th",
  };
  const suffix = suffixes[english_ordinal_rules.select(number)];
  return suffix;
}

export function lastThreemonth() {
  var mnth = [];

  var d = new Date();
  d.setMonth(d.getMonth() - 1);
  const tmnth = d.toLocaleString("default", { month: "long" });
  mnth = [
    {
      month_name: tmnth,
      month_value:
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
      year: d.getFullYear(),
    },
  ];

  d.setMonth(d.getMonth() - 1);
  const secmnth = d.toLocaleString("default", { month: "long" });
  mnth = [
    ...mnth,
    {
      month_name: secmnth,
      month_value:
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
      year: d.getFullYear(),
    },
  ];

  d.setMonth(d.getMonth() - 1);
  const thirdmnth = d.toLocaleString("default", { month: "long" });
  mnth = [
    ...mnth,
    {
      month_name: thirdmnth,
      month_value:
        d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1,
      year: d.getFullYear(),
    },
  ];

  return mnth;
}

export const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getInitials = (name) => {
  let initials;
  const nameSplit = name.split(" ");
  const nameLength = nameSplit.length;
  if (nameLength > 1) {
    initials =
      nameSplit[0].substring(0, 1) + nameSplit[nameLength - 1].substring(0, 1);
  } else if (nameLength === 1) {
    initials = nameSplit[0].substring(0, 1);
  } else return;

  return initials.toUpperCase();
};

export const createImageFromInitials = (size, name, color) => {
  if (name == null) return;
  name = getInitials(name);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = canvas.height = size;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.font = `${size / 2}px Roboto`;
  context.fillText(name, size / 2, size / 2);

  return canvas.toDataURL();
};

export const compareDates = (date1, date2) => {
  var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if (pattern.test(date1)) {
    date1 = date1.split("/").reverse().join("/");
  }
  if (pattern.test(date2)) {
    date2 = date2.split("/").reverse().join("/");
  }

  if (new Date(date1).getTime() === new Date(date2).getTime()) {
    return true;
  } else {
    return false;
  }
};

export const convertDate = (date) => {
  var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
  if (pattern.test(date)) {
    date = date.split("/").reverse().join("/");
  }
  const newDate = new Date(date);
  return newDate.getTime();
};

export function findOcc(arr, key) {
  let arr2 = [];

  arr.forEach((x) => {
    if (
      arr2.some((val) => {
        return val[key] === x[key];
      })
    ) {
      arr2.forEach((k) => {
        if (k[key] === x[key]) {
          k["occurrence"]++;
        }
      });
    } else {
      let a = {};
      a[key] = x[key];
      a["occurrence"] = 1;
      arr2.push(a);
    }
  });
  return arr2;
}
