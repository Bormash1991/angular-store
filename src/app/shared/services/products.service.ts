import { Injectable } from '@angular/core';
import {
  Comments,
  TypeOfProduct,
  TypeOfProductDb,
} from '../../models/TypeOfProduct.inteface';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as uniqid from 'uniqid';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
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
              // otherIds: this.transformDataToArr<string>(
              //   (c.payload.val() as TypeOfProductDb).otherIds
              // ),
              images: this.transformDataToArr<string>(
                (c.payload.val() as TypeOfProductDb).images
              ),
            } as TypeOfProduct;
          })
        )
      );
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
              // otherIds: this.transformDataToArr<string>(
              //   (c.payload.val() as TypeOfProductDb).otherIds
              // ),
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
              // otherIds: this.transformDataToArr<string>(
              //   (changes.payload.val() as TypeOfProductDb).otherIds
              // ),
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
    this.db.list(`products/${productId}/comments`).push(comment);
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
