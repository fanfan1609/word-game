// Empty JS for your own code to be here
$(function(){
    $.ajax({
        type: "get",
        url: "http://localhost/app.xml",
        dataType: "xml",
        success: function(data) {
            /* handle data here */
            console.log(data);
        },
        error: function(xhr, status) {
            /* handle error here */
            $("#show_table").html(status);
        }
    });
})