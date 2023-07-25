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
