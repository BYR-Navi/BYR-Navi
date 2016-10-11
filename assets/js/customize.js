// customize.js

$(document)
    .ready(function() {

        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');

    });

// powered by
for (var i in poweredBy) {
    $('#powered-by')
        .append(
            $('<a>')
            .addClass('item')
            .attr('href', poweredBy[i].url)
            .attr('target', '_blank').html(poweredBy[i].name)
        );
};

// copyright
$('#copyright')
    .html(
        function() {
            var date = new Date();
            return '&copy; ' + date.getFullYear() + ' TEELAB';
        }
    );

// feedback
$('.feedback')
    .on('click', function() {
        $('#contacts-dimmer')
            .dimmer('show');
    });

// loading dimmer
$('.loading')
    .on('click', function() {
        $('#loading-dimmer')
            .dimmer('show');
    });
