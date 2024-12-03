const rootURLUsers = "http://localhost/motorbikes/motorbikes/api/users";

// Fetch and render all users
const findAllUsers = () => {
    $.ajax({
        type: 'GET',
        url: rootURLUsers,
        dataType: 'json',
        success: renderUsersList,
        error: (xhr, status, error) => {
            console.error("Error fetching users:", xhr.responseText, status, error);
            alert("Failed to fetch users. Please check the server.");
        },
    });
};


const renderUsersList = (data) => {
    const usersList = data.users; // Get the list of users
    $('#users-table-body').empty(); // Clear the table body to avoid duplicate rows

    const imageBaseUrl = "http://localhost/motorbikes/motorbikes/images/"; // Base URL for images
    const defaultImage = "http://localhost/motorbikes/motorbikes/images/default.jpg"; // Placeholder for missing images

    // Loop through each user and render the table row
    usersList.forEach((user) => {
        const imageUrl = user.image ? `${imageBaseUrl}${user.image}` : defaultImage; // Use default image if none exists
        $('#users-table-body').append(`
            <tr>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>
                    <img src="${imageUrl}" alt="${user.name}" class="img-thumbnail" style="max-width: 50px;">
                </td>
                <td>
                    <button class="btn btn-warning edit-user" data-id="${user.id}">Edit</button>
                    <button class="btn btn-danger delete-user" data-id="${user.id}">Delete</button>
                    <button class="btn btn-info show-password" data-password="${user.password}">Show Password</button>
                </td>
            </tr>
        `);
    });

    // Reinitialize DataTables
    if ($.fn.DataTable.isDataTable('#users-table')) {
        $('#users-table').DataTable().destroy(); // Destroy the previous instance
    }

    $('#users-table').DataTable({
        pageLength: 10, // Default number of rows to display
        lengthMenu: [5, 10, 25, 50, 100], // Options for "Show Entries" dropdown
        ordering: true, // Enable sorting
        searching: true, // Enable search box
        info: true, // Enable "Showing X of Y entries"
        paging: true, // Enable pagination
    });

    // Bind Edit Button Clicks (Event Delegation)
    $('#users-table-body').on('click', '.edit-user', function () {
        const id = $(this).data('id');
        editUser(id); // Call the edit user function
    });

    // Bind Delete Button Clicks (Event Delegation)
    $('#users-table-body').on('click', '.delete-user', function () {
        const id = $(this).data('id');
        deleteUser(id); // Call the delete user function
    });

    // Bind Show Password Button Clicks (Event Delegation)
    $('#users-table-body').on('click', '.show-password', function () {
        const password = $(this).data('password');
        $('#userPasswordDisplay').text(`Password: ${password}`); // Set the password in the modal
        $('#showPasswordModal').modal('show'); // Show the modal
    });
};






// Add a new user
const addUser = () => {
    const newUser = {
        name: $('#addUserName').val(),
        username: $('#addUserUsername').val(),
        password: $('#addUserPassword').val(),
        image: $('#addUserImage').val(),
    };

    // Debugging: Log the payload
    console.log('Payload:', JSON.stringify(newUser));

    if (!newUser.name || !newUser.username || !newUser.password || !newUser.image) {
        alert('All fields are required!');
        return;
    }

    $.ajax({
        type: 'POST',
        url: rootURLUsers,
        contentType: 'application/json',
        data: JSON.stringify(newUser),
        success: () => {
            alert('User added successfully!');
            findAllUsers(); // Refresh the user list
            $('#addUserModal').modal('hide'); // Close modal
            $('#addUserForm')[0].reset(); // Clear form fields
        },
        error: (xhr, status, error) => {
            console.error('Error adding user:', xhr.responseText, status, error);
            alert(`Failed to add user: ${xhr.responseText}`);
        },
    });
};


// Bind the Add button to the addUser function
//$('#addUserModal .btn-primary').on('click', addUser);


// Bind the Add button to the addUser function


// Edit a user
const editUser = (id) => {
    $.ajax({
        type: 'GET',
        url: `http://localhost/motorbikes/motorbikes/api/users/${id}`, // Replace with your API endpoint
        dataType: 'json',
        success: (user) => {
            $('#editUserId').val(user.id);
            $('#editUserName').val(user.name);
            $('#editUserUsername').val(user.username);
            $('#editUserPassword').val(user.password); // Assuming you store the password in plaintext
            $('#editUserImage').val(user.image);
            $('#editUserModal').modal('show'); // Open modal
        },
        error: (xhr, status, error) => {
            console.error('Error fetching user:', status, error);
        },
    });
};


// Update user details
const updateUser = () => {
    const updatedUser = {
        id: $('#editUserId').val(),
        name: $('#editUserName').val(),
        username: $('#editUserUsername').val(),
        password: $('#editUserPassword').val(),
        image: $('#editUserImage').val(),
    };

    $.ajax({
        type: 'PUT',
        url: `http://localhost/motorbikes/motorbikes/api/users/${updatedUser.id}`, // Replace with your API endpoint
        contentType: 'application/json',
        data: JSON.stringify(updatedUser),
        success: () => {
            alert('User updated successfully!');
            findAllUsers(); // Refresh the user list
            $('#editUserModal').modal('hide'); // Close modal
        },
        error: (xhr, status, error) => {
            console.error('Error updating user:', status, error);
            alert('Failed to update user.');
        },
    });
};


// Delete a user
const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
        $.ajax({
            type: 'DELETE',
            url: `${rootURLUsers}/${id}`,
            success: () => {
                alert("User deleted successfully!");
                findAllUsers();
            },
            error: (xhr, status, error) => {
                console.error("Error deleting user:", status, error);
            },
        });
    }
};

// Initialize
$(document).ready(() => {
    findAllUsers();
});
