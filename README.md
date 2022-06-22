**App Title:** Thesaurus

**App Description:** online thesaurus; displays synonyms and antonyms for words and phrases

**API:** [Merriam-Webster Thesaurus API](https://www.dictionaryapi.com/products/api-collegiate-thesaurus)

**API Snippet:**

```
[
    {
        "meta": {
            "id": "chilly",
            "uuid": "07e24672-d188-4f00-a2ac-eec73cf4bedf",
            "src": "coll_thes",
            "section": "alpha",
            "target": {
                "tuuid": "e0bd18d1-f22e-4bf3-b0c4-0ef4c9963834",
                "tsrc": "collegiate"
            },
            "stems": [
                "chilly",
                "chillier",
                "chilliest",
                "chillily",
                "chilliness",
                "chillinesses"
            ],
            "syns": [
                [
                    "bitter",
                    "bleak",
                    "chill",
                    "chilling",
                    "nipping",
                    "nippy",
                    "raw",
                    "sharp"
                ],
```

**Wireframes:** [Figma](https://www.figma.com/file/JaFXrwjD73drb1ipC4k6NO/thesaurus-wireframe)

**MVP:**

- an input box for the user to put in the word they want to look up
- a search button to trigger a function that fetches API data based on the word that was searched
- a media query to determine the screen size of the user's device in order to display the search results accordingly
- content boxes to display the array of definitions for the search term
- a button to trigger a function that shows the next few definitions if the one the user is looking for isn't in the first three that get displayed
- event listeners for the definition content boxes buttons to trigger a function that fetches synonyms and antonyms from the API that match the selected definition
- a home button that transforms the page to its original state

**Post-MVP:**

- animate elements' appearance/disappearance
- an autofill/search suggestion feature for the search box
- code that hides the api key from the user
- a feature to turn the individual synonyms/antonyms in the results into links that run them through the same functions as the original search
- additional display settings based on media queries
- a feature to suggest alternative spellings if they misspelled their search term

**Goals:**

Wednesday —— MVP HTML (basic elements)  
Thursday —— MVP Javascript (fetch/promises, fill content boxes)  
Friday-Saturday —— MVP CSS (flexbox, coloring, alignment, placement)  
Sunday-Monday —— post-MVP features  
Tuesday —— post-MVP features, presentation prep

**Timeframes:**

MVP HTML —— 1.5 hrs (have the basic page set up by Thursday morning)  
MVP Javascript —— 8 hrs (have the app be basically functional by Friday morning)  
MVP CSS —— 10 hrs (have the app looking stylish by Sunday)  
post-MVP features —— up to 15 hrs (have as many additional features as I can finish completed by Tuesday afternoon)  
presentation prep —— 1 hr (be ready to present by Tuesday afternoon)
