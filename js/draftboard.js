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
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function() {
    const league_player = sessionStorage.getItem('selectedPlayer');
    if (!league_player) {
        window.location.href = 'index.html';  // Redirect back if no league player name is set
    } else {
        console.log('Session for:', league_player);
        fetchAndDisplayDraftPicks();
    }
});

function fetchAndDisplayDraftPicks() {
    const draftBoardRef = firebase.database().ref('draft_board');
    draftBoardRef.on('value', snapshot => {
        const rounds = snapshot.val();
        if (!rounds) {
            console.log('No draft data available.');
            return; // Exit if no data
        }
        const sortedRounds = Object.keys(rounds).sort(compareRounds); // Sort rounds first

        const tableBody = document.getElementById('draftTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Clear existing entries before repopulating

        sortedRounds.forEach(round => {
            const players = rounds[round];
            const sortedPlayers = Object.values(players).sort((a, b) => {
                return a.full_name.split(" ").pop().localeCompare(b.full_name.split(" ").pop()); // Sort by player last name within each round
            });

            sortedPlayers.forEach(nfl_player => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${round}</td>
                                <td>${nfl_player.full_name}</td>
                                <td>${nfl_player.position}</td>
                                <td>${nfl_player.team}</td>
                                <td>${nfl_player.league_player_who_selected_them}</td>`;
                tableBody.appendChild(tr);
            });
        });
    });
}


function compareRounds(a, b) {
    const roundANumber = parseFloat(a.split(" ")[1]);
    const roundBNumber = parseFloat(b.split(" ")[1]);
    return roundANumber - roundBNumber;
}
