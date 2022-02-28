;
(function(window, document, undefined) {

    'use strict';

    function removeElement(array, element) {
        return array.filter(function(el) {
            return el !== element
        });
    }

    function changeVideo() {
        if (player.getCurrentTime() >= delay) {
            var currentVideo = player.getVideoData().video_id,
                randomVideo = removeElement(videoPlaylist, currentVideo)[Math.floor(Math.random() * (videoPlaylist.length - 1))];
            player.loadVideoById(randomVideo);
        }
    }

    function onPlayerStateChange(event) {
        clearInterval(repeat);
        if (event.data === 1) {
            repeat = setInterval(changeVideo, 500);
        }
    }

    window.onYouTubeIframeAPIReady = function() {
        var randomVideo = videoPlaylist[Math.floor(Math.random() * videoPlaylist.length)];
        player = new YT.Player('player', {
            height: '315',
            width: '560',
            videoId: randomVideo,
            playerVars: {
                'autoplay': 1,
                'controls': 0,
                'showinfo': 0,
                'iv_load_policy': 3
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    }

    var tag = document.createElement('script'),
        player,
        videoPlaylist = ['XhwRXOkyLM0', 'YsTGTwqNfsQ', 'JFBUJ6kNl28'],
        delay = 10, // s
        repeat;

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

})(window, document);
