$(function() {
    


	 $(document).ready(function(){
    $(".menu__nav, .header__content").on("click","a", function (event) {
        console.log("hi");
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
    

});
