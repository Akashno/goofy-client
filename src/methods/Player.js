export default class Player {
  constructor(name) {
    this.name = name;
    this.playing = false
    this.muted = false
    this.volume = 0.5
    this.showSlider=false
  }
}
