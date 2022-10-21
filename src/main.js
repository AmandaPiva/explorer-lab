import "./css/index.css"

const CardColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const CardColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const getLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type){
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"]
  }

  CardColor1.setAttribute("fill", colors[type][0]);
  CardColor2.setAttribute("fill", colors[type][1]);
  getLogo.setAttribute("src", `cc-${type}.svg`);
}

setCardType('default');