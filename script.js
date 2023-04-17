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

function createCountryStatCont () {
    const statCont = newElement("div", "countries__country--stats")
    return statCont
}

function createCountryName(name) {
    const countryName = newElement("h4", "countries__country--name");
    countryName.innerHTML = `${name}`
    return countryName;
  }

function createCountryStats(cat, heading, text) {
  const statCont = newElement("span", `countries__country--${cat}`);
  const headingCont = newElement("h4", "countries__country--heading");
  const textCont = newElement("p", "countries__country--text");
  headingCont.innerText = `${heading}`;
  textCont.innerText = `${text}`;

  statCont.appendChild(headingCont);
  statCont.appendChild(textCont);

  return statCont;
}


const afgan = createCountryCont()

const afganFlag = createCountryFlag("afgan", "test")
const statCont = createCountryStatCont()

const countryName = createCountryName("afgan")
const countryPop = createCountryStats("population", "population", "122222")
const countryReigon = createCountryStats("reigon", "reigon", "Afgan")
const countryCapital = createCountryStats("capital", "capital", "jabip")

afgan.appendChild(afganFlag)

statCont.appendChild(countryName)
statCont.appendChild(countryPop)
statCont.appendChild(countryReigon)
statCont.appendChild(countryCapital)

afgan.appendChild(statCont)

console.log(afgan)

const countryList = document.getElementsByClassName("countries")[0]

countryList.appendChild(afgan)

