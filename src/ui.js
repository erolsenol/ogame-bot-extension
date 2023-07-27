import {
  getElId,
  mathStabileRound,
  isNumeric,
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

  // var sheet = document.styleSheets[0];
  // console.log("sheet", sheet);
  // sheet.insertRule("strong { color: red; }");

  //style
  addNewStyle(`
  .my-container i {
    font-size: 14px;
    border: 1px solid #fff;
    border-radius: 100%;
    padding: 4px;
  }
  
  .tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
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
    margin-left: -43px;
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
  container.style.height = "350px";
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
  CbSupplies.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    if (CbSupplies.checked) {
      gamePlayStatus.producers.status = 1;
      labelSupplies.style.border = "solid 1px green";
    } else {
      gamePlayStatus.producers.status = 0;
      labelSupplies.style.border = "solid 1px red";
    }
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divSupplies.append(CbSupplies);
  const labelSupplies = generateLabel("Supplies Develop", "cb-supplies");
  divSupplies.append(labelSupplies);
  const tooltipSupplies = generateTooltip("AA AA");
  divSupplies.append(tooltipSupplies);
  el.append(divSupplies);

  const divLfbuildings = generateDiv();
  const CbLfbuildings = generateInput("checkbox", "cb-lfbuildings");
  CbLfbuildings.checked = gamePlayStatus.lfbuildings.status;
  CbLfbuildings.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    if (CbLfbuildings.checked) {
      gamePlayStatus.lfbuildings.status = 1;
      labelLfbuildings.style.border = "solid 1px green";
    } else {
      gamePlayStatus.lfbuildings.status = 0;
      labelLfbuildings.style.border = "solid 1px red";
    }
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divLfbuildings.append(CbLfbuildings);
  const labelLfbuildings = generateLabel(
    "Life Build Develop",
    "cb-lfbuildings"
  );
  divLfbuildings.append(labelLfbuildings);
  const tooltipLf = generateTooltip("AA AA");
  divLfbuildings.append(tooltipLf);
  el.append(divLfbuildings);

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
    console.log("return");
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
    if (CbMessageDefence.checked) {
      messageSetting.delDefence = true;
      labelMessageDefence.style.border = "solid 1px green";
    } else {
      messageSetting.delDefence = false;
      // labelMessageDefence.style.border = "solid 1px red";
    }
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
    if (CbMessageFleet.checked) {
      messageSetting.delFleet = true;
      labelMessageFleet.style.border = "solid 1px green";
    } else {
      messageSetting.delFleet = false;
      // labelMessageFleet.style.border = "solid 1px red";
    }
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

  const divClickTime = generateDiv();
  const inputClickTime = generateInput("text", "cb-lfbuildings");
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
  input.style.marginLeft = "10px";
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
  label.style.marginLeft = "5px";
  label.style.padding = "2px 8px";
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
