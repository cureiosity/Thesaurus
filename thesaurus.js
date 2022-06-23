const main = document.querySelector("main")
const searchFeaturesDiv = document.querySelector("#search-features-div")
const inputBox = document.querySelector("#search-input")
const searchButton = document.querySelector("#search-button")
let thesaurusData = []

searchButton.addEventListener("click", (event) => showDefinitions(event))

function showDefinitions(event) {
  clearSearchFeatures()
  fetchThesaurusData(event)
}

function clearSearchFeatures() {
  searchFeaturesDiv.remove()
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
          thesaurusData.push(result[i].def[0].sseq[j][0][1].dt[0][1])
        }
      }
      console.log(thesaurusData)
      definitionsGen()
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}

function definitionsGen() {
  for (let i = 0; i < 2; i++) {
    let wordDefinition = document.createElement("div")
    wordDefinition.classList.add("definitions")
    wordDefinition.id = `definition${i + 1}`
    wordDefinition.innerText = thesaurusData[i]
    main.appendChild(wordDefinition)
  }
}
