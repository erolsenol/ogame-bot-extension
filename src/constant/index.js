export const initResource = {
  metal: 0,
  crystal: 0,
  deuterium: 0,
  energy: 0,
  population: 0,
  food: 0,
  darkmatter: 0,
};

export const initProducer = {
  metalMine: 0,
  crystalMine: 0,
  deuteriumSynthesizer: 0,
  solarPlant: 0,
  fusionPlant: 0,
  solarSatellite: 0,
  resbuggy: 0,
  metalStorage: 0,
  crystalStorage: 0,
  deuteriumStorage: 0,
};

export const initFacility = {
  roboticsFactory: 0,
  shipyard: 0,
  researchLaboratory: 0,
  allianceDepot: 0,
  missileSilo: 0,
  naniteFactory: 0,
  terraformer: 0,
  repairDock: 0,
};

export const initLifeform = {
  lifeformTech11101: 0,
  lifeformTech11102: 0,
  lifeformTech11103: 0,
  lifeformTech11104: 0,
  lifeformTech11105: 0,
  lifeformTech11106: 0,
  lifeformTech11107: 0,
  lifeformTech11108: 0,
  lifeformTech11109: 0,
  lifeformTech11110: 0,
  lifeformTech11111: 0,
  lifeformTech11112: 0,
};

// export const initGameStatus = {
//   energyLow: false,
// };

export const initCountdown = {
  producers: 0,
  lfbuildings: 0,
  facilities: 0,
  research: 0,
  shipyard: 0,
  message: 0,
  defense: 0,
  discovery: 0,
  attack: 0,
  spyGalaxy: 0,
  craft: 0,
};

const playStatus = {
  status: 0,
};

export const initGamePlayStatus = {
  producers: { ...playStatus },
  lfbuildings: { ...playStatus },
  facilities: { ...playStatus },
  research: { ...playStatus },
  shipyard: { ...playStatus },
  message: { ...playStatus },
  defense: { ...playStatus },
  discovery: { ...playStatus },
  attack: { ...playStatus },
  spyGalaxy: { ...playStatus },
  craft: { ...playStatus },
};

export const initOvermark = {
  metal: false,
  crystal: false,
  deuterium: false,
  energy: false,
  population: false,
  food: false,
  darkmatter: false,
};

export const initResearch = {
  energyTechnology: 0,
  laserTechnology: 0,
  ionTechnology: 0,
  hyperspaceTechnology: 0,
  plasmaTechnology: 0,
  combustionDriveTechnology: 0,
  impulseDriveTechnology: 0,
  hyperspaceDriveTechnology: 0,
  espionageTechnology: 0,
  computerTechnology: 0,
  astrophysicsTechnology: 0,
  researchNetworkTechnology: 0,
  gravitonTechnology: 0,
  weaponsTechnology: 0,
  shieldingTechnology: 0,
  armorTechnology: 0,
};

export const initShipyard = {
  fighterLight: 0,
  fighterHeavy: 0,
  cruiser: 0,
  battleship: 0,
  interceptor: 0,
  bomber: 0,
  destroyer: 0,
  deathstar: 0,
  reaper: 0,
  explorer: 0,
  transporterSmall: 0,
  transporterLarge: 0,
  colonyShip: 0,
  recycler: 0,
  espionageProbe: 0,
  solarSatellite: 0,
  resbuggy: 0,
};

export const initDefense = {
  rocketLauncher: 0,
  laserCannonLight: 0,
  laserCannonHeavy: 0,
  gaussCannon: 0,
  ionCannon: 0,
  plasmaCannon: 0,
  shieldDomeSmall: 0,
  shieldDomeLarge: 0,
  missileInterceptor: 0,
  missileInterplanetary: 0,
};

export const initMessageSetting = {
  delDefence: false,
  delFleet: false,
  minResource: 20000,
  maxResource: 200000,
};

export const initTarget = {
  galaxy: 0,
  position: 0,
  system: 0,
  attacked: false,
};

export const initMyPlanetAttack = {
  time: 0,
  coor: [],
  escape: false,
};

export const initSpyGalaxy = {
  galaxy: 0,
  system: 0,
  position: -1,
  interval: 30,
  start: {
    galaxy: 0,
    system: 0,
  },
};

export const initCraft = {
  name: "",
  produceAmount: 0,
  technologyNumber: "",
  status: false,
  produced: false,
  type: "",
  remainingTime: 0,
  endTime: 0,
  repeat: false,
};

