// document.addEventListener("DOMContentLoaded", function () {
//     const loader = document.getElementById("loader");
//     const userInfo = document.getElementById("user-info");
//     const repositoryList = document.getElementById("repository-list");
//     const pagination = document.getElementById("pagination");

//     const username = "johnpapa"; // Replace with the desired GitHub username
//     const perPage = 10;

//     // Function to fetch user information from GitHub API
//     const fetchUserInfo = async () => {
//         loader.style.display = "block";

//         try {
//             const response = await fetch(`https://api.github.com/users/${username}`);
//             const userData = await response.json();

//             userInfo.innerHTML = `
//                 <img src="${userData.avatar_url}" alt="${userData.login} avatar">
//                 <h2>${userData.name}</h2>
//                 <p>${userData.bio}</p>
//             `;
//         } catch (error) {
//             console.error("Error fetching user information", error);
//         }
//     };

//     // Function to fetch repositories from GitHub API
//     const fetchRepositories = async (page) => {
//         repositoryList.innerHTML = "";

//         try {
//             const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
//             const data = await response.json();

//             data.forEach((repo) => {
//                 const listItem = document.createElement("li");
//                 listItem.innerHTML = `
//                     <h3>${repo.name}</h3>
//                     <p>${repo.description || "No description available"}</p>
//                     <p>Language: ${repo.language || "Not specified"}</p>
//                 `;
//                 repositoryList.appendChild(listItem);
//             });

//             // TODO: Implement pagination logic
//             // You may need to calculate the total number of pages and create pagination buttons.
//         } catch (error) {
//             console.error("Error fetching repositories", error);
//         } finally {
//             loader.style.display = "none";
//         }
//     };

//     // TODO: Implement pagination event listeners

//     // Initial fetch for user information and repositories
//     fetchUserInfo();
//     fetchRepositories(1);
// });


document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById("loader");
    const userInfo = document.getElementById("user-info");
    const repositoryList = document.getElementById("repository-list");
    const pagination = document.getElementById("pagination");
    const searchInput = document.getElementById("username");
    const searchButton = document.getElementById("search-btn");

    const perPage = 10;

    // Function to fetch user information from GitHub API
    const fetchUserInfo = async (username) => {
        loader.style.display = "block";

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const userData = await response.json();

            userInfo.innerHTML = `
                <img src="${userData.avatar_url}" alt="${userData.login} avatar">
                <h2>${userData.name}</h2>
                <p>${userData.bio}</p>
            `;

            // Fetch repositories for the entered username
            fetchRepositories(username, 1);
        } catch (error) {
            console.error("Error fetching user information", error);
            loader.style.display = "none";
        }
    };

    // Function to fetch repositories from GitHub API
    const fetchRepositories = async (username, page) => {
        repositoryList.innerHTML = "";

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
            const data = await response.json();

            if (data.length === 0) {
                repositoryList.innerHTML = "<p>No repositories found for this user.</p>";
            } else {
                data.forEach((repo) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || "No description available"}</p>
                        <p>Language: ${repo.language || "Not specified"}</p>
                    `;
                    repositoryList.appendChild(listItem);
                });
            }

            // TODO: Implement pagination logic
            // You may need to calculate the total number of pages and create pagination buttons.
        } catch (error) {
            console.error("Error fetching repositories", error);
        } finally {
            loader.style.display = "none";
        }
    };

    // Event listener for search button click
    searchButton.addEventListener("click", () => {
        const enteredUsername = searchInput.value.trim();
        if (enteredUsername !== "") {
            fetchUserInfo(enteredUsername);
        }
    });

    // TODO: Implement pagination event listeners

    // Initial fetch for user information and repositories (default username)
    fetchUserInfo("johnpapa");
});
