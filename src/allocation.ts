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
type SupplyDisplayRow = {
  label: string;
  value: number;
  color: string;
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
  const rows: SupplyDisplayRow[] = [
    {
      label: `Production: ${results.production}`,
      value: results.production,
      color: "#27766b",
    },
    {
      label: `Consumption: ${results.consumption}`,
      value: results.consumption,
      color: "#a44d23",
    },
  ];
  context.fillStyle = "#233e43";
  context.font = "14px system-ui";
  context.fillText(`Producers: ${results.assignedCrew} / 6`, 18, 76);

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const labelY = 102 + rowIndex * 52;
    const barY = 110 + rowIndex * 52;

    context.fillStyle = "#233e43";
    context.fillText(row.label, 18, labelY);
    context.fillStyle = row.color;
    context.fillRect(18, barY, row.value * 14, 20);
  }
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
