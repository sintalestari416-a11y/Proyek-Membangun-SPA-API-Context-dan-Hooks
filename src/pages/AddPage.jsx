import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext';
import { FiCheck } from 'react-icons/fi';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  async function onSubmitHandler() {
    if (!title || !body) {
      alert(language === 'id' ? 'Judul dan isi catatan wajib diisi!' : 'Title and body are required!');
      return;
    }

    const { error } = await addNote({ title, body });
    if (!error) navigate('/');
  }

  return (
    <section className="add-new-page">
      <h2>
        {language === 'id' ? 'Tambah Catatan Baru' : 'Add New Note'}
      </h2>
      <div className="add-new-page__input">
        <input
          type="text"
          className="add-new-page__input__title"
          placeholder={language === 'id' ? 'Judul catatan...' : 'Note title...'}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoComplete="off"
        />
        <textarea
          className="add-new-page__input__body"
          placeholder={language === 'id' ? 'Tuliskan isi catatan di sini...' : 'Write your note here...'}
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
      </div>
      <div className="add-new-page__action">
        <button
          type="button"
          title={language === 'id' ? 'Simpan' : 'Save'}
          onClick={onSubmitHandler}
        >
          <FiCheck />
        </button>
      </div>
    </section>
  );
}

export default AddPage;