import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveNotes } from '../utils/network-data';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LanguageContext from '../contexts/LanguageContext';
import LoadingIndicator from '../components/LoadingIndicator'; 
import { FiPlus } from 'react-icons/fi';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await getActiveNotes();
      setNotes(data);
      setIsLoading(false); 
    }
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="homepage">
      <h2>{language === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={setKeyword} />
      
      {}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <NoteList notes={filteredNotes} />
      )}
      
      <div className="homepage__action">
        <button type="button" title={language === 'id' ? 'Tambah' : 'Add'} onClick={() => navigate('/notes/new')}>
          <FiPlus />
        </button>
      </div>
    </section>
  );
}

export default HomePage;