import {
  getElId,
  mathStabileRound,
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

const gamePlayStatus = StorageGetInitialize(
  "gamePlayStatus",
  initGamePlayStatus
);

const init = (left) => {
  const myCon = getElId("my-container");
  if (myCon) return;

  let container = document.createElement("div");
  container.setAttribute("id", "my-container");
  container.style.height = "300px";
  container.style.width = "178px";
  container.style.position = "absolute";
  container.style.border = `solid 1px red`;
  container.style.top = `658px`;
  container.style.left = `181px`;
  container.style.borderRadius = "10px";
  container.style.paddingTop = "5px";

  initEls(container);

  left.append(container);
};

function initEls(el) {
  const divSupplies = generateDiv();
  const CbSupplies = generateInput("checkbox", "cb-supplies");
  CbSupplies.checked = gamePlayStatus.producers.status;
  CbSupplies.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.producers.status = CbSupplies.checked ? 1 : 0;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divSupplies.append(CbSupplies);
  let labelSupplies = generateLabel("Supplies Develop", "cb-supplies");
  divSupplies.append(labelSupplies);
  el.append(divSupplies);

  const divLfbuildings = generateDiv();
  const CbLfbuildings = generateInput("checkbox", "cb-lfbuildings");
  console.log("gamePlayStatus", gamePlayStatus);
  CbLfbuildings.checked = gamePlayStatus.lfbuildings.status;
  CbLfbuildings.addEventListener("input", function () {
    const gamePlayStatus = StorageGetInitialize(
      "gamePlayStatus",
      initGamePlayStatus
    );
    gamePlayStatus.lfbuildings.status = CbLfbuildings.checked ? 1 : 0;
    storageSet("gamePlayStatus", gamePlayStatus);
  });
  divLfbuildings.append(CbLfbuildings);
  let labelLfbuildings = generateLabel("Life Build Develop", "cb-lfbuildings");
  divLfbuildings.append(labelLfbuildings);
  el.append(divLfbuildings);
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

function generateLabel(text, forName) {
  const label = document.createElement("label");
  label.innerText = text;
  label.setAttribute("for", forName);
  label.style.fontSize = "12px";
  label.style.marginLeft = "5px";
  return label;
}

function generateDiv() {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexDirection = "row";
  div.style.alignItems = "center";
  div.style.height = "25px";
  div.style.marginBottom = "3px";

  return div;
}

export default init;
