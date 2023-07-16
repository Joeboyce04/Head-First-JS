var scores = [
  60, 50, 60, 58, 54, 54, 58, 50, 52, 54, 48, 69, 34, 55, 51, 52, 44, 51, 69,
  64, 66, 55, 52, 61, 46, 31, 57, 52, 44, 18, 41, 53, 55, 61, 51, 44,
]; //array

var costs = [
  0.25, 0.27, 0.25, 0.25, 0.25, 0.25, 0.33, 0.31, 0.25, 0.29, 0.27, 0.22, 0.31,
  0.25, 0.25, 0.33, 0.21, 0.25, 0.25, 0.25, 0.28, 0.25, 0.24, 0.22, 0.2, 0.25,
  0.3, 0.25, 0.24, 0.25, 0.25, 0.25, 0.27, 0.25, 0.26, 0.29,
];

function printandgethighscore(scores) {
  //function

  var highscore = 0;
  var output;

  for (var i = 0; i < scores.length; i++) {
    //for loop to iterate/repeat through all the scores in the array
    output = "Bubble solution #" + i + "score:" + scores[i]; //each time through the loop we create a string with the value of i. (bubble solution number) scores[i] is the score that the bubble solutuion got
    console.log(output); //displays string in console
    if (scores[i] > highscore) {
      //check each time through the loop to see if we have a higher score and if so thats our new high score
      highscore = scores[i];
    }
  }
  return highscore;
}

function getbestresults(scores, highscore) {
  var bestSolutions = []; //new array that holds all the bubblle solutions that match the highest score
  for (var i = 0; i < scores.length; i++) {
    //itterate through the entire scores array looking for thise items with highest score
    if (scores[i] == highscore) {
      //each time the loop we compare the score at index i with the highScore and if they are equal then we add that index to the bestSolutions array using push
      bestSolutions.push(i);
    }
  }
  return bestSolutions;
}

var highscore = printandgethighscore(scores); //call function passing in the socres array.
console.log("Bubbles tests:" + scores.length); //display results
console.log("Highest bubble score:" + highscore);

var bestSolutions = getbestresults(scores, highscore); //result of function to display the best solutions
console.log("Solutions with the highest score:" + bestSolutions); // display bubble solutions with the highest scores, console log does it one by one for us

function getMostCostEffectiveSolution(scores, costs, highscore) {
  //takes the array of scores the array of costs and the high score

  var cost = 100; //we start cost at high and well lower it each time untill we find a lowe cost solution with a higher score
  var index;

  for (var i = 0; i < scores.length; i++) {
    // iterate through the scores array and cked to see if the score was the high score
    if (scores[i] == highscore) {
      if (cost > costs[i]) {
        index = i; //if it does then we can check its cost if the current cost is greater than the solution cost. then we found a lower cost solution so well make sure we keep track of which solution it is.
        cost = costs[i]; //store the cost in the cost bariable as the lowser cost we have seen
      }
    }
  }
  return index; // once the loop is complete the index of solution with the lowesr cost is stored in index so we return that to the code that called the function
}
var mostCostEffective = getMostCostEffectiveSolution(scores, costs, highscore); //setting varialble equal to fucntion
console.log(
  "Bubble Solution #" + mostCostEffective + " is the most cost effective" //display mostcosteffective
);
