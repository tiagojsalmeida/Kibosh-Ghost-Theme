var hbs = require('express-hbs');

module.exports = function(){
    hbs.registerHelper('cond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    hbs.registerHelper('hasVideo', function(url, options) {
        if(url && !!~url.indexOf('video')) {
            return options.fn(this);
        }
    });

    hbs.registerHelper('getVideoOverlay', function(imageUrl) {
        return imageUrl && imageUrl.replace(/.(jpg|png|gif)$/, '_overlay.png');
    });

    hbs.registerHelper('getVideoUrl', function(imageUrl) {
        return imageUrl && imageUrl.replace(/.(jpg|png|gif)$/, '');
    });

    hbs.registerHelper('hasImage', function(url, options) {
        if(url && url.indexOf('video') == -1) {
            return options.fn(this);
        }
    });
};