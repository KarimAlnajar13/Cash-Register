const cash = document.getElementById("cash");
const purchase = document.getElementById("purchase-btn");
const result = document.getElementById("change-due");
const reset = document.getElementById("reset");

let state = ["Status: OPEN "];

let price = 1.87;
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

const getResult = () => {
  let cashVar = parseFloat(cash.value);
  let rest = (cashVar - price).toFixed(2);

  if (cashVar < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashVar === price) {
    result.textContent = "No change due - customer paid with exact cash";
  } else {
    calc(rest, cid.length - 1);
  }

  // for (let el = 0; el < state.length; el++) {
  //   result.innerHTML += `<p>${state[el]}</p>`;
  // }
  result.innerHTML += `${state}`;
};

const calc = (rest, index) => {
  if (index < 0) return;
  let temp = 0.0;
  bill = cid[index][2];

  if (rest === 0) {
    console.log("Bye");
    return;
  }

  while (rest >= bill && cid[index][1] >= bill) {
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

  console.log(rest);
  if (temp > 0) {
    state.push(` ${cid[index][0]}: \$${temp}`);
  }
  calc(rest, index - 1);
};

const clearAll = () => {
  cash.value = "";
  result.innerHTML = "";
};

purchase.addEventListener("click", getResult);
reset.addEventListener("click", clearAll);
