import {
  getElId,
  mathStabileRound,
  isNumeric,
  storageSet,
  storageGet,
  StorageGetInitialize,
  timestampToDate,
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
  initMessageSetting,
} from "./constant";

const gamePlayStatus = StorageGetInitialize(
  "gamePlayStatus",
  initGamePlayStatus
);
const messageSetting = StorageGetInitialize(
  "messageSetting",
  initMessageSetting
);
const countdown = StorageGetInitialize("countdown", initCountdown);

function addNewStyle(newStyle) {
  var styleElement = document.getElementById("styles_js");
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.id = "styles_js";
    document.getElementsByTagName("head")[0].appendChild(styleElement);
  }
  styleElement.appendChild(document.createTextNode(newStyle));
}

const init = (left) => {
  const myCon = getElId("my-container");
  if (myCon) return;

  let leftMenu = getElId("left");
  if (!leftMenu) leftMenu = getElId("toolbarcomponent");
  let lmRect = {
    x: 0,
  };
  if (leftMenu) {
    lmRect = leftMenu.getBoundingClientRect();
  }
  const body = document.querySelector("body");
  body.style.height = "120%";

  // var sheet = document.styleSheets[0];
  // console.log("sheet", sheet);
  // sheet.insertRule("strong { color: red; }");

  //style
  addNewStyle(`
  .my-container i {
    font-size: 14px;
    padding: 4px;
  }
  
  .my-container .tooltip {
    display: inline-block;
    border-bottom: 1px dotted black;
    position: absolute;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .my-container .b-green {
    border: 1px solid green;
  }
  .my-container .b-red {
    border: 1px solid red;
  }
  
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 100px;
    background-color: black;
    color: #fff;
    border-radius: 6px;
    padding: 3px 0;
  
    /* Position the tooltip */
    position: absolute;
    z-index: 1;

    bottom: 30px;
    margin-left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 15px;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }`);

  //font-awesome
  const myCss = getElId("my-css");
  if (!myCss) {
    const fasome = document.createElement("link");
    fasome.setAttribute("rel", "stylesheet");
    fasome.setAttribute("id", "my-css");
    fasome.setAttribute(
      "href",
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    );
    document.querySelector("head").append(fasome);
  }

  const icon = document.createElement("i");
  icon.setAttribute("class", "fa fa-cloud");

  let container = document.createElement("div");
  container.setAttribute("id", "my-container");
  container.setAttribute("class", "my-container");
  container.style.zIndex = "2";
  container.style.height = "450px";
  container.style.width = "178px";
  container.style.position = "absolute";
  container.style.border = `solid 1px red`;
  container.style.top = `${lmRect.y + 410}px`;
  container.style.left = `${lmRect.x + 0}px`;
  container.style.borderRadius = "10px";
  container.style.paddingTop = "5px";

  initEls(container);

  left.append(container);
};

function generateTooltip(text) {
  const tooltip = document.createElement("div");
  tooltip.setAttribute("class", "tooltip");
  if (text == "Ready") {
    tooltip.classList.add("b-green");
  } else {
    tooltip.classList.add("b-red");
  }
  const tooltiptext = document.createElement("div");
  tooltiptext.setAttribute("class", "tooltiptext");
  tooltiptext.innerText = text;

  let iconInfo = document.createElement("i");
  iconInfo.setAttribute("class", "fa fa-info");
  tooltip.append(tooltiptext);
  tooltip.append(iconInfo);
  return tooltip;
}

