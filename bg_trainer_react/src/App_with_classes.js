// Modified from example #9. Reverse-engineered the data stream used to play loops.
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MIDISounds from 'midi-sounds-react';

const O = 12;

const C = 0;
const c = 1;
const D = 2;
const d = 3;
const E = 4
const F = 5;
const f = 6;
const G = 7;
const g = 8;
const A = 9;
const a = 10;
const B = 11;

const S1 = 5 * O + E;
const S2 = 4 * O + B;
const S3 = 4 * O + G;
const S4 = 4 * O + D;
const S5 = 3 * O + A;
const S6 = 3 * O + E;

const X3 = 3 * O + G;
const X4 = 3 * O + D;
const X5 = 2 * O + A;
const X6 = 2 * O + E;

const _Em = [
  S6 + 0
  , S5 + 2
  , S4 + 2
  , S3 + 0
  , S2 + 0
  , S1 + 0
];

const hihat = 56;
const drum = 2;
const snare = 17;
const pedal = 35;
const bass = 437;
const hit = 609;
const synth = 521;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    this.setState({ initialized: true });
  }
  changeMasterQuiet() {
    this.midiSounds.setMasterVolume(0.3);
  }
  changeMasterLoud() {
    this.midiSounds.setMasterVolume(1);
  }
  changeMasterEchoStrong() {
    this.midiSounds.setEchoLevel(1);
  }
  changeMasterEchoNone() {
    this.midiSounds.setEchoLevel(0);
  }
  changeMasterPower() {
    this.midiSounds.setBand32(2);
    this.midiSounds.setBand64(4);
    this.midiSounds.setBand128(3);
    this.midiSounds.setBand256(-2);
    this.midiSounds.setBand512(-3);
    this.midiSounds.setBand1k(1);
    this.midiSounds.setBand2k(2);
    this.midiSounds.setBand4k(3);
    this.midiSounds.setBand8k(-3);
    this.midiSounds.setBand16k(1);
  }
  changeMasterDance() {
    this.midiSounds.setBand32(2);
    this.midiSounds.setBand64(2);
    this.midiSounds.setBand128(1);
    this.midiSounds.setBand256(-1);
    this.midiSounds.setBand512(5);
    this.midiSounds.setBand1k(4);
    this.midiSounds.setBand2k(4);
    this.midiSounds.setBand4k(2);
    this.midiSounds.setBand8k(-2);
    this.midiSounds.setBand16k(3);
  }
  changeMasterNone() {
    this.midiSounds.setBand32(0);
    this.midiSounds.setBand64(0);
    this.midiSounds.setBand128(0);
    this.midiSounds.setBand256(0);
    this.midiSounds.setBand512(0);
    this.midiSounds.setBand1k(0);
    this.midiSounds.setBand2k(0);
    this.midiSounds.setBand4k(0);
    this.midiSounds.setBand8k(0);
    this.midiSounds.setBand16k(0);
  }
  startPlay() {
    var banjo = 1135;
    var g5 = 7;
    var b5 = 11;
    var d4 = 2 + 12;

    var banjo_note_duration = 1/12;
    // Hierarchy of the "data stream":
    // each row of data contains:
    // [ list_of_percussion_hits, list_of_instrument_tones ]
    // 
    // an instrument tone looks like:
    // tone: [instrument_id, list_of_tones_to_play, duration_to_play]

    var data = [
      [[], [[banjo, [g5 + 4*O], banjo_note_duration]]],
      [[], [[banjo, [b5 + 4*O], banjo_note_duration]]],
      [[hihat], [[banjo, [g5 + 5*O], banjo_note_duration]]],
      [[], [[banjo, [d4 + 4*O], banjo_note_duration]]],

      [[], [[banjo, [d4 + 3*O], banjo_note_duration]]],
      [[], [[banjo, [b5 + 4*O], banjo_note_duration]]],
      [[hihat], [[banjo, [g5 + 5*O], banjo_note_duration]]],
      [[], [[banjo, [d4 + 4*O], banjo_note_duration]]],
    ];

    this.midiSounds.startPlayLoop(data, 120, 1/16, this.midiSounds.beatIndex);
  }
  stopAll() {
    this.midiSounds.stopPlayLoop();
    this.midiSounds.beatIndex = 0;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to midi-sounds-react example 9</h1>
        </header>
        <p className="App-intro">Change sound properties and press a Play.</p>
        <p>Master volume</p>
        <p>
          <button type='button' onClick={this.changeMasterQuiet.bind(this)} >Quiet</button>
          <button type='button' onClick={this.changeMasterLoud.bind(this)} >Loud</button>
        </p>
        <p>Echo level</p>
        <p>
          <button type='button' onClick={this.changeMasterEchoNone.bind(this)} >Off</button>
          <button type='button' onClick={this.changeMasterEchoStrong.bind(this)} >On</button>
        </p>
        <p>Equalizer preset</p>
        <p>
          <button type='button' onClick={this.changeMasterNone.bind(this)} >None</button>
          <button type='button' onClick={this.changeMasterPower.bind(this)} >Power</button>
          <button type='button' onClick={this.changeMasterDance.bind(this)} >Dance</button>
        </p>
        <p>
          <button type="button" onClick={this.startPlay.bind(this)} >Play</button>
          <button type="button" onClick={this.stopAll.bind(this)} >Stop</button>
        </p>
        <p>Component</p>
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[bass, hit, synth]} drums={[hihat, drum, snare, pedal]} />
        <hr />
        <p>Sources: <a href={'https://www.npmjs.com/package/midi-sounds-react'}>https://www.npmjs.com/package/midi-sounds-react</a></p>
      </div>
    );
  }
}

export default App;