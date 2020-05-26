'use strict';

function pickRandomFood(rate) {
  console.log('run pickup');
  
  const preConfigRate = {
      top: '999+',
      high: '500+',
      medium: '100+',
      low: '50+',
  };
  const defaultRate = preConfigRate.top;
  let newRate = rate && preConfigRate[rate] ? preConfigRate[rate] : defaultRate;
  const compareTable = {
      [preConfigRate.top]: 3,
      [preConfigRate.high]: 2,
      [preConfigRate.medium]: 1,
      [preConfigRate.low]: 0,
  }
  const collectionOption = document.getElementsByClassName('item-restaurant-row');
  const listOption = [].slice.call(collectionOption);
  const formattedListOption = listOption.map((value, index) => {
      return {
          name: value.getElementsByClassName('item-restaurant-name')[0].innerText,
          button: value.getElementsByClassName('adding-food-cart')[0],
          rate: value.getElementsByClassName('txt-bold')[0].innerText.trim(),
      }
  });
  const filterOption = [];
  formattedListOption.forEach(item => {
      if (compareTable[item.rate] && compareTable[item.rate] >= compareTable[newRate]) {
          filterOption.push(item);
      }
  });
  let randomIndex = Math.floor(Math.random() * filterOption.length);
  filterOption[randomIndex].button.click();
}

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
console.log('any mesaage', request);

  if (request.type === 'SELECT_FOOD') {
    console.log(`Current rating is ${request.payload.rating}`);
  }
  pickRandomFood(request.payload.rating);
  sendResponse({});
  return true;
});