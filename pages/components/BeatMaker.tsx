import React, { useEffect, useState } from "react";
import { InstrumentRow } from "../../styles/InstrumentRow";
import { AppSelect, AppSelectContainer } from "../../styles/Select";
import AppNote from "./Note";

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
    { play: false, bar: 2, beat: 3 },
    { play: false, bar: 2, beat: 4 },
    { play: false, bar: 3, beat: 5 },
    { play: false, bar: 3, beat: 6 },
    { play: false, bar: 4, beat: 7 },
    { play: false, bar: 4, beat: 8 },
  ];
  const initialTrack: Track = {
    beats: 4,
    bars: 2,
    intrument: "hi-hat",
    notes: initialNotes,
    playing: false,
  };

  const [tempo, setTempo] = useState(120);
  const [track, setTrack] = useState(initialTrack);
  // const [notes, setNotes] = useState(initialNotes);

  const resetTrackNotes = (beats: number, bars: number) => {
    console.log(bars);
    const notes: INote[] = [];
    const trackLength = beats * bars;
    for (let i = 0; i < trackLength; i++) {
      notes.push({
        play: false,
        beat: i + 1,
        bar: Math.ceil((i + 1) / bars),
      });
    }
    return notes;
  };

  useEffect(() => {
    console.log(track);
  }, [track.bars, track.beats, track.notes]);

  function handleTempoSlider(val) {
    console.log(val);
    setTempo(val);
  }
  function handleBeatsChange(val) {
    const newNotes = resetTrackNotes(+val, track.bars);
    setTrack({ ...track, beats: +val, notes: newNotes });
  }

  function handleBarsChange(val) {
    const newNotes = resetTrackNotes(track.beats, +val);
    setTrack({ ...track, bars: +val, notes: newNotes });
  }

  function updateNote(i: number, note: INote) {
    const updatedTrack: INote[] = Object.assign([], track.notes, {
      [i]: { play: !note.play, beat: note.beat, bar: note.bar },
    });

    setTrack({ ...track, notes: updatedTrack });
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

      <InstrumentRow>
        {track.notes.map((note, i) => (
          <div key={i}>
            <AppNote note={note} index={i} update={updateNote} />
          </div>
        ))}
      </InstrumentRow>
    </div>
  );
}
