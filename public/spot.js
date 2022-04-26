$(function() {  
  $('form').submit(function(event) {
    event.preventDefault();
    
    let query = $('input').val();
    let context = $('input[name="context"]:checked').val();
    
    $.get('/search?' + $.param({context: context, query: query}), function(data) {
      $('input[type="text"]').val('');
      $('input').focus();
      
      document.getElementById('results').innerHTML = data.tracks.items.map(track => {
        return `<tr><td style="padding-bottom:10px">${track.name} | ${track.artists[0].name}</td><td><button type='button' onClick="saveData(this)" id="${track.id}" data-id="${track.id}">Pin</button></td></tr>`;
      }).join('\n');
    });
    
  });

});



    
