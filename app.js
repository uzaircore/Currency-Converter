const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (curcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = curcode;
        newOption.value = curcode;
        if (select.name == "from" && curcode == "USD"){
            newOption.selected = "selected";
        } else if (select.name == "to" && curcode == "PKR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{
        updateFlage(evt.target);
    });
}
const updateFlage =(element)=>{
    let curCode = element.value;
    let countryCode = countryList[curCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
 });
 const updateExchangeRate = async()=>{
        let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === ""|| amtVal <1){
        amtVal = 1;
        amount.value = "1";
    };
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch (URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt}${toCurr.value}`
    console.log (finalAmt);
 };
 window.addEventListener("load",()=>{
    updateExchangeRate();
 })
