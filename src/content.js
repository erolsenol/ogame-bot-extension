import qs from "qs";
import $ from "jquery";
import init from "./ui";
import {
  getElId,
  strToNumber,
  mathStabileRound,
  getRndInteger,
  isNumeric,
  isArrayEqual,
  storageSet,
  storageGet,
  StorageGetInitialize,
} from "./helper";

import {
  initResource,
  initProducer,
  initFacility,
  initLifeform,
  initCountdown,
  // initGameStatus,
  initOvermark,
  initResearch,
  initShipyard,
  initGamePlayStatus,
  initTarget,
  initSpyGalaxy,
  initMyPlanetAttack,
} from "./constant";

console.log("content");

const resource = StorageGetInitialize("resource", initResource);
const producer = StorageGetInitialize("producer", initProducer);
const facility = StorageGetInitialize("facility", initFacility);
const lifeform = StorageGetInitialize("lifeform", initLifeform);
const countdown = StorageGetInitialize("countdown", initCountdown);
// let gameStatus = StorageGetInitialize("gameStatus", initGameStatus);
const overmark = StorageGetInitialize("overmark", initOvermark);
const research = StorageGetInitialize("research", initResearch);
const shipyard = StorageGetInitialize("shipyard", initShipyard);
const myPlanetAttack = StorageGetInitialize("myPlanetAttack", [
  initMyPlanetAttack,
]);
const resourceGeneration = StorageGetInitialize(
  "resourceGeneration",
  initResource
);
const gamePlayStatus = StorageGetInitialize(
  "gamePlayStatus",
  initGamePlayStatus
);
const spyGalaxy = StorageGetInitialize("spyGalaxy", initSpyGalaxy);
let hasDevelopment = StorageGetInitialize("hasDevelopment", false);
let gameReload = false;

//resource
//gameStatus.energyLow
function getResources() {
  const resourcesAreaEl = getElId("resources");
  if (!resourcesAreaEl) {
    return false;
  }

  const metalEl = getElId("resources_metal");
  const crystalEl = getElId("resources_crystal");
  const deuteriumEl = getElId("resources_deuterium");
  const energyEl = getElId("resources_energy");
  const populationEl = getElId("resources_population");
  const foodEl = getElId("resources_food");
  const darkmatterEl = getElId("resources_darkmatter");

  const metal = strToNumber(metalEl.innerText);
  const crystal = strToNumber(crystalEl.innerText);
  const deuterium = strToNumber(deuteriumEl.innerText);
  const energy = strToNumber(energyEl.innerText);
  const population = strToNumber(populationEl.innerText);
  const food = strToNumber(foodEl.innerText);
  const darkmatter = strToNumber(darkmatterEl.innerText);

  const resource = {
    metal,
    crystal,
    deuterium,
    energy,
    population,
    food,
    darkmatter,
  };

  // gameStatus.energyLow = energy < 0;

  storageSet("resource", resource);
  // storageSet("gameStatus", gameStatus);
  //   console.log("resource", resource);
}

//producer
function getProducers() {
  const producersAreaEl = getElId("producers");
  if (!producersAreaEl) {
    return false;
  }

  const producerNameArr = [
    "metalMine",
    "crystalMine",
    "deuteriumSynthesizer",
    "solarPlant",
    "fusionPlant",
    "solarSatellite",
    "resbuggy",
    "metalStorage",
    "crystalStorage",
    "deuteriumStorage",
  ];

  for (const producerName of producerNameArr) {
    const producerContainer = producersAreaEl.querySelector(
      `li[class~="${producerName}"]`
    );
    const spanVal = ["resbuggy", "solarSatellite"].includes(producerName)
      ? "amount"
      : "level";

    const producerLevelEl = producerContainer.querySelector(
      `span[class='${spanVal}']`
    );

    const level = producerLevelEl.getAttribute("data-value");

    producer[producerName] = Number(level);
  }
  storageSet("producer", producer);
  //   console.log("producer", producer);

  setCountdown("producers", "countdownbuildingDetails", producersAreaEl);
}

//facility
function getFacilities() {
  const facilitiesAreaEl = getElId("facilities");
  if (!facilitiesAreaEl) {
    return false;
  }

  const technologiesAreaEl = getElId("technologies");

  const facilityNameArr = [
    "roboticsFactory",
    "shipyard",
    "researchLaboratory",
    "allianceDepot",
    "missileSilo",
    "naniteFactory",
    "terraformer",
    "repairDock",
  ];

  for (const facilityName of facilityNameArr) {
    const facilityContainer = technologiesAreaEl.querySelector(
      `li[class~="${facilityName}"]`
    );
    const spanVal = "level";

    const facilityLevelEl = facilityContainer.querySelector(
      `span[class='${spanVal}']`
    );

    const level = facilityLevelEl.getAttribute("data-value");

    facility[facilityName] = Number(level);
  }
  storageSet("facility", facility);

  setCountdown("facilities", "countdownbuildingDetails", facilitiesAreaEl);
}

//lifeform
function GetLfBuildings() {
  const lfbuildingsAreaEl = getElId("lfbuildings");
  if (!lfbuildingsAreaEl) {
    return false;
  }

  const technologiesAreaEl = getElId("technologies");

  const lifeformNameArr = [
    "lifeformTech11101",
    "lifeformTech11102",
    "lifeformTech11103",
    "lifeformTech11104",
    "lifeformTech11105",
    "lifeformTech11106",
    "lifeformTech11107",
    "lifeformTech11108",
    "lifeformTech11109",
    "lifeformTech11110",
    "lifeformTech11111",
    "lifeformTech11112",
  ];

  for (const lifeformName of lifeformNameArr) {
    const lifeformContainer = technologiesAreaEl.querySelector(
      `li[class~="${lifeformName}"]`
    );
    const spanVal = "level";

    const lifeformLevelEl = lifeformContainer.querySelector(
      `span[class='${spanVal}']`
    );

    const level = lifeformLevelEl.getAttribute("data-value");

    lifeform[lifeformName] = Number(level);
  }
  storageSet("lifeform", lifeform);
  //   console.log("lifeform", lifeform);

  setCountdown("lfbuildings", "countdownlfbuildingDetails", lfbuildingsAreaEl);
}

