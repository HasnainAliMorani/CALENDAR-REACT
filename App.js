import { useState, useEffect } from 'react';
import { fetchEvents, addEvent } from './api';
import { format } from 'date-fns';

function App() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleAdd = async () => {
    if (!title || !date) return;
    const newEvent = await addEvent({ title, date });
    setEvents([...events, newEvent]);
    setTitle('');
    setDate('');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>React Calendar App</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAdd}>Add Event</button>
      </div>

      <ul>
        {events.length === 0 ? (
          <li>No events yet.</li>
        ) : (
          events.map((e) => (
            <li key={e.id}>
              {format(new Date(e.date), 'PPP')} - {e.title}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
