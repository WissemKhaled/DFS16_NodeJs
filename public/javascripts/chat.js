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