import { useDrag } from 'react-dnd';
import { Document } from '../types/document';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const [{ isDragging }, dragRef] = useDrag<{ id: string }, void, { isDragging: boolean }>(() => ({
    type: 'document',
    item: { id: document.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as unknown as React.LegacyRef<HTMLDivElement>}
      className={`p-3 bg-white rounded shadow cursor-move ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <h3>{document.title}</h3>
    </div>
  );
};

export default DocumentCard; 