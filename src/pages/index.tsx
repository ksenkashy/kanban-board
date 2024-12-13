import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Column from '../components/Column';
import { RootState } from '../store/store';
import { addDocument, updateDocumentStatus } from '../store/documentsSlice';
import { ColumnType } from '../types/document';

export default function Home() {
  const dispatch = useDispatch();
  const documents = useSelector((state: RootState) => state.documents.documents);
  const [newDocumentTitle, setNewDocumentTitle] = useState('');

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDocumentTitle.trim()) {
      dispatch(addDocument({ title: newDocumentTitle }));
      setNewDocumentTitle('');
    }
  };

  const handleDropDocument = (documentId: string, newStatus: ColumnType) => {
    dispatch(updateDocumentStatus({ id: documentId, status: newStatus }));
  };

  const columns = [
    { title: 'В работе', status: 'in-progress' as const },
    { title: 'На проверке', status: 'under-review' as const },
    { title: 'Завершено', status: 'completed' as const },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-8">Канбан-доска</h1>
        
        <form onSubmit={handleAddDocument} className="mb-8">
          <input
            type="text"
            value={newDocumentTitle}
            onChange={(e) => setNewDocumentTitle(e.target.value)}
            placeholder="Название нового документа"
            className="p-2 border rounded mr-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Добавить документ
          </button>
        </form>

        <div className="flex gap-4">
          {columns.map((column) => (
            <Column
              key={column.status}
              title={column.title}
              status={column.status}
              documents={documents.filter((doc) => doc.status === column.status)}
              onDropDocument={handleDropDocument}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
} 