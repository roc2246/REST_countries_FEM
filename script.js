let reigonFilter = null;
let textFilter = null;

let prevStateNo = [];

const mainContainer = document.getElementsByTagName("main")[0];
const search = document.getElementsByClassName("search")[0]

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

function createCountryFlag(type, ele, countryName, imgSrc) {
  const flagCont = newElement("div", `${type}__${ele}--flag-box`);
  const flagImg = newElement("img", `${type}__${ele}--flag`);

  flagImg.alt = `${countryName}`;
  flagImg.src = `${imgSrc}`;

  flagCont.appendChild(flagImg);

  return flagCont;
}

function createCountryName(type, ele, name) {
  const countryName = newElement("h2", `${type}__${ele}--name`);
  countryName.innerHTML = `${name}`;
  return countryName;
}

function createCountryStats(type, ele, heading, text) {
  let cont;

  heading === "Border Countries" && text !== "None"? (cont = "div") : (cont = "p");
  const statCont = newElement("span", `${type}__${ele}--stat`);
  const headingCont = newElement("h4", `${type}__${ele}--stat-heading`);
  const textCont = newElement(cont, `${type}__${ele}--stat-text`);

  headingCont.innerText = `${heading}:`;
  textCont.innerHTML = ` ${text}`;


  if (heading === "Reigon") {
    textCont.classList.add("region-name");
  }

  statCont.appendChild(headingCont);
  statCont.appendChild(textCont);

  return statCont;
}

function createCountryCard(countryData, no) {
  const country = newElement("div", "countries__country");

  const info = {
    countryFlag: createCountryFlag(
      "countries",
      "country",
      countryData[no].name,
      countryData[no].flag
    ),
    countryName: createCountryName(
      "countries",
      "country",
      countryData[no].name
    ),
    countryPop: createCountryStats(
      "countries",
      "country",
      "Population",
      countryData[no].population
    ),
    countryReigon: createCountryStats(
      "countries",
      "country",
      "Reigon",
      countryData[no].region
    ),
    countryCapital: createCountryStats(
      "countries",
      "country",
      "Capital",
      countryData[no].capital
    ),
  };

  Object.keys(info).forEach((card) => {
    country.appendChild(info[card]);
  });

  countryList.appendChild(country);
}

function createBackBtn(countryData) {
  const backBtn = newElement("button", "btn btn--back");
  backBtn.innerText = "Back";
  backBtn.onclick = () => {
    mainContainer.innerHTML = "";
    mainContainer.classList.remove("country");
    mainContainer.classList.add("countries");

    if (prevStateNo.length !== 0) {
      createCountryPage(countryData, prevStateNo[prevStateNo.length - 1]);
      prevStateNo.pop();
    } else {
      search.style.display = "flex"
      logJSONData();
    }
  };

  mainContainer.appendChild(backBtn);
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
  let container = "";
  const borderBtns = generateBorderBtns(borderInfo);
  if (borderInfo !== undefined) {
    Object.keys(borderBtns).forEach((btn) => {
      const btnString = borderBtns[btn].outerHTML;
      container += btnString;
    });
  } else {
    container = "None";
  }
  const borderContainer = createCountryStats(
    "country",
    "info",
    "Border Countries",
    container
  );
  borderContainer.classList.add("borders")
  return borderContainer;
}

function borderBtnFunctionality(countryData) {
  const borderBtns = document.getElementsByClassName("border-button");
  const displayedCountryName = document.getElementsByClassName(
    "country__info--name"
  )[0].innerHTML;
  Object.keys(borderBtns).forEach((btn) => {
    borderBtns[btn].onclick = () => {
      const buttonName = borderBtns[btn].innerHTML;
      for (let country in countryData) {
        const countryName = countryData[country].name;

        if (countryName === displayedCountryName) {
          const countryNo = parseInt(country);
          prevStateNo = [...prevStateNo, countryNo];
        }
        if (buttonName === countryName) {
          mainContainer.innerHTML = "";
          createCountryPage(countryData, country);
        }
      }
    };
  });
}

function createCountryPage(countryData, no) {
  search.style.display = "none"
  mainContainer.innerHTML = "";
  mainContainer.classList.remove("countries");
  mainContainer.classList.add("country");

  createBackBtn(countryData);

  const container = newElement("div", "country__info");
  const group1 = newElement("div", "group-1")
  const group2 = newElement("div", "group-2")

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
          for (let country in countryData) {
            const alpha3 = countryData[country].alpha3Code;
            const countryName = countryData[country].name;
            if (alpha3 === borderData[border]) {
              borderInfo = [...borderInfo, countryName];
            }
          }
        });
      } else {
        borderInfo = undefined;
      }
      return borderInfo;
    },
  };

  const pageContainers = {
    flagCont: createCountryFlag("country", "info", data.name, data.flag),
    countryName: createCountryName("country", "info", data.name),
    nativeName: createCountryStats(
      "country",
      "info",
      "Native Name",
      data.nativeName
    ),
    population: createCountryStats(
      "country",
      "info",
      "Population",
      data.population
    ),
    region: createCountryStats("country", "info", "Region", data.reigon),
    subRegion: createCountryStats(
      "country",
      "info",
      "Sub Region",
      data.subregion
    ),
    capital: createCountryStats("country", "info", "Capital", data.capital),
    topLevelDomain: createCountryStats(
      "country",
      "info",
      "Top Level Dominance",
      data.topLevelDomain
    ),
    currencies: createCountryStats(
      "country",
      "info",
      "Currencies",
      data.currencies
    ),
    languages: createCountryStats(
      "country",
      "info",
      "Languages",
      data.languages
    ),
    borders: generateBorders(data.borders()),
  };

  container.append(pageContainers.flagCont)
  container.append(pageContainers.countryName)

  group1.append(pageContainers.nativeName)
  group1.append(pageContainers.population)
  group1.append(pageContainers.region)
  group1.append(pageContainers.subRegion)
  group1.append(pageContainers.capital)
  container.append(group1)

  group2.append(pageContainers.topLevelDomain)
  group2.append(pageContainers.currencies)
  group2.append(pageContainers.languages)
  container.append(group2)

  container.append(pageContainers.borders)

  mainContainer.appendChild(container);

  borderBtnFunctionality(countryData);
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