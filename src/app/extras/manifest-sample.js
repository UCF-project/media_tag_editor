'use strict';

module.exports = `{
  "medias":  [
    {
      "content": {
        "urlVideo": "http://0.0.0.0:3000/tests/assets/media/video-only.mpd",
        "urlAudio": "http://0.0.0.0:3000/tests/assets/media/audio-only.mpd",
        "contentType": "dash-audio"
      },
      "rules": {
        "bandwidth": {
          "insufficient": {
            "playAudio": false,
            "playVideo": false,
            "playSync": false
          },
          "audio": {
            "playAudio": true,
            "playVideo": false,
            "playSync": false
          },
          "video": {
            "playAudio": true,
            "playVideo": true,
            "playSync": true
          }
        },
        "network": {"up": {"visibility": true}, "down": {"visibility": false}}
      }
    }, {
      "content": "<div style=\\"position: absolute;top: 0;background: rgba(255, 255, 255, 0.5);width: 275px;height: 100px;border: 1px solid rgba(0, 0, 0, 0.5);border-radius: 5px;left: 0;margin: 30px;padding: 30px;text-align: center;\\">We detect that your bandwidth suffice to play only audio content.</p>",
      "rules": {
        "bandwidth": {
          "insufficient": {
            "visibility": false
          },
          "audio": {
            "visibility": true
          },
          "video": {
            "visibility": false
          }
        },
        "network": {"up": {"visibility": true}, "down": {"visibility": false}}
      }
    }, {
      "content": "<div style=\\"position: absolute;top: 0;background: rgba(255, 255, 255, 0.5);width: 275px;height: 100px;border: 1px solid rgba(0, 0, 0, 0.5);border-radius: 5px;left: 0;margin: 30px;padding: 30px;text-align: center;\\">We detect that your bandwidth is insufficient to play the content.</p>",
      "rules": {
        "bandwidth": {
          "insufficient": {
            "visibility": true
          },
          "audio": {
            "visibility": false
          },
          "video": {
            "visibility": false
          }
        },
        "network": {"up": {"visibility": true}, "down": {"visibility": false}}
      }
    }, {
      "content": "http://0.0.0.0:3000/tests/assets/media/image.png",
      "rules": {
        "network": {"up": {"visibility": false}, "down": {"visibility": true}}
      }
    }
  ]
}`;