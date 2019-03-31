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
        window.location.href = "/saved";
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
    
        $.ajax({
                method: "POST",
                url: '/comment/add',
                data: {
                    title: $('#titleInput').val().trim(),
                    comment: $('#commentInput').val().trim(),
                    newsID: currentID
                }
            })
            // With that done
            .then(function () {
                window.location.reload();
            });

            $('#titleInput').val('');
            $('#commentInput').val('');
            $("#commentModal").modal('hide');
    })

    var currentID = '';

    // User clicks "Leave comment"
    $(".leaveComment").on("click", function () {
        console.log("Opening comments modal for " + $(this).data("id"));
        $("#allComments").html('');

        currentID = $(this).data("id");

        $.get('/comment/' + currentID)
            .then((comments) => {
                console.log(comments)

                comments.forEach(comment => {
                    let $oldComment = $('<div>').addClass('alert alert-secondary alert-dismissible fade show').attr('role', 'alert').html('<strong>' + comment.title + ': </strong> ' + comment.comment).appendTo('#allComments');
                    $('<button>').attr('type', 'button').addClass('close').attr('data-dismiss', 'alert').attr('aria-label', 'Close').html('<span class="deleteComment" aria-hidden="true" data-id=' + comment._id + '>&times;</span>').appendTo($oldComment);
                });

            }).catch(function (err) {
                // If an error occurred, send it to the client
                console.log(err);
            });


        // Display COMMENT modal
        $("#commentModal").modal({
            backdrop: "static",
            keyboard: false
        });

        $('#idInModal').text('ID: ' + currentID);
    });

    // Delete a comment by pressing the X button next to it
    $("#allComments").on("click", ".deleteComment", function () {
        console.log($(this).data("id"))
        
        $.get('/comment/delete/' + $(this).data("id"))
            .catch(function (err) {
                // If an error occurred, send it to the client
                console.log(err);
            });

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