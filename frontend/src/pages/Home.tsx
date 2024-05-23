import { useEffect, useState } from 'react';
import api from '../api';
import NoteItem, { Note } from '../components/NoteItem';
import '../assets/sass/Home.scss';

function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    api
      .get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log({ data });
      })
      .catch((error) => console.log(error));
  }

  async function deleteNote(id: number) {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) console.log('Note deleted!');
        else console.log('Failed to delete note.');
        getNotes();
      })
      .catch((error) => console.log(error));
  }

  async function createNote(e: React.FormEvent) {
    e.preventDefault();
    api
      .post('/api/notes/', { content, title })
      .then((res) => {
        if (res.status === 201) console.log('Note created!');
        else console.log('Failed to make note.');
        getNotes();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <main className='home'>
        <section className='notes'>
          <h2>Notes</h2>
          {notes.map((note) => (
            <NoteItem note={note} onDelete={deleteNote} key={note.id} />
          ))}
        </section>

        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor='title'>Title:</label>
          <br />
          <input
            type='text'
            id='title'
            name='title'
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label htmlFor='content'>Content:</label>
          <br />
          <textarea
            id='content'
            name='content'
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}></textarea>
          <br />
          <input type='submit' value='Submit' className='submit'></input>
        </form>
      </main>
    </>
  );
}

export default Home;
