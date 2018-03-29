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
    var popins = $('.popin-block');
    var overlay = '<div class="overlay"></div>';
    var btnOpen = $('[data-toggle="popin-block"]');
    var btnClose = $('[data-dismiss="popin-block"]');

    $(btnOpen).on('click', function (e) {
        e.preventDefault();

        var target = $(this).attr('data-target');
        $(popins).hide();
        $(body).addClass('noscroll').append(overlay);
        $(target).show();
        blockAddressHeight();
    });

    $(btnClose).on('click', function (e) {
        e.preventDefault();

        $(popins).hide();
        $(body).removeClass('noscroll').find('.overlay').remove();
    });
};

$(function () {
    blockAddressHeight();
    popinBlock();
});