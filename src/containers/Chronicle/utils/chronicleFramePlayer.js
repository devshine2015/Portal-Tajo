//
//
//  animation componenet for chronicleFrame
//
//

function ChronicleFramePlayer(chronicleFrame) {
  this.chronicleFrame = chronicleFrame;

  this.normalizedTime100 = -1;
  this.playbackSpeed = 1;
  this.animationProc = null;

  this.updateCallbacks = [];
  this.loopCallbacks = [];

  this.frameData = {};
}


//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.kill = function( ){
  // stop playback
  this.play(false);

  // clear callbacks
  this.updateCallbacks = [];
  this.loopCallbacks = [];
};

//
// FrameUpdateCallbackFunctionu( normalizedTime100, pos, speed, temperature );
//-----------------------------------------------------------------------
//
//  NOTE:
// !!!callbacks are not called now
ChronicleFramePlayer.prototype.addUpdateCallback = function( callBack ){
  this.updateCallbacks.push(callBack);
};

//
// LoopCallbackFunctionu(  );
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.addLoopCallback = function(callBack){
  this.loopCallbacks.push(callBack);
};

//
//
//-----------------------------------------------------------------------
//
ChronicleFramePlayer.prototype.setPlaybackSpeed = function( speed ){
  this.playbackSpeed = speed;
};

//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.isPlaying = function(){
  return this.animationProc !== null;
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.play = function(doPlay){
  if (!doPlay) {
    if (this.isPlaying()) {
      window.clearInterval(this.animationProc);
    }
    this.animationProc = null;
    return;
  }
  // already playing?
  if (this.isPlaying()) {
    return;
  }
  const _this = this;
  // trying 30fps
  this.animationProc = window.setInterval(function(){ _this.advance(_this.playbackSpeed); }, 33);
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.advance = function(step){
  this.normalizedTime100 += step;
  if (this.normalizedTime100>=100) {
    //      loop
    this.normalizedTime100 = 0;
    this.loopCallbacks.forEach(function(updater){ updater(); });
    return;
  }
  this.update();
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.gotoTime100 = function(time100) {
  if (this.normalizedTime100 === time100) {
    return;
  }
  this.normalizedTime100 = Math.max(0, time100);
  this.update();
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.update = function( ) {
  const timeMs = this.chronicleFrame.timeRangeMs * this.normalizedTime100 / 100;
  // Date object here
  this.frameData.date = this.chronicleFrame.getDateAtMs(timeMs);
  this.frameData.pos = this.chronicleFrame.getPosAtMs(timeMs);
  this.frameData.speed = this.chronicleFrame.getSpeedAtIdx();
  this.frameData.teperature = this.chronicleFrame.hasTemperature() ?
          this.chronicleFrame.getTemperatureAtMs(timeMs) : null;

  // const _this = this;
  //
  // this.updateCallbacks.forEach(function(updater){
  //   updater( _this.normalizedTime100, curPos, curSpeed, curTeperature );
  // });
};

// current frameData obj is:
// {
//   date -- Date objects
//   pos
//   speed
//   teperature
// }
ChronicleFramePlayer.prototype.getCurrentMomentData = function( ) {
  return this.frameData;
}

//
//
//-----------------------------------------------------------------------

export default function createchronicleFrame(chronicleFrame) {
  return new ChronicleFramePlayer(chronicleFrame);
}
