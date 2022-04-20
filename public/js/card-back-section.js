/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;
var t = TrelloPowerUp.iframe(); t.sizeTo(document.body)

// const buttons = document.getElementsByTagName("button")

// // https://developers.trello.com/reference#t-sizeto
// const sizeToMap = {
//   "document": document.body, // A DOM element that will be measured and we will use the height of
//   "btn-content": "#content", // A DOM query selector that will select the node to measure and use the height of
//   "five-hundred": 500 // A positive number that will be used directly for the height
// };

// for (let buttonEl of buttons) {
//   buttonEl.addEventListener("click", function(e) {
//     t.sizeTo(sizeToMap[e.target.id]);
//   })
// };