function setCountdown(property, countdownName, searchEl = document) {
  const countDownEl = searchEl.querySelector(`#${countdownName}`);
  if (countDownEl) {
    const endTime = countDownEl.getAttribute("data-end");

    const countdown = StorageGetInitialize("countdown", initCountdown);
    countdown[property] = Number(endTime);
    storageSet("countdown", countdown);

    if (["bitti"].includes(countDownEl.innerText) && !gameReload) {
      gameReload = true;
      location.reload();
    }
  }
}

//research
function getTechnologies() {
  const researchAreaEl = getElId("research");
  if (!researchAreaEl) {
    return false;
  }

  const researchNameArr = [
    "energyTechnology",
    "laserTechnology",
    "ionTechnology",
    "hyperspaceTechnology",
    "plasmaTechnology",
    "combustionDriveTechnology",
    "impulseDriveTechnology",
    "hyperspaceDriveTechnology",
    "espionageTechnology",
    "computerTechnology",
    "astrophysicsTechnology",
    "researchNetworkTechnology",
    "gravitonTechnology",
    "weaponsTechnology",
    "shieldingTechnology",
    "armorTechnology",
  ];

  for (const researchName of researchNameArr) {
    const researchContainer = researchAreaEl.querySelector(
      `li[class~="${researchName}"]`
    );

    if (researchContainer) {
      const spanVal = "level";
      const researchLevelEl = researchContainer.querySelector(
        `span[class='${spanVal}']`
      );

      const level = researchLevelEl.getAttribute("data-value");

      research[researchName] = Number(level);
    }
  }
  storageSet("research", research);

  setCountdown("research", "countdownresearchDetails", researchAreaEl);
}

//overmark
function updateOvermark() {
  const resourcesAreaEl = getElId("resources");
  if (!resourcesAreaEl) {
    return false;
  }

  const overmark = StorageGetInitialize("overmark", initOvermark);

  const resourceArr = [
    "resources_metal",
    "resources_crystal",
    "resources_deuterium",
    "resources_energy",
    "resources_population",
    "resources_food",
  ];

  for (const resourceName of resourceArr) {
    const resEl = document.getElementById(resourceName);
    const overmarkPropertyName = resourceName.replace("resources_", "");
    if (
      resEl.hasAttribute("class") &&
      resEl.getAttribute("class") === "overmark"
    ) {
      overmark[overmarkPropertyName] = true;
    } else {
      overmark[overmarkPropertyName] = false;
    }
  }

  storageSet("overmark", overmark);
  //   console.log("overmark", overmark);
}

//shipyard
function getShipyard() {
  const shipyardAreaEl = getElId("shipyard");
  if (!shipyardAreaEl) {
    return false;
  }

  const shipyardNameArr = [
    "fighterLight",
    "fighterHeavy",
    "cruiser",
    "battleship",
    "interceptor",
    "bomber",
    "destroyer",
    "deathstar",
    "reaper",
    "explorer",
    "transporterSmall",
    "transporterLarge",
    "colonyShip",
    "recycler",
    "espionageProbe",
    "solarSatellite",
    "resbuggy",
  ];

  for (const shipyardName of shipyardNameArr) {
    const shipyardContainer = shipyardAreaEl.querySelector(
      `li[class~="${shipyardName}"]`
    );
    const spanVal = "amount";
    const shipyardLevelEl = shipyardContainer.querySelector(
      `span[class='${spanVal}']`
    );

    const level = shipyardLevelEl.getAttribute("data-value");

    shipyard[shipyardName.replace("Technology", "")] = Number(level);
  }
  storageSet("shipyard", shipyard);
  //   console.log("shipyard", shipyard);
}

//resourceGeneration
function getResourceGeneration() {
  const resGenerationAreaEl = getElId("resourcesettingscomponent");
  if (!resGenerationAreaEl) {
    return false;
  }

  const summaryTrEl = resGenerationAreaEl.querySelector(".summary");
  if (!summaryTrEl) return;

  const hourlyProductionEls = summaryTrEl.querySelectorAll("span");

  const resourceGeneration = StorageGetInitialize("resourceGeneration", {});
  const helpNames = [
    "metal",
    "crystal",
    "deuterium",
    "energy",
    "population",
    "food",
  ];
  hourlyProductionEls.forEach((item, index) => {
    if (helpNames[index] === "energy") {
      const itemText = item.innerText.trim();
      const index = itemText.indexOf("/");
      const str = itemText.substr(index + 1, itemText.length - (index + 1));
      resourceGeneration[helpNames[index]] = Number(str);
    } else {
      resourceGeneration[helpNames[index]] = Number(
        item.innerText.trim().replaceAll(".", "")
      );
    }
  });
  storageSet("resourceGeneration", resourceGeneration);
  //   console.log("resourceGeneration", resourceGeneration);
}

function hasError() {
  const mainFrameError = document.querySelector("#main-frame-error");
  if (mainFrameError) {
    return true;
  }
}

function hasLogin() {
  const joinGame = getElId("joinGame");
  if (joinGame) {
    joinGame.children[1].click();
    return false;
  }
  return true;
}

