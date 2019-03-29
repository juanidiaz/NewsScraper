$(document).ready(function () {

    // Get new articles button is pressed
    $('#getNewArticles').on('click', function () {
        $.get('/cbc').then(() => {
            // window.location.href = "/";
            window.location.reload();
        });
    })

    // Show saved articles button is pressed
    $('#getSavedArticles').on('click', function () {
        $('#getNewArticles').hide();
        // $.get('/saved').then(() => {
        window.location.href = "/saved";
        // });
    })

    // Delete all articles button is pressed
    $('#deleteAllArticles').on('click', function () {
        let whereAmI = window.location.href;

        $.get('/delete').then(() => {
            window.location.href = whereAmI;
        });
    })

    // Add comment button is pressed
    $('#addComment').on('click', function () {

        let comment = $('#commentInput').val().trim();
        console.log('xxxxxxxxxx ' + currentID)

        $.ajax({
                method: "POST",
                url: '/comment/add',
                data: {
                    title: 'HERE',
                    comment: comment,
                    newsID: currentID
                }
            })
            // With that done
            .then(function () {
                window.location.reload();
            });
            
        $('#commentInput').val('');
        $("#commentModal").modal('hide');
    })

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

    // Save an article button is pressed
    $(".saveArticle").on("click", function () {

        var editedInfo = {
            id: $(this).data("id"),
            saved: true
        };

        $.ajax({
                method: "POST",
                url: "/save/" + editedInfo.id,
                data: editedInfo
            })
            // With that done
            .then(function () {
                window.location.reload();
            });

    });

    // UN-Save an article button is pressed
    $(".unsave").on("click", function () {

        var editedInfo = {
            id: $(this).data("id"),
            saved: false
        };

        $.ajax({
                method: "POST",
                url: "/save/" + editedInfo.id,
                data: editedInfo
            })
            // With that done
            .then(function () {
                window.location.reload();
            });

    });


});