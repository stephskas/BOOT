
// REQUIREMENTS:
// V1
// [X] On page load, set up game and add event handler for clicking clues
// [X] Should add Play Again button
// [X] Should create HTML table

// V2
// [X] Should get categories from API
// [X] Should return array of NUM_CATEGORIES random category Ids using lodash

"use strict"
const BASE_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CATEGORY = 5;
const NUM_QUESTIONS = NUM_CATEGORIES * NUM_CLUES_PER_CATEGORY;
const CLICK = new Audio("Stapler-SoundBible.com-374581609.wav");
// STORE BOARD CATEGORIES
let boardCategories = [];
// STORE CLUES
let clues = [];
let displayedClues = [];
// STORE PLAYER SCORES
let p1 = 0;
let p2 = 0;

async function getCategoryIds() {
  // Get random categories
  let categories = await axios.get(`${BASE_API_URL}categories?count=100`) //get max provided categories: 100
  let randomCategories = _.sampleSize(categories.data, NUM_CATEGORIES) // randomize categories and reduce sample size
  boardCategories = randomCategories.map((category) => ({
    catId: category.id,
    catTitle: category.title,
  }))
  // console.log(categories) // {data: Array(100), status: 200, statusText: "OK", headers: {…}, config: {…}, …}
  console.log(randomCategories) // 6: [{...}, {...}, {...}, {...}, {...}, {...}]
  // {data: 0: {id: 11531, title: "mixed bag", clues_count: 5}} 
  // console.log(boardCategories) // 0: {catId: 11620, catTitle: "lighten up"}
}

function getSelectedCategoryId(e) {
  let cell = e.target // board category is the same for each column : td index used to target each category <td class="1">?</td>
  let $clueIndex = $(cell).attr("class")[0] // 1 , use zero index to remove added question and answer classes (class = "1 question")
  let $selectedCategoryId = boardCategories[$clueIndex].catId // catId for column
  getClues(e, $selectedCategoryId);
}

async function getClues(e, $selectedCategoryId) {
  let response = await axios.get(
    `${BASE_API_URL}category?id=${$selectedCategoryId}`
  ) // get clues for selected category id
  let cluesForSelectedCategory = response.data.clues
  // let randomClues = _.sampleSize(
  //   cluesForSelectedCategory,
  //   NUM_CLUES_PER_CATEGORY
  // ) // randomize clues and reduce sample size
  clues = cluesForSelectedCategory.map((clue) => ({
    question: clue.question,
    answer: clue.answer, 
    showing: null,
  }))
  // console.log(clues);
  // Jeopardy API may return clues with empty values for the question property, check all clues for empty question values and provide FREE POINT
  for (let i = 0; i < clues.length; i++) {
    if (clues[i].question === "") { 
      clues[i].question = "FREE POINT"
      clues[i].answer = "FREE POINT"
    }
  } // if all clues have values for the question property store the clue and render question
  storeClues(e, clues);
  return;
}

async function storeClues(e, clues) {
  let cell = e.target; // board category is the same for each column : td index used to target each category <td class="1">?</td>
  let $clueIndex = $(cell).attr("class")[0];
  displayedClues[$clueIndex] = clues; // store all clues objects for each category in an array at the same index as the category td index
  renderQuestion(e);
  console.log(displayedClues);
  return;
}

async function renderBoard() {
  // RENDER GAME
  const $header = $(`<h1>JEOPARDY</h1>`)
  const $gameStatus = $(
    `<h2><span class="p1">${p1}</span> / <span class="p2">${p2}</span></h2>`
  )
  const $table = $(`<table></table>`)
  const $reset = $(`<button id="restart">PLAY AGAIN</button>`)
  $("body").append($header, $gameStatus, $table, $reset)
  $table.attr("id", "gameboard")
  // Create top row for categories
  $table.append(`<thead class="head"><tr class="categories"></tr></thead>`)
  for (let c = 0; c < NUM_CATEGORIES; c++) {
    $("tr.categories").append(
      `<th class="category ${c}">${boardCategories[c].catTitle}</th>`
    )
  }
  // Set number of rows and create rows beneath top row
  $table.append(`<tbody class="clues"></tbody>`)
  for (let r = 1; r <= NUM_CLUES_PER_CATEGORY; r++) {
    $("tbody").append(`<tr class="${r - 1}"></tr>`)
  // Set number of columns and create table cells for clues
  } 
  for (let c = 1; c <= NUM_CATEGORIES; c++) {
      $("tbody tr").append(`<td class="${c - 1}">?</td>`)
    }
  // Create reset button
  const reset = document.createElement("button");
  reset.innerText = "PLAY AGAIN";
};

async function renderQuestion(e) {
  // RENDER QUESTION
 let $selected = e.target;
 let $rowId = $($selected).parent()[0].className[0];
 if($($selected).not(".question")) {
    $($selected).html(clues[$rowId].question);
    $($selected).addClass("question");  
    return clues;
  }
}
async function renderAnswer(e) {
  // RENDER ANSWER
  let $selected = e.target
  let $answerIndex = $($selected).attr("class")[0]; // get td category class which is the index of the answer in the displayedClues array
  let $clueIndex = $($selected).parent()[0].className[0]; // get the tr class which is the index for the row - used to get a different clue from the clues array within the displayedClues array for each td with the same category index (there are NUM_CLUES_PER_CATEGORY clues for each category)
  let answer = displayedClues[$answerIndex][$clueIndex].answer;
  $($selected).html(answer)
  $($selected).removeClass("question")
  $($selected).addClass("answer")
} 

$(async function () {
  renderBoard(await getCategoryIds())
  handleClick();
})

function handleClick(e) {
  // Event handlers
  $("td").on("click", function (e) {
    CLICK.play(); // play sound on click
    let $selectedCategoryId = getSelectedCategoryId(e);
    let $selected = e.target;
    if ($(this).hasClass("answer")) {
      return
    }
    if (!$(this).hasClass("question")) {
      getClues(e, $selectedCategoryId)
      return
    }
    if ($($selected).hasClass("question")) {
      renderAnswer(e)
      return
    }
  })
  //Increment scores
  $("h2").on("click", function (e) {
    if (e.target.className === "p1") {
      p1++
      $(".p1").text(p1)
    } else {
      p2++
      $(".p2").text(p2)
    }
  })
  // Play Again - Reload page
  $("#restart").on("click", function () {
    location.reload()
  })
}

  // V3
  // [X] Should return object with data about a category:
  // [X] Should get question and answer clue data for each category
  // [X]  Should return { title: "Math", clues: clue-array }
  //    Where clue-array is:
  //     [
  //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
  //        {question: "Bell Jar Author", answer: "Plath", showing: null},
  //        ...
  //     ]
  // [X] Should use Lodash to randomly select 6 categories
  // function getCategory(catId) {}

  // V4
  // [X] Should fill the HTML table#jeopardy with the categories & cells for questions.
  // [X] The <thead> should be filled w/a <tr>, and a <td> for each category
  // [X] The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
  //     each with a question for each category in a <td>
  //     (initally, just show a "?" where the question/answer would go.)
  // async function renderBoard() { }

  // V5
  // [X] Should handle clicking on a clue: show the question or answer.
  // [X] if currently null, should show question
  // [X] if currently "question", should show answer 
  // [X] if currently "answer", should ignore click
  // function handleClick(event) {}
 

