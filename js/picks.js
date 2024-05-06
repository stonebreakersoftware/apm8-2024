const firebaseConfig = {
    apiKey: "AIzaSyC8XEM5zLr9SsfO5XI2W6Pzp5o5r2nxYU0",
    authDomain: "apm-8-keepers-2023-2024.firebaseapp.com",
    databaseURL: "https://apm-8-keepers-2023-2024-default-rtdb.firebaseio.com",
    projectId: "apm-8-keepers-2023-2024",
    storageBucket: "apm-8-keepers-2023-2024.appspot.com",
    messagingSenderId: "180005204991",
    appId: "1:180005204991:web:e36a0a87cbd15618e5edca"
  };

// Initialize Firebase (ensure firebaseConfig is defined or imported)
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function() {
    const league_player = sessionStorage.getItem('selectedPlayer');
    if (!league_player) {
        window.location.href = 'index.html';  // Redirect back if no league player name is set
    } else {
        console.log('Session for:', league_player);
        document.getElementById('picksTitle').textContent = `${league_player}'s Draft Picks`; // Set the title to use the league player's name

        const picksRef = firebase.database().ref(`league_players/${league_player}/draft_picks`);
        picksRef.on('value', function(snapshot) {
            const data = snapshot.val();
            if (!data) {
                console.log('No picks data available.');
                return; // Exit if no data
            }

            const tableBody = document.getElementById('picksTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear existing rows before repopulating

            Object.keys(data).sort(compareRounds).forEach(round => {  // Sort rounds
                const players = data[round];
                Object.values(players).sort((a, b) => {
                    return a.full_name.split(" ").pop().localeCompare(b.full_name.split(" ").pop());  // Sort by last name within each round
                }).forEach((nfl_player, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${round}</td><td>${nfl_player.full_name}</td><td>${nfl_player.position}</td><td>${nfl_player.team}</td>`;
                    tableBody.appendChild(row);
                });
            });
        });
    }
});

// Helper function to compare round strings correctly (e.g., "Round 1" vs "Round 2.1")
function compareRounds(a, b) {
    const roundANumber = parseFloat(a.split(" ")[1]);
    const roundBNumber = parseFloat(b.split(" ")[1]);
    return roundANumber - roundBNumber;
}




