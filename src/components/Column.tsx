import { useDrop } from 'react-dnd';
import { Document, ColumnType } from '../types/document';
import DocumentCard from './DocumentCard';

interface ColumnProps {
  title: string;
  status: ColumnType;
  documents: Document[];
  onDropDocument: (documentId: string, status: ColumnType) => void;
}

const Column = ({ title, status, documents, onDropDocument }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'document',
    drop: (item: { id: string }) => {
      onDropDocument(item.id, status);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      className={`flex flex-col p-4 bg-gray-100 rounded-lg w-80 ${
        isOver ? 'bg-gray-200' : ''
      }`}
    >
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="space-y-2">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
};

export default Column; 