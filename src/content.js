import {
  getElId,
  strToNumber,
  mathStabileRound,
  getRndInteger,
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
  initGameStatus,
  initOvermark,
  initResearch,
  initShipyard,
  initGamePlayStatus,
} from "./constant";

console.log("content");

let resource = StorageGetInitialize("resource", initResource);
let producer = StorageGetInitialize("producer", initProducer);
let facility = StorageGetInitialize("facility", initFacility);
let lifeform = StorageGetInitialize("lifeform", initLifeform);
let countdown = StorageGetInitialize("countdown", initCountdown);
let gameStatus = StorageGetInitialize("gameStatus", initGameStatus);
let overmark = StorageGetInitialize("overmark", initOvermark);
let research = StorageGetInitialize("research", initResearch);
let shipyard = StorageGetInitialize("shipyard", initShipyard);
let resourceGeneration = StorageGetInitialize(
  "resourceGeneration",
  initResource
);
let gamePlayStatus = StorageGetInitialize("gamePlayStatus", initGamePlayStatus);

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

  resource = {
    metal,
    crystal,
    deuterium,
    energy,
    population,
    food,
    darkmatter,
  };

  gameStatus.energyLow = energy < 0;

  storageSet("resource", resource);
  storageSet("gameStatus", gameStatus);
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

    if (["bitti"].includes(countDownEl.innerText)) {
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
    const spanVal = "level";
    const researchLevelEl = researchContainer.querySelector(
      `span[class='${spanVal}']`
    );

    const level = researchLevelEl.getAttribute("data-value");

    research[researchName.replace("Technology", "")] = Number(level);
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

  const login = hasLogin();
  if (!login) return;

  gameInitialize();

  const countdown = StorageGetInitialize("countdown", initCountdown);
  const now = mathStabileRound(Date.now() / 1000);

  const gamePlayStatus = StorageGetInitialize(
    "gamePlayStatus",
    initGamePlayStatus
  );
  gamePlayStatus.producers.status = 1;
  console.log("producers time:", countdown.producers - now);
  if (gamePlayStatus.producers.status && countdown.producers < now) {
    await standartSuppliesDevelopment();
  } else if (gamePlayStatus.lfbuildings.status && countdown.lfbuildings < now) {
    await standartLfbuildingsDevelopment();
  }
}

async function standartSuppliesDevelopment() {
  const { metalMine, crystalMine, deuteriumSynthesizer, solarPlant } =
    storageGet("producer") || {};

  const producersEl = getElId("producers");

  if (!producersEl) {
    await menuClick(1);
    return;
  }

  const resMetalEl = getElId("resources_metal");
  if (["overmark", "middlemark"].includes(resMetalEl.getAttribute("class"))) {
    await mineUpgradeClick("metalStorage", "technologydetails", producersEl);
    return;
  }
  const resCrystalEl = getElId("resources_crystal");
  if (["overmark", "middlemark"].includes(resCrystalEl.getAttribute("class"))) {
    await mineUpgradeClick("crystalStorage", "technologydetails", producersEl);
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

  const { energy } = StorageGetInitialize("resource", initResource);

  if (energy < 0) {
    await mineUpgradeClick("solarPlant", "technologydetails", producersEl);
    return;
  } else if (metalMine - 2 <= crystalMine) {
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
  const { metalMine, crystalMine, deuteriumSynthesizer, solarPlant } =
    storageGet("producer") || {};

  const producersEl = getElId("producers");

  if (!producersEl) {
    await menuClick(1);
    return;
  }

  const resMetalEl = getElId("resources_metal");
  if (["overmark", "middlemark"].includes(resMetalEl.getAttribute("class"))) {
    await mineUpgradeClick("metalStorage", "technologydetails", producersEl);
    return;
  }
  const resCrystalEl = getElId("resources_crystal");
  if (["overmark", "middlemark"].includes(resCrystalEl.getAttribute("class"))) {
    await mineUpgradeClick("crystalStorage", "technologydetails", producersEl);
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

  const { energy } = StorageGetInitialize("resource", initResource);

  if (energy < 0) {
    await mineUpgradeClick("solarPlant", "technologydetails", producersEl);
    return;
  } else if (metalMine - 2 <= crystalMine) {
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
          if (classText.includes("metal")) {
            const requirement = Number(costItem.getAttribute("data-value"));
            const difference = metal - requirement;

            if (difference < 0) {
              const productionSecond = mathStabileRound(
                (Math.abs(difference) / mineProduction.metal) * 60 * 60
              );
              remaningTime = productionSecond;
            }
          } else if (classText.includes("crystal")) {
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
          } else if (classText.includes("deuterium")) {
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
        if (!(remaningTime + now > now)) {
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

const generalIntervalTime = 3500;

setInterval(start, generalIntervalTime);
