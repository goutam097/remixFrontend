import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaticStorageService } from '../local-storage/static-storage.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private prayerWallData: any;
  constructor(
    private http: HttpClient,
    private staticData: StaticStorageService,
    private localStorage: LocalStorageService
  ) {}

  async getAccessToken() {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.staticData.baseUrl + '/auth/refresh-tokens', {
          refreshToken: this.staticData.refreshToken,
        })
        .subscribe(
          (res) => {
            const data = JSON.parse(JSON.stringify(res));
            if (data.code == 200) {
              this.localStorage
                .getObject(this.staticData.storageName)
                .then(async (data2) => {
                  let data3 = JSON.parse(data2);
                  (data3.accessToken = data?.data?.tokens?.accessToken),
                    (data3.refreshToken = data?.data?.tokens?.refreshToken);
                  await this.localStorage
                    .setObject(this.staticData.storageName, data3)
                    .then(async (storeData) => {
                      await this.localStorage.get_all_Details();
                    });
                });
              resolve(res);
            }
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  convertDateTime(dd:any){
    let date = new Date(dd);
    //let options = { timeZone: 'America/New_York' };
    //let formattedDate = date.toLocaleString('en-US', options);
    let formattedDate = date.toLocaleString('en-US');
    return new Date(formattedDate).toISOString();
    
  }

  /* this function convert time in 12 hour Format */
  convert12TimeFormat(t:string){
    const time = t;
    const [hours, minutes] = time.split(':');
    const date = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
    return formattedTime;
  }

  /* this function convert time in 24 hour Format */
  convert24HourFormat(t:string){
    let time = t;
    let [hours, minutes] = time.split(":");
    let hourss = parseInt(hours);
    let minutess = parseInt(minutes.substr(0, 2));
    if (time.endsWith("PM")) {
      if(hourss!=12)
        hourss += 12;
    }
    if (time.endsWith("AM")) {
      if(hourss==12)
        hourss = 0;
    }
    let convertedTime = (hourss < 10 ? '0' : '') + hourss + ':' + (minutess < 10 ? '0' : '') + minutess;
    return convertedTime;
  }
  
  /**
   * This function is called to hit an api with post method
   * @param data
   * @param route
   * @returns response or error
   */
  async postMethod(data: any, route: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.staticData.baseUrl + route, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * This function is called to hit an api with put method
   * @param data
   * @param route
   * @returns response or error
   */
  async putMethod(data: any, route: string) {
    return new Promise((resolve, reject) => {
      this.http.put(this.staticData.baseUrl + route, data).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * This function is called to hit an api with get method
   * @param route
   * @returns response or error
   */
  async getMethod(route: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.staticData.baseUrl + route).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * This function is called to hit an api with delete method
   * @param route
   * @returns response or error
   */
  async deleteMethod(route: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.staticData.baseUrl + route).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * This function is called to hit an api with get method
   * @param route
   * @returns response or error
   */
  async getMethodRandomUrl(route: string) {
    return new Promise((resolve, reject) => {
      this.http.get(route).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  /**
   * Common function for post method api call
   * its send json data and routes return response data or error
   * @param data
   * @param route
   * @param token
   * Developer : chandan
   */
  async postMethodWithToken(data: any, route: string, token: any) {
    //console.log(this.backendUrl+route)
    return new Promise((resolve, reject) => {
      var httpHeaders = new HttpHeaders();
      //httpHeaders = httpHeaders.append('token',token?token:'');
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
      this.http
        .post(this.staticData.baseUrl + route, data, { headers: httpHeaders })
        .subscribe(
          (resp) => {
            //console.log(resp)
            resolve(resp);
          },
          async (err) => {
            reject(err);
          }
        );
    });
  }

  /**
   * Common function for get method api call
   * its send routes return response data or error
   * @param route
   * @param token
   * Developer : chandan
   */
  async getMethodWithToken(route: string, token: any) {
    return new Promise((resolve, reject) => {
      var httpHeaders = new HttpHeaders();
      //httpHeaders = httpHeaders.append('token',token?token:'');
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
      this.http
        .get(this.staticData.baseUrl + route, { headers: httpHeaders })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          async (err) => {
            reject(err);
          }
        );
    });
  }

  async putMethodWithToken(data: any, route: string, token: any) {
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
      this.http
        .put(this.staticData.baseUrl + route, data, { headers: httpHeaders })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          async (err) => {
            reject(err);
          }
        );
    });
  }

  async patchMethodWithToken(data: any, route: string, token: any) {
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
      this.http
        .patch(this.staticData.baseUrl + route, data, { headers: httpHeaders })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          async (err) => {
            reject(err);
          }
        );
    });
  }

  async deleteMethodWithToken(data: string, route: string, token: any) {
    return new Promise((resolve, reject) => {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`);
      this.http
        .delete(`${this.staticData.baseUrl}${route}/${data}`, {
          headers: httpHeaders,
        })
        .subscribe(
          (resp) => {
            resolve(resp);
          },
          async (err) => {
            reject(err);
          }
        );
    });
  }

  fetchRssFeedData(url: string) {
    const apiEndpoint = 'https://api.rss2json.com/v1/api.json';
    const params = {
      rss_url: url,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return new Promise((resolve, reject) => {
      this.http.get(apiEndpoint, { headers, params }).subscribe(
        (res) => {
          const details = JSON.parse(JSON.stringify(res));
          const feedDetails = details?.feed;
          const items = details?.items;
          resolve({ feedDetails, items });
        },
        (err) => {
          console.log(err);
          reject({ feedDetails: {}, items: [] });
        }
      );
    });
  }

  setPrayerWallData(data: any) {
    this.prayerWallData = data;
  }

  getPrayerWallData() {
    return this.prayerWallData;
  }
}
