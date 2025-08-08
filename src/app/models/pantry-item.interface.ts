import { Timestamp } from '@angular/fire/firestore';

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  createdAt: Timestamp;
  userId?: string;
}
