document.addEventListener('DOMContentLoaded', function() {

  var firstnameInput = document.getElementById("fname");
  var lastnameInput = document.getElementById("lname");
  var emailInput = document.getElementById("email");
  var phoneInput = document.getElementById("phno");
  var mainForm = document.getElementById("mainForm");
  var jobs = ["cash","bar","man"];

  var searchParams = new URLSearchParams(window.location.search);
  var selJob = searchParams.get("j");
  if(selJob != null){
    document.getElementById('job').selectedIndex = jobs.indexOf(selJob) + 1;
  }

    mainForm.addEventListener('submit', function(e) {
      e.preventDeafult();
    });

  var sizeInput = document.getElementById('fname');
  var height = 300;
  var width = 200;
  var origHeight = 300;
  var origWidth = 200;
  var maxWidth = 400;

  if (!window.matchMedia('(max-width: 1000px)').matches) {
    origHeight = 450;
    origWidth = 300;
    height = origHeight;
    width = origWidth;
    bobaContainer.style.width = width + "px";
    bobaContainer.style.height = height + "px";

    sizeInput.addEventListener('input', function () {
    var size = sizeInput.value.trim().length;

    if(size > (width-origWidth)/10){
      if(width < maxWidth){
        while(size > (width-origWidth)/10){
          width += 10;
          height += 15;
        }
      }
    }else{
      while(size < (width-origWidth)/8){
        width -= 8;
        height -= 12;
      }
    }
    bobaContainer.style.width = width + "px";
    bobaContainer.style.height = height + "px";

    if(size > 0){
      updateText(sizeInput.value,width,-1);
    }else{
      document.getElementById("flavorLabel").textContent = "Boba!";
    }
  });
  }else{
    width = 500;
  }

  function updateText(name, curWidth, flavor){
    var size;
    if(curWidth >= 360){
      size = "Large";
    }else if(curWidth >= 330){
      size = "Medium";
    }else{
      size = "Small";
    }
    if(flavor == -1){
      document.getElementById("flavorLabel").innerHTML = `${name}'s Boba:<br>Size ${size}`;
    }else{
      document.getElementById("flavorLabel").innerHTML = `${name}'s Boba:<br>Size ${size},<br>${flavor} Flavor `;
    }
  }

  var phoInput = document.getElementById('phno');
  var otherToppings = [];

  phoInput.addEventListener('input', function () {
    var phone = phoInput.value.trim();
    var phoneLength = phone.length;

    if(phoneLength < otherToppings.length){
      while(phoCount < otherToppings.length){
        otherToppings[otherToppings.length-1].remove();
        otherToppings.pop();
      }
    }else{
      queue.push("star")
      createTimer("star");

      queue.push("star")
      createTimer("star");
  }});

  var genderInput = document.getElementById('gender');

  genderInput.addEventListener('input', function () {
    changeStarColor();
  });

  var imgFile = "";

  function changeStarColor(){
    if(genderInput.value == 'male'){
      imgFile = "blueStar.svg";
    }else if(genderInput.value == 'female'){
      imgFile = "pinkStar.svg";
    }else if(genderInput.value == "other"){
      imgFile = "otherStar.svg";
    }else{
      imgFile = "";
    } if (imgFile != ""){
      otherToppings.forEach(element => {
      element.src=imgFile;
    });
  }
  }

  var toppingsInput = document.getElementById('email');
  var bobaCup = document.getElementById('bobaCup');
  var pearlsArray = [];

  toppingsInput.addEventListener('input', function () {
    var toppings = toppingsInput.value.trim();
    var pearlsCount = toppings.length;

    if(pearlsCount < pearlsArray.length){
      while(pearlsCount < pearlsArray.length){
        pearlsArray[pearlsArray.length-1].remove();
        pearlsArray.pop();
      }
    }else{
      queue.push("pearl")
      createTimer("pearl");
  }});

  var sugarInput = document.getElementById('lname');
  var sugarArray = [];
  var droppingPos = width-35;
  var droppedPos = [];
  var curHeight = -10;
  var curStoppingHeight = -150;
  var level = 1;

  sugarInput.addEventListener('input', function () {
    var sugar = sugarInput.value.trim();
    var sugarCount = sugar.length * 2;

    if(sugarCount < sugarArray.length){
      while(sugarCount < sugarArray.length){
        sugarArray[sugarArray.length-1].remove();
        sugarArray.pop();
      }
    }else{
        queue.push("sugar")
        createTimer("sugar");

        queue.push("sugar")
        createTimer("sugar");
      }
  });

var queue = [];
var running = false;
var interval;
function createTimer(type){
  if(queue.length>0 && !running){
    running = true;
    interval = setInterval(()=>{testing()},2000);
  }
}

function testing(){
  if(queue.length == 0){
    clearInterval(interval);
    running = false;
  }else{
    createThing(queue[0]);
    queue.shift();
  }
}

function createThing(type) {
    if (type === 'sugar') {
      var sugarCube = document.createElement('div');
      sugarCube.className = 'sugar-cube';
      sugarCube.style.left = (Math.floor(Math.random() * (width - 55)) + 30) + 'px';
      bobaCup.appendChild(sugarCube);
      sugarArray.push(sugarCube);
    } else if (type === 'star') {
      var randomTopping = document.createElement('img');

      randomTopping.src = 'blackstar.svg';
      randomTopping.className = 'star';
      randomTopping.style.left = (Math.floor(Math.random() * (width - 55)) + 30) + 'px';
      bobaCup.appendChild(randomTopping);
      otherToppings.push(randomTopping);
      changeStarColor();
    } else if (type === 'pearl') {
      var pearl = document.createElement('div');
      pearl.className = 'boba-pearls';
      pearl.style.left = (Math.floor(Math.random() * (width - 55)) + 30) + 'px';
      bobaCup.appendChild(pearl);
      pearlsArray.push(pearl);
    }
}

function checkCollisions() {
  for (var i = 0; i < pearlsArray.length; i++) {
    var bobaRect = pearlsArray[i].getBoundingClientRect();

    for (var j = 0; j < sugarArray.length; j++) {
      var sugarRect = sugarArray[j].getBoundingClientRect();

      if (
        bobaRect.right > sugarRect.left &&
        bobaRect.left < sugarRect.right &&
        bobaRect.bottom > sugarRect.top &&
        bobaRect.top < sugarRect.bottom
      ) {
        pearlsArray[i].style.animationPlayState = 'paused';
        sugarArray[j].style.animationPlayState = 'paused';
      }
    }
    for (var j = 0; j < otherToppings.length; j++) {
      var otherRect = otherToppings[j].getBoundingClientRect();

      if (
        bobaRect.right > otherRect.left &&
        bobaRect.left < otherRect.right &&
        bobaRect.bottom > otherRect.top &&
        bobaRect.top < otherRect.bottom
      ) {
        pearlsArray[i].style.animationPlayState = 'paused';
        otherToppings[j].style.animationPlayState = 'paused';
      }
    }
  }
  for (var i = 0; i < otherToppings.length; i++) {
    var otherRect = otherToppings[i].getBoundingClientRect();

    for (var j = 0; j < sugarArray.length; j++) {
      var sugarRect = sugarArray[j].getBoundingClientRect();

      if (
        otherRect.right > sugarRect.left &&
        otherRect.left < sugarRect.right &&
        otherRect.bottom > sugarRect.top &&
        otherRect.top < sugarRect.bottom
      ){
        otherToppings[i].style.animationPlayState = 'paused';
        sugarArray[j].style.animationPlayState = 'paused';
      }
    }
  }
}
setInterval(checkCollisions, 100);

  $('#phno').keyup(function() {
    var cleanedValue = '';
    for (var i = 0; i < phoneInput.value.length; i++) {
      if (!isNaN(parseInt(phoneInput.value[i], 10))) {
        cleanedValue += phoneInput.value[i];
      }else{
         document.getElementById("nextDetails").style.display="block";
        document.getElementById("nextDetails").textContent = "You cannot have varters in your phone number";
      }
    }
    phoneInput.value = cleanedValue;
});
  $('#phno').keydown(function() {
    var cleanedValue = '';
    for (var i = 0; i < phoneInput.value.length; i++) {
      if (!isNaN(parseInt(phoneInput.value[i], 10))) {
        cleanedValue += phoneInput.value[i];
      }else{
         document.getElementById("nextDetails").style.display="block";
        document.getElementById("nextDetails").textContent = "You cannot have varters in your phone number";
      }
    }
    phoneInput.value = cleanedValue;
  });

  var fieldset1 = document.getElementById("fieldset1");
  var fieldset2 = document.getElementById("fieldset2");
  var fieldset3 = document.getElementById("fieldset3");

  var current = 1;
  var nextButton = document.getElementById("nextButton");
  var prevButton = document.getElementById("prevButton");
  var submitButton = document.getElementById("submitButton");

  var submittedFirstName;
  var submittedLastName;
  var submittedEmail;
  var submittedPhone;
  var submittedJob;
  var submittedGender;
  var submittedDate;
  var submittedDescription;
  var submittedFile;

  nextButton.addEventListener('click',()=>{
    if(current == 1){
      fieldset1.style.transition = 'opacity 0.5s ease';
      fieldset1.style.opacity = '0';
      submittedFirstName = firstnameInput.value;
      submittedLastName = lastnameInput.value;
      submittedEmail = emailInput.value;
      submittedPhone = phoneInput.value;

      setTimeout(function () {
        fieldset1.style.display = 'none';
        fieldset2.style.display = 'block';
        fieldset2.style.transition = 'opacity 0.5s ease';
        fieldset2.style.opacity = '1';
        current = 2;
      }, 500);
    }
  });

  prevButton.addEventListener('click',()=>{
    if(current == 2){
      fieldset2.style.transition = 'opacity 0.5s ease';
      fieldset2.style.opacity = '0';

      setTimeout(function () {
        fieldset2.style.display = 'none'; 
        fieldset1.style.display = 'block';
        fieldset1.style.transition = 'opacity 0.5s ease';
        fieldset1.style.opacity = '1';
        current = 1;
      }, 500);
    }
  });

  var problem = "";
  var jobSelect = document.getElementById('job');
  var genderSelect = document.getElementById('gender');
  var dobInput = document.getElementById("dob");
  var description = document.getElementById("description");
  var fileInput = document.getElementById("resume");
  var submitDetails = document.getElementById('submitDetails')

  submitButton.addEventListener('click',(e)=>{
    submitDetails.innerHTML = "";
    problem = "";
    e.preventDefault();
    submittedJob = jobSelect.value;
    submittedGender = genderSelect.value;
    submittedDate = dobInput.value;
    submittedDescription = document.getElementById("description").value;
    submittedFile = fileInput.files[0];

      if(submittedFirstName == ""){
        problem += "First Name is required. <br>";
      }
       if(submittedLastName == ""){
        problem += "Last Name is required. <br>";
      }
       if(submittedEmail == ""){
        problem += "Email is required. <br>";
      }
       if(submittedPhone == ""){
        problem += "Phone Number is required. <br>";
      }
       if(submittedJob == "sel"){
        problem += "A job must be selected. <br>";
      }
       if(submittedGender == "sel"){
        problem += "A gender must be selected. <br>";
      }
       if(submittedDate == ""){
        problem += "Date of Birth is required. <br>";
      }
      if(submittedDescription == ""){
        problem += "Description is required. <br>";
      }
      if(submittedFile == null){
        problem += "A resume is required. <br>";
      }
      if(submittedFile != ""){
        submitDetails.innerHTML = problem + "<br>";
      }

          fieldset2.style.transition = 'opacity 0.5s ease';
          fieldset2.style.opacity = '0';

          setTimeout(function () {
            fieldset2.style.display = 'none';
            fieldset3.style.display = 'block';
            fieldset3.style.transition = 'opacity 0.5s ease';
            fieldset3.style.opacity = '1';
            current = 3;
          }, 500);

        console.log(submittedFirstName,
          submittedLastName,
          submittedEmail,
          submittedPhone,
          submittedJob,
          submittedGender,
          submittedDate,
          submittedDescription,
          submittedFile);
          mainForm.submit();

    });
});