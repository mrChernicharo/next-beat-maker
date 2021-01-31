import { useEffect, useState } from "react";
import { AppSelect } from "../../styles/Select";
import { Instrument } from "./Instrument";

export default function Controls() {
  const beatOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const barOptions = [1, 2, 3, 4];

  const [tempo, setTempo] = useState(120);
  const [beats, setBeats] = useState(4);
  const [bars, setBars] = useState(barOptions[0]);

  function handleTempoSlider(val) {
    console.log(val);
    setTempo(val);
  }

  function handleBeatsChange(val) {
    setBeats(val);
  }

  function handleBarsChange(val) {
    setBars(val);
  }

  return (
    <div>
      <div>
        <h5>State Values</h5>
        <p>{beats}</p>
        <p>{bars}</p>
        <p>{tempo}</p>
      </div>

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
      <div className="beats-per-bar-select">
        <label htmlFor="beats">Beats</label>
        <AppSelect
          name="beats"
          onChange={(e) => handleBeatsChange(e.target.value)}
          value={beats}
        >
          {beatOptions.map((v) => (
            <option value={v}>{v}</option>
          ))}
        </AppSelect>
      </div>

      <div className="bars-select">
        <label htmlFor="bars">Bars</label>
        <AppSelect
          name="bars"
          onChange={(e) => handleBarsChange(e.target.value)}
          value={bars}
        >
          {barOptions.map((b) => (
            <option value={b}>{b}</option>
          ))}
        </AppSelect>
      </div>

      <div>
        <Instrument tempo={tempo} bars={bars} beats={beats} />
      </div>
    </div>
  );
}
