'use strict';

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length & i<maxResults ; i++){
      $('#results-list').append(
        `<li><h3>${responseJson[i].name}</h3>
             <h3><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h3>
        </li>`
      )}; 
    $('#results').removeClass('hidden');
  };

function getRepo(candidateHandle, maxResults) {
    fetch(`https://api.github.com/users/${candidateHandle}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const candidateHandle = $('#js-candidate-github-handle').val();
        const maxResults = $('#js-max-results').val();
        getRepo(candidateHandle, maxResults);
     });
 }

 $(watchForm);