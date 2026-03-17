import React, { useState, useEffect, useContext } from 'react';
import { getArchivedNotes } from '../utils/network-data';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LanguageContext from '../contexts/LanguageContext';
import LoadingIndicator from '../components/LoadingIndicator'; 

function ArchivesPage() {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchArchivedNotes() {
      const { data } = await getArchivedNotes();
      setNotes(data);
      setIsLoading(false);
    }
    fetchArchivedNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>{language === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <SearchBar 
        keyword={keyword} 
        keywordChange={setKeyword} 
        placeholder={language === 'id' ? 'Cari berdasarkan judul...' : 'Search by title...'}
      />
      
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <NoteList notes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivesPage;