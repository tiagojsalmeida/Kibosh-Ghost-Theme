(function ($) {
    "use strict";

    var shareButton = $('.share-button');
    shareButton.on('click',function(){
        $(this).addClass('open');
    });

    $( ".share-item" ).on('click',function(){
        shareButton.addClass('shared');
        setTimeout(function(){
            shareButton.addClass('thankyou');
        }, 800);
        setTimeout(function(){
            shareButton
                .removeClass('open')
                .removeClass('shared')
                .removeClass('thankyou');
        }, 2500);
    });

    var shareItem = $( '[data-share]' );

    shareItem.each(function(k, item){
        item.onclick = function(e) {
            e.preventDefault();
            var shareUrl = false,
                type = this.getAttribute('data-share');
            switch( type ){
                case 'twitter':
                    shareUrl = 'https://twitter.com/share?url=';
                    break;
                case 'gplus':
                    shareUrl = 'https://plus.google.com/share?url=';
                    break;
                default:
                case 'facebook':
                    shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=';
                    break;
            }
            var shareItemWindow = window.open( shareUrl + document.URL, type + '-popup', 'height=350,width=600' );
            if(shareItemWindow && shareItemWindow.focus) { shareItemWindow.focus(); }
            return false;
        }
    })
})(jQuery);