function updateCountdown() {
  const now = mathStabileRound(Date.now() / 1000);
  const countdown = StorageGetInitialize("countdown", initCountdown);
  const keys = Object.keys(countdown);
  keys.forEach((key) => {
    if (countdown[key] < now) {
      countdown[key] = 0;
    }
  });
  storageSet("countdown", countdown);
}
updateCountdown();

function uiInit() {
  if (getElId("resources_darkmatter")) {
    init(document.querySelector("body"));
  }
}
setTimeout(uiInit, 1000);

function gameInitialize() {
  getResources();
  getProducers();
  getFacilities();
  GetLfBuildings();
  getTechnologies();
  getShipyard();
  updateOvermark();
  getResourceGeneration();
}

async function planetInitialize() {}

//attack
function hasAttack() {
  let myPlanetAttack = StorageGetInitialize("myPlanetAttack", []);

  const attackEl = getElId("attack_alert");
  if (attackEl) {
    const eventContent = getElId("eventContent");
    if (eventContent) {
      const eventTrs = eventContent.querySelectorAll("tr");
      myPlanetAttack = [];
      for (let index = 0; index < eventTrs.length; index++) {
        const eventTr = eventTrs[index];
        const hostileSpan = eventTr.querySelector("span[class~='hostile']");
        if (hostileSpan) {
          const attackTime = Number(eventTr.getAttribute("data-arrival-time"));
          const planetCoor = eventTr.children[8].innerText
            .trim()
            .replace("[", "")
            .replace("]", "")
            .split(":");

          myPlanetAttack.push({
            time: attackTime,
            coor: planetCoor,
            escape: false,
          });
        }
      }
    }

    if (myPlanetAttack.length > 0) {
      storageSet("myPlanetAttack", myPlanetAttack);
      console.log("attack");
    }
  }
}

async function start() {
  if (!window.location.origin.includes("ogame")) {
    return;
  }

  const error = hasError();
  if (error) {
    setTimeout(() => {
      location.reload();
    }, 300000);
    return;
  }

  const galaxyLoading = getElId("galaxyLoading");
  if (galaxyLoading && !galaxyLoading.hasAttribute("style")) {
    return;
  }

  const login = hasLogin();
  if (!login) return;

  hasAttack();

  gameInitialize();
  if (gameWayConditionCalc("standartDevelop")) {
    await standartSuppliesDevelopment();
  } else if (gameWayConditionCalc("lfbuildings")) {
    await standartLfbuildingsDevelopment();
  } else if (gameWayConditionCalc("message")) {
    await messageClear();
  } else if (gameWayConditionCalc("attack")) {
    await attackTarget();
  } else if (gameWayConditionCalc("spyGalaxy")) {
    await spyGalaxyStart();
  }
}

function gameWayConditionCalc(type) {
  if (!type) return false;
  const gamePlayStatus = StorageGetInitialize(
    "gamePlayStatus",
    initGamePlayStatus
  );
  const now = mathStabileRound(Date.now() / 1000);
  const countdown = StorageGetInitialize("countdown", initCountdown);

  const keys = Object.keys(countdown);
  let time = 0;
  keys.forEach((item) => {
    if (countdown[item] - now > time) {
      time = now - countdown[item];
    }
  });

  if (time > 0) console.log("time", time);

  if (type === "standartDevelop") {
    let remaningTime = 0;
    if (hasDevelopment) {
      const keys = Object.keys(countdown);
      keys.forEach((key) => {
        if (countdown[key] > 0 && countdown[key] > remaningTime) {
          remaningTime = countdown[key];
        }
      });
      return gamePlayStatus.producers.status && remaningTime < now;
    }
    return gamePlayStatus.producers.status && countdown.producers < now;
  }

  return gamePlayStatus[type].status === 1 && countdown[type] < now;
}
async function galaxySystemRun() {
  return new Promise((resolve, reject) => {
    const galaxycomponent = getElId("galaxycomponent");
    let spyGalaxy = StorageGetInitialize("spyGalaxy", initSpyGalaxy);
    const spyGalaxyInterval = Number(
      StorageGetInitialize("spyGalaxyInterval", "30")
    );

    const galaxy_input = getElId("galaxy_input");
    const system_input = getElId("system_input");

    if (
      spyGalaxy.galaxy == 0 &&
      spyGalaxy.position == -1 &&
      spyGalaxy.system == 0
    ) {
      spyGalaxy.galaxy = Number(galaxy_input.getAttribute("value"));
      spyGalaxy.system = Number(system_input.getAttribute("value"));
      spyGalaxy.position = -1;
      spyGalaxy.start = {
        galaxy: spyGalaxy.galaxy,
        system: spyGalaxy.system,
      };
      storageSet("spyGalaxy", spyGalaxy);
    }

    const galaxyContent = getElId("galaxyContent");
    if (!galaxyContent) {
      return resolve(true);
    }

    if (
      galaxy_input.getAttribute("value") != spyGalaxy.galaxy ||
      system_input.getAttribute("value") != spyGalaxy.system
    ) {
      if (galaxy_input.getAttribute("value") != spyGalaxy.galaxy) {
        galaxy_input.value = spyGalaxy.galaxy;
        galaxy_input.setAttribute("value", spyGalaxy.galaxy);
      }
      if (system_input.getAttribute("value") != spyGalaxy.system) {
        system_input.value = spyGalaxy.system;
        system_input.setAttribute("value", spyGalaxy.system);
      }
      setTimeout(() => {
        galaxycomponent.querySelector("div[class='btn_blue']").click();
        return resolve(true);
      }, 500);
    }
    return resolve(true);
  });
}

