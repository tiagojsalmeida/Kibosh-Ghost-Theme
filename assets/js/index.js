/**
 * Main JS file for Kibosh behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();
        //$(".scroll-down").arctic_scroll();

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
                } else if( !elm.closest('map-tag').attr('href') ){
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
            template: '<a href="{{link}}" class="instafeed-image"><img src="{{image}}" alt="{{caption}}" /></a>',
            limit: 10
        });
        feed.run();
    }

    function setupNewsletterForm(){
        var $form = $("form.subscribe"),
            $input = $form.find('input.email'),
            $indicator = $form.find(".indicator");

        if($form){
            $form.on("submit", function(e){
                if ( e ) e.preventDefault();
                if ( validate_input() ) { register(); } else {
                    $indicator.attr("data-content", "Please enter a valid e-mail.");
                }

            });

            $input.on("input", function(){
                $indicator.attr("data-content", "Now hit enter!");
            });
            $input.keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                    $form.submit();
                }
            });
        }

        function validate_input() {
            var email = $input.val();
            var ex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return ex.test(email);
        }

        function register() {
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
                        $(".loader").addClass("done");
                        $input.addClass("full");
                        $input.val("");
                    }
                }
            });
        }
    }
    //// Arctic Scroll by Paul Adam Davis
    //// https://github.com/PaulAdamDavis/Arctic-Scroll
    //$.fn.arctic_scroll = function (options) {
    //
    //    var defaults = {
    //        elem: $(this),
    //        speed: 500
    //    },
    //
    //    allOptions = $.extend(defaults, options);
    //
    //    allOptions.elem.click(function (event) {
    //        event.preventDefault();
    //        var $this = $(this),
    //            $htmlBody = $('html, body'),
    //            offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
    //            position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
    //            toMove;
    //
    //        if (offset) {
    //            toMove = parseInt(offset);
    //            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
    //        } else if (position) {
    //            toMove = parseInt(position);
    //            $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
    //        } else {
    //            $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
    //        }
    //    });
    //
    //};
})(jQuery);
