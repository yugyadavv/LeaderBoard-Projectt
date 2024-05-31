document.addEventListener('DOMContentLoaded', () => {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const countryInput = document.getElementById('country');
    const scoreInput = document.getElementById('score');
    const addPlayerButton = document.getElementById('addPlayer');
    const leaderboard = document.getElementById('leaderboard');

    let players = [];

    addPlayerButton.addEventListener('click', () => {
        const firstName = firstNameInput.value;
        const lastName = lastNameInput.value;
        const country = countryInput.value;
        const score = parseInt(scoreInput.value);

        if (firstName && lastName && country && !isNaN(score)) {
            const player = {
                firstName,
                lastName,
                country,
                score,
                id: Date.now()
            };
            players.push(player);
            renderLeaderboard();
        }
    });

    function renderLeaderboard() {
        leaderboard.innerHTML = '';
        players.sort((a, b) => b.score - a.score);
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card';
            playerCard.innerHTML = `
                <div>${player.firstName} ${player.lastName}</div>
                <div>${player.country}</div>
                <div>${player.score}</div>
                <div class="actions">
                    <button class="increase">+5</button>
                    <button class="decrease">-5</button>
                    <button class="delete">🗑️</button>
                </div>
            `;
            leaderboard.appendChild(playerCard);

            playerCard.querySelector('.increase').addEventListener('click', () => {
                player.score += 5;
                renderLeaderboard();
            });

            playerCard.querySelector('.decrease').addEventListener('click', () => {
                player.score -= 5;
                renderLeaderboard();
            });

            playerCard.querySelector('.delete').addEventListener('click', () => {
                players = players.filter(p => p.id !== player.id);
                renderLeaderboard();
            });
        });
    }
});
