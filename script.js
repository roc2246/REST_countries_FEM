let reigonFilter = null;
let textFilter = null;

const mainContainer = document.getElementsByTagName("main")[0];

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

function createCountryPageStat(statName, statCat) {
  let ele;
  const countryStat = newElement("span", "country__info--stat");
  const statHeading = newElement("h5", "country__info--stat-heading");
  let statInfo;

  if (statName === "Border Countries") {
    ele = "span";
    statInfo = newElement(ele, "country__info--stat-info");
    statInfo.classList.add("borders");
  } else {
    ele = "p";
    statInfo = newElement(ele, "country__info--stat-info");
  }

  statHeading.innerHTML = `${statName}`;
  statInfo.innerHTML = `${statCat}`;
  countryStat.appendChild(statHeading);
  countryStat.appendChild(statInfo);
  return countryStat;
}

function createBackBtn() {
  const backBtn = newElement("button", "btn btn--back");
  backBtn.innerText = "Back";
  backBtn.onclick = () => {
    mainContainer.innerHTML = "";
    mainContainer.classList.remove("country");
    mainContainer.classList.add("countries");

    logJSONData();
  };

  mainContainer.appendChild(backBtn);
}

function createCountryPage(countryData, no) {
  createBackBtn();

  const container = newElement("div", "country__info--flag-cont");

  const flagCont = newElement("div", "country__info--flag-cont");
  const flagImg = newElement("img", "country__info--flag");
  flagImg.alt = `${countryData[no].name}`;
  flagImg.src = `${countryData[no].flag}`;
  flagCont.appendChild(flagImg);
  container.appendChild(flagCont);

  const countryName = newElement("h4", "country__info--name");
  countryName.innerHTML = `${countryData[no].name}`;
  container.appendChild(countryName);

  const nativeName = createCountryPageStat(
    "Native Name",
    countryData[no].nativeName
  );
  container.appendChild(nativeName);
  const population = createCountryPageStat(
    "Population",
    countryData[no].population
  );
  container.appendChild(population);
  const region = createCountryPageStat("Region", countryData[no].reigon);
  container.appendChild(region);
  const subRegion = createCountryPageStat(
    "Sub Region",
    countryData[no].subregion
  );
  container.appendChild(subRegion);
  const capital = createCountryPageStat("Capital", countryData[no].capital);
  container.appendChild(capital);

  const topLevelDomain = createCountryPageStat(
    "Top Level Dominance",
    countryData[no].topLevelDomain[0]
  );
  container.appendChild(topLevelDomain);
  const currencies = createCountryPageStat(
    "Currencies",
    countryData[no].currencies[0].name
  );
  container.appendChild(currencies);
  const languages = createCountryPageStat(
    "Languages",
    countryData[no].languages[0].name
  );
  container.appendChild(languages);

  let borderBtns = [];
  let borders;
  if (countryData[no].borders !== undefined) {
    borders = createCountryPageStat("Border Countries", "&nbsp;");

    Object.keys(countryData[no].borders).forEach((border) => {
      const borderBtn = newElement("button", "border-button");
      borderBtn.innerHTML = countryData[no].borders[border];
      borderBtns = [...borderBtns, borderBtn];
    });
  } else {
    borders = createCountryPageStat("Border Countries", "None");
  }
  mainContainer.appendChild(container);

  container.appendChild(borders);
  const borderNames = document.getElementsByClassName(
    "country__info--stat-info"
  )[8];
  Object.keys(borderBtns).forEach((border) => {
    borderNames.appendChild(borderBtns[border]);
  });
}

function searchFilter(text) {
  const input = text.toUpperCase();
  for (let x = 0; x < countries.length; x++) {
    const countryName = countryNames[x].textContent.toUpperCase();

    const textBool = countryName.includes(input);
    const reigonBool = !countries[x].classList.contains("reigon-filter");

    const completeBool = textBool && reigonBool;

    if (completeBool) {
      countries[x].style.display = "block";
    } else {
      countries[x].style.display = "none";
    }
  }
}

function dropDownFilter() {
  for (let x = 0; x < reigonNames.length; x++) {
    if (reigonFilter !== reigonNames[x].innerHTML) {
      countries[x].classList.add("reigon-filter");
    }
  }
}

async function logJSONData() {
  const response = await fetch("data.json");
  const jsonData = await response.json();
  for (let x = 0; x < jsonData.length; x++) {
    createCountryCard(jsonData, x);
    countries[x].onclick = () => {
      // change URL here
      // const path = jsonData[x].name.replace(/%20| /g, '-')
      // console.log(path.toLowerCase())
      // window.location.pathname = path.toLowerCase()

      mainContainer.innerHTML = "";
      mainContainer.classList.remove("countries");
      mainContainer.classList.add("country");

      createCountryPage(jsonData, x);
    };
  }
}

logJSONData();

searchBar.onkeyup = () => {
  textFilter = searchBar.value;
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
