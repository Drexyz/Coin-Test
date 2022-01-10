const coinNeeded = () => {
  //get data from input
  var pocket = document.getElementById("pocket").value.split(",");
  pocket = pocket.map(x => parseInt(x)).sort(function(a, b){return a-b}) 
  const transaction = parseInt(document.getElementById("transaction").value);
  
  let i = 0;
  var coins = []; //coin we need to do transaction
  var price = 0;
  while (i < transaction + price) {
    price += 0.5
    //get array of coin that more than transaction
    var coinAvailable = [];
    for (x of pocket) {
      if (x >= (transaction-i)+price) {coinAvailable.push(x)}
    }
    //push coin to coin that will used
    //if coin that more than transaction exist, push the first value (smallest one)
    if (coinAvailable.length > 0) {
      coins.push(coinAvailable[0]);
      i += coinAvailable[0]
      pocket = pocket.filter(x => x != coinAvailable[0])
    }

    //if coin that more than transaction didn't exist, push the biggest value of pocket array
    else {
      coins.push(pocket.slice(-1)[0]);
      i += pocket.slice(-1)[0]
      pocket.splice(-1)
    }
  } 

  //get change
  let sum = coins.reduce((prev, curr) => prev + curr)
  const change = sum - (transaction + price)

  //display
  document.getElementById("coins").innerHTML = coins;
  document.getElementById("price").innerHTML = price;
  document.getElementById("change").innerHTML = change;
}