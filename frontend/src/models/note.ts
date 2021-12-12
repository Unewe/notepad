export type Note = {
  id: number;
  text: string;
  label?: string;
  color?: string;
}

export type NoteForm = Partial<Pick<Note, "label" | "color" | "text">>;