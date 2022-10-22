import "./css/index.css"
import IMask from "imask"

const CardColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const CardColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const getLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }

  CardColor1.setAttribute("fill", colors[type][0])
  CardColor2.setAttribute("fill", colors[type][1])
  getLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("default")

//Security-code
const securityCode = document.querySelector("#security-code")

const securityCoderPathern = {
  mask: "0000",
}

const securityCodeMasked = IMask(securityCode, securityCoderPathern)

//Expiration date
const expirationDate = document.querySelector("#expiration-date")

const expirationDatePathern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePathern)

//CardNumber
const cardNumber = document.querySelector("#card-number")

const cardNumberPatthern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      type: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      type: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      type: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    console.log(foundMask)

    return foundMask
  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPatthern)
