
    // Create Stars

    const starsContainer = document.getElementById("stars");

    for(let i=0;i<150;i++){

      const star = document.createElement("div");

      star.classList.add("star");

      star.style.top = Math.random()*100 + "%";
      star.style.left = Math.random()*100 + "%";

      star.style.animationDuration =
      (Math.random()*3+2)+"s";

      starsContainer.appendChild(star);
    }

    const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies"

    const dropdowns = document.querySelectorAll('.drop select')
    const btn = document.querySelector("form button")
    const fromCurrency = document.querySelector(".from select")
    const toCurrency = document.querySelector(".to select");
    const msg = document.querySelector(".msg");
    const info = document.querySelector(".info");


    for(let select of dropdowns){
      for(currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(select.name === "from" && currencyCode === "USD"){
          newOption.selected = "selected";
        } else if(select.name === "to" && currencyCode === "INR"){
          newOption.selected = "selected";
        }
        select.append(newOption);
      }

      select.addEventListener("change", (event) => {
        updateFlag(event.target);
      });
    }

   const updateExchangeRate = async () => {

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
  }

  const URL =
  `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate =
  data[fromCurrency.value.toLowerCase()]
  [toCurrency.value.toLowerCase()];

  let finalAmount = amtVal * rate;

  msg.innerText =
  `${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;

  info.innerHTML = `
  
    <h2 style="text-align:center; margin:1rem 0;">Currency Details</h2>
    
    <div style="display: flex; justify-content: space-between;">
    
    <div>
    <p>
      <strong>From Country :</strong>
      ${countryList[fromCurrency.value]}
    </p>
    <br>
    <p>
      <strong>From Currency :</strong>
      ${currencyName[fromCurrency.value]}
    </p>
  </div>

     
   <div >
    <p>
      <strong>To Country :</strong>
      ${countryList[toCurrency.value]}
    </p><br>
    <p>
      <strong>To Currency :</strong>
      ${currencyName[toCurrency.value]}
    </p>
  </div> 

    </div>`
};
  
    const updateFlag = (ele) =>{
      let currencyCode = ele.value;
      let countryCode = countryList[currencyCode];

      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

      let img = ele.parentElement.querySelector("img");
      img.src = newSrc;
    };

    btn.addEventListener("click", (evt) => {
      evt.preventDefault();
      updateExchangeRate();
    })

    window.addEventListener("load", () =>{
      updateExchangeRate();
    })


    