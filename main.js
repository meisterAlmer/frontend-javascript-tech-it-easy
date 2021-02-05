// VOORRAAD ARRAY MET TV'S
const inventory = [
  {
    type: '43PUS6504/12',
    name: '4K TV',
    brand: 'Philips',
    price: 379,
    availableSizes: [43, 50, 58, 65],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 23,
    sold: 2,
  },
  {
    type: 'NH3216SMART',
    name: 'HD smart TV',
    brand: 'Nikkei',
    price: 159,
    availableSizes: [32],
    refreshRate: 100,
    screenType: 'LED',
    screenQuality: 'HD ready',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: false,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 4,
    sold: 4,
  },
  {
    type: 'QE55Q60T',
    name: '4K QLED TV',
    brand: 'Samsung',
    price: 709,
    availableSizes: [43, 50, 55, 58, 65],
    refreshRate: 60,
    screenType: 'QLED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: false,
    },
    originalStock: 7,
    sold: 0,
  },
  {
    type: '43HAK6152',
    name: 'Ultra HD SMART TV',
    brand: 'Hitachi',
    price: 349,
    availableSizes: [43, 50, 55, 58],
    refreshRate: 60,
    screenType: 'LCD',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: false,
    },
    originalStock: 5,
    sold: 5,
  },
  {
    type: '50PUS7304/12',
    name: 'The One 4K TV',
    brand: 'Philips',
    price: 479,
    availableSizes: [43, 50, 55, 58, 65, 70],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: true,
    },
    originalStock: 8,
    sold: 3,
  },
  {
    type: '55PUS7805',
    name: '4K LED TV',
    brand: 'Philips',
    price: 689,
    availableSizes: [55],
    refreshRate: 100,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: true,
    },
    originalStock: 6,
    sold: 3,
  },
  {
    type: 'B2450HD',
    name: 'LED TV',
    brand: 'Brandt',
    price: 109,
    availableSizes: [24],
    refreshRate: 60,
    screenType: 'LED',
    screenQuality: 'Full HD',
    smartTv: false,
    options: {
      wifi: false,
      speech: false,
      hdr: false,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 10,
    sold: 8,
  },
  {
    type: '32WL1A63DG',
    name: 'HD TV',
    brand: 'Toshiba',
    price: 161,
    availableSizes: [32],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Full HD',
    smartTv: false,
    options: {
      wifi: false,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 10,
    sold: 8,
  },
];

// select dom items
const containerInStock = document.querySelector('#instock');
const containerTargetProfit = document.querySelector('#target-profit');
const containerTotalProfit = document.querySelector('#total-profit');
const containerTvNames = document.querySelector('#tv-names');
const containerTvItems = document.querySelector('#tv-items');

// return total tv units currently in stock
const totalInventory = () => {
  const inStockItems = inventory.map(item => item.originalStock - item.sold);
  let counter = 0;
  inStockItems.map(item => (counter += item));
  return counter;
};

// display total tv units on webpage
const htmlInStock = `<h2 class="text-red">${totalInventory()}</h2>`;
containerInStock.insertAdjacentHTML('beforeend', htmlInStock);

// returns all tv types from array
const tvAllTypes = inventory.map(item => item.type);

// returns all items out of stock / sold out
const soldOutItems = () =>
  inventory.filter(item => item.originalStock - item.sold === 0);

// returns tv units with ambilight
const hasAmbilight = () => inventory.filter(item => item.options.ambiLight);

// sort the tv array from low to high / high to low
let sorted = '';
const sortPriceLowHigh = () => {
  if (sorted !== 'lowhigh') {
    inventory.sort((itemA, itemB) => itemA.price - itemB.price);
    sorted = 'lowhigh';
  } else {
    inventory.sort((itemA, itemB) => itemB.price - itemA.price);
    sorted = 'highlow';
  }
};

// returns the profit, accepts parameters for originalStock / sold
const calcProfit = profitType => {
  const unitProfit = inventory.map(item => item.price * item[profitType]);
  let totalProfit = 0;
  unitProfit.forEach(value => (totalProfit += value));
  return totalProfit;
};

// target profit
const targetProfit = calcProfit('originalStock');

// current profit
const currentProfit = calcProfit('sold');

// inserts the html for target profit and current profit in the webpage
const htmlTargetProfit = `<h2 class="text-blue">€${targetProfit}</h2>`;
containerTargetProfit.insertAdjacentHTML('beforeend', htmlTargetProfit);

const htmlCurrentProfit = `<h2 class="text-green">€${currentProfit}</h2>`;
containerTotalProfit.insertAdjacentHTML('beforeend', htmlCurrentProfit);

// string with tv brand, type and name
const tvItemName = object => `${object.brand} ${object.type} - ${object.name}`;

// string with price of tv
const tvItemPrice = object => `€${object.price},-`;

// returns string with screen sizes for selected tv and calculates inch to cm
const tvItemSizes = object => {
  const tvSizeArr = object.availableSizes;
  let tvSizes = '';
  tvSizeArr.forEach((size, i) => {
    tvSizes += `${size} inch (${Math.round(size / 0.3937)} cm)`;
    if (i + 1 !== tvSizeArr.length) {
      tvSizes += ' | ';
    }
  });
  return tvSizes;
};

// shows all tv units on webpage with name, price and screensizes
const showAllUnits = function (arr) {
  containerTvItems.innerHTML = '';
  allUnits = arr;
  allUnits.forEach((unit, i) => {
    const htmlTvItems = `
    <div class="tv-item">
      <h3>${tvItemName(unit)}</h3>
      <p>${tvItemPrice(unit)}</p>
      <p>${tvItemSizes(unit)}</p>
    </div>
`;
    containerTvItems.insertAdjacentHTML('beforeend', htmlTvItems);
  });
};

showAllUnits(inventory);

// button logic
document.querySelector('.btn-price').addEventListener('click', () => {
  sortPriceLowHigh();
  showAllUnits(inventory);
});

document
  .querySelector('.btn-ambilight')
  .addEventListener('click', () => showAllUnits(hasAmbilight()));

document
  .querySelector('.btn-soldout')
  .addEventListener('click', () => showAllUnits(soldOutItems()));
