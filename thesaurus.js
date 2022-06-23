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
