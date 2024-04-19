// 🧞🧞🧞 Variable 🧞🧞🧞
let result = document.querySelector('.my-bmi')
let btn = document.querySelector('.launch')
let poidsInput = document.getElementById('poids');
let tailleInput = document.getElementById('taille');
let popup = document.querySelector('.welcome')
let message = document.querySelector('.message')
let dailyWeight = document.querySelector('.daily-weigh')
let filter = document.querySelector('.filter');
let prenomInput = document.getElementById('prenom'); 
let ageInput = document.getElementById('age'); 
let lastWeightSpan = document.querySelector('.last-weight span');
let resetButton = document.querySelector('.reset');
let newWeightInput = document.querySelector('.new-weight-input');

// 🐲🐲🐲 Functionz 🐲🐲🐲

// Function to check if user information exists in local storage
function userInfoExists() {
    return localStorage.getItem('userInfo') !== null;
}

// Function to save user information to local storage
function saveUserInfo() {
    let userInfo = {
        prenom: prenomInput.value,
        age: ageInput.value,
        poids: poidsInput.value,
        taille: tailleInput.value
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// Function to load user information from local storage
function loadUserInfo() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        prenomInput.value = userInfo.prenom;
        ageInput.value = userInfo.age;
        poidsInput.value = userInfo.poids;
        tailleInput.value = userInfo.taille;
    }
}
  // Load user info when the page loads
  loadUserInfo();

  // Open the popup only if there's no previous information
  if (!userInfoExists()) {
      popup.style.display = "none";
  }

// 🧚🏼🧚🏼🧚🏼 Eventz 🧚🏼🧚🏼🧚🏼

// Event listener for the launch button
btn.addEventListener('click', function() {
    console.log("Button clicked");
    let poidsValue = parseFloat(poidsInput.value);
    let tailleValue = parseFloat(tailleInput.value);
    if (!isNaN(poidsValue) && !isNaN(tailleValue) && prenomInput.value && ageInput.value) {
        // Calculate BMI
        let bmi = poidsValue / ((tailleValue / 100) ** 2);
        let bmiCategory;
        let bmiPhrase;
        if (bmi > 40) {
            bmiCategory = "obesite-morbide";
            bmiPhrase = "Vous êtes en obésité morbide";
        } else if (bmi > 30) {
            bmiCategory = "obesite";
            bmiPhrase = "Vous êtes obèse";
        } else if (bmi > 25) {
            bmiCategory = "surpoids";
            bmiPhrase = "Vous êtes en surpoids";
        } else if (bmi > 18.5) {
            bmiCategory = "normal";
            bmiPhrase = "Vous avez un poids normal";
        } else {
            bmiCategory = "maigreur";
            bmiPhrase = "Vous êtes maigre";
        }
        
        // Update BMI in the DOM
        let myBmiDiv = document.querySelector('.my-bmi');
        myBmiDiv.textContent = bmi.toFixed(2);
        // Remove all previous BMI category classes
        myBmiDiv.classList.remove('maigreur', 'normal', 'surpoids', 'obesite', 'obesite-morbide');
        // Add current BMI category class
        myBmiDiv.classList.add(bmiCategory);
        
        // Update BMI category and phrase in the DOM
        let bmiSentencesDiv = document.querySelector('.bmi-sentences');
        bmiSentencesDiv.textContent = bmiPhrase;
        
        // Close the welcome popup
        popup.style.display = "none";

        // Remove the filter class
        filter.classList.remove('filter');

        // Calculate age based on date of birth
        let birthDate = new Date(ageInput.value);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Save user info to local storage
        saveUserInfo();

        // Add prenom and age to the first h1 element in myapp
        let myappH1 = document.querySelector('.myapp h1');
        myappH1.innerHTML = `Hello ${prenomInput.value}, <span>Vous avez ${age} ans</span>`;
        
        // Add weight to the last-weight span
        lastWeightSpan.textContent = `${poidsInput.value} kg`;
    } else {
        
        highlightEmptyFields();
    }
});

// Event listener for the new-weight-input field
newWeightInput.addEventListener('input', function() {
    let newWeightValue = parseFloat(newWeightInput.value);
    if (!isNaN(newWeightValue)) {
        lastWeightSpan.textContent = `${newWeightValue.toFixed(1)} kg`;

        // Calculate BMI based on new weight
        let tailleValue = parseFloat(tailleInput.value);
        if (!isNaN(tailleValue) && prenomInput.value && ageInput.value) {
            let bmi = newWeightValue / ((tailleValue / 100) ** 2);
            let bmiCategory;
            let bmiPhrase;
            if (bmi > 40) {
                bmiCategory = "obesite-morbide";
                bmiPhrase = "Vous êtes en obésité morbide";
            } else if (bmi > 30) {
                bmiCategory = "obesite";
                bmiPhrase = "Vous êtes obèse";
            } else if (bmi > 25) {
                bmiCategory = "surpoids";
                bmiPhrase = "Vous êtes en surpoids";
            } else if (bmi > 18.5) {
                bmiCategory = "normal";
                bmiPhrase = "Vous avez un poids normal";
            } else {
                bmiCategory = "maigreur";
                bmiPhrase = "Vous êtes maigre";
            }

            // Update BMI in the DOM
            let myBmiDiv = document.querySelector('.my-bmi');
            myBmiDiv.textContent = bmi.toFixed(2);
            // Remove all previous BMI category classes
            myBmiDiv.classList.remove('maigreur', 'normal', 'surpoids', 'obesite', 'obesite-morbide');
            // Add current BMI category class
            myBmiDiv.classList.add(bmiCategory);

            // Update BMI category and phrase in the DOM
            let bmiSentencesDiv = document.querySelector('.bmi-sentences');
            bmiSentencesDiv.textContent = bmiPhrase;
        }
    }
});

// Function to highlight unfilled fields in red
function highlightEmptyFields() {
    if (!prenomInput.value) {
        prenomInput.classList.add('error');
        message.innerHTML = `Merci de renseigner votre prenom`;
    } else {
        prenomInput.classList.remove('error');
    }
    if (!ageInput.value) {
        ageInput.classList.add('error');
        message.innerHTML = `Merci de renseigner votre age`;
    } else {
        ageInput.classList.remove('error');
    }
    if (!poidsInput.value) {
        poidsInput.classList.add('error');
        message.innerHTML = `Merci de renseigner votre poids`;
    } else {
        poidsInput.classList.remove('error');
    }
    if (!tailleInput.value) {
        tailleInput.classList.add('error');
        message.innerHTML = `Merci de renseigner votre taille`;
    } else {
        tailleInput.classList.remove('error');
    }
}



  // Event listener for the reset button
  resetButton.addEventListener('click', function() {
    // Clear local storage
    localStorage.clear();
    // Reload the page
    location.reload();
});

// Load user info when the page loads
loadUserInfo();