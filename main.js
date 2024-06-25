

//Mock API URL 
const URL = "https://6675cff6a8d2b4d072f18c5c.mockapi.io/CRUDAPI/posts/";

//First make an ajax call to my mockAPI to retrieve the data within it 
$.ajax({
    url: URL,
    method: "GET",
    success: function (data) {
        console.log(data);
        addPreviousPosts(data); 
    },
    error: function (error) {
        console.log(error);
    },
});
//using jquery to find my div with the id posts to declare a variable for DOM manipulation
let $posts = $("#posts");

//function to empty my posts div first, then loop over the data in my mockAPI and append it to my document, 
//this function will be called in the GET ajax call 
function addPreviousPosts(data) {
    $posts.empty();
    for (let i = 0; i < data.length; i++) {
        $posts.append(`
            <div data-id="${data[i].id}">
                <p>${data[i].post}</p>
                <span class="options">
                    <i class="fa-solid fa-pen-to-square edit-post"></i>
                    <i class="fa-solid fa-trash delete-post"></i>
                </span>
            </div>
        `);
    }
}
//function to render my entire document 
$(document).ready(function () {
//using jquery to find my HTML elements by their ID
    let $form = $("#form");
    let $input = $("#input");
    let $msg = $("#msg");
    let $label = $("label");
//function for when the post button is clicked to not refresh the screen, validate whether they inputted text and set header 
    $form.on("submit", function (e) {
        e.preventDefault();
        formValidation();
        $label.html("Write New Post: ");
    });
//function is called above-- used to let the user know they need to write something before they hit post, then it will accept the data for posts
    function formValidation() {
        if ($input.val() === "") {
            $msg.html("Post cannot be blank");
            console.log("failure");
        } else {
            console.log("success");
            $msg.html("");
            acceptData();
        }
    }

    let data = {};
//function is called in formValidation, it will take the value of the input form and post it to the "Your Posts Here" div 
    function acceptData() {
        data["post"] = $input.val();
        createPost(data);
    }
//functioin is called in acceptData, this will use ajax POST method to post the data to the mockAPI as well as on the browser display 
    function createPost(postData) {
        $.ajax({
            url: URL,
            method: "POST",
            data: postData,
            success: function (data) {
                console.log(data);
                $posts.append(`
                    <div data-id="${data.id}">
                        <p>${data.post}</p>
                        <span class="options"> 
                            <i class="fa-solid fa-pen-to-square edit-post"></i>
                            <i class="fa-solid fa-trash delete-post"></i> 
                        </span>
                    </div>
                `);
                $input.val("");
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
//With each post they have a trash can icon, when clicked it will delete the post with the specified ID 
//and will use the ajax DELETE method to delete the post on the mockAPI as well 
    $posts.on("click", ".delete-post", function () {

        //Gets the closest parent <div> element for the clicked delete icon
        let $postDiv = $(this).closest("div");
        //Retrives the post ID from the data-id attribute of the parent <div>
        let postId = $postDiv.data("id"); 

        $.ajax({
            url: URL + postId,
            method: "DELETE",
            success: function (data) {
                console.log("Delete success:", data);
                $postDiv.remove();
            },
            error: function (error) {
                console.log("Delete error:", error);
            },
        });
    });
    //attach a click event listener to elements with class "edit-post" inside $posts
    $posts.on("click", ".edit-post", function () {

        //Finds the closest ancestor div of the clicked ".edit-post" element
        let $postDiv = $(this).closest("div");
        //Sets the value of the input field with the HTMl content of the <p> element inside $postDiv
        $input.val($postDiv.find("p").html());
        //Remove the $postDiv from the DOM
        $postDiv.remove();
        //Change the HTML content of the $label element to "Edit Post Here "
        $label.html("Edit Post Here");
    });
});