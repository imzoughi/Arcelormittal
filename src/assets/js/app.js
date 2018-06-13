/* ========================================== *\
 *  MODULE BLOCKADDRESSHEIGHT
 \* ========================================== */
var blockAddressHeight = function () {
    $('.list-address > li > .block-address .block-address--title').matchHeight({
        byRow: true,
        property: 'min-height',
        target: null,
        remove: false
    });
    $('.list-address > li > .block-address .block-address--info').matchHeight({
        byRow: true,
        property: 'min-height',
        target: null,
        remove: false
    });
    $('.list-address > li > .block-address').matchHeight({
        byRow: true,
        property: 'min-height',
        target: null,
        remove: false
    });
};

/* ========================================== *\
 *  MODULE POPINBLOCK
\* ========================================== */
var popinBlock = function () {
    var body = $('body');
    var popins = $('.popin-block-overlay');
    //var overlay = '<div class="overlay"></div>';
    var btnOpen = $('[data-toggle="popin-block"]');
    var btnClose = $('[data-dismiss="popin-block"]');

    var heightCheck = function (target) {
        var popinH = $(target).find('.popin-block').height();
        if(popinH > $(window).height()) {
            $(target).addClass('sticked');
            console.log('sticked');
        } else {
            $(target).removeClass('sticked');
            console.log('nosticked');
        }
    };

    $(btnOpen).on('click', function (e) {
        e.preventDefault();

        var target = $(this).attr('data-target');
        $(popins).hide();
        $(body).addClass('noscroll');
        $(target).show();
        blockAddressHeight();

        heightCheck(target);

        $(window).resize(function () {
            heightCheck(target);
        });

    });

    $(btnClose).on('click', function (e) {
        e.preventDefault();

        $(popins).hide();
        $(body).removeClass('noscroll');
    });

    $(document).mouseup(function(e){
        var container = $(".popin-block");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $(popins).hide();
            $(body).removeClass('noscroll');
        }
    });

};

$(function () {
    blockAddressHeight();
    popinBlock();
});