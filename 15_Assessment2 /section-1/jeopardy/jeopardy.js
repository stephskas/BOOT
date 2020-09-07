
// REQUIREMENTS:
// V1
// [ ] On page load, add event handler for clicking clues
// [ ] On click of start should start and set up game 
// [ ] Should add restart button
// [ ] Should get random category Ids
// [ ] Should get data for each category
// [ ] Should create HTML table

"use strict"
const BASE_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS = 30;
const NUM_ROWS = NUM_QUESTIONS/NUM_CATEGORIES; 
const NUM_CLUES_PER_CAT = 2;
// Player 1 starts game
let player = 1;
// STORE PLAYER PIECE PLACEMENT FOR WIN CHECK
let playerPlacements = [];
// STORE COUNT FOR DRAW CHECK
let selectedCount = 1

async function setUp() {
  const categories = await axios.get(`${BASE_API_URL}categories?count=100`)
  let randomCategories = _.sampleSize(categories.data, 6)
  let randomCategoryIds = [];
  if(randomCategories.length === 6) {
    randomCategories.forEach(category => randomCategoryIds.push(category.id))
    console.log(randomCategoryIds)
  }

  // RENDER GAME
  // Create headers
  const $header = $(`<h1>JEOPARDY</h1>`)
  const $gameStatus = $(`<h2>0</h2>`)
  const $table = $(`<table></table>`)
  const $reset = $(`<button>PLAY AGAIN</button>`)
  $("body").append($header, $gameStatus, $table, $reset)
  $table.attr("id", "gameboard")
  $table.on("click", getCategoryId)

  // Create rows below top row
  $table.append(`<tbody class="clues"></tbody>`)
  for (let r = 1; r <= NUM_ROWS; r++) {
    $("tbody").append(`<tr class="row ${r}"></tr>`)
  }
  // Create table cells for clues
  for (let x = 1; x <= NUM_CATEGORIES; x++) {
    $("tr.row").append(`<td class="${x-1}">?</td>`)
  }
  $table.append(`<thead class="head"><tr class="categories"></tr></thead>`)
  // Create top row for categories
  for (let c = 0; c <= NUM_CATEGORIES; c++) {
    $("tr.categories").append(`<th class="category ${c}">${randomCategories[c].title}</th>`)
  }
  // Create reset button
  const reset = document.createElement("button")
  reset.innerText = "PLAY AGAIN"


}

// function play(){
//   console.log('player');
// }

// Event handlers
$(".clues").click(function(e){
  getCategoryId(e)
})


function getCategoryId(e){
  let cell = e.target
  let $clueCategoryClass = $(cell).attr('class');
  let $clueCategoryId = randomCategoryIds[$clueCategoryClass]
  console.log($clueCategory)
}


  // V2
  // [ ] Should get NUM_CATEGORIES random category from API.
  // [ ] Should return array of category ids
  // let categories = [];
  // function getCategoryIds() {}

  // V3
  // [ ] Should return object with data about a category:
  // [ ]  Should return { title: "Math", clues: clue-array }
  //    Where clue-array is:
  //     [
  //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
  //        {question: "Bell Jar Author", answer: "Plath", showing: null},
  //        ...
  //     ]
  // function getCategory(catId) {}

  // V4
  // [ ] Should fill the HTML table#jeopardy with the categories & cells for questions.
  // [ ] The <thead> should be filled w/a <tr>, and a <td> for each category
  // [ ] The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
  //     each with a question for each category in a <td>
  //     (initally, just show a "?" where the question/answer would go.)
  // async function fillTable() { }

  // V5
  // [ ] Should handle clicking on a clue: show the question or answer.

  //   [ ] Should use .showing property on clue to determine what to show:
  //   [ ] if currently null, should show question & set .showing to "question"
  //   [ ]  if currently "question", should show answer & set .showing to "answer"
  //   [ ] if currently "answer", should ignore click
  // function handleClick(evt) {}

  // V6
  // [ ] Should wipe the current Jeopardy board
  // [ ] Should show the loading spinner
  // [ ] Should update the button used to fetch data
  // function showLoadingView() {}

  // V7
  // [ ] Should remove the loading spinner and update the button used to fetch data
  // function hideLoadingView() {}

  // V8
  // [ ] Should remove the loading spinner and update the button used to fetch data

  // V9
  // [ ] Should use Lodash to randomly select 6 categories
  

setUp();