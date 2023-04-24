let regionFilter = null;
let textFilter = null;

let prevStateNo = [];
let toggleMode = "light"

const body = document.getElementsByTagName("body")[0];
const buttons = document.getElementsByTagName("button");

const displayModeContainer =
  document.getElementsByClassName("top__display-mode")[0];
const lightMode = document.getElementsByClassName("light-mode")[0];
const darkMode = document.getElementsByClassName("dark-mode")[0];
const toggleColors = {
  darkBlue: "var(---dark-blue)",
  veryDarkBlue: "var(--very-dark-blue)",
  darkGrey: "var(--dark-grey)",
  veryLightGrey: "var(--very-light-grey)",
  white: "var(--white)",
};

const topContainer = document.getElementsByClassName("top")[0];
const search = document.getElementsByClassName("search")[0];
const mainContainer = document.getElementsByTagName("main")[0];

const countryList = document.getElementsByClassName("countries")[0];
const countries = document.getElementsByClassName("countries__country");
const countryNames = document.getElementsByClassName(
  "countries__country--name"
);
const regionNames = document.getElementsByClassName("region-name");

const searchBar = document.getElementsByClassName("search--text-input")[0];

const dropDown = document.getElementsByClassName("search__dropdown")[0];

const dropDownBtn = document.getElementsByClassName("search__dropdown--btn")[0];

const dropDownOption = document.getElementsByClassName(
  "search__dropdown--category"
);

const clearDropDownOption = document.getElementsByClassName(
  "search__dropdown--category"
)[dropDownOption.length - 1];

function changeBtnTextColor(color) {
  Object.keys(buttons).forEach((button) => {
    buttons[button].style.color = `${color}`;
  });
}

function changeDisplay(input, container, textColor) {
  body.style.backgroundColor = container;
  mainContainer.style.backgroundColor = container;

  topContainer.style.backgroundColor = input;

  search.style.backgroundColor = container;
  searchBar.style.backgroundColor = input;

  Object.keys(buttons).forEach((btn) => {
    buttons[btn].style.backgroundColor = input;
  });

  Object.keys(countries).forEach((country) => {
    countries[country].style.backgroundColor = input;
  });
  body.style.color = textColor;
  changeBtnTextColor(textColor);
}

function changedisplayModeContainer() {
  const topColor = topContainer.style.backgroundColor;
  const searchColor = search.style.backgroundColor;
  const mainColor = mainContainer.style.backgroundColor;

  const allEmpty = topColor === "" && searchColor === "" && mainColor === "";

  if (allEmpty || mainColor === toggleColors.veryLightGrey) {
    toggleMode = "dark"
    changeDisplay(
      toggleColors.darkBlue,
      toggleColors.veryDarkBlue,
      toggleColors.white
    );
    lightMode.style.display = "flex";
    darkMode.style.display = "none";
  } else {
    toggleMode = "light"
    changeDisplay(
      toggleColors.white,
      toggleColors.veryLightGrey,
      "black"
    );

    lightMode.style.display = "none";
    darkMode.style.display = "flex";
  }
}

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

  heading === "Border Countries" && text !== "None"
    ? (cont = "div")
    : (cont = "p");
  const statCont = newElement("span", `${type}__${ele}--stat`);
  const headingCont = newElement("h4", `${type}__${ele}--stat-heading`);
  const textCont = newElement(cont, `${type}__${ele}--stat-text`);

  headingCont.innerText = `${heading}:`;
  textCont.innerHTML = ` ${text}`;

  if (heading === "Region") {
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
    countryRegion: createCountryStats(
      "countries",
      "country",
      "Region",
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

  if(toggleMode === "dark"){
    console.log("test")
    Object.keys(countries).forEach((country) => {
      countries[country].style.backgroundColor = toggleColors.darkBlue;
    });
  } else {
    Object.keys(countries).forEach((country) => {
      countries[country].style.backgroundColor = toggleColors.white;
    });
  }
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
      search.style.display = "flex";
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
  borderContainer.classList.add("borders");
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
  search.style.display = "none";
  mainContainer.innerHTML = "";
  mainContainer.classList.remove("countries");
  mainContainer.classList.add("country");

  createBackBtn(countryData);

  const container = newElement("div", "country__info");
  const group1 = newElement("div", "group-1");
  const group2 = newElement("div", "group-2");

  const data = {
    name: countryData[no].name,
    flag: countryData[no].flag,
    nativeName: countryData[no].nativeName,
    population: countryData[no].population,
    region: countryData[no].region,
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
    region: createCountryStats("country", "info", "Region", data.region),
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

  container.append(pageContainers.flagCont);
  container.append(pageContainers.countryName);

  group1.append(pageContainers.nativeName);
  group1.append(pageContainers.population);
  group1.append(pageContainers.region);
  group1.append(pageContainers.subRegion);
  group1.append(pageContainers.capital);
  container.append(group1);

  group2.append(pageContainers.topLevelDomain);
  group2.append(pageContainers.currencies);
  group2.append(pageContainers.languages);
  container.append(group2);

  container.append(pageContainers.borders);

  mainContainer.appendChild(container);

  if(toggleMode === "dark"){
    console.log("test")
    Object.keys(buttons).forEach((btn) => {
      buttons[btn].style.backgroundColor = toggleColors.darkBlue;
      buttons[btn].style.color = toggleColors.white
    });
  } else {
    Object.keys(buttons).forEach((btn) => {
      buttons[btn].style.backgroundColor = toggleColors.white;
      buttons[btn].style.color = "black";
    });
  }

  borderBtnFunctionality(countryData);
}

function searchFilter(text) {
  const input = text.toUpperCase();
  for (let x = 0; x < countries.length; x++) {
    const countryName = countryNames[x].textContent.toUpperCase();

    const textBool = countryName.includes(input);
    const regionBool = !countries[x].classList.contains("region-filter");

    const completeBool = textBool && regionBool;

    if (completeBool) {
      countries[x].style.display = "block";
    } else {
      countries[x].style.display = "none";
    }
  }
}

function dropDownFilter() {
  for (let x = 0; x < regionNames.length; x++) {
    if (regionFilter !== regionNames[x].innerHTML) {
      countries[x].classList.add("region-filter");
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

displayModeContainer.onclick = () => {
  changedisplayModeContainer();
};

searchBar.onkeyup = () => {
  textFilter = searchBar.value;
  searchFilter(textFilter);
};

dropDownBtn.onmouseover = () => {
  Object.keys(dropDownOption).forEach((option) => {
    dropDownOption[option].style.display = "inline";
  });
};

dropDown.onmouseleave = () => {
  Object.keys(dropDownOption).forEach((option) => {
    dropDownOption[option].style.display = "none";
  });
};

for (let x = 0; x < dropDownOption.length - 1; x++) {
  dropDownOption[x].onclick = () => {
    for (let x = 0; x < countries.length; x++) {
      if (countries[x].classList.contains("region-filter")) {
        console.log("TEst")
        countries[x].classList.remove("region-filter");
      }
    }
    regionFilter = ` ${dropDownOption[x].innerHTML}`;
    dropDownFilter();
  };
}

clearDropDownOption.onclick = () => {
  regionFilter = null;
  for (let x = 0; x < countries.length; x++) {
    if (countries[x].classList.contains("region-filter")) {
      countries[x].classList.remove("region-filter");
    }
  }
};
