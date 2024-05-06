// Function to initialize or reset the round
function initializeRound() {
    const roundRef = firebase.database().ref('current_round');
    roundRef.set("Round 1").then(() => {
        console.log("Round has been initialized to Round 1");
    }).catch((error) => {
        console.error("Failed to initialize the round:", error);
    });
}

function setRound() {
    const roundNumber = document.getElementById('roundNumber').value;
    const roundRef = firebase.database().ref('current_round');
    roundRef.set("Round " + roundNumber)
        .then(() => {
            console.log("Round has been set to:", roundNumber);
            alert("Round updated successfully to Round " + roundNumber);
        })
        .catch(error => {
            console.error("Failed to set the round:", error);
            alert("Failed to update the round.");
        });
}
