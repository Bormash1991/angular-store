import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import {
  Comments,
  TypeOfProduct,
  TypeOfProductDb,
} from '../../models/TypeOfProduct.inteface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as uniqid from 'uniqid';
import { map, switchMap, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private UsersService: UsersService
  ) {}
  getProducts() {
    return this.db
      .list<TypeOfProductDb>(`products`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              ...(c.payload.val() as TypeOfProductDb),
              id: c.payload.key as string,
              comments: this.transformData<Comments>(
                (c.payload.val() as TypeOfProductDb).comments
              ),
              characteristics: (c.payload.val() as TypeOfProductDb)
                .characteristics
                ? (c.payload.val() as TypeOfProductDb).characteristics
                : [],
              otherIds: (c.payload.val() as TypeOfProductDb).otherIds
                ? (c.payload.val() as TypeOfProductDb).otherIds
                : [],
              images: this.transformDataToArr<string>(
                (c.payload.val() as TypeOfProductDb).images
              ),
            } as TypeOfProduct;
          })
        )
      );
  }
  checkProductInWishlist(id: string) {
    return this.UsersService.getUser().pipe(
      switchMap((user) => this.UsersService.getUserInf(user?.uid!)),
      map((userInf) => {
        if (!userInf) {
          return 'unAuth';
        }
        if (!userInf.wishList) {
          return false;
        }
        return id in userInf?.wishList;
      })
    );
  }
  addToWishList(id: string) {
    this.UsersService.getUser()
      .pipe(
        switchMap((user) =>
          this.db.object(`users/${user?.uid}/wishList/${id}`).set(true)
        )
      )
      .subscribe();
  }
  deleteFromWishList(id: string) {
    this.UsersService.getUser()
      .pipe(
        switchMap((user) =>
          this.db.object(`users/${user?.uid}/wishList/${id}`).remove()
        )
      )
      .subscribe();
  }
  getProductsByCategory(category: string) {
    return this.db
      .list<TypeOfProductDb>(`products`, (ref) =>
        ref.orderByChild('category').equalTo(category)
      )
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => {
            return {
              ...(c.payload.val() as TypeOfProductDb),
              id: c.payload.key as string,
              comments: this.transformData<Comments>(
                (c.payload.val() as TypeOfProductDb).comments
              ),
              characteristics: (c.payload.val() as TypeOfProductDb)
                .characteristics
                ? (c.payload.val() as TypeOfProductDb).characteristics
                : [],
              otherIds: (c.payload.val() as TypeOfProductDb).otherIds
                ? (c.payload.val() as TypeOfProductDb).otherIds
                : [],
              images: this.transformDataToArr<string>(
                (c.payload.val() as TypeOfProductDb).images
              ),
            } as TypeOfProduct;
          })
        )
      );
  }
  getProductById(id: string) {
    return this.db
      .object<TypeOfProductDb>(`products/${id}`)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          if (changes.key) {
            return {
              ...(changes.payload.val() as TypeOfProductDb),
              id: changes.payload.key as string,
              comments: this.transformData<Comments>(
                (changes.payload.val() as TypeOfProductDb).comments
              ),
              characteristics: (changes.payload.val() as TypeOfProductDb)
                .characteristics
                ? (changes.payload.val() as TypeOfProductDb).characteristics
                : [],
              otherIds: (changes.payload.val() as TypeOfProductDb).otherIds
                ? (changes.payload.val() as TypeOfProductDb).otherIds
                : [],
              images: this.transformDataToArr<string>(
                (changes.payload.val() as TypeOfProductDb).images
              ),
            } as TypeOfProduct;
          } else {
            return null;
          }
        })
      );
  }
  setProduct(product: TypeOfProduct, files: File[]) {
    this.db
      .list('products')
      .push({ ...product })
      .then((req) => {
        files.forEach((file, i) => {
          const id = uniqid();
          const filePath = `products/${product.name}/${id}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, file).then(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.db.list(`products/${req.key}/images`).push(url);
            });
          });
        });
      });
  }
  getComments(id: string) {
    return this.db
      .list<Comments>(`products${id}/comments`)
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            ...(c.payload.val() as Comments),
            id: c.payload.key as string,
          }))
        )
      );
  }
  addComment(productId: string, comment: Comments) {
    return this.db.list(`products/${productId}/comments`).push(comment);
  }
  deleteComment(productId: string, id: string) {
    this.db.list(`products/${productId}/comments/${id}`).remove();
  }
  transformData<T>(data: { [key: string]: T }): T[] {
    if (data) {
      const valuesArr = [];

      for (const [key, value] of Object.entries(data)) {
        valuesArr.push({ ...value, id: key });
      }
      return valuesArr;
    }
    return [];
  }
  transformDataToArr<T>(data: { [key: string]: T }): T[] {
    if (data) {
      const valuesArr = [];
      for (const value of Object.values(data)) {
        valuesArr.push(value);
      }
      return valuesArr;
    }
    return [];
  }
  updateProduct(
    productId: string,
    product: TypeOfProduct,
    img: (string | ArrayBuffer | null)[],
    files: File[]
  ) {
    this.db
      .object(`products/${productId}`)
      .update({ ...product })
      .then(() => {
        this.db.object(`products/${productId}/images`).remove();
      })
      .then(() => {
        img.forEach((image, i) => {
          this.db.list(`products/${productId}/images`).push(image);
        });
        files.forEach((file) => {
          const id = uniqid();
          const filePath = `products/${product.name}/${id}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, file).then(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.db.list(`products/${productId}/images`).push(url);
            });
          });
        });
      });
  }
  deleteProduct(productId: string) {
    this.db.object(`products/${productId}`).remove();
  }
}
