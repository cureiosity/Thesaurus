function createBaseState() {
  // const letterImgContainer = document.createElement('div')
  // letterImgContainer.classList.add('letter-img-container')
  // document.body.appendChild(letterImgContainer)
  // const letterImg = document.createElement('img')
  // letterImg.classList.add('letter-img')
  // letterImg.src = 'images/letter-a.png'
  // letterImgContainer.appendChild(letterImg)

  const main = document.createElement("main")
  document.body.appendChild(main)
  const footer = document.createElement("footer")
  document.body.appendChild(footer)
  const searchFeaturesDiv = document.createElement("div")
  searchFeaturesDiv.id = "search-features-div"
  main.appendChild(searchFeaturesDiv)
  const thesaurusForm = document.createElement("form")
  thesaurusForm.id = "search-features-form"
  searchFeaturesDiv.appendChild(thesaurusForm)
  const inputBox = document.createElement("input")
  inputBox.id = "search-input"
  inputBox.name = "search-input"
  inputBox.type = "text"
  inputBox.autofocus = true
  thesaurusForm.appendChild(inputBox)
  const searchButton = document.createElement("button")
  searchButton.id = "search-button"
  searchButton.type = "submit"
  thesaurusForm.appendChild(searchButton)
  const searchImage = document.createElement("img")
  searchImage.src = "images/search.png"
  searchButton.appendChild(searchImage)
  searchButton.addEventListener("click", showDefinitions)
}
createBaseState()

let main = document.querySelector("main")
let footer = document.querySelector("footer")
let searchFeaturesDiv = document.querySelector("#search-features-div")
let inputBox = document.querySelector("#search-input")
let searchButton = document.querySelector("#search-button")
let thesaurusData = []
let def1Counter = 0
let def2Counter = 1

searchButton.addEventListener("click", showDefinitions)

function showDefinitions(event) {
  main = document.querySelector("main")
  footer = document.querySelector("footer")
  searchFeaturesDiv = document.querySelector("#search-features-div")
  inputBox = document.querySelector("#search-input")
  searchButton = document.querySelector("#search-button")
  document.body.style.justifyContent = "space-around"
  clearSearchFeatures()
  addSearchTerm()
  addDefBoxes()
  fetchThesaurusData(event)
  addMoreButton()
  addBackButton()
}

function clearSearchFeatures() {
  searchFeaturesDiv.style.transform = "translateX(-125%)"
  setTimeout(() => searchFeaturesDiv.remove(), 500)
  // searchFeaturesDiv.remove()
}

function addSearchTerm() {
  const searchTerm = document.createElement("div")
  searchTerm.id = "search-term"
  searchTerm.innerText = inputBox.value
  main.appendChild(searchTerm)
}

function addDefBoxes() {
  for (let i = 0; i < 2; i++) {
    let defBoxContainer = document.createElement("div")
    defBoxContainer.classList.add("def-box-containers")
    defBoxContainer.id = `def-box-container-${i + 1}`
    defBoxContainer.dataset.defIndex = i
    let defBox = document.createElement("div")
    defBox.classList.add("definitions")
    defBox.id = `def-box-${i + 1}`
    defBox.dataset.defIndex = i
    let fwdIcon = document.createElement("div")
    fwdIcon.classList = "fwd-icon"
    fwdIcon.innerText = ">"
    main.appendChild(defBoxContainer)
    defBoxContainer.appendChild(defBox)
    defBoxContainer.appendChild(fwdIcon)
    defBoxContainer.addEventListener("click", (event) => showResults(event))
  }

  function showResults(event) {
    const defIndex = event.target.dataset.defIndex
    clearDefinitions()
    addResultsBoxes()
    resultsGen(defIndex)
  }
}
function clearDefinitions() {
  const definitionsContainers = document.querySelectorAll(".def-box-containers")
  definitionsContainers.forEach((container) => container.remove())
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

function resultsGen(defIndex) {
  const synBox = document.querySelector("#syn-box")
  const antBox = document.querySelector("#ant-box")
  let synonyms = []
  let antonyms = []
  if (!!thesaurusData[defIndex][1].syn_list) {
    const synonymData = thesaurusData[defIndex][1].syn_list
    synonymData.forEach((dataPoint) => {
      dataPoint.forEach((subElement) => {
        synonyms.push(subElement.wd)
      })
    })
  } else {
    synonyms.push("(no synonyms in the database)")
  }
  if (!!thesaurusData[defIndex][1].ant_list) {
    const antonymData = thesaurusData[defIndex][1].ant_list
    antonymData.forEach((dataPoint) => {
      dataPoint.forEach((subElement) => {
        antonyms.push(subElement.wd)
      })
    })
  } else {
    antonyms.push("(no antonyms in the database)")
  }

  let synInfo = ""
  let antInfo = ""

  synonyms.forEach((synonym) => {
    synInfo += `<p>${synonym}</p>`
  })

  antonyms.forEach((antonym) => {
    antInfo += `<p>${antonym}</p>`
  })

  synBox.innerText = ""
  antBox.innerText = ""

  synBox.insertAdjacentHTML("beforeend", synInfo)
  antBox.insertAdjacentHTML("beforeend", antInfo)
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
  defBox1.dataset.defIndex = def1Counter
  defBox2.dataset.defIndex = def2Counter
  def1Counter += 2
  def2Counter += 2
}

function addMoreButton() {
  let getMore = document.createElement("div")
  getMore.id = "get-more"
  getMore.innerText = "more..."
  main.appendChild(getMore)
  getMore.addEventListener("click", definitionsGen)
}

function addBackButton() {
  let goBack = document.createElement("button")
  goBack.id = "back"
  // goBack.innerText = "Back to Search"
  let backImg = document.createElement("img")
  backImg.id = "back-img"
  backImg.src = "images/back.png"
  footer.appendChild(goBack)
  goBack.appendChild(backImg)
  goBack.addEventListener("click", returnToBaseState)
}

function returnToBaseState() {
  main.remove()
  footer.remove()
  thesaurusData.length = 0
  def1Counter = 0
  def2Counter = 1
  document.body.style.justifyContent = "space-evenly"
  createBaseState()
}
