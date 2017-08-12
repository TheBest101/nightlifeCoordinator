$('document').ready(() => {
  const access_token = "ros9q5HsEh8cDMW4URinyW6FS9UryqIJRzJTZ1qhuCZxZ1KuZ5cFqLSibRbHYk4UPnSnuBWR5sFpD25huVr7XcuFvCi93iytQs1vXu2iY81rdqlQnIFPCEBGojiMWXYx";



  function search (location) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + access_token);

    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=bars&limit=50&location=${location}`, {
      headers: myHeaders
    }).then((res) => {
      return res.json();
    }).then((json) => {
      output.html('')
      json.businesses.forEach((obj) => {
        var name = obj.name + ''
        console.log(name)
        ajaxFunctions.ajaxRequest('GET', `${appUrl}/api?name=${name}`, (data) => {
          var html = `
            <div class="businesses row">
              <img src=${obj.image_url} class="thumbnail rounded float-left col-4"/>
              <div class="col-8">
                <button type="button" class="btn btn-primary" onclick="post('${name}')"><span id="${name}">${JSON.parse(data).people.length}</span> Going</button>
                <h2>${name}</h2>
              </div>
            </div>
          `
          output.append(html)
          console.log(typeof obj.name)
        })
      })
    });
  };

  if(typeof(Storage) !== "undefined"){
    console.log(localStorage.lastSearch)
    search(localStorage.lastSearch)
  }

  var searchBar = $('#input')
  var output = $('#output')
  var submitButton = $('#submit').click(() => {
    search(searchBar.val())
    localStorage.setItem("lastSearch", seachBar.val());
  })

})
function post(names) {
  ajaxFunctions.ajaxRequest('POST', `${appUrl}/api?name=${names}`, (data) => {
    var Data = JSON.parse(data)
    $(`[id='${names}']`).text(Data.people.length)
  })
}
