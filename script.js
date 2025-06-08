document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('userContainer');
    const errorContainer = document.getElementById('errorContainer');
    const reloadBtn = document.getElementById('reloadBtn');

    // Initial fetch
    fetchUserData();

    // Add event listener for reload button
    reloadBtn.addEventListener('click', fetchUserData);

    function fetchUserData() {
        // Show loading state
        userContainer.innerHTML = '<p class="loading">Loading user data...</p>';
        errorContainer.style.display = 'none';

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(users => {
                displayUsers(users);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                showError(error);
            });
    }

    function displayUsers(users) {
        userContainer.innerHTML = '';

        if (users.length === 0) {
            userContainer.innerHTML = '<p class="loading">No users found.</p>';
            return;
        }

        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';

            const userName = document.createElement('h2');
            userName.className = 'user-name';
            userName.textContent = user.name;

            const userEmail = document.createElement('p');
            userEmail.className = 'user-email';
            userEmail.textContent = user.email;

            const userAddress = document.createElement('p');
            userAddress.className = 'user-address';
            userAddress.textContent = formatAddress(user.address);

            userCard.appendChild(userName);
            userCard.appendChild(userEmail);
            userCard.appendChild(userAddress);

            userContainer.appendChild(userCard);
        });
    }

    function formatAddress(address) {
        return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
    }

    function showError(error) {
        userContainer.innerHTML = '';
        errorContainer.style.display = 'block';
        errorContainer.textContent = `Failed to load user data: ${error.message || 'Network error'}`;
        
        // Create a default offline user card
        const offlineCard = document.createElement('div');
        offlineCard.className = 'user-card';
        
        const offlineName = document.createElement('h2');
        offlineName.className = 'user-name';
        offlineName.textContent = 'Offline Mode';
        
        const offlineMessage = document.createElement('p');
        offlineMessage.textContent = 'You are currently offline. Please check your internet connection and try again.';
        
        offlineCard.appendChild(offlineName);
        offlineCard.appendChild(offlineMessage);
        userContainer.appendChild(offlineCard);
    }
});