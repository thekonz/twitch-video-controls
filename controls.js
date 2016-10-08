(function () {
    var Controls = function () {
        this.captureKeys = {
            "74": this.jumpBack, // j
            "75": this.togglePausePlay, // k
            "76": this.jumpForward, // l
            "70": this.toggleFullScreen, // f
            "84": this.toggleTheatreMode, // t
            "77": this.toggleMute // m
        };
        this.registerEventListeners();
    }

    Controls.prototype.registerEventListeners = function() {
        var controls = this;
        document.body.onkeydown = function(e) {
            var trigger = controls.captureKeys[e.keyCode];
            if (! trigger || controls.isFocusingInput()) {
                return;
            }

            if (! e.metaKey) {
                e.preventDefault();
            }

            trigger.call(controls);
        };
    };

    Controls.prototype.isFocusingInput = function() {
        return -1 !== [
            'input',
            'textarea'
        ].indexOf(document.activeElement.tagName.toLowerCase());
    };

    Controls.prototype.isLive = function() {
        return null === location.pathname.match(new RegExp('/.*?/v/.*', 'iu'));
    };

    Controls.prototype.jumpBack = function() {
        if (! this.isLive()) {
            this.video().currentTime -= 10;
        }
    };

    Controls.prototype.jumpForward = function() {
        if (! this.isLive()) {
            this.video().currentTime += 10;
        }
    };

    Controls.prototype.togglePausePlay = function() {
        this.playButton().click();
    };

    Controls.prototype.toggleFullScreen = function() {
        this.fullScreenButton().click();
    };

    Controls.prototype.toggleTheatreMode = function() {
        this.theatreModeButton().click();
    };

    Controls.prototype.toggleMute = function() {
        this.volumeButton().click();
    };

    Controls.prototype.video = function() {
        return document.querySelector('.player-video video');
    };

    Controls.prototype.playButton = function() {
        return document.querySelector('.player-button.player-button--playpause.js-control-playpause-button');
    };

    Controls.prototype.fullScreenButton = function() {
        return document.querySelector('.player-button.player-button--fullscreen.js-control-fullscreen');
    };

    Controls.prototype.theatreModeButton = function() {
        return document.querySelector('.player-button.player-button--theatre.js-control-theatre');
    };
    
    Controls.prototype.volumeButton = function() {
        return document.querySelector('.player-button.player-button--volume.js-control-volume');
    };

    new Controls();
})();
