import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StaticStorageService {
  isDevice: boolean | undefined;
  baseUrl = 'http://localhost:9901/admin/';
  storageName = 'portfolio_storage';
  noImageUrl =
    'https://christtube-uat.s3.ap-south-1.amazonaws.com/no-image.png';
  tocken =
    '1000.f5fbb4a22da66576f7c4fcae5b1947d1.f79dfa1864612fd1a70fc1230fb593c4';
  authtocken: any;
  userId: any;
  accessToken: any;
  refreshToken: any;
  parent_id: any;
  membership_type_id: any;
  profileType: any;
  email: any;
  first_name: any;
  full_name: any;
  slug: any;
  is_premium_user: boolean = false;
  profileImage: any;
  role: any;
  isLoggedin: boolean = false;
  isProfileCompleted: boolean = false;
  walls: any = [];
  newEmail: any;
  channelId: any;
  isLogin: boolean = false;

  constructor(private route: Router) {}

  /**
   * This function is called to change router
   * @param url
   */
  routeChange(url: string, slug?: string) {
    if (slug) this.route.navigateByUrl(`${slug}/${url}`);
    else this.route.navigateByUrl(url);
  }
}
