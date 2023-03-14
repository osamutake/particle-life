// ****************************************
/// 描画と録画を管理する
// ****************************************

export class CanvasRenderer {
  constructor(canvas, render, onrecorded) {
    this.canvas = canvas;
    this.render = render;
    this.minPeriod = 50;
    this.requestID = null;
    this.recoder = null;
    this.onrecorded = onrecorded;
    this.requestStop = false;

    this.averagePeriod = 1;
  }
  
  get fps() {
    return 1000 / this.averagePeriod;
  }

  get maxFps() {
    return 1000 / this.minPeriod;
  }
  
  set maxFps(v) {
    if (v > 0) {
      this.minPeriod = 1000 / v;
    } else {
      this.minPeriod = 0;  // no limit
    }
  }

  start() {
    this.requestStop = false;
    if(!this.requestID)
      this.requestID = window.requestAnimationFrame((ts) => this.frame(ts));
  }

  stop() {
    if(this.requestID != null)
      window.cancelAnimationFrame(this.requestID)

    this.requestStop = true;
    this.requestID = null;
  }

  startRecording() {
    const chunks = []; // here we will store our recorded media chunks (Blobs)
    const stream = this.canvas.captureStream(); // grab our canvas MediaStream
    this.rec = new MediaRecorder(stream);
    this.rec.ondataavailable = e => chunks.push(e.data);
    this.rec.onstop = () => this.onrecorded(new Blob(chunks, {type: 'video/webm'}));
    this.rec.start();
  }

  stopRecording() {
    this.rec.stop();
    this.rec = null;
  }

  cancelRecording() {
    this.rec.onstop = null;
    this.stopRecording();
  }

  async frame(ts) {
    if(this.requestStop) 
      return this.requestID = null;

    // 前回からの経過時間が短すぎたら待つ
    const period = ts - (this.last_ts || (ts - 10));
    this.last_ts = ts;
    if(this.minPeriod > 0 && period < this.minPeriod) {
      await util.sleep(this.minPeriod - period);
      this.averagePeriod = this.averagePeriod * 0.95 + this.minPeriod * 0.05;
    } else {
      this.averagePeriod = this.averagePeriod * 0.95 + period * 0.05;
    }

    if(this.requestStop) 
      return this.requestID = null;

    this.render(ts, this.canvas);

    // 次のフレームを要求する
    this.requestID = window.requestAnimationFrame((ts) => this.frame(ts));
  }

}
