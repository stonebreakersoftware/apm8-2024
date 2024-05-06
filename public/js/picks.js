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
        // Continue loading the page with league player-specific data
        console.log('Session for:', league_player);

        // Move Firebase reference setup and data fetching inside this scope
        const picksRef = firebase.database().ref(`league_players/${league_player}/draft_picks`);
        picksRef.on('value', function(snapshot) {
            const picks = snapshot.val();
            const tableBody = document.getElementById('picksTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';  // Clear existing rows

            Object.keys(picks).forEach((key, index) => {
                const nfl_player = picks[key];
                const row = document.createElement('tr');
                row.innerHTML = `<td>${index + 1}</td><td>${nfl_player.full_name}</td><td>${nfl_player.position}</td><td>${nfl_player.team}</td>`;
                tableBody.appendChild(row);
            });
        });
    }
});



