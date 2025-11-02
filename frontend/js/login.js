document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;

    // **IMPORTANT:** Replace 'YOUR_STRAPI_URL' with your deployed backend URL (from Render)
    const apiUrl = 'https://strapi-backend-api-o2mz.onrender.com/api/auth/local';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store the JWT token to prove the user is logged in
            localStorage.setItem('jwt', data.jwt); 
            alert('Login successful! Welcome.');

            // REDIRECTION CHANGE: Redirect to the page inside the 'pages' folder
            window.location.href = 'rickandmorty.html'; 
        } else {
            alert(`Login Failed: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('A connection error occurred with the server.');
    }
});