const searchFeaturesDiv = document.querySelector("#search-features-div")
const searchButton = document.querySelector("#search-button")

searchButton.addEventListener("click", (event) => showDefinitions(event))

function showDefinitions(event) {
  clearSearchFeatures()
  fetchDefinitions(event)
}

function clearSearchFeatures() {
  searchFeaturesDiv.remove()
}

function fetchDefinitions(event) {
  event.preventDefault()
  const inputBox = document.querySelector("#search-input")
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
      console.log(apiSearchWhole)
    })
    .catch((err) => {
      console.error("Error --- ", err)
    })
}
