import React, { useEffect, useState } from "react";
import { InstrumentRow } from "../../styles/InstrumentRow";
import { AppSelect, AppSelectContainer } from "../../styles/Select";
import AppNote from "./Note";
import PlayPause from "./PlayPause";

export interface INote {
  play: boolean;
  beat?: number;
  click?: number;
}

export interface Track {
  intrument: string;
  beats: number;
  clicks: number;
  notes: INote[];
  playing: boolean;
}

export function BeatMaker() {
  const beatOptions = [2, 3, 4, 6];
  const clickOptions = [1, 2, 3, 4];
  const initialNotes: INote[] = [
    { play: false, click: 1, beat: 1 },
    { play: false, click: 1, beat: 2 },
    { play: false, click: 2, beat: 1 },
    { play: false, click: 2, beat: 2 },
    { play: false, click: 3, beat: 1 },
    { play: false, click: 3, beat: 2 },
    { play: false, click: 4, beat: 1 },
    { play: false, click: 4, beat: 2 },
  ];
  const initialTrack: Track = {
    beats: 2,
    clicks: 4,
    intrument: "hi-hat",
    notes: initialNotes,
    playing: false,
  };

  const [tempo, setTempo] = useState(120);
  const [track, setTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(null);

  const resetTrackNotes = (beats: number, clicks: number) => {
    // console.log(clicks);
    const notes: INote[] = [];
    const trackLength = beats * clicks;
    for (let i = 0; i < trackLength; i++) {
      notes.push({
        play: false,
        click: Math.ceil((i + 1) / beats),
        beat: (i % beats) + 1,
      });
    }
    return notes;
  };

  useEffect(() => {
    // console.log(track);
    if (loop) {
      killLoop();
      playLoop(tempo);
    }
  }, [track.clicks, track.beats, track.notes]);

  useEffect(() => {
    // console.log("playing -> " + isPlaying);

    if (isPlaying) {
      playLoop(tempo);
    } else {
      killLoop();
    }
  }, [isPlaying]);

  function handleTempoSlider(val: number) {
    // console.log(val);
    setTempo(val);
  }

  function handleBeatsChange(val: number) {
    // console.log("beats " + val);
    const newNotes = resetTrackNotes(val, track.clicks);
    setTrack({ ...track, beats: val, notes: newNotes });
  }

  function handleClicksChange(val: number) {
    // console.log("clicks " + val);

    const newNotes = resetTrackNotes(track.beats, val);
    setTrack({ ...track, clicks: val, notes: newNotes });
  }

  function handlePlay() {
    setIsPlaying(!isPlaying);
  }

  function updateNote(i: number, note: INote) {
    const updatedTrack: INote[] = Object.assign([], track.notes, {
      [i]: { play: !note.play, click: note.click, beat: note.beat },
    });

    setTrack({ ...track, notes: updatedTrack });
  }

  function playLoop(tempo) {
    const totalBeats = track.beats;
    const totalclicks = track.clicks;
    const trackLength = totalBeats * totalclicks;

    let click = 1;
    let beat = 1;
    let pos = 1;

    let loopInterval = setInterval(() => {
      updateUI(beat, click, pos);

      if (beat !== totalBeats) {
        beat++;
      } else if (beat === totalBeats) {
        beat = 1;
        if (click !== totalclicks) {
          click++;
        } else if (click === totalclicks) {
          click = 1;
        }
      }

      if (click === 1 && beat === 1) {
        pos = 1;
      } else {
        pos++;
      }
    }, Math.round(60_000 / (tempo * totalBeats)));

    setLoop(loopInterval);
  }

  function killLoop() {
    setLoop(clearInterval(loop));
    clearUI();
  }

  function updateUI(beat: number, click: number, pos: number) {
    console.log({ beat, click, pos });
    const curentNoteEl = document.querySelector(`#click-${click}-beat-${beat}`);
    const previousNoteEl = (beat, click) => {
      if (click === 1 && beat === 1) {
        // pega a última div
        return document.querySelector(
          `#click-${track.clicks}-beat-${track.beats}`
        );
      } else {
        // pega a anterior
        if (beat !== 1) {
          return document.querySelector(`#click-${click}-beat-${beat - 1}`);
        } else {
          return document.querySelector(
            `#click-${click - 1}-beat-${track.beats}`
          );
        }
      }
    };

    curentNoteEl.classList.add("current-note");
    previousNoteEl(beat, click).classList.remove("current-note");
    // console.log(curentNoteEl);
  }
  function clearUI() {
    const remainingEl = document.querySelector(".current-note");

    if (remainingEl) {
      // console.log(remainingEl);
      remainingEl.classList.remove("current-note");
    }
  }

  return (
    <div>
      <AppSelectContainer>
        <label htmlFor="beats">Beats</label>
        <AppSelect
          name="beats"
          onChange={(e) => handleBeatsChange(+e.target.value)}
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
        <label htmlFor="clicks">clicks</label>
        <AppSelect
          name="clicks"
          onChange={(e) => handleClicksChange(+e.target.value)}
          value={track.clicks}
        >
          {clickOptions.map((b) => (
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
          onChange={(e) => handleTempoSlider(+e.target.value)}
        />
        <span>{tempo}</span>
      </div>

      <PlayPause isPlaying={isPlaying} playToggle={handlePlay} />

      <InstrumentRow>
        {track.notes.map((note, i) => (
          <div className={note.beat === 1 ? "click-head" : ""} key={i}>
            {note.beat === 1 ? "◦" : ""}
            <AppNote
              id={`click-${note.click}-beat-${note.beat}`}
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
