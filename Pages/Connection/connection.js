let count = 0;
let connectionStatus = 'failed';
$(document).ready(function(){
    $('#incrementButton').click(function(){
        count++;
        $('#counter').text('Counter:' + count);
    })

    if (connectionStatus === 'failed'){
        $('#loadingMsg').remove();
        let node = $('#errorMsgTemplate').prop('content');
        $(node).find('div');
        console.log($(node).find('div'));
        $('#main').append(node);
    }
})