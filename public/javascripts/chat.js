
var Users = [];
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("createRoom");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modals
if(btn) {
    btn.addEventListener('click', event => {
        modal.style.display = "block";
    
    }) 
}


// When the user clicks on <span> (x), close the modal
if(span) {
    span.addEventListener('click', event => {
        modal.style.display = "none";
      })
}


// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', event => {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target.id == "modalSQL") {
    document.getElementById("modalSQL").style.display = "none";
  }
})

function mod() {

  document.getElementById('modalSQL').style.display = "block";
  var id = event.currentTarget.value;
  fetch('/users/' + id, {
      method: 'get',
      headers: {
          'Accept': 'application/json'
      }
  })
      .then(function (r) { return r.json() })
      .then(function (response) {
          if (response.status) {
              document.getElementById('updateId').value = response.result._id;
              document.getElementById('updateTitle').value = response.result.title;
              document.getElementById('updatePrivate').value = response.result.private;
              // document.getElementById('updateUsers').value = response.resultUser;

              Users = response.resultUser;
          } else {
              alert(response.message || 'Une erreur est survenue');
          }
      })
}


function del() {
  fetch('/users/' + event.target.value, {
      method: 'delete',
      headers: {
          'Accept': 'application/json'
      }
  })
      .then(function (r) { return r.json() })
      .then(function (response) {
          if (response.status) {
              document.location.reload();
          } else {
              alert(response.message || 'Une erreur est survenue');
          }
      })
}
