$(document).ready(function () {

    $('#getNewArticles').on('click', function () {
        $.get('/cbc').then(() => {
            window.location.reload();
        });
    })

    $('#getSavedArticles').on('click', function () {
        $.get('/saved').then(() => {
            window.location.reload();
        });
    })

    var API = {
        // Get a client info
        saveArticle: function (editedInfo) {
            axios.post('/api/save/' + editedInfo.id, editedInfo).then(function () {
                res.render("index");

            });
            // const data = await $.ajax({
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     type: "POST",
            //     url: "api/save/" + editedInfo.id,
            //     data: JSON.stringify(editedInfo)
            // });
            window.location.href = "/";
        },

    };

    var currentID = '';

    // User clicks "Leave comment"
    $(".leaveComment").on("click", function () {
        console.log("Opening comments modal for " + $(this).data("id"));

        currentID = $(this).data("id");

        // Display COMMENT modal
        $("#commentModal").modal({
            backdrop: "static",
            keyboard: false
        });

        $('#idInModal').text('ID: ' + currentID);
    });

    // Save an article
    $(".saveArticle").on("click", function () {

        var editedInfo = {
            id: $(this).data("id"),
            saved: true
        };

        console.log("Saving article with ID:" + editedInfo.id);

        $.put('/save/' + editedInfo.id, editedInfo.id).then(() => {
            window.location.reload();
        });

        // $.axios('/save/' + editedInfo.id, {
        //     type: 'POST',  // http method
        //     data: editedInfo,  // data to submit
        //     success: function () {
        //         console.log('saved successfully');
        //     },
        //     error: function (jqXhr, textStatus, errorMessage) {
        //         console.log('Error' + errorMessage);
        //     }
        // });

    });



});