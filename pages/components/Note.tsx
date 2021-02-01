import React, { useEffect } from "react";
import { AppNote } from "../../styles/AppNote";
import { INote } from "./BeatMaker";

interface NoteProps {
  index: number;
  note: INote;
  update: Function;
}

export default function Note({ index, note, update }: NoteProps) {
  // useEffect(() => console.log(note), []);

  //
  return (
    <AppNote
      play={note.play}
      barHead={note.beat === 1}
      onClick={() => update(index, note)}
    >
      <div>{index + 1}</div>
    </AppNote>
  );
}
