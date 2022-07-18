const loadingTemplate = document.createElement('template');
loadingTemplate.innerHTML = `
     <div id="loadingMsg" class="centered">
         <h1>Trying to connect to local server...</h1>
         <p>Please check if you run the local server on your pc!</p>
         <img src="../../Assets/Images/loading.png">
     </div> 
`;

const errorTemplate = document.createElement('template');
errorTemplate.innerHTML = `
    <div id="errorMsg" class="centered">
        <h1>Connection to local server has failed!</h1>
        <p>Please check if you run the local server on your pc!</p>
        <img class="rounded-background" src="../../Assets/Images/ghost.png">
    </div>
`;

$(document).ready(() => {
    let status = 'loading';
    loadTemplate(status);
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:9900/?path=D:/",
        success: (response) => {
            setTimeout(() => {
                console.log(response);
                window.location.href = "../video-player/video-player.html"
            }, 2000);
        },
        error: (err) => {
            console.log(err);
        }
    });
});

function loadTemplate(status){
    let template;
    if (status == 'loading')
        template = loadingTemplate;
    else 
        template = errorTemplate;
    
    $('.app').append(template.content.cloneNode(true));
}

setTimeout(() => {
    $('#loadingMsg').remove();
    loadTemplate('fail');
}, 2000)

