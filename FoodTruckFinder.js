const columnify = require('columnify');
const Search    = require('./Search');

let counter = 0;
let trucks  = [];

/**
 * SEARCH CONTROLLER
 * 1. fetch trucks's names and locations
 * 2. print the first 10 rows
 * 3. promt input to go to next page
 */
const searchCtrl = async () => {
  const day = new Date().getDay();
  const search = new Search(day);
  await search.getResults();
  trucks = search.nameAndLocation;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  console.log(`Today is ${days[day]}, we found you ${trucks.length} food trucks`);
  next(); //print the first 10 rows
  printFoodTruck(); //promt input to go to next page
};

searchCtrl(); //run the program

const printFoodTruck = () => {
  const stdin = process.openStdin();
  
  stdin.addListener("data", function(i) {
    i = i.toString().trim();
    if(i == '1') {
      next();
    }else if(i == '0') {
      counter = 0;
      console.log('You are in the first page now');
      next();
    }else{
      console.log('Enter 1 and press Enter to Next Page; Enter 0 and press Enter to go to First Page');
    }
  });
};

const next = () => {
  if(counter >= trucks.length) {
    console.log('This is the end of page, press 0 to go to first Page.');
    return;
  }

  let arr = [];
  const j = counter + 10;
  while(counter < trucks.length && counter < j) {
    arr.push({name:    trucks[counter].applicant,
              address: trucks[counter].location
    });
    counter++;
  }
  console.log(columnify(arr, {
    minWidth: 35,
  }));
  
  if(counter == trucks.length) {
    console.log('End of the page. Press 0 to go to first page');
  }else{
    console.log('Enter 1 and press Enter to Next Page; Enter 0 and press Enter to go to First Page');
  }
};