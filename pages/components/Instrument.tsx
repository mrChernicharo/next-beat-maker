import { useState } from "react";
import { InstrumentRow } from "../../styles/InstrumentRow";

interface IInstrumentProps {
  tempo: number;
  bars: number;
  beats: number;
}

export function Instrument({ tempo, bars, beats }: IInstrumentProps) {
  const track = (bars, beats) => {
    let arr = [];
    let times = bars * beats;

    for (let i = 0; i < times; i++) {
      arr.push(i);
    }
    return arr;
  };

  const [activeCell, setActiveCell] = useState(false);

  return (
    <InstrumentRow>
      {track(beats, bars).map((b) => (
        <div
          onClick={() => setActiveCell(!activeCell)}
          className={activeCell ? "active-note" : ""}
          key={b}
        >
          {b + 1}
        </div>
      ))}
    </InstrumentRow>
  );
}