let fleetcycle = StorageGetInitialize("fleetcycle", 1);
async function spyGalaxyStart() {
  const gamePlayStatus = StorageGetInitialize(
    "gamePlayStatus",
    initGamePlayStatus
  );

  const galaxycomponent = getElId("galaxycomponent");
  if (!galaxycomponent) {
    await menuClick(9);
    return;
  }

  const galaxyRow1 = getElId("galaxyRow1");
  if (!galaxyRow1) {
    return;
  }

  const errorBoxDecisionNo = errorBoxDecision.querySelector(
    "#errorBoxDecisionNo"
  );
  if (errorBoxDecisionNo && errorBoxDecisionNo.innerText.length > 1) {
    errorBoxDecisionNo.click();
    return;
  }

  let spyGalaxy = StorageGetInitialize("spyGalaxy", initSpyGalaxy);

  await galaxySystemRun();

  const galaxyRows = [];
  const galaxyRowEls = galaxyContent.querySelectorAll(
    "div[class~='galaxyRow']"
  );
  galaxyRowEls.forEach((item) => {
    if ((item.getAttribute("id") || "").includes("galaxyRow")) {
      galaxyRows.push(item);
    }
  });

  for (let index = 0; index < galaxyRows.length; index++) {
    const row = galaxyRows[index];
    const rowClass = row.getAttribute("class") || "";
    const cellAction = row.children[row.children.length - 1];
    const cellPlayerName = row.children[row.children.length - 3];
    let spyOn = true;
    if (
      !rowClass.includes("empty_filter") &&
      row.hasAttribute("id") &&
      cellPlayerName.children.length > 0 &&
      !cellPlayerName.children[0]
        ?.getAttribute("class")
        .includes("status_abbr_outlaw") &&
      !cellPlayerName.children[0]
        ?.getAttribute("class")
        .includes("honorRank") &&
      !cellPlayerName.children[0]
        ?.getAttribute("class")
        .includes("status_abbr_strong") &&
      !cellPlayerName.children[0]
        ?.getAttribute("class")
        .includes("status_abbr_vacation") &&
      !cellPlayerName.children[0]
        ?.getAttribute("class")
        .includes("status_abbr_noob")
    ) {
      if (cellPlayerName.children.length > 1) {
        let symbols = cellPlayerName.children[1].querySelectorAll("span");
        symbols.forEach((item) => {
          if (
            item.innerText === "k" &&
            item.innerText === "g" &&
            item.innerText === "t"
          ) {
            spyOn = false;
          }
        });
      }
      const fleetstatusrow = getElId("fleetstatusrow");
      if (
        fleetstatusrow.children.length > 0 &&
        fleetstatusrow.children[0].getAttribute("class") == "error"
      ) {
        spyGalaxy = { ...spyGalaxy, position: spyGalaxy.position - 1 };
        storageSet("spyGalaxy", spyGalaxy);
        return;
      }
      const spyBtn = cellAction.querySelector("a[class~='espionage']");
      if (spyBtn && spyGalaxy.position < index && spyOn) {
        spyBtn.children[0].click();
        spyGalaxy = { ...spyGalaxy, position: index };
        storageSet("spyGalaxy", spyGalaxy);
        return;
      }
    }
  }

  if (spyGalaxy.system + spyGalaxy.interval < spyGalaxy.start.system) {
    spyGalaxy.start.system = spyGalaxy.system - 1;
    storageSet("spyGalaxy", spyGalaxy);
    gamePlayStatus.message.status = 1;
    gamePlayStatus.spyGalaxy.status = 0;
    storageSet("gamePlayStatus", gamePlayStatus);
    console.log("spy over");
    return;
  }

  spyGalaxy = { ...spyGalaxy, system: spyGalaxy.system - 1, position: -1 };
  storageSet("spyGalaxy", spyGalaxy);
  await galaxySystemRun();
}

