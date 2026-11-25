alert("you are here bruh!");

const users = [
    {
        name: "Jane Doe",
        gender: "Female",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=Jane"
    },
    {
        name: "John Doe",
        gender: "Male",
        avatar: "https://api.dicebear.com/9.x/bottts/svg?seed=John"
    }
];

let currentIndex = 0;

const nameEl = document.getElementById("userName");
const genderEl = document.getElementById("userGender");
const avatarEl = document.getElementById("avatar");

function renderUser(index){
    nameEl.textContent = users[index].name;
    genderEl.textContent = users[index].gender;
    avatarEl.src = users[index].avatar;
}

// --- Toggle User: still local, unchanged ---
document.getElementById("toggleBtn").addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? 1 : 0;
    renderUser(currentIndex);
});

// --- Random User: now pulls real data from randomuser.me ---
document.getElementById("randomBtn").addEventListener("click", () => {
    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];

            const fullName = `${user.name.first} ${user.name.last}`;
            const gender = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);

            nameEl.textContent = fullName;
            genderEl.textContent = gender;
            avatarEl.src = user.picture.large;
        })
        .catch(error => {
            console.error("Failed to fetch random user:", error);
            alert("Couldn't fetch a random user. Check your connection.");
        });
});

renderUser(currentIndex);