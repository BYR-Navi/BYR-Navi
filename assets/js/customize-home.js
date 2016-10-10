// customize-home.js

// version
$('#version')
    .attr('href', 'https://github.com/iROCKBUNNY/BYR-Navi/commits/gh-pages')
    .attr('target', '_blank')
    .append(
        $('<i>')
        .addClass('fa fa-cog fa-spin fa-fw')
    )
    .append(' Updated ')
    .append(version);

// search
for (var id in searchServices) {
    $('#search-services').append(
        $('<option>')
        .attr('value', id)
        .html(searchServices[id].name)
    );
};

$('#search-services')
    .dropdown();

$('#search-button').click(function() {
    var service = $('#search-services').val();
    var query = $('#search-query').val();
    query = query.replace('#', '%23');
    if (query) {
        $('#search-query').select().focus();
        window.open(searchServices[service].url + query + searchServices[service].suffix, '_blank');
    } else {
        $('#search-div').addClass('error');
        $('#search-query').attr('placeholder', '请输入搜索内容');
    };
});

$(window).keyup(function(event) {
    var windowTop = $(window).scrollTop();
    var windowHeight = $(window).innerHeight();
    var windowBottom = windowTop + windowHeight;
    var searchBoxTop = $('#search-div').offset().top;
    var searchBoxHeight = $('#search-div').innerHeight();
    var searchBoxBottom = searchBoxTop + searchBoxHeight;
    if (event.key == 'Enter' && searchBoxBottom > windowTop && searchBoxTop < windowBottom) {
        var service = $('#search-services').val();
        var query = $('#search-query').val();
        query = query.replace('#', '%23');
        if (query) {
            $('#search-query').select().focus();
            window.open(searchServices[service].url + query + searchServices[service].suffix, '_blank');
        } else {
            $('#search-div').addClass('error');
            $('#search-query').attr('placeholder', '请输入搜索内容');
        };
    };
});

$('#search-query').keyup(function(event) {
    if (event.key) {
        if ($('#search-query').val()) {
            $('#search-div').removeClass('error');
            $('#search-query').attr('placeholder', '立即搜索');
        };
    };
});

// links
var count = 0;
for (var pubLinkGroupName in pubLinks) {
    ++count;
    var pubLinksHolderId = 'pub-links-' + count;
    $('#pub-links').append(
        $('<div>').addClass('column')
        .attr('id', pubLinksHolderId)
        .append($('<h3>').addClass('ui header').html(pubLinkGroupName))
    );
    for (var pubLinkName in pubLinks[pubLinkGroupName]) {
        $('#' + pubLinksHolderId).append(
            $('<a>').addClass('ui button')
            .attr('href', pubLinks[pubLinkGroupName][pubLinkName].url)
            .attr('target', '_blank')
            .html(pubLinkName)
        );
    };
};

var count = 0;
for (var byrLinkGroupName in byrLinks) {
    ++count;
    var byrLinksHolderId = 'byr-links-' + count;
    $('#byr-links').append(
        $('<div>').addClass('column')
        .attr('id', byrLinksHolderId)
        .append($('<h3>').addClass('ui header').html(byrLinkGroupName))
    );
    for (var byrLinkName in byrLinks[byrLinkGroupName]) {
        $('#' + byrLinksHolderId).append(
            $('<a>').addClass('ui button')
            .attr('href', byrLinks[byrLinkGroupName][byrLinkName].url)
            .attr('target', '_blank')
            .html(byrLinkName)
        );
    };
};

// var count = 0;
// for ( var linkGroupName in links ) {
//   ++count;
//   var linksHolderId = 'links-' + count;
//   $('#links').append(
//     $('<div>').addClass('ui vertical stripe segment').append(
//       $('<div>').addClass('ui middle aligned stackable grid container').append(
//         $('<div>').addClass('row').append(
//           $('<div>').addClass('center aligned column')
//             .attr('id', linksHolderId)
//             .append($('<h3>').addClass('ui header').html(linkGroupName))
//         )
//       )
//     )
//   );
//   for ( var linkName in links[linkGroupName] ) {
//     $('#' + linksHolderId).append(
//       $('<a>').addClass('ui black basic button')
//         .attr('href', links[linkGroupName][linkName].url)
//         .attr('target', '_blank')
//         .html(linkName)
//     );
//   };
// };
