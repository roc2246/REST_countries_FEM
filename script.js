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
  statName === "Border Countries" ? (ele = "div") : (ele = "p");
  const countryStat = newElement("span", "country__info--stat");
  const statHeading = newElement("h5", "country__info--stat-heading");
  const statInfo = newElement(ele, "country__info--stat-info");

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

function createCountryFlagPage(flagName, flagSrc) {
  const flagCont = newElement("div", "country__info--flag-cont");
  const flagImg = newElement("img", "country__info--flag");
  flagImg.alt = `${flagName}`;
  flagImg.src = `${flagSrc}`;
  flagCont.appendChild(flagImg);
  return flagCont;
}

function createCountryPageName(name) {
  const countryName = newElement("h4", "country__info--name");
  countryName.innerHTML = `${name}`;
  return countryName;
}

function generateBorderBtns(borders) {
  let borderBtns = [];
  if (borders !== undefined) {
    Object.keys(borders).forEach((border) => {
      const borderBtn = newElement("button", "border-button");
      borderBtn.innerHTML = borders[border];
      borderBtns = [...borderBtns, borderBtn];
    });
  } else {
    return;
  }
  return borderBtns;
}

function generateBorders(borderInfo) {
  let container;
  const borderBtns = generateBorderBtns(borderInfo);
  console.log(typeof borderBtns);
  if (borderInfo !== undefined) {
    Object.keys(borderBtns).forEach((btn) => {
      const btnString = borderBtns[btn].outerHTML;
      container += `${btnString}`;
    });
  } else {
    container = "None";
  }
  const borderContainer = createCountryPageStat("Border Countries", container);
  return borderContainer;
}

function createCountryPage(countryData, no) {
  createBackBtn();

  const container = newElement("div", "country__info--flag-cont");

  const data = {
    name: countryData[no].name,
    flag: countryData[no].flag,
    nativeName: countryData[no].nativeName,
    population: countryData[no].population,
    subregion: countryData[no].subregion,
    capital: countryData[no].capital,
    topLevelDomain: countryData[no].topLevelDomain[0],
    currencies: countryData[no].currencies[0].name,
    languages: countryData[no].languages[0].name,
    borders: () => {
      const borderData = countryData[no].borders;
      let borderInfo = [];
      if (borderData !== undefined) {
        Object.keys(borderData).forEach((border) => {
          borderInfo = [...borderInfo, borderData[border]];
        });
      } else {
        borderInfo = undefined;
      }
      return borderInfo;
    },
  };

  const pageContainers = {
    flagCont: createCountryFlagPage(data.name, data.flag),
    countryName: createCountryPageName(data.name),
    nativeName: createCountryPageStat("Native Name", data.nativeName),
    population: createCountryPageStat("Population", data.population),
    region: createCountryPageStat("Region", data.reigon),
    subRegion: createCountryPageStat("Sub Region", data.subregion),
    capital: createCountryPageStat("Capital", data.capital),
    topLevelDomain: createCountryPageStat(
      "Top Level Dominance",
      data.topLevelDomain
    ),
    currencies: createCountryPageStat("Currencies", data.currencies),
    languages: createCountryPageStat("Languages", data.languages),
    borders: generateBorders(data.borders()),
  };

  Object.keys(pageContainers).forEach((cont) => {
    container.appendChild(pageContainers[cont]);
  });

  mainContainer.appendChild(container);
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
