
$("document").ready(function(){
    $(".question").hide();
    $(".start").show();
})
$(".start").on("click", function(){
    $(".start").hide();
    $(".question").show();
});