const spanFleetText = "Filolar:";
const spanDiscoveryText = "Keşifler:";
//ship quantities will be taken from the fleet page
async function attackTarget() {
  const gamePlayStatus = StorageGetInitialize(
    "gamePlayStatus",
    initGamePlayStatus
  );
  const countdown = StorageGetInitialize("countdown", initCountdown);
  const target = StorageGetInitialize("target", initTarget);
  const now = mathStabileRound(Date.now() / 1000);

  const shipsChosen = getElId("shipsChosen");
  if (!shipsChosen) {
    await menuClick(8);
    return;
  }

  const eventContent = getElId("eventContent");
  const eventContentTrArr = eventContent.querySelectorAll("tr");

  const slots = document.querySelector(".fleetStatus").querySelector("#slots");
  if (slots) {
    const fleetEl = slots.children[0];
    const discoveryEl = slots.children[1];

    const fleetText = fleetEl.innerText
      .replaceAll(" ", "")
      .replace(spanFleetText, "");
    const discoveryText = discoveryEl.innerText
      .replaceAll(" ", "")
      .replace(spanDiscoveryText, "");

    const fleetNumArr = fleetText.split("/");
    const discoveryNumArr = discoveryText.split("/");

    const currentFleetCount = Number(fleetNumArr[0]);
    const maxFleetCount = Number(fleetNumArr[1]);
    const currentDiscoveryCount = Number(discoveryNumArr[0]);
    const maxDiscoveryCount = Number(discoveryNumArr[1]);

    if (currentFleetCount >= maxFleetCount) {
      for (let index = 0; index < eventContentTrArr.length; index++) {
        const eventRow = eventContentTrArr[index];

        if (
          eventRow.getAttribute("data-mission-type") == "1" &&
          eventRow.getAttribute("data-return-flight") == "true"
        ) {
          const firstFleetReturnTime = Number(
            eventRow.getAttribute("data-arrival-time")
          );
          countdown.message = firstFleetReturnTime + getRndInteger(120, 300);
          storageSet("countdown", countdown);
          gamePlayStatus.message.status = 1;
          gamePlayStatus.attack.status = 0;
          storageSet("gamePlayStatus", gamePlayStatus);
          console.log("fleet slot Full");
          return;
        }
      }

      // countdown.message = now + 1200;
      // storageSet("countdown", countdown);
      // gamePlayStatus.message.status = 1;
      // gamePlayStatus.attack.status = 0;
      // storageSet("gamePlayStatus", gamePlayStatus);
      console.log("Fleet Full");
      return;
    }
  }

  const fleet1 = getElId("fleet1");
  if (!(fleet1.getAttribute("style") || "").includes("none")) {
    const ships = shipsChosen.querySelectorAll("li[class~='technology']");
    const transporterSmall = shipsChosen.querySelector(
      "li[class~='transporterSmall']"
    );
    const transporterLarge = shipsChosen.querySelector(
      "li[class~='transporterLarge']"
    );
    const avaibleResource = (target.resource / 100) * target.lootRate;
    const transporterSmallCapacity = 5000 * 1.25;
    const totalTSmall = mathStabileRound(
      avaibleResource / transporterSmallCapacity
    );

    const tpSmallCount = Number(
      transporterSmall.children[0].children[0].children[0].innerText
    );

    if (tpSmallCount < totalTSmall) {
      countdown.message = now + 1200;
      storageSet("countdown", countdown);
      gamePlayStatus.message.status = 1;
      gamePlayStatus.attack.status = 0;
      storageSet("gamePlayStatus", gamePlayStatus);
      console.log("Not Found Ship");
      return;
    }
    console.log("fleetcycle:", fleetcycle, fleetcycle % 2 == 0);
    if (
      transporterSmall.querySelector("input").value == totalTSmall &&
      fleetcycle % 2 == 0
    ) {
      console.log("if true");
      for (let index = 0; index < ships.length; index++) {
        const ship = ships[index];
        if (
          ship.getAttribute("data-status") === "on" &&
          !ship.getAttribute("class").includes("transporterSmall")
        ) {
          console.log("focus:", ship.querySelector("input"));
          ship.querySelector("input").parentElement.focus();
          ship.querySelector("input").focus();
          fleetcycle += 1;
          storageSet("fleetcycle", fleetcycle);
          break;
        }
      }
      if (fleetcycle > 10) {
        console.log("fleetcycle > 5");
        storageSet("fleetcycle", 0);
        await menuClick(8);
        return;
      }
    } else {
      console.log("if false");
      console.log("focus:", transporterSmall.querySelector("input"));
      fleetcycle += 1;
      transporterSmall.querySelector("input").focus();
      transporterSmall.querySelector("input").value = totalTSmall;
      transporterSmall
        .querySelector("input")
        .setAttribute("value", totalTSmall);
      return;
    }

    //ship not found
    const warning = fleet1.querySelector("#warning");
    if (warning) {
      console.log("ship not found");
    }
  }

  const fleet2 = getElId("fleet2");
  if ((fleet2.getAttribute("style") || "").includes("none")) {
    const continueToFleet2 = getElId("continueToFleet2");
    setTimeout(() => {
      continueToFleet2.children[0].click();
    }, 500);
    console.log("first click");
    return;
  }
  // if (false)
  else {
    const sendFleet = getElId("sendFleet");
    sendFleet.children[0].click();
    target.attacked = true;
    storageSet("target", target);
    gamePlayStatus.message.status = 1;
    gamePlayStatus.attack.status = 0;
    storageSet("gamePlayStatus", gamePlayStatus);
    console.log("second click");
    storageSet("fleetcycle", 0);
    return;
  }
}

