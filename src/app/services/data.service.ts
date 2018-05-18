import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class DataService {

  private url = "/db/"

  constructor(private http: HttpClient) { }

  /**
   * Function to get Data 
   * 
   * @memberof DataService
   */
  getUserData() {
    return this.http.get(this.url + "users");
  }

  /**
   * Function to save Data 
   * 
   * @memberof DataService
   */
  saveUserData(data: any) {
    return this.http.post(this.url + "users", data);
  }

  /**
 * Function to get Data 
 * 
 * @memberof DataService
 */
  getTaskData() {
    return this.http.get(this.url + "tasks");
  }

  /**
   * Function to save Data 
   * 
   * @memberof DataService
   */
  saveTaskData(data: Array<Object>) {
    return this.http.post(this.url + "tasks", data);
  }

  addPushSubscriber(sub) {
    return this.http.post(this.url + "subscribe", sub);
  }
}
