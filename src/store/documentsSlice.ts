import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document } from '../types/document';

interface DocumentsState {
  documents: Document[];
}

const initialState: DocumentsState = {
  documents: [
    { id: "1", title: "Документ 1", status: "in-progress" },
    { id: "2", title: "Документ 2", status: "in-progress" },
    { id: "3", title: "Документ 3", status: "under-review" },
  ]
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<{ title: string }>) => {
      const newDocument: Document = {
        id: Date.now().toString(),
        title: action.payload.title,
        status: 'in-progress'
      };
      state.documents.push(newDocument);
    },
    updateDocumentStatus: (state, action: PayloadAction<{ id: string; status: Document['status'] }>) => {
      const document = state.documents.find(doc => doc.id === action.payload.id);
      if (document) {
        document.status = action.payload.status;
      }
    }
  }
});

export const { addDocument, updateDocumentStatus } = documentsSlice.actions;
export default documentsSlice.reducer; 