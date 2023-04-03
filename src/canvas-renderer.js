/**
 * 描画と録画を管理する
 * @module canvas-renderer
 */

import {sleep} from './util.js'

/**
 * canvas への描画と録画を管理する
 */
export class CanvasRenderer {
  /**
   * @param {HTMLCanvasElement} canvas - 描画・録画 対象
   * @param {function(number, HTMLCanvasElement):void} render - canvas へ描画する関数
   * @param {function(Blob):void} onrecorded - 録画結果を受け取る関数
   */
  constructor(canvas, render, onrecorded) {
    this.canvas = canvas;
    this.render = render;
    this.minPeriod = 1000/61;
    this.requestID = null;
    this.recoder = null;
    this.onrecorded = onrecorded;
    this.requestStop = false;

    this.averagePeriod = 1;
  }

  /** 直近の fps */
  get fps() {
    return 1000 / this.averagePeriod;
  }

  /** fps の最大値 */
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

  /** 
   * 描画を開始あるいは再開する
   * @param {boolean} [resetCounter=false] - フレームカウンタをリセットするかどうか
   */
  start(resetCounter = false) {
    this.counter ??= 0;
    if(resetCounter) this.counter = 0;
    this.requestStop = false;
    if(!this.requestID)
      this.requestID = window.requestAnimationFrame((ts) => this.#frame(ts));
  }

  /**
   * 描画を停止あるいは一時停止する
   */
  stop() {
    if(this.requestID != null)
      window.cancelAnimationFrame(this.requestID)

    this.requestStop = true;
    this.requestID = null;
  }

  /**
   * 録画を開始する
   */
  async startRecording() {
    if(document.getElementById('hq-recording').checked) {
      if(!window.global?.Whammy) {
        window.global = {}
        await import('whammy')
      }
      this.rec = new window.global.Whammy.Video(Math.min(this.maxFps, 60));
    } else {
      const chunks = []; // here we will store our recorded media chunks (Blobs)
      const stream = this.recordingFps == 0 ? this.canvas.captureStream() // 制限なし
                                            : this.canvas.captureStream(this.recordingFps);
      this.rec = new MediaRecorder(stream);
      this.rec.ondataavailable = e => chunks.push(e.data);
      this.rec.onstop = () => this.onrecorded(new Blob(chunks, {type: 'video/webm'}));
      this.rec.start();
    }
  }

  /**
   * 録画を停止する
   */
  stopRecording() {
    if(!this.rec) return;

    if(this.rec.constructor.name == MediaRecorder.name) {
      this.rec.stop();
    } else {
      this.onrecorded(this.rec.compile());
    }
    this.rec = null;
  }

  /**
   * 録画をキャンセルする（onrecorded が呼び出されない）
   */
  cancelRecording() {
    if(!this.rec) return;

    if(this.rec.constructor.name == MediaRecorder.name) {
      this.rec.onstop = null;
      this.stopRecording();
    } else {
      this.rec = null;
    }
  }

  async #frame(ts) {
    // 停止要求をチェック
    if(this.requestStop) return this.requestID = null;

    // 前回からの経過時間が短すぎたら待つ
    const period = ts - (this.last_ts || (ts - 10));
    this.last_ts = ts;
    if(this.minPeriod > 0 && period < this.minPeriod) {
      await sleep(this.minPeriod - period);
      this.averagePeriod = this.averagePeriod * 0.95 + this.minPeriod * 0.05;
    } else {
      this.averagePeriod = this.averagePeriod * 0.95 + period * 0.05;
    }

    // 停止要求をチェック
    if(this.requestStop) return this.requestID = null;

    // 描画する
    this.counter++;
    this.render(ts, this.canvas);

    // 録画する
    if(this.rec && (this.rec.constructor.name != MediaRecorder.name))
      this.rec.add(this.canvas);

    // 次のフレームを要求する
    this.requestID = window.requestAnimationFrame((ts) => this.#frame(ts));
  }

  /**
   * 停止中かどうか
   */
  get isPaused() {
    return !this.requestID;
  }

}
