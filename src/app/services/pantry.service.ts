import { Injectable, inject, OnDestroy, signal } from '@angular/core';
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
  where,
  getDoc,
  setDoc,
  onSnapshot
} from '@angular/fire/firestore';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PantryItem, UserPantry } from '../models/pantry-item.interface';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PantryService implements OnDestroy {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private userPantryCollection: CollectionReference<DocumentData>;
  private subscription: Subscription | null = null;

  // Signal for components to consume
  readonly pantryItemsSig = signal<PantryItem[]>([]);

  constructor() {
    this.userPantryCollection = collection(this.firestore, 'userPantries');
    // Subscribe once and feed the signal; zoneless-friendly
    this.subscription = authState(this.auth)
      .pipe(
        switchMap(user => {
          if (!user) {
            return of([] as PantryItem[]);
          }
          const userDocRef = doc(this.userPantryCollection, user.uid);
          return new Observable<PantryItem[]>(observer => {
            const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
              if (docSnapshot.exists()) {
                const userData = docSnapshot.data() as UserPantry;
                // Sort items by createdAt descending
                const sortedItems = [...userData.items].sort((a, b) => 
                  b.createdAt.toMillis() - a.createdAt.toMillis()
                );
                observer.next(sortedItems);
              } else {
                observer.next([]);
              }
            }, (error) => {
              console.error('Error listening to user pantry:', error);
              observer.next([]);
            });
            
            return () => unsubscribe();
          });
        })
      )
      .subscribe(items => this.pantryItemsSig.set(items));
  }

  async addPantryItem(item: Omit<PantryItem, 'id' | 'createdAt'>): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated');
    }
    try {
      const userDocRef = doc(this.userPantryCollection, user.uid);
      const userDoc = await getDoc(userDocRef);
      
      const newItem: PantryItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: serverTimestamp() as any
      };
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserPantry;
        const updatedItems = [...userData.items, newItem];
        await updateDoc(userDocRef, {
          items: updatedItems,
          updatedAt: serverTimestamp()
        });
      } else {
        const newUserPantry: UserPantry = {
          userId: user.uid,
          items: [newItem],
          updatedAt: serverTimestamp() as any
        };
        await setDoc(userDocRef, newUserPantry);
      }
    } catch (error) {
      console.error('Error adding pantry item:', error);
      throw new Error('Failed to add pantry item');
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  async deletePantryItem(id: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated');
    }
    try {
      const userDocRef = doc(this.userPantryCollection, user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserPantry;
        const updatedItems = userData.items.filter(item => item.id !== id);
        await updateDoc(userDocRef, {
          items: updatedItems,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error deleting pantry item:', error);
      throw new Error('Failed to delete pantry item');
    }
  }

  async updatePantryItem(id: string, updates: Partial<Omit<PantryItem, 'id' | 'createdAt'>>): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated');
    }
    try {
      const userDocRef = doc(this.userPantryCollection, user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserPantry;
        const updatedItems = userData.items.map(item => 
          item.id === id ? { ...item, ...updates } : item
        );
        await updateDoc(userDocRef, {
          items: updatedItems,
          updatedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error updating pantry item:', error);
      throw new Error('Failed to update pantry item');
    }
  }
}
