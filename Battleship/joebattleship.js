var model = {
  //model is an object
  boardSize: 7,
  numShips: 3, // allows number of ships to be changed as a property
  shipLength: 3, //three properties keep us from hardcoding-cant change values. Board size is size of grip of the board, numships is the number of ships in game and ship length is the number of locations in each shiP
  shipsSunk: 0, //shipsunk is 0 for start of hame keeps the current number of ships that have been sunk by the player

  ships: [
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] }, // if hit in one of the sections it will be at the corresponding number in the locations
    { locations: [0, 0, 0], hits: ["", "", ""] },
  ],
  //ships to an array that holds all three ships
  //the locations property is an array that holds each location on the board
  // the its property is also an array that holds whether or not a ship is hit at each location, we will set the array items to the empty string initially and change each item to ht when the ship has taken a hit in the corresponding location
  fire: function (guess) {
    //method accepts a guess
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i]; // iterates and checks through 3 ships on game board
      var index = ship.locations.indexOf(guess); // checks if userGuess matches ship location            // takes userGuess and searches location array, returns index if found or returns -1 if not found
      //indexOf method searches an array for a matching value and returns the index of that value in the array or -1 if it cant find it
      if (ship.hits[index] === "hit") {
        // id we get an index greater than or equal to zero the users guess is in the locations array and we have a hit
        view.displayMessage("Oops, you already hit that location!");
        return true;
      } else if (index >= 0) {
        ship.hits[index] = "hit"; // display: notifies view of a hit on location of userGuess                    //marks the hits array at the same index if guess is in the correct location
        view.displayHit(guess);
        view.displayMessage("HIT!"); // notifies view to display message                                  //notify the view that we got a hit at the location in guess and dispalys HIT!

        if (this.isSunk(ship)) {
          view.displayMessage("You sank my battleship!"); //lets the player know that this hit sank the battleship
          this.shipsSunk++; //check here after we know for sure we have a hit if the ship is sunk then we increase the number of ships that are sunk in the models shipSunk property
        }
        return true; //return true because we had a hit
      }
    }
    view.displayMiss(guess); //notify the view we got a miss at what lcoation
    view.displayMessage("You missed."); //ask the user to display the message you missed
    return false; //adding this method to the model object
  },

  isSunk: function (ship) {
    for (var i = 0; i < this.shipLength; i++) {
      //we call the method issunk because ot will return true if its sunk and false if not
      if (ship.hits[i] !== "hit") {
        //this method takes a ship and then checks every possible location for a hit.
        return false; //if theres a location that doesn't have a  hit, then the ship is still floating so return false
      }
    }
    return true; //methods in the view object add the hit or miss class to the element wih the id at row and colum. therefore the view translates the hit in the hits array into a hit in the html so the player sees it
  },

  generateShipLocations: function () {
    var locations; //for each ship we want to generate locations for
    for (var i = 0; i < this.numShips; i++) {
      // iterates, generates location for each ship                 //do loop executes untill condition is false do untill no more ships
      //checkto see if those locations overlap with any existing ships on the board. if they do then we need to try again
      do {
        //for each ship we want to generate locations fo
        locations = this.generateShip(); //keep generating new locations until there is no collision
      } while (this.collision(locations)); // first, generates new sets of location as array                               //once we have locations that work we assign the locations to the ships locations until theres no collision
      this.ships[i].locations = locations; // then check if location generated overlaps with existing ships
    } // assigns generated location to ship's location property in model.ships array
    console.log("Ships array: ");
    console.log(this.ships);
  },

  generateShip: function () {
    var direction = Math.floor(Math.random() * 2); //math.random to generate a new number between 0 and 1, and multiply the result by 2, to get a number between 0 and 2 not including 2. We then turn that into a 0 or a 1 using math.floor
    var row, col;

    if (direction === 1) {
      //if direction is 0 that means we will create a vertical ship
      // horizontal                   //were saying that if the direction is a 1 that means well create a horizontal ship
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); //generates a starting location for the ship on a board
    } else {
      //first we will create a starting location like row=0 and column=3 for the new shi, depending on the direction we need differnt rules to create the starting location
      // vertical
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1)); //we use this shipLength to generalise the code so we can use it for any ship length
      col = Math.floor(Math.random() * this.boardSize);
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      //for the new ship locations well start with an empty array and add the locations one by one
      if (direction === 1) {
        //while loop for the number of locations in a ship
        // iterates for number of locations in a ship, starting from 0             //and add a new location to the newShipLocations array each time through the loop.
        newShipLocations.push(row + "" + (col + i)); //parentheses to make sure it is added to col before converted to a string   //push adds elemnts to the end of an array
      } else {
        //code for a horizontal ship, pushing a new location onto the NewShiplocations array, column + i means i is 0 so the it will keep looping untill we get through the columns will get something like 01,02,03 in the array
        newShipLocations.push(row + i + "" + col); //this is code for vertical ship, increasinf row instead of column adding i each time through the loop, will get something like 31,41,51 in the array
      }
    }
    return newShipLocations; //once all locations are generated return the array
  },

  collision: function (locations) {
    //locations in a narray of locations for a new ship wed like to place on the board
    for (var i = 0; i < this.numShips; i++) {
      // iterates through existing ships on the board
      var ship = this.ships[i]; //for each ship already on the board
      for (var j = 0; j < locations.length; j++) {
        //check to see if any of the lcoations in the new ship's locations array are in an existing ship's locations array.
        if (ship.locations.indexOf(locations[j]) >= 0) {
          //using indexOf to check if the location already exits in a ship so if the index is greater than or equal to 0, we know it matched an existing location so we retrun true
          // takes existing location and searches generated location array, returns index if found
          // if more than 0, matched existing location,
          return true; //returning from inside a loop thats inside another loop.
        }
      }
    }
    return false;
  },
};

