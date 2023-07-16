var song = {
  name: "Walk This Way",
  artist: "Run-D.M.C",
  minutes: 4,
  seconds: 3,
  genre: "80s",
  playing: false,
  play: function () {
    //play
    if (!this.playing) {
      //this is a keyword that refers to an object that is executing the code
      this.playing = true;
      console.log("Playing" + this.name + "by" + this.artist);
    }
  },
  pause: function () {
    //pauses
    if (this.playing) {
      this.playing = false;
    }
  },
};
song.play();
song.pause();