function initEls(el) {
  const divSupplies = generateDiv();
  const CbSupplies = generateInput("checkbox", "cb-supplies");
  CbSupplies.checked = gamePlayStatus.producers.status;
  CbSupplies.style.border = `solid 1px ${CbSupplies.checked ? "green" : "red"}`;
  CbSupplies.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.producers.status = CbSupplies.checked ? 1 : 0;
    labelSupplies.style.border = `solid 1px ${
      CbSupplies.checked ? "green" : "red"
    }`;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divSupplies.append(CbSupplies);
  const labelSupplies = generateLabel("Supplies Develop", "cb-supplies");
  divSupplies.append(labelSupplies);
  const suppliesDate = timestampToDate(countdown.producers);
  const tooltipSupplies = generateTooltip(suppliesDate);
  divSupplies.append(tooltipSupplies);
  el.append(divSupplies);

  const divLfbuildings = generateDiv();
  const CbLfbuildings = generateInput("checkbox", "cb-lfbuildings");
  CbLfbuildings.checked = gamePlayStatus.lfbuildings.status;
  CbLfbuildings.style.border = `solid 1px ${
    CbLfbuildings.checked ? "green" : "red"
  }`;
  CbLfbuildings.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.lfbuildings.status = CbLfbuildings.checked ? 1 : 0;
    labelLfbuildings.style.border = `solid 1px ${
      CbLfbuildings.checked ? "green" : "red"
    }`;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divLfbuildings.append(CbLfbuildings);
  const labelLfbuildings = generateLabel(
    "Life Build Develop",
    "cb-lfbuildings"
  );
  divLfbuildings.append(labelLfbuildings);
  const lfBuildingsDate = timestampToDate(countdown.lfbuildings);
  const tooltipLf = generateTooltip(lfBuildingsDate);
  divLfbuildings.append(tooltipLf);
  el.append(divLfbuildings);

  const divDiscovery = generateDiv();
  const CbDiscovery = generateInput("checkbox", "cb-discovery");
  CbDiscovery.checked = gamePlayStatus.discovery.status;
  CbDiscovery.style.border = `solid 1px ${
    CbDiscovery.checked ? "green" : "red"
  }`;
  CbDiscovery.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.discovery.status = CbDiscovery.checked ? 1 : 0;
    labelDiscovery.style.border = `solid 1px ${
      CbDiscovery.checked ? "green" : "red"
    }`;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divDiscovery.append(CbDiscovery);
  const labelDiscovery = generateLabel("To Discovery", "cb-discovery");
  divDiscovery.append(labelDiscovery);
  const discoveryDate = timestampToDate(countdown.discovery);
  const tooltipDiscovery = generateTooltip(discoveryDate);
  divDiscovery.append(tooltipDiscovery);
  el.append(divDiscovery);

  const divAttack = generateDiv();
  const CbAttack = generateInput("checkbox", "cb-attack");
  CbAttack.checked =
    gamePlayStatus.message.status || gamePlayStatus.attack.status;
  CbAttack.style.border = `solid 1px ${CbAttack.checked ? "green" : "red"}`;
  CbAttack.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    if (CbAttack.checked) {
      gamePlayStatus.message.status = 1;
    } else {
      gamePlayStatus.message.status = 0;
      gamePlayStatus.attack.status = 0;
    }
    labelAttack.style.border = `solid 1px ${
      CbAttack.checked ? "green" : "red"
    }`;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divAttack.append(CbAttack);
  const labelAttack = generateLabel("Attack Active", "cb-attack");
  divAttack.append(labelAttack);
  const attackDate = timestampToDate(countdown.message);
  const tooltipAttack = generateTooltip(attackDate);
  divAttack.append(tooltipAttack);
  el.append(divAttack);

  const divSpyContainer = generateDiv();
  divSpyContainer.style.display = "flex";
  divSpyContainer.style.flexDirection = "column";
  divSpyContainer.style.borderTop = `solid 1px red`;

  const divSpyHeader = generateDiv();
  const labelSpyHeader = generateLabel("Spy Settings");
  divSpyHeader.style.display = "flex";
  divSpyHeader.style.justifyContent = "center";
  divSpyHeader.style.marginBottom = "3px";
  divSpyHeader.append(labelSpyHeader);
  divSpyContainer.append(divSpyHeader);
  const divSpySettings = generateDiv();
  divSpySettings.style.display = "flex";
  divSpySettings.style.flexDirection = "row";
  divSpySettings.style.alignItems = "space-beetwen";
  divSpySettings.style.width = "100%";
  const inputSpyInterval = generateInput("text", "spy-interval");
  inputSpyInterval.value = StorageGetInitialize("spySystemInterval", "30");
  inputSpyInterval.style.width = "80px";
  inputSpyInterval.addEventListener("input", function () {
    if (isNumeric(inputSpyInterval.value)) {
      if (Number(inputSpyInterval.value) > 499) {
        inputSpyInterval.value = "500";
      }
      storageSet("spySystemInterval", inputSpyInterval.value);
      return;
    }
    inputSpyInterval.value = StorageGetInitialize("spySystemInterval", 30);
  });
  const labelSpyInterval = generateLabel("System Interval");

  labelSpyInterval.style.width = "50px";
  labelSpyInterval.style.padding = "0";
  divSpySettings.append(labelSpyInterval);
  divSpySettings.append(inputSpyInterval);
  divSpyContainer.append(divSpySettings);
  const buttonSpyStart = generateButton("Start Spy");
  buttonSpyStart.addEventListener("click", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.spyGalaxy.status = 1;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  buttonSpyStart.style.marginTop = "5px";
  buttonSpyStart.style.width = "110px";
  buttonSpyStart.style.height = "22px";
  divSpyContainer.append(buttonSpyStart);
  el.append(divSpyContainer);

  const divAttackContainer = generateDiv();
  divAttackContainer.style.display = "flex";
  divAttackContainer.style.flexDirection = "column";
  divAttackContainer.style.borderTop = `solid 1px red`;
  const labelAttackHeader = generateLabel("Attack Settings");
  divAttackContainer.append(labelAttackHeader);

  const divMessageDefence = generateDiv();
  const CbMessageDefence = generateInput("checkbox", "message-defence");
  CbMessageDefence.checked = messageSetting.delDefence;
  CbMessageDefence.addEventListener("input", function () {
    const messageSetting = StorageGetInitialize(
      "messageSetting",
      initMessageSetting
    );
    messageSetting.delDefence = CbMessageDefence.checked;
    labelMessageDefence.style.border = `solid 1px ${
      CbMessageDefence.checked ? "green" : "red"
    }`;
    storageSet("messageSetting", messageSetting);
  });
  divMessageDefence.append(CbMessageDefence);
  const labelMessageDefence = generateLabel(
    "Delete With Defense",
    "message-defence"
  );
  divMessageDefence.append(labelMessageDefence);
  divAttackContainer.append(divMessageDefence);

  const divMessageFleet = generateDiv();
  const CbMessageFleet = generateInput("checkbox", "message-fleet");
  CbMessageFleet.checked = messageSetting.delFleet;
  CbMessageFleet.addEventListener("input", function () {
    const messageSetting = StorageGetInitialize(
      "messageSetting",
      initMessageSetting
    );
    messageSetting.delFleet = CbMessageFleet.checked;
    labelMessageFleet.style.border = `solid 1px ${
      CbMessageFleet.checked ? "green" : "red"
    }`;
    storageSet("messageSetting", messageSetting);
  });
  divMessageFleet.append(CbMessageFleet);
  const labelMessageFleet = generateLabel("Delete With Fleet", "message-fleet");
  divMessageFleet.append(labelMessageFleet);
  divAttackContainer.append(divMessageFleet);

  const divMessageMinRes = generateDiv();
  divMessageMinRes.style.flexDirection = "row";
  const inputMessageMinRes = generateInput("text", "min-resource");
  inputMessageMinRes.value = StorageGetInitialize(
    "messageMinResource",
    "20000"
  );
  inputMessageMinRes.style.width = "65px";
  inputMessageMinRes.addEventListener("input", function () {
    if (!isNumeric(inputMessageMinRes.value)) {
      inputMessageMinRes.value = StorageGetInitialize(
        "messageMinResource",
        "20000"
      );
      return;
    }
    storageSet("messageMinResource", Number(inputMessageMinRes.value));
  });
  const labelMessageMinRes = generateLabel("Min Resource");
  labelMessageMinRes.style.width = "81px";
  labelMessageMinRes.style.padding = "0";
  divMessageMinRes.append(labelMessageMinRes);
  divMessageMinRes.append(inputMessageMinRes);
  divAttackContainer.append(divMessageMinRes);

  const buttonMessageAttack = generateButton("Message Attack");
  buttonMessageAttack.style.marginTop = "5px";
  buttonMessageAttack.style.width = "130px";
  buttonMessageAttack.style.height = "23px";
  buttonMessageAttack.style.border = `solid 2px ${
    gamePlayStatus.message.status ? "green" : "red"
  }`;
  buttonMessageAttack.addEventListener("click", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.message.status = gamePlayStatus.message.status == 0 ? 1 : 0;
    buttonMessageAttack.style.border = `solid 2px ${
      gamePlayStatus.message.status ? "green" : "red"
    }`;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divAttackContainer.append(buttonMessageAttack);

  const buttonStop = generateButton("Stop");
  buttonStop.style.marginTop = "5px";
  buttonStop.style.width = "130px";
  buttonStop.style.height = "23px";
  buttonStop.addEventListener("click", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.message.status = 0;
    gamePlayStatus.attack.status = 0;
    gamePlayStatus.spyGalaxy.status = 0;

    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divAttackContainer.append(buttonStop);

  const buttonCountdownReset = generateButton("Countdown Reset");
  buttonCountdownReset.style.marginTop = "5px";
  buttonCountdownReset.style.width = "130px";
  buttonCountdownReset.style.height = "23px";
  buttonCountdownReset.addEventListener("click", function () {
    const countdown = StorageGetInitialize("countdown", initCountdown);
    const keys = Object.keys(countdown);
    keys.forEach((item) => (countdown[item] = 0));
    storageSet("countdown", countdown);
  });
  divAttackContainer.append(buttonCountdownReset);

  el.append(divAttackContainer);

  const divContainerCraftShip = generateDiv();
  const divCraftShip = generateDiv();
  const labelCraftship = generateLabel("Ships", "select-ship");
  divCraftShip.append(labelCraftship);
  const selectShip = generateSelectbox("select-ship", ["1", "2", "3", "4"]);
  divCraftShip.append(selectShip);

  divContainerCraftShip.append(divCraftShip);
  el.append(divContainerCraftShip);
}

function generateSelectbox(id, options) {
  const select = document.createElement("select");
  select.id = id;

  options.forEach((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item);
    option.innerText = item;
    select.append(option);
  });

  return select;
}

function generateButton(text) {
  const button = document.createElement("button");
  button.style.marginBottom = "3px";
  button.innerHTML = text;
  button.style.backgroundColor = "rgb(225, 225, 225)";
  button.style.boxShadow = "0 2px #000";
  button.style.transform = "translateY(4px)";
  return button;
}

function generateInput(type, id) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("id", id);
  input.style.marginLeft = "5px";
  if (type == "checkbox") {
    input.style.width = "18px";
    input.style.height = "18px";
  }
  return input;
}

function generateLabel(text, forName = false) {
  const label = document.createElement("label");
  label.innerText = text;
  if (forName) {
    label.setAttribute("for", forName);
  }
  label.style.fontSize = "12px";
  label.style.marginLeft = "3px";
  label.style.padding = "2px 5px 2px 3px";
  return label;
}

function generateDiv() {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.alignItems = "center";
  div.style.marginBottom = "3px";
  div.style.width = "100%";

  return div;
}

export default init;
