/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// want to know when you are being closed?
window.addEventListener('unload', function(e) {
  // Our board bar is being closed, clean up if we need to
  console.log('In before unload event');
});

const button = document.getElementById('navigate');
button.addEventListener('click', function(event){
  t.navigate({
    url: 'https://trello.com/c/nqPiDKmw/9-grand-canyon-national-park'
  });
})

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
});