const mInfoFleetText = "Filolar: ";
const mInfoDefenceText = "Savunma: ";
const mInfoResourceText = "Kaynaklar: ";
const mInfoLootText = "Ganimet: ";
let messagecycle = StorageGetInitialize("messagecycle", 0);
function messagecycleUp() {
  messagecycle += 1;
  storageSet("messagecycle", messagecycle);
}
async function messageClear() {
  const gamePlayStatus = StorageGetInitialize(
    "gamePlayStatus",
    initGamePlayStatus
  );
  const target = StorageGetInitialize("target", initTarget);

  const messageFleetTabEl = getElId("tabs-nfFleets");
  if (!messageFleetTabEl) {
    const messageWrapperEl = getElId("message-wrapper");
    if (messageWrapperEl || messagecycle > 49) {
      storageSet("messagecycle", 0);
      messageWrapperEl.children[0].click();
      return;
    }
  }

  if (!messageFleetTabEl.getAttribute("class").includes("ui-tabs-active")) {
    messageFleetTabEl.children[0].click();
  }

  const spyTabEl = getElId("subtabs-nfFleet20");
  if (!spyTabEl) {
    return;
  }

  if (!spyTabEl.getAttribute("class").includes("ui-tabs-active")) {
    spyTabEl.children[0].click();
  }

  const fleetsgenericpage = getElId("fleetsgenericpage");
  if (!fleetsgenericpage) {
    return;
  }

  const messageEls = fleetsgenericpage.querySelectorAll("li[class~='msg']");
  if (messageEls.length < 1) {
    gamePlayStatus.message.status = 0;
    gamePlayStatus.spyGalaxy.status = 1;
    storageSet("gamePlayStatus", gamePlayStatus);
    return;
  }

  let biggestResource = 0;
  for (let index = 0; index < messageEls.length; index++) {
    const messageEl = messageEls[index];
    const messageContent = messageEl.querySelector(".msg_content");
    if (!messageContent) {
      return;
    }

    if (
      messageContent.children.length < 9 ||
      messageContent.children[2].children[1].getAttribute("class") ===
        "status_abbr_noob"
    ) {
      messageEl.querySelector(".fright").querySelector("a").children[0].click();
      return;
    }
    if (messageContent.children.length > 8) {
      if (messageContent.children[8].children.length < 2) {
        //delete
        messagecycleUp();
        messageEl
          .querySelector(".fright")
          .querySelector("a")
          .children[0].click();
        return;
      }

      const msgFleetPoint = Number(
        messageContent.children[8].children[0].innerText
          .replace(mInfoFleetText, "")
          .replaceAll(".", "")
      );
      const msgDefencePoint = Number(
        messageContent.children[8].children[1].innerText
          .replace(mInfoDefenceText, "")
          .replaceAll(".", "")
      );

      if (msgFleetPoint > 0 || msgDefencePoint > 0) {
        messagecycleUp();
        messageEl
          .querySelector(".fright")
          .querySelector("a")
          .children[0].click();
        return;
      }

      const msgTotalResource = Number(
        messageContent.children[6].children[1].innerText
          .replace(mInfoResourceText, "")
          .replaceAll(".", "")
      );
      const messageMinResource = StorageGetInitialize(
        "messageMinResource",
        "20000"
      );
      if (messageMinResource > msgTotalResource) {
        messagecycleUp();
        messageEl
          .querySelector(".fright")
          .querySelector("a")
          .children[0].click();
        return;
      }
      if (target.resource === msgTotalResource && target.attacked) {
        messagecycleUp();
        messageEl
          .querySelector(".fright")
          .querySelector("a")
          .children[0].click();
        storageSet("target", initTarget);
        return;
      }
      if (msgTotalResource > biggestResource) {
        biggestResource = msgTotalResource;
      }
    }
  }

  for (let index = 0; index < messageEls.length; index++) {
    const messageEl = messageEls[index];
    const messageContent = messageEl.querySelector(".msg_content");
    if (messageContent.children.length > 8) {
      const msgTotalResource = Number(
        messageContent.children[6].children[1].innerText
          .replace(mInfoResourceText, "")
          .replaceAll(".", "")
      );
      if (biggestResource === msgTotalResource) {
        const targetGalaxyInfo = qs.parse(
          messageEl.querySelector("a").getAttribute("href")
        );
        const lootRate = Number(
          messageContent.children[7].children[0].innerText
            .replace(mInfoLootText, "")
            .replace("%", "")
        );
        storageSet("target", {
          lootRate,
          resource: msgTotalResource,
          galaxy: targetGalaxyInfo.galaxy,
          position: targetGalaxyInfo.position,
          system: targetGalaxyInfo.system,
        });
        messageEl.querySelector("span[class~='icon_attack']").click();
        gamePlayStatus.message.status = 0;
        gamePlayStatus.attack.status = 1;
        storageSet("gamePlayStatus", gamePlayStatus);
        return;
      }
    }
  }

  const spyGalaxyInterval = getElId("spy-interval");
  if (!spyGalaxyInterval || !isNumeric(spyGalaxyInterval)) {
    spyGalaxyInterval.value = "30";
    storageSet("spyGalaxyInterval", "30", 99900000);
  }

  gamePlayStatus.message.status = 0;
  gamePlayStatus.spyGalaxy.status = 1;
  storageSet("gamePlayStatus", gamePlayStatus);
  console.log("over");
}

async function standartSuppliesDevelopment() {
  const { metalMine, crystalMine, deuteriumSynthesizer, solarPlant } =
    storageGet("producer") || {};

  const producersEl = getElId("producers");

  if (metalMine === 0) {
    await menuClick(1);
    return;
  }

  if (!producersEl && !hasDevelopment) {
    await menuClick(1);
    return;
  }

  if (!hasDevelopment) {
    const resMetalEl = getElId("resources_metal");
    if (["overmark", "middlemark"].includes(resMetalEl.getAttribute("class"))) {
      await mineUpgradeClick("metalStorage", "technologydetails", producersEl);
      return;
    }
    const resCrystalEl = getElId("resources_crystal");
    if (
      ["overmark", "middlemark"].includes(resCrystalEl.getAttribute("class"))
    ) {
      await mineUpgradeClick(
        "crystalStorage",
        "technologydetails",
        producersEl
      );
      return;
    }
    const resDeuteriumEl = getElId("resources_deuterium");
    if (
      ["overmark", "middlemark"].includes(resDeuteriumEl.getAttribute("class"))
    ) {
      await mineUpgradeClick(
        "deuteriumStorage",
        "technologydetails",
        producersEl
      );
      return;
    }
  }

  const { energy } = StorageGetInitialize("resource", initResource);
  if (energy < 0) {
    await mineUpgradeClick("solarPlant", "technologydetails", producersEl);
    return;
  }

  if (await hasDevelopmentNeed()) {
    hasDevelopment = true;
    storageSet("hasDevelopment", true);
    await hasDevelopmentNeed();
    return;
  }
  hasDevelopment = false;
  storageSet("hasDevelopment", false);

  if (metalMine - 2 <= crystalMine) {
    await mineUpgradeClick("metalMine", "technologydetails", producersEl);
    return;
  } else {
    if (crystalMine - 2 <= deuteriumSynthesizer) {
      await mineUpgradeClick("crystalMine", "technologydetails", producersEl);
      return;
    } else {
      await mineUpgradeClick(
        "deuteriumSynthesizer",
        "technologydetails",
        producersEl
      );
      return;
    }
  }
}

