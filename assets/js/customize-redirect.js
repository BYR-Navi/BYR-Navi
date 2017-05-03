// customize-redirect.js

var redirectUrl = $.url('?next');
if (redirectUrl) {
    $('#redirect-url').text(redirectUrl);
    window.location.replace(redirectUrl);
};
