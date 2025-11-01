const charactersContainer = document.getElementById('charactersContainer');
const searchInput = document.getElementById('searchInput');
const logoutButton = document.getElementById('logoutButton');
const RICK_AND_MORTY_API = 'https://rickandmortyapi.com/api/character';

// --- AUTHENTICATION CHECK (REQUIRED) ---
function checkAuthAndRedirect() {
    const token = localStorage.getItem('jwt');
    // If no token exists, redirect to login (page is in the same folder)
    if (!token) {
        alert("Access denied. Please log in.");
        window.location.href = 'login.html'; 
    }
}

// --- LOGOUT FUNCTIONALITY ---
logoutButton.addEventListener('click', () => {
    // Clear the stored token
    localStorage.removeItem('jwt');
    alert("You have been logged out successfully.");
    // Redirect to the login page (page is in the same folder)
    window.location.href = 'login.html';
});

// --- LIVE SEARCH UTILITY (Debounce) ---
let debounceTimeout;
function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
}

// --- DATA VISUALIZATION FIX & API CONSUMPTION ---

// Function to create and append a character container
function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    // IMPORTANT: Ensure correct property access for visualization
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="info">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Origin: ${character.origin.name}</p>
        </div>
    `;
    charactersContainer.appendChild(card);
}

// Function to fetch data from the external Rick and Morty API
async function fetchCharacters(name = '') {
    charactersContainer.innerHTML = 'Loading characters...';
    let url = RICK_AND_MORTY_API;

    if (name) {
        url += `?name=${encodeURIComponent(name)}`;
    }

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // If API returns 404 (No results found), display message
            charactersContainer.innerHTML = `No characters found matching "${name}".`;
            return;
        }

        const data = await response.json();

        charactersContainer.innerHTML = ''; 

        if (data.results && data.results.length > 0) {
            data.results.forEach(createCharacterCard);
        } else {
            charactersContainer.innerHTML = 'No characters found.';
        }
    } catch (error) {
        console.error('Error consuming the API:', error);
        charactersContainer.innerHTML = 'Error loading data from the external API. Check your network.';
    }
}

// --- LIVE SEARCH IMPLEMENTATION ---
searchInput.addEventListener('keyup', () => {
    // Search automatically after 300ms pause
    debounce(() => {
        const searchTerm = searchInput.value.trim();
        fetchCharacters(searchTerm);
    }, 300);
});

// --- INITIALIZATION ---
// 1. Check authentication first
checkAuthAndRedirect(); 

// 2. Load characters initially
// We only load them if checkAuthAndRedirect() didn't redirect the user
if (localStorage.getItem('jwt')) {
    fetchCharacters(); 
}