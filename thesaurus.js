const main = document.querySelector("main")
const searchFeaturesDiv = document.querySelector("#search-features-div")
const inputBox = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")
let thesaurusData = []
let def1Counter = 0
let def2Counter = 1

searchButton.addEventListener("click", (event) => showDefinitions(event))

function showDefinitions(event) {
  clearSearchFeatures()
  addDefBoxes()
  addMoreButton()
  fetchThesaurusData(event)
}

function clearSearchFeatures() {
  searchFeaturesDiv.remove()
}

function addDefBoxes() {
  for (let i = 0; i < 2; i++) {
    let defBox = document.createElement("div")
    defBox.classList.add("definitions")
    defBox.id = `def-box-${i + 1}`
    main.appendChild(defBox)
    defBox.addEventListener("click", showResults)
  }
}

function addMoreButton() {
  let getMore = document.createElement("div")
  getMore.id = "get-more"
  getMore.innerText = "more..."
  main.appendChild(getMore)
  getMore.addEventListener("click", definitionsGen)
}

function fetchThesaurusData(event) {
  event.preventDefault()
  let searchTerm = inputBox.value
  const apiSearchPartOne =
    "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/"
  const apiSearchPartTwo = searchTerm
  const apiSearchPartThree = "?key=3b481d99-8dfa-4fc6-b5ec-6bc8a871a6f6"
  const apiSearchWhole =
    apiSearchPartOne + apiSearchPartTwo + apiSearchPartThree

  fetch(apiSearchWhole)
    .then((result) => result.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].def[0].sseq.length; j++) {
          thesaurusData.push(result[i].def[0].sseq[j][0])
          console.log(result[i].def[0].sseq[j][0][1].dt[0][1])
        }
      }
      definitionsGen()
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}

function definitionsGen() {
  const defBox1 = document.querySelector("#def-box-1")
  const defBox2 = document.querySelector("#def-box-2")
  defBox1.innerText = thesaurusData[def1Counter][1].dt[0][1]
  defBox2.innerText = thesaurusData[def2Counter][1].dt[0][1]
  def1Counter += 2
  def2Counter += 2
}

function showResults() {
  clearDefinitions()
  addResultsBoxes()
  resultsGen()
}

function clearDefinitions() {
  const definitionsBoxes = document.querySelectorAll(".definitions")
  definitionsBoxes.forEach((box) => box.remove())
  const getMore = document.querySelector("#get-more")
  getMore.remove()
}

function addResultsBoxes() {
  let synBox = document.createElement("div")
  synBox.classList.add("results")
  synBox.id = "syn-box"
  main.appendChild(synBox)

  let antBox = document.createElement("div")
  antBox.classList.add("results")
  antBox.id = "ant-box"
  main.appendChild(antBox)
}

function resultsGen() {
  const synBox = document.querySelector("#syn-box")
  const antBox = document.querySelector("#ant-box")
  const synonyms = []
  const antonyms = []
  if (!!thesaurusData[def1Counter][1].syn_list) {
    const synonymData = thesaurusData[def1Counter][1].syn_list
    synonymData.forEach((dataPoint) => {
      dataPoint.forEach((subElement) => {
        synonyms.push(subElement.wd)
      })
    })
  } else {
    synonyms.push("none")
  }
  if (!!thesaurusData[def1Counter][1].ant_list) {
    const antonymData = thesaurusData[def1Counter][1].ant_list
    antonymData.forEach((dataPoint) => {
      dataPoint.forEach((subElement) => {
        antonyms.push(subElement.wd)
      })
    })
  } else {
    antonyms.push("none")
  }
  synBox.innerText = [...synonyms]
  antBox.innerText = [...antonyms]
}
