import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StaticStorageService } from './static-storage.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private userDetails = new Subject<string>();

  constructor(
    private storage: Storage,
    private stData: StaticStorageService,
    private platform: Platform,
    private router: Router
  ) {}

  /**
   * this function is called to set data in key value pair from storage
   */
  async set(key: string, value: any): Promise<any> {
    try {
      await this.storage.create();
      const result = await this.storage.set(key, value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  /**
   * this function is called to get data in key value pair from storage
   */
  async get(key: string): Promise<any> {
    try {
      await this.storage.create();
      const result = await this.storage.get(key);
      if (result != null) {
        return result;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * this function is called to set a object in key value pair
   */
  async setObject(key: string, object: Object) {
    try {
      await this.storage.create();
      const result = await this.storage.set(key, JSON.stringify(object));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public getObservableDetails(): Observable<string> {
    return this.userDetails.asObservable();
  }

  public setObservableDetails(data: any) {
    this.userDetails.next(data);
  }

  /**
   * this function is called to get a object in key value pair
   */
  async getObject(key: string): Promise<any> {
    try {
      await this.storage.create();
      const result = await this.storage.get(key);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  /**
   * this function is called to get Login data
   */
  async getLoginData(): Promise<any> {
    try {
      await this.storage.create();
      const result = await this.storage.get(this.stData.storageName);
      await this.get_all_Details();
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  /**
   * this function is called to get user details
   */
  async get_all_Details() {
    try {
      await this.getObject(this.stData.storageName).then((resu) => {
        const sess = JSON.parse(resu);
        if (sess) {
          this.stData.isLoggedin = true;
          this.stData.userId = sess._id;
          this.stData.accessToken = sess.accessToken;
          this.stData.refreshToken = sess.refreshToken;
          this.stData.profileType = sess.profileType;
          this.stData.membership_type_id = sess.membership_type_id;
          this.stData.is_premium_user = sess.is_premium_user;
          this.stData.first_name = sess.first_name;
          this.stData.full_name = sess.full_name;
          this.stData.email = sess.email;
          this.stData.newEmail = sess.new_email;
          this.stData.profileImage = sess.resize_profile_image;
          this.stData.parent_id = sess?.parent_id;
          this.stData.slug = sess?.slug;
          this.stData.role = sess?.role;
          this.stData.isProfileCompleted = sess?.isProfileCompleted;
          this.stData.walls = sess?.permissions;
        } else {
          this.stData.isLoggedin = false;
          this.stData.userId = null;
          this.stData.accessToken = null;
          this.stData.refreshToken = null;
          this.stData.profileType = null;
          this.stData.membership_type_id = null;
          this.stData.is_premium_user = false;
          this.stData.email = null;
          this.stData.newEmail = sess.new_email;
          this.stData.first_name = null;
          this.stData.full_name = null;
          this.stData.profileImage = null;
          this.stData.parent_id = null;
          this.stData.slug = null;
          this.stData.role = null;
          this.stData.isProfileCompleted = false;
          this.stData.walls = [];
        }
      });
    } catch (reason) {
      console.log(reason);
    }
  }

  /**
   * Logout a user from the session
   */
  async logout() {
    this.storage.create();
    this.storage.remove(this.stData.storageName).then((sessdata:any) => {
      this.storage.clear();
      // this.storage.remove(this.stData.guestCartItemName);
      this.storage.clear();
      this.stData.isLoggedin = false;
      this.stData.userId = null;
      this.stData.accessToken = null;
      this.stData.refreshToken = null;
      this.stData.profileType = null;
      this.stData.membership_type_id = null;
      this.stData.is_premium_user = false;
      this.stData.email = null;
      this.stData.newEmail = null;
      this.stData.first_name = null;
      this.stData.full_name = null;
      this.stData.profileImage = null;
      this.stData.parent_id = null;
      this.stData.slug = null;
      this.stData.role = null;
      this.stData.isProfileCompleted = false;
      this.stData.walls = [];
      this.setObservableDetails('logout');
      const fullUrl = this.platform.url() || '';
      const path = this.router.url || '';
      const domain = fullUrl.split(path)[0];
      window.location.href = `${domain}/login`;
      // this.stData.routeChange('/login');
      // window.location.reload();
    });
  }
}