var view = {
  //defining an object and assigning it to the variable view
  displayMessage: function (msg) {
    //takes one argument msg
    var messageArea = document.getElementById("messageArea"); // keep display up to date with messages, hits and misses         //get messageArea element from the page
    messageArea.innerHTML = msg; //update the text of the messageArea element by setting its innerHTML to msg
  }, // takes in a string message and display in messageArea

  displayHit: function (location) {
    var cell = document.getElementById(location); //id we created from the players guess to get the correct element to update
    cell.setAttribute("class", "hit"); //adds a ship image to the element by setting class of element to hit
  }, //this method takes a string message and displays it in the message display area (top left HTML)

  displayMiss: function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss"); //we do the same here set class to miss and miss image will be added to the element
  },
};

var controller = {
  guesses: 0, //defining our controller object

  processGuess: function (guess) {
    var location = parseGuess(guess); //use parseGuess to validate the players gues
    if (location) {
      this.guesses++; //as long as null isn't returned we know we've got a valid location object
      var hit = model.fire(location); //if the guess was hit and the number of ships are sunk is equal to the number of ships in the game then show message that all ships are sunk
      if (hit && model.shipsSunk === model.numShips) {
        //&& is and if all is true otherwise false
        //if the player entered a valid guess we increase the number of guesses by one
        //determiens if all ships are sunl                                                      //we pass the row and column in the form of a string to the models fire method. Remember, the fire method returns true if a ship is hit
        view.displayMessage(
          "You sank all my battleships, in " + this.guesses + " guesses" //we will show the player the total number of guesses they took to sink the ships the guesses property is a property of "t"his" object the controller
        );
      }
    } //also notice if the player enters an invalid board location we dont penalize them by counting the guess
  },
};

function parseGuess(guess) {
  //guess is passed into parameter
  var alphabet = ["A", "B", "C", "D", "E", "F", "G"]; // AN ARRAY loaded with each letter that could be part of a valid guess
  //combined 2 conitionals into one using || (or)
  if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board."); //and then we check for null and to make sure the lengt
  } else {
    //if not we alert the player
    var firstChar = guess.charAt(0); //first charachter of users guess
    var row = alphabet.indexOf(firstChar); //grabs the first charachter of the guess
    var column = guess.charAt(1); //second cHARACHTER                                //indexOF we get back a number between zero and six that corresponds to the letter
    //added code to grab the second character in the string which represents the column
    if (isNaN(row) || isNaN(column)) {
      //boolean || is true if one is true
      //and were checking to see if either of the row or colum is not a number using the isNaN function
      alert("Oops, that isn't on the board.");
    } else if (
      row < 0 ||
      row >= model.boardSize ||
      column < 0 ||
      column >= model.boardSize
    ) {
      alert("Oops, that's off the board!"); // type conversion column is a string so when we check to make its value 0-6 we rely on type convertion to convert it to a number for comparison
    } else {
      // Actually were being even more general here instead of hardcoding the number six, were asking the model to tell us how big the big board is and using that number for comparison
      return row + column;
    } //at this point, everything looks good so we can return a row and column, concatentating the ow and column  together to make a string and returning that string were using type conversion again here.
  } // if we get here there was a failed check along the way so return null
  return null;
}

// event handlers

function handleFireButton() {
  //this function will be called whenever fire button is pressed
  var guessInput = document.getElementById("guessInput"); // grabs user guess from form input, upon button click                   //first we get a refernce to the input from element using the input elements id "guess input"
  var guess = guessInput.value.toUpperCase(); //UPPERCASE TOOK ME HOURS TO REALISE //then we get the guess from the input element, the guess is stored in the value property of the input element
  //were passing the players guess to the controller.
  controller.processGuess(guess);
  //resets the form input element to be the empty string. That way you don't have to explicity select the text and delete it before entering the next guess which would be annoying
  guessInput.value = "";
}

function handleKeyPress(e) {
  //called whenever a key is press in the form input
  // event handler called whenever key is pressed in HTML input field               //the browser passes an vent object to the handler. This object has info about which key was pressed
  var fireButton = document.getElementById("fireButton");

  // so we use window.event instead.
  e = e || window.event; //for cross browser compatibility                                    //if you press the RETURN key the events keyCode property will be set to 13, of thats the case then we want to cause the frie button to act like it was clicked we can do that by calling the firebutton click method tricking it into thinking it was clicked
  if (e.keyCode === 13) {
    fireButton.click();
    return false; //returns false so the form dosent do anything else
  }
}

// init - called when the page has completed loading
window.onload = init;

function init() {
  var fireButton = document.getElementById("fireButton"); //handles onclick Fire! button          // first we get a reference to the fire button using the buttons id
  fireButton.onclick = handleFireButton; //then we can add a click handler function named HandleFireButton to the button

  var guessInput = document.getElementById("guessInput"); // handles keypress events (return key) in HTML input field
  guessInput.onkeypress = handleKeyPress; //adds a new hadnler this handles key press events from the HTML input field

  // place the ships on the game board
  model.generateShipLocations();
} //call to generate ships locations   calling this from init function so that it happens when you load the game
