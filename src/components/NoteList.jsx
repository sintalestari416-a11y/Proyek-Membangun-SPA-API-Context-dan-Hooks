import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';

function NoteList({ notes }) {
  if (notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty-message">Tidak ada catatan.</p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} id={note.id} {...note} />
      ))}
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default NoteList;