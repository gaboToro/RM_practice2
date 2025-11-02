document.getElementById('registrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // **IMPORTANT:** Replace 'YOUR_STRAPI_URL' with your deployed backend URL (from Render)
    const apiUrl = 'https://strapi-backend-api-o2mz.onrender.com/api/auth/local/register';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } else {
            // Strapi error handling (e.g., email already exists)
            alert(`Registration Error: ${data.error.message}`);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('A connection error occurred with the server.');
    }
});