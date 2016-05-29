/**
 * Created by christos on 29/5/2016.
 */
function createFields() {
    $('.field').remove();
    var container = $('#container');
    for(var i = 0; i < $('#fields').val(); i++) {
        $('<div/>', {
            'class': 'field',
            'text': i + 1
        }).appendTo(container);
    }
}

function distributeFields(radius) {
    var fields = $('.field'),
        container = $('#container'),
        width = container.width(),
        height = container.height(),
        angle = parseFloat($('#angle').val()),
        step = (2*Math.PI) / fields.length;
    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2);
        var y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        if(window.console) {
            console.log($(this).text(), x, y);
        }
        $(this).css({
            left: x + 'px',
            top : y + 'px'
        });
        angle = angle + step;
    });
}

//var angle = $('#angle').val();
console.log(angle);
$('input').change(function() {
    createFields();
    distributeFields(200);
});

createFields();
distributeFields(200);