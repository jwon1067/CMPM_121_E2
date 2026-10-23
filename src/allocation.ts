export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const context = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;

type ShiftResults = {
  assignedCrew: number;
  production: number;
  consumption: number;
  balance: number;
};

let assigned = 2;
const consumption = 6;

function renderAllocation() {
  const results = calculateShiftResults();
  context.clearRect(0, 0, canvas.width, canvas.height);
  displayAssignedCrew();
  displaySupplyBars(results);
  updateReadout(results);
}
function calculateProduction() {
  return assigned * 3;
}
function calculateBalance() {
  return calculateProduction() - consumption;
}
function calculateShiftResults() {
  const production = calculateProduction();
  const balance = calculateBalance();
  return {
    assignedCrew: assigned,
    production,
    consumption,
    balance,
  };
}
function displayAssignedCrew() {
  for (let crewIndex = 0; crewIndex < 6; crewIndex++) {
    context.fillStyle = crewIndex < assigned ? "#27766b" : "#c9d2c9";
    context.fillRect(18 + crewIndex * 45, 16, 36, 36);
    context.fillStyle = crewIndex < assigned ? "#ffffff" : "#233e43";
    context.font = "16px system-ui";
    context.fillText(String(crewIndex + 1), 31 + crewIndex * 45, 40);
  }
}
function displaySupplyBars(results: ShiftResults) {
  context.fillStyle = "#233e43";
  context.font = "14px system-ui";
  context.fillText(`Producers: ${assigned} / 6`, 18, 76);
  context.fillText(`Production: ${results.production}`, 18, 102);
  context.fillStyle = "#27766b";
  context.fillRect(18, 110, results.production * 14, 20);
  context.fillStyle = "#233e43";
  context.fillText(`Consumption: ${results.consumption}`, 18, 154);
  context.fillStyle = "#a44d23";
  context.fillRect(18, 162, results.consumption * 14, 20);
}
function updateReadout(results: ShiftResults) {
  readout.textContent =
    `Assigned: ${assigned}/6 · Production: ${results.production} · Consumption: ${results.consumption} · Balance: ${
      results.balance > 0 ? "+" : ""
    }${results.balance}`;
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assigned = Math.max(0, assigned - 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assigned = Math.min(6, assigned + 1);
  renderAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assigned = 2;
    renderAllocation();
  };
renderAllocation();
