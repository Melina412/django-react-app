import '../assets/sass/NoteItem.scss';

export interface Note {
  title: string;
  content: string;
  created_at: Date;
  author: number;
  id: number;
}

type NoteProps = {
  note: Note;
  onDelete: (id: number) => Promise<void>;
};

function NoteItem({ note, onDelete }: NoteProps) {
  const formattedDate = new Date(note.created_at).toLocaleDateString('de-DE');

  return (
    <div className='note-container'>
      <p className='note-title'>{note.title}</p>
      <p className='note-content'>{note.content}</p>
      <p className='note-date'>{formattedDate}</p>
      <button className='delete-button' onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default NoteItem;
