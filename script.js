let reigonFilter = null;
let textFilter = null;

const countryList = document.getElementsByClassName("countries")[0];
const countries = document.getElementsByClassName("countries__country");
const countryNames = document.getElementsByClassName(
  "countries__country--name"
);
const reigonNames = document.getElementsByClassName("region-name");

const searchBar = document.getElementsByClassName("search--text-input")[0];

const dropDownOption = document.getElementsByClassName(
  "search__dropdown--category"
);

const clearDropDownOption = document.getElementsByClassName(
  "search__dropdown--category"
)[dropDownOption.length - 1];

function newElement(ele, className) {
  const newElement = document.createElement(`${ele}`);
  newElement.className = `${className}`;
  return newElement;
}

function createCountryCont() {
  const countryCont = newElement("div", "countries__country");
  return countryCont;
}

function createCountryFlag(countryName, imgSrc) {
  const flagCont = newElement("div", "countries__country--img-box");
  const flagImg = newElement("img", "countries__country--img");

  flagImg.alt = `${countryName}`;
  flagImg.src = `${imgSrc}`;

  flagCont.appendChild(flagImg);

  return flagCont;
}

function createCountryStatCont() {
  const statCont = newElement("div", "countries__country--stats");
  return statCont;
}

function createCountryName(name) {
  const countryName = newElement("h4", "countries__country--name");
  countryName.innerHTML = `${name}`;
  return countryName;
}

function createCountryStats(cat, heading, text) {
  const statCont = newElement("span", `countries__country--${cat}`);
  const headingCont = newElement("h4", "countries__country--heading");
  const textCont = newElement("p", "countries__country--text");

  if (cat === "reigon") {
    textCont.classList.add("region-name");
  }

  headingCont.innerText = `${heading}`;
  textCont.innerText = `${text}`;

  statCont.appendChild(headingCont);
  statCont.appendChild(textCont);

  return statCont;
}

function createCountryCard(countryData, no) {
  const country = createCountryCont();

  const countryFlag = createCountryFlag(
    countryData[no].name,
    countryData[no].flag
  );
  const statCont = createCountryStatCont();

  const countryName = createCountryName(countryData[no].name);
  const countryPop = createCountryStats(
    "population",
    "Population",
    countryData[no].population
  );
  const countryReigon = createCountryStats(
    "reigon",
    "Reigon",
    countryData[no].region
  );
  const countryCapital = createCountryStats(
    "capital",
    "Capital",
    countryData[no].capital
  );

  country.appendChild(countryFlag);

  statCont.appendChild(countryName);
  statCont.appendChild(countryPop);
  statCont.appendChild(countryReigon);
  statCont.appendChild(countryCapital);

  country.appendChild(statCont);

  countryList.appendChild(country);
}

function searchFilter(text) {
  const input = text.toUpperCase();
  for (let x = 0; x < countries.length; x++) {
    const countryName = countryNames[x].textContent.toUpperCase()

    const textBool = countryName.includes(input);
    const reigonBool = !countries[x].classList.contains("reigon-filter");

    const completeBool = textBool && reigonBool

    if (completeBool) {
      countries[x].style.display = "block";
    } else {
      countries[x].style.display = "none";
    }
  }
}

function dropDownFilter() {
  for (let x = 0; x < reigonNames.length; x++) {
    if (reigonFilter !== reigonNames[x].innerHTML)  {
      countries[x].classList.add("reigon-filter");
    }
  }
}

async function logJSONData() {
  const response = await fetch("data.json");
  const jsonData = await response.json();
  for (let x = 0; x < jsonData.length; x++) {
    createCountryCard(jsonData, x);
  }
}

logJSONData();

searchBar.onkeyup = () => {
  textFilter = searchBar.value
  searchFilter(textFilter);
};

for (let x = 0; x < dropDownOption.length - 1; x++) {
  dropDownOption[x].onclick = () => {
    for (let x = 0; x < countries.length; x++) {
      if (countries[x].classList.contains("reigon-filter")) {
        countries[x].classList.remove("reigon-filter");
      }
    }
    reigonFilter = dropDownOption[x].innerHTML;
    dropDownFilter();
  };
}

clearDropDownOption.onclick = () => {
  reigonFilter = null;
  for (let x = 0; x < countries.length; x++) {
    if (countries[x].classList.contains("reigon-filter")) {
      countries[x].classList.remove("reigon-filter");
    }
  }
};
