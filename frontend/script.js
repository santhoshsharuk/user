const BACKEND_URL = "/.netlify/functions"; // Netlify Functions Base URL

// Fetch and display users
async function fetchUsers() {
    const response = await fetch(`${BACKEND_URL}/getUsers`);
    const users = await response.json();
    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `${user.name} - ${user.age} - ${user.city} 
        <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>`;
        userList.appendChild(li);
    });
}

// Add user
async function addUser() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const city = document.getElementById("city").value;

    if (!name || !age || !city) {
        alert("All fields are required!");
        return;
    }

    await fetch(`${BACKEND_URL}/addUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, city })
    });

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";

    fetchUsers();
}

// Delete user
async function deleteUser(userId) {
    await fetch(`${BACKEND_URL}/deleteUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId })
    });
    fetchUsers();
}

// Fetch users on page load
fetchUsers();