export const shipList = [
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

export const shipTecnologyNum = {
  fighterLight: "204",
  fighterHeavy: "205",
  cruiser: "206",
  battleship: "207",
  interceptor: "215",
  bomber: "211",
  destroyer: "213",
  deathstar: "214",
  reaper: "218",
  explorer: "219",
  transporterSmall: "202",
  transporterLarge: "203",
  colonyShip: "208",
  recycler: "209",
  espionageProbe: "210",
  solarSatellite: "212",
  resbuggy: "217",
};

const metalCost = (x) => x * 1000;
const crystalCost = (x) => x * 1000;
const deuteriumCost = (x) => x * 1000;

export const shipCost = {
  fighterLight: (x) => {
    const metal = metalCost(x * 3);
    const crystal = crystalCost(x * 1);

    return { metal, crystal, deuterium: 0 };
  },
  fighterHeavy: (x) => {
    const metal = metalCost(x * 6);
    const crystal = crystalCost(x * 4);
    return { metal, crystal, deuterium: 0 };
  },
  cruiser: (x) => {
    return {
      metal: metalCost(x * 20),
      crystal: crystalCost(x * 7),
      deuterium: deuteriumCost(x * 2),
    };
  },
  battleship: (x) => {
    return {
      metal: metalCost(x * 45),
      crystal: crystalCost(x * 15),
      deuterium: 0,
    };
  },
  interceptor: (x) => {
    return {
      metal: metalCost(x * 30),
      crystal: crystalCost(x * 40),
      deuterium: deuteriumCost(x * 15),
    };
  },
  bomber: (x) => {
    return {
      metal: metalCost(x * 50),
      crystal: crystalCost(x * 25),
      deuterium: deuteriumCost(x * 15),
    };
  },
  destroyer: (x) => {
    return {
      metal: metalCost(x * 60),
      crystal: crystalCost(x * 50),
      deuterium: deuteriumCost(x * 15),
    };
  },
  deathstar: (x) => {
    return {
      metal: metalCost(x * 5000),
      crystal: crystalCost(x * 4000),
      deuterium: deuteriumCost(x * 1000),
    };
  },
  reaper: (x) => {
    return {
      metal: metalCost(x * 85),
      crystal: crystalCost(x * 55),
      deuterium: deuteriumCost(x * 20),
    };
  },
  explorer: (x) => {
    return {
      metal: metalCost(x * 8),
      crystal: crystalCost(x * 15),
      deuterium: deuteriumCost(x * 8),
    };
  },
  transporterSmall: (x) => {
    return {
      metal: metalCost(x * 2),
      crystal: crystalCost(x * 2),
      deuterium: 0,
    };
  },
  transporterLarge: (x) => {
    return {
      metal: metalCost(x * 6),
      crystal: crystalCost(x * 6),
      deuterium: 0,
    };
  },
  colonyShip: (x) => {
    return {
      metal: metalCost(x * 10),
      crystal: crystalCost(x * 20),
      deuterium: deuteriumCost(x * 10),
    };
  },
  recycler: (x) => {
    return {
      metal: metalCost(x * 10),
      crystal: crystalCost(x * 6),
      deuterium: deuteriumCost(x * 2),
    };
  },
  espionageProbe: (x) => {
    return {
      metal: 0,
      crystal: crystalCost(x * 2),
      deuterium: 0,
    };
  },
  solarSatellite: (x) => {
    return {
      metal: 0,
      crystal: crystalCost(x * 2),
      deuterium: deuteriumCost(x * 0.5),
    };
  },
  resbuggy: (x) => {
    return {
      metal: metalCost(x * 2),
      crystal: crystalCost(x * 2),
      deuterium: deuteriumCost(x * 1),
    };
  },
};

export const defenceList = [
  "rocketLauncher",
  "laserCannonLight",
  "laserCannonHeavy",
  "gaussCannon",
  "ionCannon",
  "plasmaCannon",
  "shieldDomeSmall",
  "shieldDomeLarge",
  "missileInterceptor",
  "missileInterplanetary",
];

export const defenceTecnologyNum = {
  rocketLauncher: "401",
  laserCannonLight: "402",
  laserCannonHeavy: "403",
  gaussCannon: "404",
  ionCannon: "405",
  plasmaCannon: "406",
  shieldDomeSmall: "407",
  shieldDomeLarge: "408",
  missileInterceptor: "502",
  missileInterplanetary: "503",
};

export const defenceCost = {
  rocketLauncher: {
    metal: metalCost(2),
    crystal: crystalCost(2),
    deuterium: deuteriumCost(1),
  },
  laserCannonLight: {
    metal: metalCost(1.5),
    crystal: crystalCost(0.5),
    deuterium: 0,
  },
  laserCannonHeavy: {
    metal: metalCost(6),
    crystal: crystalCost(2),
    deuterium: 0,
  },
  gaussCannon: {
    metal: metalCost(20),
    crystal: crystalCost(15),
    deuterium: deuteriumCost(2),
  },
  ionCannon: {
    metal: metalCost(5),
    crystal: crystalCost(3),
    deuterium: 0,
  },
  plasmaCannon: {
    metal: metalCost(50),
    crystal: crystalCost(50),
    deuterium: deuteriumCost(30),
  },
  shieldDomeSmall: {
    metal: metalCost(10),
    crystal: crystalCost(10),
    deuterium: 0,
  },
  shieldDomeLarge: {
    metal: metalCost(50),
    crystal: crystalCost(50),
    deuterium: 0,
  },
  missileInterceptor: {
    metal: metalCost(8),
    crystal: 0,
    deuterium: deuteriumCost(2),
  },
  missileInterplanetary: {
    metal: metalCost(12),
    crystal: crystalCost(2.5),
    deuterium: deuteriumCost(10),
  },
};
