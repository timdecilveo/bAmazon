var inquirer = require("inquirer");
var mysql = require("mysql");

// Specify the port.
var port = 3000;

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "192.168.99.100",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  displayItems();
});


// Running this application will first display all of the items available for sale.
// Include the ids, names, and prices of products for sale.
function displayItems(){
  connection.query("SELECT * FROM products", function(err, result) {
    if(err){
      throw err;
    }
    else{
      for(var i = 0; i < result.length; i++){
        console.log("Item ID: " + result[i].id + " | Product Name: " + result[i].product_name +
          " | Department Name: " + result[i].department_name + " | Price: " + result[i].price +
          " | Stock Quantity: " + result[i].stock_quantity);
        
        // It would be better to compose awkward strings 
        // like this horizontal-rule dyncamically via a
        // function. Something like hr(80, '-')
        console.log("----------------------------------------------------------------------------------------");
      }
    }

    // Good job calling this from the mysql callback
    userPrompt();
  })
}

// The app should then prompt users with two messages.
function userPrompt(){
  var optionArray = ["shoes", "socks", "sandals", "t-shirts", "long sleeve shirts",
                    "blouse", "undershirts", "dress", "pants", "shorts"];

  inquirer.prompt({
    name: "questionOne",
    type: "input",
    // The first should ask them the ID of the product they would like to buy.
    message: "What would you like to buy?",
    choices: optionArray

  })
  .then(function(answer){
    switch(answer.questionOne){
      case optionArray[0]:
      shoesSearch();
      break;

      case optionArray[1]:
      socksSearch();
      break;

      case optionArray[2]:
      sandalsSearch();
      break;

      case optionArray[3]:
      tshirtsSearch();
      break;

      case optionArray[4]:
      longSleeveShirtsSearch();
      break;

      case optionArray[5]:
      blouseSearch();
      break;

      case optionArray[6]:
      undershirtsSearch();
      break;
      
      case optionArray[7]:
      dressSearch();
      break;

      case optionArray[8]:
      pantsSearch();
      break;

      case optionArray[9]:
      shortsSearch();
      break;
    }
    var quest1Answer = answer.questionOne;
    console.log("answer.questionOne: " + quest1Answer);

    function quantityFunction(quest1Answer){
      console.log("Q1: " + quest1Answer);
      var productUnits = ["1", "2", "3", "4", "5"];
      var optionArray = ["shoes", "socks", "sandals", "t-shirts", "long sleeve shirts",
                        "blouse", "undershirts", "dress", "pants", "shorts"];

      inquirer.prompt({
        name: "questionTwo",
        type: "input",
        // The second message should ask how many units of the product they would like to buy.
        message: "How many units of the product would you like to buy?",
        choices: productUnits
      })
      .then(function(ans){
        var answerVal = parseInt(ans.questionTwo);
        console.log("This is the amount you want to buy: " + answerVal); //need to adjust this

        connection.query("SELECT * FROM products WHERE product_name = ?", [ answer.questionOne ], function(err, result) {
          for(var i = 0; i < result.length; i++){
            if(err){
              throw err;
            }
            else if(answerVal > result[i].stock_quantity){
              console.log("Insufficient quantity!");
            }
            else{
              //ADJUSTMENT SHOES
              var amountLeft = result[i].stock_quantity - answerVal;
              console.log("Amount left: " + amountLeft);
              console.log("--------------------------------------------");
              connection.query("SELECT * FROM products", function(err, result) {
                if(err){
                  throw err;
                }
                else{
                  // I couldn't quite figure out how to consolidate this into one line of code where it referenced
                  // the specific porduct's price. I know this should be consolidated as it is repeatable code.
                  if(answer.questionOne === optionArray[0]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[0].price));
                  }
                  else if(answer.questionOne === optionArray[1]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[1].price));
                  }
                  else if(answer.questionOne === optionArray[2]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[2].price));
                  }
                  else if(answer.questionOne === optionArray[3]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[3].price));
                  }
                  else if(answer.questionOne === optionArray[4]){
                    console.log("The cost of your " + answer.questionOne + " shirtspurchase is: " + (answerVal * result[4].price));
                  }
                  else if(answer.questionOne === optionArray[5]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[5].price));
                  }
                  else if(answer.questionOne === optionArray[6]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[6].price));
                  }
                  else if(answer.questionOne === optionArray[7]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[7].price));
                  }
                  else if(answer.questionOne === optionArray[8]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[8].price));
                  }
                  else if(answer.questionOne === optionArray[9]){
                    console.log("The cost of your " + answer.questionOne + " purchase is: " + (answerVal * result[9].price));
                  }
                  connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: amountLeft }, {product_name: answer.questionOne }], function(err, res){
                    if(err){
                      throw err;
                    }
                    else{
                      displayItems();
                      userPrompt();
                    }
                  })
                }
              })
            }
          }
        })
      });
    } // END OF quantityFunction();
    quantityFunction(answer.questionOne);
  });
}



function shoesSearch(){console.log("We have finished the prompt for shoes");}
function socksSearch(){console.log("We have finished the prompt for socks");}
function sandalsSearch(){console.log("We have finished the prompt for sandals");}
function tshirtsSearch(){console.log("We have finished the prompt for t-shirts");}
function longSleeveShirtsSearch(){console.log("We have finished the prompt for long sleev shirts");}
function blouseSearch(){console.log("We have finished the prompt for blouses");}
function undershirtsSearch(){console.log("We have finished the prompt for undershirts");}      
function dressSearch(){console.log("We have finished the prompt for dresses");}
function pantsSearch(){console.log("We have finished the prompt for pants");}
function shortsSearch(){console.log("We have finished the prompt for shorts");}