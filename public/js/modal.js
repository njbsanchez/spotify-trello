/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

// you can access arguments passed to your iframe like so
window.fullscreen = t.arg('fullscreen');

const resizeButtonText = document.getElementById("resizeButtonText");
const resizeButton = document.getElementById("resizeButton");

t.render(function(){
  // this function we be called once on initial load
  // and then called each time something changes that
  // you might want to react to, such as new data being
  // stored with t.set()
  
  resizeButton.addEventListener("click", function(event) {
    event.preventDefault();
    t.updateModal({ 
      accentColor: '#'+Math.floor(Math.random()*16777215).toString(16),
      title: 'Updated Modal',
      fullscreen: !window.fullscreen
    });
    if (window.fullscreen) {
      // We can only sizeTo when fullscreen: false.
      t.sizeTo(document.body);  
    }
    window.fullscreen = !window.fullscreen;
    resizeButtonText.innerText = !window.fullscreen;
  });
  
});


document.body.addEventListener("dblclick", function(event) {
  t.popup({
    mouseEvent: event,
    url: './celebrate.html',
    title: '🎉 🎉 🎉 Well done! 🎉 🎉 🎉',
    args: { message: 'Nice double-click!' }
  })
})