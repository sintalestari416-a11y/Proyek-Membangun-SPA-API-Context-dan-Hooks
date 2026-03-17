import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';
import LanguageContext from '../contexts/LanguageContext';
import LoadingIndicator from '../components/LoadingIndicator'; 
import { FiArchive, FiTrash2, FiRotateCcw } from 'react-icons/fi';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    async function fetchDetailNote() {
      const { data } = await getNote(id);
      setNote(data);
      setIsLoading(false);
    }
    fetchDetailNote();
  }, [id]);

  if (isLoading) {
    return (
      <section className="detail-page">
        <LoadingIndicator />
      </section>
    );
  }

  if (!note) {
    return (
      <section className="detail-page">
        <p>{language === 'id' ? 'Catatan tidak ditemukan!' : 'Note not found!'}</p>
      </section>
    );
  }

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
      navigate('/');
    } else {
      await archiveNote(id);
      navigate('/archives');
    }
  };

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>
      
      <div className="detail-page__action">
        <button 
          className="action" 
          title={note.archived 
            ? (language === 'id' ? 'Aktifkan' : 'Unarchive') 
            : (language === 'id' ? 'Arsipkan' : 'Archive')} 
          onClick={onArchiveHandler}
        >
          {note.archived ? <FiRotateCcw /> : <FiArchive />}
        </button>
        <button 
          className="action" 
          title={language === 'id' ? 'Hapus' : 'Delete'} 
          onClick={onDeleteHandler}
        >
          <FiTrash2 />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;