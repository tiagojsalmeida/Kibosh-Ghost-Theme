/**
 * Main JS file for Kibosh behaviours
 */

(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        setupCountdowns();
        setupNewsletterForm();
        setupInstafeed();

    });

    function setupCountdowns(){
        $("[data-countdown]").each(function(k, elm){
            setTimeout(function me(){
                var arrival = moment( new Date(elm.getAttribute('data-countdown')) );
                if(arrival.diff() > 0 ){
                    elm.innerHTML = arrival.fromNow();
                    setTimeout(me, 1000);
                } else if( !$(elm).closest('.map-tag').attr('href') ){
                    elm.innerHTML = 'Coming soon';
                }
            }, 0);
        });
    }

    function setupInstafeed(){
        var feed = new Instafeed({
            get: 'user',
            userId: '241591768',
            clientId: 'd1c9767140854a8e93b87e53be4a1859',
            accessToken: '241591768.d1c9767.c07ec3c6efdf457a81627d8c4b0d1b93',
            template: '<a href="{{link}}" target="_blank" class="instafeed-image"><img src="{{image}}" alt="{{caption}}" /></a>',
            limit: 10
        });
        feed.run();
    }

    function setupNewsletterForm(){
        var $toEmbed = $('[embed-subscribe]');

        if($toEmbed){
            $toEmbed.each(function(k,elm){
                $(elm).html( $("form.subscribe").clone() );
                $(elm).find("form").addClass("embed-subscribe");
                if( $(elm).attr('embed-subscribe') ){
                    $(elm).find(".indicator").attr("data-content", $(elm).attr('embed-subscribe') );
                }
            })
        }

        var $forms = $("form.subscribe");

        if($forms){
            $forms.each(function(k,elm){
                var $elm = $(elm),
                    $input = $elm.find('input.email'),
                    $loader = $elm.find('.loader'),
                    $indicator = $elm.find(".indicator");

                $elm.on("submit", function(e){
                    if ( e ) e.preventDefault();
                    if ( validate_input( $input ) ) {
                        register( $elm, $input, $indicator, $loader );
                    } else {
                        $indicator.attr("data-content", "Please enter a valid e-mail.");
                    }

                });

                $input.on("input", function(){
                    $indicator.attr("data-content", "Now hit enter!");
                });
                $input.keypress(function(event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        $elm.submit();
                    }
                });
            });

        }

        function validate_input( $input ) {
            var email = $input.val();
            var ex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return ex.test(email);
        }

        function register( $form, $input, $indicator, $loader) {
            $indicator.attr("data-content", "Saving...");

            $.ajax({
                type: "GET",
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c",
                contentType: "application/json; charset=utf-8",
                success: function(data){
                    if (data.result != "success") {
                        var message = "Please enter a valid e-mail.";
                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                        }
                        $indicator.attr("data-content", message);
                    } else {
                        $indicator.attr("data-content", "We've sent you an confirmation e-mail!");
                        $loader.addClass("done");
                        $input.addClass("full");
                        $input.val("");
                    }
                }
            });
        }
    }
})(jQuery);
