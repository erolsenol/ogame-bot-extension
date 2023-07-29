import moment from "moment";

export const timestampToDate = (time) => {
  return moment.unix(time).format("DD-MM-YYYY hh:mm:ss");
};

export const getElId = (id) => {
  const element = document.getElementById(id);

  return element || false;
};

export const strToNumber = (str) => {
  return Number(str.replaceAll(".", ""));
};

export function mathStabileRound(number) {
  const roundedNumber = Math.round(number + 1);
  if (roundedNumber - 1 > number) return Math.round(number);
  else return roundedNumber;
}
export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isArrayEqual(val1, val2) {
  let isEqual = true;
  if (val2 && val1.length === val2.length) {
    for (i = 0; i < val1.length; i++) {
      if (val1[i] !== val2[i]) isEqual = false;
    }
  } else isEqual = false;
  return isEqual;
}

function getActivePlanet() {
  const planetList = getElId("planetList");

  if (planetList && planetList.children.length > 1) {
    const planetEls = planetList.querySelectorAll("div[class~='smallplanet']");
    for (let index = 0; index < planetEls.length; index++) {
      const planet = planetEls[index];
      if (planet.getAttribute("class").includes("hightlightPlanet")) {
        return index;
      }
    }
  }
  return 0;
}

function sSetMultiplePlanetFunc(value) {
  const planetList = getElId("planetList");
  if (planetList && planetList.children.length > 1) {
    const activeIndex = getActivePlanet();
    const calcValue = {};
    calcValue[`planet_${activeIndex}`] = value;
    return calcValue;
  }
  return value;
}

export function storageSet(key, value, ttl = 3600000) {
  const calcValue = sSetMultiplePlanetFunc(value);

  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: calcValue,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
function sGetMultiplePlanetFunc() {
  const planetList = getElId("planetList");
  if (planetList && planetList.children.length > 1) {
    const activeIndex = getActivePlanet();
    return `planet_${activeIndex}`;
  }
  return false;
}
export function storageGet(key) {
  const itemStr = localStorage.getItem(key);
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key);
    return null;
  }

  const calcProperty = sGetMultiplePlanetFunc();
  if (calcProperty) {
    return item.value[calcProperty];
  }

  return item.value;
}
export function StorageGetInitialize(name, value) {
  let item = storageGet(name);
  if (!item) item = value;
  return item;
}

export default { storageSet, storageGet, StorageGetInitialize };
