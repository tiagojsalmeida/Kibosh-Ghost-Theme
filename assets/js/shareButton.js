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

    function shareUrlType(type, url){
        switch( type ){
            case 'twitter':
                return 'https://twitter.com/share?url=' + url;
            case 'gplus':
                return 'https://plus.google.com/share?url=' + url;
            default:
            case 'facebook':
                return 'https://www.facebook.com/dialog/share?app_id=539160566247943&display=popup&href=' + url + '&redirect_uri=' + url;
        }
    }

    shareItem.each(function(k, item){
        item.onclick = function(e) {
            e.preventDefault();
            var type = this.getAttribute('data-share');
            var shareItemWindow = window.open( shareUrlType( type, document.URL ), type + '-popup', 'height=350,width=600' );
            if(shareItemWindow && shareItemWindow.focus) { shareItemWindow.focus(); }
            return false;
        }
    })
})(jQuery);