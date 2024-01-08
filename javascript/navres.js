const x = document.querySelector('#X');
const ham = document.querySelector('#Hamburger');
let open = false;
ham.addEventListener("click", opencol);
x.addEventListener("click", opencol);
function opencol(){
  ham.classList.toggle("hidden")
  x.classList.toggle("hidden");
  open= !(open);
  if (open){
    document.getElementById("navLinks").style.width = "80vw";
    document.body.style.overflow="hidden";
    document.getElementById("content").classList.toggle("blurred");
  }else{
    document.getElementById("navLinks").style.width = "0vw";
    document.body.style.overflow="visible";
    document.getElementById("content").classList.toggle("blurred");

  }

}