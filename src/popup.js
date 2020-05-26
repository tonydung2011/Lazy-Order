'use strict';

import './popup.css';

(function() {
  const rating = document.getElementById('now-rating').value;
  const button = document.getElementById('action-button');
  button.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];

      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'SELECT_FOOD',
          payload: {
            rating: rating,
          },
        },
        response => {
          console.log('Current count value passed to contentScript file');
        }
      );
    });
  })
})();