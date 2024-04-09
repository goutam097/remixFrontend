import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { StaticStorageService } from '../local-storage/static-storage.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private platform: Platform,
    private staticData: StaticStorageService,
    private storage: LocalStorageService,
    private route: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const that = this;
    return new Observable((observer) => {
      that.platform.ready().then(() => {
        that.storage
          .getObject(this.staticData.storageName)
          .then(async (val: any) => {
            await that.storage.get_all_Details();
            const userId = JSON.parse(val)?._id
            const fullUrl: string = this.platform.url();

            if(!userId && (fullUrl.includes('login') || fullUrl.includes('registration') || fullUrl.includes('forgot-password') || fullUrl.includes('reset-password'))){
              observer.next(true);
              that.route.navigateByUrl(state.url);
            } else if(userId && (fullUrl.includes('login') || fullUrl.includes('registration') || fullUrl.includes('forgot-password') || fullUrl.includes('reset-password'))) {
              observer.next(true);
              that.route.navigateByUrl('home');
            } else if(!userId && fullUrl.includes('home')) {
              observer.next(true);
              that.route.navigateByUrl('login');
            }else{
              observer.next(true);
              that.route.navigateByUrl(state.url);
            }
            // observer.next(true);
          });
      });
    });
  }
}
