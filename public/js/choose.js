// Initialize Firebase (make sure your config is correct)
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

document.addEventListener('DOMContentLoaded', function() {
    const league_player = sessionStorage.getItem('selectedPlayer');
    if (!league_player) {
        window.location.href = 'index.html';  // Redirect back if no league player name is set
    } else {
        // Continue loading the page with league player-specific data
        console.log('Session for:', league_player);
        // Additional code to handle league player-specific data loading
    }
});

// Reference to the NFL players database layer
const nflPlayersRef = firebase.database().ref('players');
let allNflPlayers = [];

// Fetch all NFL players and store in allNflPlayers array
nflPlayersRef.once('value', (snapshot) => {
    allNflPlayers = snapshot.val() || [];
});

function filterPlayers(position) {
    const dropdown = document.getElementById('playerDropdown');
    dropdown.innerHTML = ''; // Clear existing options

    let playersArray = [];
    Object.keys(allNflPlayers).forEach(key => {
        const nfl_player = allNflPlayers[key];
        if (nfl_player.position === position) {
            playersArray.push({
                key: key, // Preserve the key
                name: nfl_player.full_name || nfl_player.team || key, // Name for display
                full_name: nfl_player.full_name,
                position: nfl_player.position,
                team: nfl_player.team
            });
        }
    });

    // Sort by last name extracted from full name
    playersArray.sort((a, b) => {
        let aLastName = a.name.split(' ').pop();
        let bLastName = b.name.split(' ').pop();
        return aLastName.localeCompare(bLastName);
    });

    // Populate dropdown with sorted data
    playersArray.forEach(nfl_player => {
        let option = document.createElement('option');
        option.value = nfl_player.key; // Use the preserved key here
        option.text = nfl_player.name;
        dropdown.appendChild(option);
    });
}

function confirmSelection() {
    const dropdown = document.getElementById('playerDropdown');
    const selectedNflPlayerKey = dropdown.value;
    const selectedNflPlayer = allNflPlayers[selectedNflPlayerKey];
    const league_player = sessionStorage.getItem('selectedPlayer');
    console.log("League Player Retrieved:", league_player); // Check retrieval

    if (!selectedNflPlayer || !league_player) {
        console.error("NFL player or league player data is missing.");
        return;
    }

    const playerData = {
        full_name: selectedNflPlayer.full_name,
        position: selectedNflPlayer.position,
        team: selectedNflPlayer.team,
        league_player_who_selected_them: league_player  // This includes the league player within the NFL player's data
    };

    // Determine current round dynamically or set statically if needed
    const currentRound = "Round 1";  // This should be dynamically determined based on your app's logic

    // Update the draft board for the current round with the new player pick
    const draftBoardRef = firebase.database().ref(`draft_board/${currentRound}/${selectedNflPlayerKey}`);
    draftBoardRef.set(playerData);

    // Optionally update league_players node if needed to track picks per league player
    const leaguePlayerRef = firebase.database().ref(`league_players/${league_player}/draft_picks/${selectedNflPlayerKey}`);
    leaguePlayerRef.set(playerData);

    // Simplify selected_players update to flag that this player is selected
    const selectedPlayersRef = firebase.database().ref('selected_players');
    selectedPlayersRef.child(selectedNflPlayerKey).set(true);

    alert('Selection confirmed!');
}







