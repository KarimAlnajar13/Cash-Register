const cash = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const result = document.getElementById("change-due");
const reset = document.getElementById("reset");

let state = [`Status: OPEN`];
let price = 1.87;
let bill;
let cid = [
  ["PENNY", 1.01, 0.01],
  ["NICKEL", 2.05, 0.05],
  ["DIME", 3.1, 0.1],
  ["QUARTER", 4.25, 0.25],
  ["ONE", 90, 1],
  ["FIVE", 55, 5],
  ["TEN", 20, 10],
  ["TWENTY", 60, 20],
  ["ONE HUNDRED", 100, 100],
];

let total = cid
  .map((element) => (element = element[1]))
  .reduce((acc, curr) => curr + acc, 0)
  .toFixed(2);

const getResult = () => {
  let cashVar = parseFloat(cash.value);
  let rest = cashVar - price;
  cash.value = "";

  if (cashVar > total) {
    alert("الدرج فضي 😥");
    return;
  }

  if (isNaN(cashVar)) {
    alert("اكتب رقم وبطل مرقعة");
    return;
  }
  if (cashVar < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  } else if (rest === 0) {
    result.textContent = "No change due - customer paid with exact cash";
    return;
  } else {
    calc(rest, cid.length - 1);
  }
  const j = state.length > 1 ? state.join(" ") : state;
  result.textContent += `${j}`;

  state = [];
};

const calc = (rest, index) => {
  if (index < 0 || rest === 0) {
    return;
  }
  let temp = 0.0;
  bill = cid[index][2];

  while (rest >= bill && cid[index][1] >= bill && rest >= 0.01) {
    rest -= bill;
    cid[index][1] -= bill;
    temp += bill;
  }
  if (index === 0 && rest > cid[index][1]) {
    state = `Status: INSUFFICIENT_FUNDS`;
    return;
  }
  if (index === 0 && rest === 0 && cid[index][1] === 0) {
    state = `Status: CLOSED PENNY: \$0.5`;
    return;
  }
  if (rest < 0.01) {
    if (rest > 0) {
      temp += 0.01;
    }
    rest = 0;
  }

  if (temp > 0) {
    state.push(`${cid[index][0]}: $${temp}`);
    // state.push(`<p>${cid[index][0]}: \$${temp}</p>`);
  }
  total -= temp;
  calc(rest, index - 1);
};

const clearAll = () => {
  cash.value = "";
  result.innerHTML = "";
};

purchase.addEventListener("click", getResult);
reset.addEventListener("click", clearAll);
