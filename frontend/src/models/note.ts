export type Note = {
  id: number;
  text: string;
  label?: string;
  color?: string;
  backgroundColor?: string;
}

export type NoteForm = Partial<Pick<Note, "label" | "color" | "text" | "backgroundColor">>;