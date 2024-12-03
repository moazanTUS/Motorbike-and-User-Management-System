$(document).ready(function() {
    const apiUrl = "http://localhost/api"; // Adjust to your API URL

    // Initialize DataTable
    const motorbikesTable = $('#motorbikesTable').DataTable({
        ajax: {
            url: apiUrl + "/motorbikes",
            dataSrc: "motorbikes"
        },
        columns: [
            { data: "name" },
            { data: "make" },
            { data: "model" },
            { data: "year" },
            { 
                data: null,
                render: function(data, type, row) {
                    return `<button class="btn btn-primary btn-sm edit-btn" data-id="${row.id}">Edit</button>`;
                }
            }
        ]
    });

    // Open modal on edit button click
    $('#motorbikesTable').on('click', '.edit-btn', function() {
        const motorbikeId = $(this).data("id");
        $.get(apiUrl + "/motorbikes/" + motorbikeId, function(data) {
            $('#motorbikeId').val(data.id);
            $('#motorbikeName').val(data.name);
            $('#motorbikeMake').val(data.make);
            $('#motorbikeModel').val(data.model);
            $('#motorbikeYear').val(data.year);
            $('#motorbikeModal').modal('show');
        });
    });

    // Handle form submission
    $('#motorbikeForm').on('submit', function(e) {
        e.preventDefault();
        const motorbikeId = $('#motorbikeId').val();
        const updatedData = {
            name: $('#motorbikeName').val(),
            make: $('#motorbikeMake').val(),
            model: $('#motorbikeModel').val(),
            year: $('#motorbikeYear').val()
        };

        $.ajax({
            url: apiUrl + "/motorbikes/" + motorbikeId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedData),
            success: function() {
                $('#motorbikeModal').modal('hide');
                motorbikesTable.ajax.reload();
            }
        });
    });
});
