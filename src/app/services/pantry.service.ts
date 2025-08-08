import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  CollectionReference,
  DocumentData,
  query,
  orderBy,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { PantryItem } from '../models/pantry-item.interface';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PantryService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private pantryCollection: CollectionReference<DocumentData>;

  constructor() {
    this.pantryCollection = collection(this.firestore, 'pantryItems');
  }

  async addPantryItem(item: Omit<PantryItem, 'id' | 'createdAt'>): Promise<void> {
    try {
      const user = this.auth.currentUser;
      await addDoc(this.pantryCollection, {
        ...item,
        userId: user?.uid ?? null,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error adding pantry item:', error);
      throw new Error('Failed to add pantry item');
    }
  }

  getPantryItems(): Observable<PantryItem[]> {
    const user = this.auth.currentUser;
    const q = user
      ? query(this.pantryCollection, where('userId', '==', user.uid), orderBy('createdAt', 'desc'))
      : query(this.pantryCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<PantryItem[]>;
  }

  async deletePantryItem(id: string): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'pantryItems', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting pantry item:', error);
      throw new Error('Failed to delete pantry item');
    }
  }

  async updatePantryItem(id: string, updates: Partial<Omit<PantryItem, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'pantryItems', id);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error('Error updating pantry item:', error);
      throw new Error('Failed to update pantry item');
    }
  }
}
