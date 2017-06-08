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
ChronicleFramePlayer.prototype.kill = function () {
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
ChronicleFramePlayer.prototype.addUpdateCallback = function (callBack) {
  this.updateCallbacks.push(callBack);
};

//
// LoopCallbackFunctionu(  );
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.addLoopCallback = function (callBack) {
  this.loopCallbacks.push(callBack);
};

//
//
//-----------------------------------------------------------------------
//
ChronicleFramePlayer.prototype.setPlaybackSpeed = function (speed) {
  this.playbackSpeed = speed;
};

//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.isPlaying = function () {
  return this.animationProc !== null;
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.play = function (doPlay) {
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
  this.animationProc = window.setInterval(function () { _this.advance(_this.playbackSpeed); }, 33);
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.advance = function (step) {
  this.normalizedTime100 += step;
  if (this.normalizedTime100 >= 100) {
    //      loop
    this.normalizedTime100 = 0;
    this.loopCallbacks.forEach(function (updater) { updater(); });
    return;
  }
  this.update();
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.gotoTime100 = function (time100) {
  if (this.normalizedTime100 === time100) {
    return;
  }
  this.normalizedTime100 = Math.max(0, time100);
  this.update();
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.update = function () {
  this.frameData = this.getMomentDataAtNormalized(this.normalizedTime100);
  // const _this = this;
  //
  // this.updateCallbacks.forEach(function(updater){
  //   updater( _this.normalizedTime100, curPos, curSpeed, curTeperature );
  // });
};

//
//
//-----------------------------------------------------------------------
ChronicleFramePlayer.prototype.getMomentDataAtNormalized = function (normalizedTime100) {
  const timeMs = this.chronicleFrame.timeRangeMs * normalizedTime100 / 100;
  return {
      // Date object here
    date: this.chronicleFrame.getDateAtMs(timeMs),
    pos: this.chronicleFrame.getPosAtMs(timeMs),
    speed: this.chronicleFrame.getSpeedAtLastPos(),
    temperature: this.chronicleFrame.hasTemperature() ?
      this.chronicleFrame.getTemperatureAtMs(timeMs) : null,
    fuel: this.chronicleFrame.hasFuel() ?
      this.chronicleFrame.getFuelAtMs(timeMs) : null,
  };
};

// current frameData obj is:
// {
//   date -- Date objects
//   pos
//   speed
//   teperature
// }
ChronicleFramePlayer.prototype.getCurrentMomentData = function () {
  return this.frameData;
};

ChronicleFramePlayer.prototype.findNormilized100TForPos = function (refPos) {
  const theSample = this.chronicleFrame.findSampleForPos(refPos);
  return 100 * theSample.timeMs / this.chronicleFrame.timeRangeMs;
};


//
//
//-----------------------------------------------------------------------

export default function createchronicleFrame(chronicleFrame) {
  return new ChronicleFramePlayer(chronicleFrame);
}
