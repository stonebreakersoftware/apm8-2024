// Firebase Config
var firebaseConfig = {
  apiKey: "AIzaSyC8XEM5zLr9SsfO5XI2W6Pzp5o5r2nxYU0",
  authDomain: "apm-8-keepers-2023-2024.firebaseapp.com",
  databaseURL: "https://apm-8-keepers-2023-2024-default-rtdb.firebaseio.com",
  projectId: "apm-8-keepers-2023-2024",
  storageBucket: "apm-8-keepers-2023-2024.appspot.com",
  messagingSenderId: "180005204991",
  appId: "1:180005204991:web:e36a0a87cbd15618e5edca"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to your database layer for league players
const leaguePlayersRef = firebase.database().ref('league_players');

// Fetch league players and populate dropdown
leaguePlayersRef.once('value', (snapshot) => {
    const data = snapshot.val();
    const select = document.getElementById('playerDropdown');
    select.innerHTML = ''; // Ensure the dropdown is empty before populating
    for (const league_player in data) {
        if (data.hasOwnProperty(league_player)) {
            let option = document.createElement('option');
            option.value = league_player;
            option.text = league_player; // Use the key as the name if appropriate
            select.appendChild(option);
        }
    }
});

function savePlayerName() {
    const selector = document.getElementById('playerDropdown');
    const passwordInput = document.getElementById('adminPassword');
    const league_player = selector.value;
    
    // Simple password check for Bradley
    if (league_player === "Bradley" && passwordInput.value !== "midas") { // Replace 'yourpassword' with your actual password
        alert('Incorrect password for Bradley. Please try again.');
        return;
    }

    if (league_player) {
        sessionStorage.setItem('selectedPlayer', league_player);
        window.location.href = 'hud.html';  // Redirect to the main page after selection
    } else {
        alert('Please select a name before confirming!');
    }
}

function checkIfAdmin(league_player) {
    const passwordInput = document.getElementById('adminPassword');
    if (league_player === "Bradley") {
        passwordInput.style.display = 'block'; // Show the password field for Bradley
    } else {
        passwordInput.style.display = 'none'; // Hide the password field for others
    }
}

