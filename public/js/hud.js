const firebaseConfig = {
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
    const playerName = sessionStorage.getItem('selectedPlayer');
    if (!playerName) {
        window.location.href = 'index.html';  // Redirect back if no player name is set
    } else {
        // Continue loading the page with player-specific data
        console.log('Session for:', playerName);
        // Additional code to handle player-specific data loading
    }
});

// Fetch and display draft board
function loadDraftBoard() {
    const draftBoardRef = firebase.database().ref('draft_board/Round 1');
    draftBoardRef.on('value', snapshot => {
        const data = snapshot.val();
        const table = document.getElementById('draftBoardTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing entries
        Object.keys(data).forEach(key => {
            const entry = data[key];
            const row = document.createElement('tr');
            row.innerHTML = `<td>1</td><td>${entry.player.full_name}</td><td>${entry.player.position}</td><td>${entry.player.team}</td><td>${entry.league_player}</td>`;
            table.appendChild(row);
        });
    });
}

// Fetch and display player's picks
function loadPlayerPicks() {
    const leaguePlayer = localStorage.getItem('selectedPlayer');
    const picksRef = firebase.database().ref(`league_players/${leaguePlayer}/draft_picks`);
    picksRef.on('value', snapshot => {
        const data = snapshot.val();
        const table = document.getElementById('picksTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // Clear existing entries
        Object.keys(data).forEach((key, index) => {
            const pick = data[key];
            const row = document.createElement('tr');
            row.innerHTML = `<td>${index + 1}</td><td>${pick.full_name}</td><td>${pick.position}</td><td>${pick.team}</td>`;
            table.appendChild(row);
        });
    });
}

// Setup position buttons
document.querySelectorAll('#positionButtons button').forEach(button => {
    button.addEventListener('click', () => {
        const position = button.textContent;
        loadPlayersByPosition(position);
    });
});

// Load players by position into the dropdown
function loadPlayersByPosition(position) {
    const playersRef = firebase.database().ref('players');
    playersRef.orderByChild('position').equalTo(position).on('value', snapshot => {
        const data = snapshot.val();
        const select = document.getElementById('playerDropdown');
        select.innerHTML = ''; // Clear existing options
        Object.keys(data).forEach(key => {
            const player = data[key];
            const option = document.createElement('option');
            option.value = key;
            option.textContent = player.full_name || player.team || key;
            select.appendChild(option);
        });
    });
}

// Initial data loading
document.addEventListener('DOMContentLoaded', () => {
    loadDraftBoard();
    loadPlayerPicks();
});

function goToAdminPage() {
    window.location.href = 'admin.html'; // Redirects to the Admin page
}