async function standartLfbuildingsDevelopment() {
  const { lifeformTech11101, lifeformTech11102, lifeformTech11103 } =
    storageGet("lifeform") || {};

  const lfbuildingsEl = getElId("lfbuildings");

  if (!lfbuildingsEl) {
    await menuClick(2);
    return;
  }

  if (lifeformTech11101 < 21 || lifeformTech11102 < 22) {
    if (lifeformTech11101 - 1 <= lifeformTech11102) {
      await specifiedUpgradeClick(
        "lifeformTech11101",
        "technologydetails",
        2,
        "lfbuildings",
        getElId("lfbuildings"),
        "lfbuildings"
      );
      return;
    } else {
      await specifiedUpgradeClick(
        "lifeformTech11102",
        "technologydetails",
        2,
        "lfbuildings",
        getElId("lfbuildings"),
        "lfbuildings"
      );
      return;
    }
  }
  return true;
}

async function hasDevelopmentNeed() {
  return new Promise(async (resolve, reject) => {
    const { metal, crystal, deuterium, energy } = StorageGetInitialize(
      "resource",
      initResource
    );
    const generation = StorageGetInitialize("resourceGeneration", initResource);
    const { metalMine, crystalMine, deuteriumSynthesizer, solarPlant } =
      StorageGetInitialize("producer", initProducer);
    const { roboticsFactory, shipyard, researchLaboratory } =
      StorageGetInitialize("facility", initFacility);
    const {
      energyTechnology,
      laserTechnology,
      combustionDriveTechnology,
      impulseDriveTechnology,
      espionageTechnology,
      astrophysicsTechnology,
      ionTechnology,
      shieldingTechnology,
      hyperspaceTechnology,
      hyperspaceDriveTechnology,
      computerTechnology,
      armorTechnology,
    } = StorageGetInitialize("research", initResearch);

    if (metal === 0) {
      console.log("wrong metal 0");
      return resolve(true);
    }

    if (metalMine === 0) {
      await menuClick(1);
      return resolve(true);
    }

    if (generation.metal === 0) {
      await menuClick(1, 1);
      return resolve(true);
    }

    if (roboticsFactory === 0 && !storageGet("facility")) {
      await menuClick(3);
      return resolve(true);
    }

    if (energyTechnology === 0 && !storageGet("research")) {
      await menuClick(5);
      return resolve(true);
    }

    if (energy < 1) {
      return resolve(false);
    } else if (
      deuteriumSynthesizer > 5 &&
      roboticsFactory < 3 &&
      shipyard < 3 &&
      researchLaboratory < 3
    ) {
      if (roboticsFactory < 3) {
        await specifiedUpgradeClick(
          "roboticsFactory",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      } else if (shipyard < 3) {
        await specifiedUpgradeClick(
          "shipyard",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      } else if (researchLaboratory < 3) {
        await specifiedUpgradeClick(
          "researchLaboratory",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 5 &&
      energyTechnology < 2 &&
      combustionDriveTechnology < 3 &&
      espionageTechnology < 2
    ) {
      if (energyTechnology < 2) {
        await specifiedUpgradeClick(
          "energyTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (combustionDriveTechnology < 3) {
        await specifiedUpgradeClick(
          "combustionDriveTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (espionageTechnology < 2) {
        await specifiedUpgradeClick(
          "espionageTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 9 &&
      shipyard < 4 &&
      impulseDriveTechnology < 3
    ) {
      if (shipyard < 4) {
        await specifiedUpgradeClick(
          "shipyard",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      } else if (impulseDriveTechnology < 3) {
        await specifiedUpgradeClick(
          "impulseDriveTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 9 &&
      espionageTechnology < 4 &&
      astrophysicsTechnology < 1
    ) {
      if (espionageTechnology < 4) {
        await specifiedUpgradeClick(
          "espionageTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (astrophysicsTechnology < 4) {
        await specifiedUpgradeClick(
          "astrophysicsTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 10 &&
      energyTechnology < 4 &&
      laserTechnology < 5 &&
      ionTechnology < 2 &&
      impulseDriveTechnology < 4
    ) {
      if (energyTechnology < 4) {
        await specifiedUpgradeClick(
          "energyTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (laserTechnology < 5) {
        await specifiedUpgradeClick(
          "laserTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (ionTechnology < 2) {
        await specifiedUpgradeClick(
          "ionTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (impulseDriveTechnology < 4) {
        await specifiedUpgradeClick(
          "impulseDriveTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 10 &&
      roboticsFactory < 5 &&
      computerTechnology < 5
    ) {
      if (roboticsFactory < 5) {
        await specifiedUpgradeClick(
          "roboticsFactory",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      } else if (computerTechnology < 5) {
        await specifiedUpgradeClick(
          "computerTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      }
    } else if (
      deuteriumSynthesizer > 13 &&
      researchLaboratory < 6 &&
      shieldingTechnology < 5 &&
      hyperspaceTechnology < 3 &&
      hyperspaceDriveTechnology < 4 &&
      shipyard < 7
    ) {
      if (researchLaboratory < 6) {
        await specifiedUpgradeClick(
          "researchLaboratory",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      } else if (shieldingTechnology < 5) {
        await specifiedUpgradeClick(
          "shieldingTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (hyperspaceTechnology < 3) {
        await specifiedUpgradeClick(
          "hyperspaceTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (hyperspaceDriveTechnology < 4) {
        await specifiedUpgradeClick(
          "hyperspaceDriveTechnology",
          "technologydetails",
          5,
          "research",
          getElId("research"),
          "research"
        );
        return resolve(true);
      } else if (shipyard < 7) {
        await specifiedUpgradeClick(
          "shipyard",
          "technologydetails",
          3,
          "facilities",
          getElId("facilities"),
          "facilities"
        );
        return resolve(true);
      }
    }

    return resolve(false);
  });
}

function specifiedUpgradeClick(
  upgradeName,
  detailName,
  menuClickNumber,
  countdownSetName,
  searchEl = document,
  locationEl = null
) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!getElId(locationEl)) {
        await menuClick(menuClickNumber);
        return resolve(true);
      }

      const mineContainer = searchEl.querySelector(
        `li[class~="${upgradeName}"]`
      );
      const upgradeEl = mineContainer.querySelector(`button[class~="upgrade"]`);
      if (upgradeEl) {
        upgradeEl.click();
        return resolve(true);
      } else {
        await specifiedUpgradeTimeCalculation(
          mineContainer,
          detailName,
          countdownSetName
        );
        return resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function specifiedUpgradeTimeCalculation(mineEl, detailName, countdownSetName) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mineEl.getAttribute("class").includes("showsDetails")) {
        mineEl.children[0].click();
        return resolve(true);
      }

      const { metal, crystal, deuterium, energy } =
        storageGet("resource") || {};

      const mineProduction = StorageGetInitialize(
        "resourceGeneration",
        initResource
      );

      if (mineProduction.metal == 0) {
        await menuClick(1, 1);
        resolve(true);
        return;
      }

      setTimeout(() => {
        const technologyDetails = getElId(detailName);
        if (!technologyDetails) {
          resolve(true);
          return;
        }

        const upgradeBtn = technologyDetails.querySelector(
          "button[class='upgrade']"
        );
        if (upgradeBtn && !upgradeBtn.hasAttribute("disabled")) {
          upgradeBtn.click();
          resolve(true);
          return;
        }

        let remaningTime = 0;
        const costsArea = technologyDetails.querySelector("div[class='costs']");
        costsArea.querySelectorAll("li").forEach((costItem) => {
          const classText = costItem.getAttribute("class");
          if (classText && classText.includes("metal")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = metal - requirement;

            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.metal) * 60 * 60
              );
              remaningTime = productionSecond;
            }
          } else if (classText && classText.includes("crystal")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = crystal - requirement;
            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.crystal) * 60 * 60
              );
              if (remaningTime < productionSecond) {
                remaningTime = productionSecond;
              }
            }
          } else if (classText && classText.includes("deuterium")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = deuterium - requirement;
            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.deuterium) * 60 * 60
              );
              if (remaningTime < productionSecond) {
                remaningTime = productionSecond;
              }
            }
          }
        });
        const countdown = StorageGetInitialize("countdown", initCountdown);
        const now = mathStabileRound(Date.now() / 1000);
        countdown[countdownSetName] = remaningTime + now;
        storageSet("countdown", countdown);
        if (!(remaningTime + now > now) && !gameReload) {
          gameReload = true;
          location.reload();
        }
        return resolve(true);
      }, 2000);
    } catch (error) {
      return reject(error);
    }
  });
}

function mineUpgradeClick(mineName, detailName, searchEl = document) {
  return new Promise(async (resolve, reject) => {
    try {
      const mineContainer = searchEl.querySelector(`li[class~="${mineName}"]`);
      const upgradeEl = mineContainer.querySelector(`button[class~="upgrade"]`);
      if (upgradeEl) {
        upgradeEl.click();
        setTimeout(() => {
          resolve(true);
        }, 2000);
      } else {
        await mineUpgradeTimeCalculation(mineContainer, detailName);
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function mineUpgradeTimeCalculation(mineEl, detailName) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mineEl.getAttribute("class").includes("showsDetails")) {
        mineEl.children[0].click();
      }

      const { metal, crystal, deuterium, energy } =
        storageGet("resource") || {};

      const mineProduction = StorageGetInitialize(
        "resourceGeneration",
        initResource
      );

      if (mineProduction.metal == 0) {
        await menuClick(1, 1);
        resolve(true);
        return;
      }

      setTimeout(() => {
        const technologyDetails = getElId(detailName);
        if (!technologyDetails) {
          resolve(true);
          return;
        }

        const upgradeBtn = technologyDetails.querySelector(
          "button[class='upgrade']"
        );
        if (upgradeBtn && !upgradeBtn.hasAttribute("disabled")) {
          upgradeBtn.click();
          resolve(true);
          return;
        }

        let remaningTime = 0;
        const costsArea = technologyDetails.querySelector("div[class='costs']");
        costsArea.querySelectorAll("li").forEach((costItem) => {
          const classText = costItem.getAttribute("class");
          if (classText && classText.includes("metal")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = metal - requirement;

            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.metal) * 60 * 60
              );
              remaningTime = productionSecond;
            }
          } else if (classText && classText.includes("crystal")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = crystal - requirement;
            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.crystal) * 60 * 60
              );
              if (remaningTime < productionSecond) {
                remaningTime = productionSecond;
              }
            }
          } else if (classText && classText.includes("deuterium")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = deuterium - requirement;
            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.deuterium) * 60 * 60
              );
              if (remaningTime < productionSecond) {
                remaningTime = productionSecond;
              }
            }
          }
        });
        const countdown = StorageGetInitialize("countdown", initCountdown);
        const now = mathStabileRound(Date.now() / 1000);
        countdown.producers = remaningTime + now;
        storageSet("countdown", countdown);
        if (!(remaningTime + now > now) && !gameReload) {
          gameReload = true;
          location.reload();
        }
        resolve(true);
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}

function menuClick(number, subNumber = 0) {
  return new Promise((resolve, reject) => {
    const links = getElId("links");
    if (!links) reject();
    const menuTable = getElId("menuTable");
    if (!menuTable) reject();

    const menuItems = menuTable.querySelectorAll("li");

    if (!subNumber) {
      menuItems[number].children[1].click();
    } else {
      menuItems[number].children[0].querySelector("a").click();
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

const generalIntervalTime = 3000;

const mainInterval = setInterval(start, generalIntervalTime);

setTimeout(() => {}, getRndInteger());
