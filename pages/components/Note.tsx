import React, { useEffect } from "react";
import { AppNote } from "../../styles/AppNote";
import { INote } from "./BeatMaker";

interface NoteProps {
  id: string;
  index: number;
  note: INote;
  update: Function;
}

export default function Note({ id, index, note, update }: NoteProps) {
  // useEffect(() => console.log(note), []);

  //
  return (
    <AppNote
      id={id}
      play={note.play}
      barHead={note.beat === 1}
      onClick={() => update(index, note)}
    >
      <div>{index + 1}</div>
    </AppNote>
  );
}
