import React, { useEffect, useState } from "react";
import { InstrumentRow } from "../../styles/InstrumentRow";
import { AppSelect, AppSelectContainer } from "../../styles/Select";
import AppNote from "./Note";
import PlayPause from "./PlayPause";

export interface INote {
  play: boolean;
  beat?: number;
  bar?: number;
}

export interface Track {
  intrument: string;
  beats: number;
  bars: number;
  notes: INote[];
  playing: boolean;
}

export function BeatMaker() {
  const beatOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const barOptions = [1, 2, 3, 4];
  const initialNotes: INote[] = [
    { play: false, bar: 1, beat: 1 },
    { play: false, bar: 1, beat: 2 },
    { play: false, bar: 2, beat: 1 },
    { play: false, bar: 2, beat: 2 },
    { play: false, bar: 3, beat: 1 },
    { play: false, bar: 3, beat: 2 },
    { play: false, bar: 4, beat: 1 },
    { play: false, bar: 4, beat: 2 },
  ];
  const initialTrack: Track = {
    beats: 2,
    bars: 4,
    intrument: "hi-hat",
    notes: initialNotes,
    playing: false,
  };

  const [tempo, setTempo] = useState(120);
  const [track, setTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(null);

  const resetTrackNotes = (beats: number, bars: number) => {
    console.log(bars);
    const notes: INote[] = [];
    const trackLength = beats * bars;
    for (let i = 0; i < trackLength; i++) {
      notes.push({
        play: false,
        bar: Math.ceil((i + 1) / beats),
        beat: (i % beats) + 1,
      });
    }
    return notes;
  };

  useEffect(() => {
    console.log(track);
    if (loop) {
      killLoop();
      playLoop(tempo);
    }
  }, [track.bars, track.beats, track.notes]);

  useEffect(() => {
    console.log("playing -> " + isPlaying);

    if (isPlaying) {
      playLoop(tempo);
    } else {
      killLoop();
    }
  }, [isPlaying]);

  function handleTempoSlider(val) {
    console.log(val);
    setTempo(val);
  }

  function handleBeatsChange(val) {
    console.log("beats " + val);
    const newNotes = resetTrackNotes(+val, track.bars);
    setTrack({ ...track, beats: +val, notes: newNotes });
  }

  function handleBarsChange(val) {
    console.log("bars " + val);

    const newNotes = resetTrackNotes(track.beats, +val);
    setTrack({ ...track, bars: +val, notes: newNotes });
  }

  function handlePlay() {
    setIsPlaying(!isPlaying);
  }

  function updateNote(i: number, note: INote) {
    const updatedTrack: INote[] = Object.assign([], track.notes, {
      [i]: { play: !note.play, bar: note.bar, beat: note.beat },
    });

    setTrack({ ...track, notes: updatedTrack });
  }

  function playLoop(tempo) {
    const beats = track.beats;
    const bars = track.bars;

    let loopInterval = setInterval(() => {
      // let current = document.querySelector(`#bar-${bars}beat-${beats}`);
      // console.log(current);
      console.log(beats * bars);
    }, Math.round(60_000 / tempo));

    setLoop(loopInterval);

    console.log("startLoop");
  }

  function killLoop() {
    setLoop(clearInterval(loop));
  }

  return (
    <div>
      <AppSelectContainer>
        <label htmlFor="beats">Beats</label>
        <AppSelect
          name="beats"
          onChange={(e) => handleBeatsChange(e.target.value)}
          value={track.beats}
        >
          {beatOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </AppSelect>
      </AppSelectContainer>
      <AppSelectContainer>
        <label htmlFor="bars">Bars</label>
        <AppSelect
          name="bars"
          onChange={(e) => handleBarsChange(e.target.value)}
          value={track.bars}
        >
          {barOptions.map((b) => (
            <option value={b}>{b}</option>
          ))}
        </AppSelect>
      </AppSelectContainer>

      <div className="tempo-slider">
        <label htmlFor="tempo">Tempo</label>
        <input
          id="tempo"
          type="range"
          min="20"
          max="400"
          value={tempo}
          onChange={(e) => handleTempoSlider(e.target.value)}
        />
        <span>{tempo}</span>
      </div>

      <PlayPause isPlaying={isPlaying} playToggle={handlePlay} />

      <InstrumentRow>
        {track.notes.map((note, i) => (
          <div className={note.beat === 1 ? "bar-head" : ""} key={i}>
            {note.beat === 1 ? "◦" : ""}
            <AppNote
              id={`bar-${note.bar}-beat-${note.beat}`}
              note={note}
              index={i}
              update={updateNote}
            />
          </div>
        ))}
      </InstrumentRow>
    </div>
  );
}
