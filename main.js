$(document).ready(function(){
    let $form = $("#form");
    let $input = $("#input");
    let $msg = $("#msg");
    let $posts = $("#posts");
    let $label = $("label");
    
    $form.on("submit", function(e){
        e.preventDefault();
        console.log("button clicked");
        formValidation();
        $label.html("Write New Post: ");
    });
    function formValidation(){
        if ($input.val()=== ""){
            $msg.html("Post cannot be blank");
            console.log("failure");
        }else{
            console.log("success");
            $msg.html("");
            acceptData();
        }
    }
    let data = {};
    
    function acceptData(){
        data["text"] =$input.val();
        console.log(data);
        createPost();
    }
    function createPost(){
        $posts.append(`
            <div>
                <p>${data.text}</p>
                <span class= "options">
                    <i class="fa-solid fa-pen-to-square edit-post"></i>
                    <i class="fa-solid fa-trash delete-post"></i>
                </span>
            </div>   
        `);
        $input.val("");
    }
    $posts.on("click", ".delete-post", function(){
        $(this).closest("div").remove();
    });
    $posts.on("click", ".edit-post", function(){
        $input.val($(this).closest("div").find("p").html());
        $(this).closest("div").remove();
        $label.html("Edit Post Here");
    })
})