const rootURLMotorbikes = "http://localhost/motorbikes/motorbikes/api/motorbikes";

console.log("Fetching motorbikes...");
$.ajax({
    type: 'GET',
    url: rootURLMotorbikes,
    dataType: 'json',
    success: function (data) {
        console.log("Motorbike data received:", data); // Log the response
        renderMotorbikeList(data);
    },
    error: function (xhr, status, error) {
        console.error("Error fetching motorbikes:", status, error);
    }
});



const deleteMotorbike = (id) => {
    // Confirm before deletion
    if (confirm("Are you sure you want to delete this motorbike?")) {
        $.ajax({
            type: 'DELETE', // HTTP method
            url: `${rootURLMotorbikes}/${id}`, // URL to delete endpoint
            success: () => {
                alert("Motorbike deleted successfully.");
                findAllMotorbikes(); // Refresh the list after deletion
            },
            error: (xhr, status, error) => {
                console.error("Error deleting motorbike:", status, error);
                alert("Failed to delete motorbike.");
            },
        });
    }
};

const editMotorbike = (id) => {
    console.log("Edit button clicked for motorbike ID:", id); // Add this log
    // Fetch the motorbike details by ID
    $.ajax({
        type: 'GET',
        url: `${rootURLMotorbikes}/${id}`,
        dataType: 'json',
        success: (data) => {
            // Prefill the form
            console.log("Motorbike details fetched:", data); // Add this log
            $('#editMotorbikeId').val(data.id);
            $('#editMotorbikeName').val(data.name);
            $('#editMotorbikeMake').val(data.make);
            $('#editMotorbikeModel').val(data.model);
            $('#editMotorbikeYear').val(data.year);
            $('#editMotorbikeColour').val(data.colour);
            $('#editMotorbikeType').val(data.type);
            $('#editMotorbikeCC').val(data.cc);
            $('#editMotorbikeModal').modal('show');
        },
        error: (xhr, status, error) => {
            console.error("Error fetching motorbike details:", status, error);
            alert("Failed to fetch motorbike details.");
        },
    });
};


const updateMotorbike = () => {
    const updatedBike = {
        id: $('#editMotorbikeId').val(),
        name: $('#editMotorbikeName').val(),
        make: $('#editMotorbikeMake').val(),
        model: $('#editMotorbikeModel').val(),
        year: $('#editMotorbikeYear').val(),
        colour: $('#editMotorbikeColour').val(),
        type: $('#editMotorbikeType').val(),
        cc: $('#editMotorbikeCC').val(),
    };

    // Send the updated motorbike details
    $.ajax({
        type: 'PUT',
        url: `${rootURLMotorbikes}/${updatedBike.id}`,
        contentType: 'application/json',
        data: JSON.stringify(updatedBike),
        success: () => {
            alert("Motorbike updated successfully.");
            findAllMotorbikes(); // Refresh the motorbike list
            $('#editMotorbikeModal').modal('hide');
        },
        error: (xhr, status, error) => {
            console.error("Error updating motorbike:", status, error);
            alert("Failed to update motorbike.");
        },
    });
};

const findAllMotorbikes = () => {
    $.ajax({
        type: 'GET',
        url: rootURLMotorbikes,
        dataType: 'json',
        success: renderMotorbikeList,
    });
};

const renderMotorbikeList = (data) => {
    const motorbikesList = data.motorbikes;
    $('#motorbikes-table-body').empty();

    motorbikesList.forEach((bike) => {
        $('#motorbikes-table-body').append(`
            <tr>
                <td>${bike.name}</td>
                <td>${bike.make}</td>
                <td>${bike.model}</td>
                <td>${bike.year}</td>
                <td>${bike.colour}</td>
                <td>${bike.type}</td>
                <td>${bike.cc}</td>
                <td>
                    <button class="btn btn-warning edit-btn" data-id="${bike.id}">Update</button>
                    <button class="btn btn-danger delete-btn" data-id="${bike.id}">Delete</button>
                </td>
            </tr>
        `);
    });

    if ($.fn.DataTable.isDataTable('#motorbikes-table')) {
        $('#motorbikes-table').DataTable().destroy();
    }
    $('#motorbikes-table').DataTable({
        search: {
            search: '', // Optional: Prepopulate the search box
        },
    });

    // Bind button click events after re-rendering
    $('.edit-btn').on('click', function () {
        const id = $(this).data('id');
        editMotorbike(id);
    });

    $('.delete-btn').on('click', function () {
        const id = $(this).data('id');
        deleteMotorbike(id);
    });
};




const addMotorbike = () => {
    const newBike = {
        name: $('#addMotorbikeName').val(),
        make: $('#addMotorbikeMake').val(),
        model: $('#addMotorbikeModel').val(),
        year: $('#addMotorbikeYear').val(),
        colour: $('#addMotorbikeColour').val(),
        type: $('#addMotorbikeType').val(),
        cc: $('#addMotorbikeCC').val(),
    };

    $.ajax({
        type: 'POST',
        url: rootURLMotorbikes,
        contentType: 'application/json',
        data: JSON.stringify(newBike),
        success: () => {
            findAllMotorbikes();
            $('#addMotorbikeModal').modal('hide');
        },
    });
};




// Initialize
$(document).ready(() => {
    findAllMotorbikes();
});
