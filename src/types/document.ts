export interface Document {
  id: string;
  title: string;
  status: "in-progress" | "under-review" | "completed";
}

export type ColumnType = Document["status"]; 