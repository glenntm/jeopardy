// categories is the main data structure for the app; it looks like this:

//const { default: axios } = require("axios");

// this function returns  random items from the array
function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}   
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];

// generates number between 1 and 28000
function getRandomNumber(){
    const rndInt = Math.floor(Math.random() * 28000) + 1
    return rndInt;
}
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let catIds = [];
    let res = await axios.get(`http://jservice.io/api/categories?count=100&offset=${getRandomNumber()}`);

    for(let cat of res.data){
        // makes sure to return categories with 5 or more clues
        if(cat.clues_count > 4){
            catIds.push(cat.id);
            //console.log(cat.clues_count);
        }
        
    }
    ;
    //console.log(getRandomSubarray(catIds, 6));
    // returns 6 random ids from the arrays
    return getRandomSubarray(catIds, 6);

}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    let res = await axios.get(`http://jservice.io/api/category?id=${catId}`);
    let responseResults = res.data;
    let catClues =[];
    
    let catObj = {
        title: responseResults.title,
        
    };

    //iterates over the array of clues only returning the question and answer
    for(let clue of responseResults.clues){
        let {question, answer} = clue;
        let clueObj = {
            question,
            answer
        }

        catClues.push(clueObj);
    }

        //returns 5 random questions and answers in an array
        let randomCatClues = getRandomSubarray(catClues, 5);
        
        //sets clues property in catObj and assigns that property list of arrays
        let arr = 'clues';
        catObj[arr] = randomCatClues;

    return catObj;
}



/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {
    let table = document.getElementById("jeopardy");
    let theader = document.querySelector(".theader");
    let tbody = document.querySelector(".tbody");
    let trHeader = document.createElement('tr');
    let catIds = await getCategoryIds();
    let jepArray = [];
    
    //adds object of clues and titles to array. This prevents us from doing multiple callouts in a loop
    for(const catId of catIds){
        let jepElement = await getCategory(catId);
        jepArray.push(jepElement);
    }
    
    console.log(jepArray);
    
    //console.log(catLength.length);
    
    //creates the header with categories
    for(h=0; h<jepArray.length; h++){

        let td = document.createElement("td");
        //setting the text of the cell to be the title of the header
        td.innerHTML = jepArray[h].title;
        trHeader.appendChild(td);
        theader.appendChild(trHeader);

        //console.log(categoryClues);

    }


    
    
    // iterates over the body
    //creates 5 rows
    for(j=0; j<5; j++){
        let trBody = document.createElement('tr');
        tbody.appendChild(trBody);

        //adds the cells for each row created along with the questions
        for(h=0; h<jepArray.length; h++){
            let td = document.createElement("td");
            td.classList.add("tdBody");
            td.innerHTML = jepArray[h].clues[j].question;
            trBody.appendChild(td);
            //console.log();
        }
        
    }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */
let cells = document.querySelector("tbody");

// for(let cell of cells){
//     cell.addEventListener("click", function (event) {
//         console.log(event);
//     });
// }

cells.addEventListener("click", function(event){
    console.log("hello!");
  })

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO