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
        saveArticle: async function (editedInfo) {
            axios.post('api/save/' + editedInfo.id, editedInfo).then(function () {
                // window.location.href = "/";
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

        // Display COMMENT modal
        $("#commentModal").modal({
            backdrop: "static",
            keyboard: false
        });
    });

    // Save an article
    $(".saveArticle").on("click", function () {
        console.log("Saving article with ID:" + $(this).data("id"));

        $(this).text("SAVED").removeClass("deep-purple").addClass("green");
        // // console.log($(this).parent());

        // var editedInfo = {
        //     id: $(this).data("id"),
        //     saved: true
        // };
        // console.log(editedInfo)
        // API.saveArticle(editedInfo);

    });





});