var ScreenSizer = (function(){

    var init = function($node, ratio, factor){
        $(window).resize(function(){
            size($node, ratio);
            fontSize($('body'), ratio, factor);
        });
        size($node, ratio);
        fontSize($('body'), ratio, factor);
    }

    var size = function($node, ratio){
        var w = window.innerWidth;
        var h = window.innerHeight;
        if (!w || !h) return;
        var nw = h / ratio;
        var nh = w * ratio;
        if (nw > w) nw = w;
        if (nh > h) nh = h;
        $node.css('height', nh);
        $node.css('width', nw);
        console.log('(' + w + ',' + h + ') (' + nw + ',' + nh + ')');
    }

    var fontSize = function($node, ratio, factor){
        var w = window.innerWidth;
        var h = window.innerHeight;
        if (!w || !h) return;
        var nw = h / ratio;
        var nh = w * ratio;
        if (nw > w) nw = w;
        if (nh > h) nh = h;
        var m = Math.min(nw,nh);
        var fs = (m * factor) + 'pt';
        $node.css('font-size', fs);
        console.log('(' + w + ',' + h + ') (' + nw + ',' + nh + ') ' + m + ' ' + fs);
    }

    return {
        size: size,
        fontSize: fontSize,
        init: init
    }
})();
