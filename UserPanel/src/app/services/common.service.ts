import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { catchError, Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root' 
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private titleService: Title
  ) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  // Header alert text
  HeaderMessage = new Subject<string>();
  HeaderMessage$ = this.HeaderMessage.asObservable();

  changeHeaderMessage(data) {
    this.HeaderMessage.next(data);
  }
  // Header alert text

  togglePageLoader = new Subject<boolean>();
  togglePageLoader$ = this.togglePageLoader.asObservable();
  togglePageLoaderFn(data: boolean = false) {
    this.togglePageLoader.next(data);
  }

  // showLoader() { this.togglePageLoader.next(true); }
  // hideLoader() { this.togglePageLoader.next(false); }

  getStatelist() {
    return this.http.get<any>(environment.BASE_URL + '/common/state');
  }

  getCitylist() {
    return this.http.get<any>(environment.BASE_URL + '/common/cities');
  }

  updateProfile(userId: number, userData: any) {
    return this.http.put<any>(`${environment.BASE_URL}/user/updateProfile/${userId}`, userData);
}
getCurrentUserDetails() {
  const token = localStorage.getItem('token'); // Ensure token is stored in localStorage
console.log(localStorage.getItem('token'),"token12");
  if (!token) {
    console.error("JWT Token is missing!");
    return throwError(() => new Error("No token found"));
  }

  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Not necessary, but can be included
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      Authorization: `Bearer ${token}`
  });
  return this.http.get<any>(`${environment.BASE_URL}/auth/user/currentUser`, { headers }).pipe(
    catchError(error => {
      console.error("Error fetching user:", error);
      return throwError(() => new Error(error));
    })
  );
}
  getCitylistByState(stateId) {
    return this.http.get<any>(environment.BASE_URL + '/common/cities/' + stateId);
  }
getMenuDDList(){
  return this.http.get<any>(environment.BASE_URL + '/menu/Menu');
}
getRoleDDList(){
  return this.http.get<any>(environment.BASE_URL + '/common/role');
}
  //Property Service
  getPropertyTypeList() {
    return this.http.get<any>(environment.BASE_URL + '/property/propertyTypeList');
  }

   getPropertyList(data:any){
  return this.http.post(environment.BASE_URL + '/property/list',data);
 }
 getUserPanelPropertyList(params?: any) {
  return this.http.get(environment.BASE_URL + '/property', { params });
}
  propertyList(param = '') {
    return this.http.get<any>(environment.BASE_URL + '/property/list/' + param);
  }
  generateHash(paymentData: any) {
    return this.http.post(
      `${environment.BASE_URL}/payments/generate-hash`,
      paymentData,
      { headers: { 'Content-Type': 'application/json' } }  // ✅ Ensure JSON Content-Type
    );
  }
  
successPayment(){
  
}
  
  getSingleProperty(propertySlug:any,email:any) {
    return this.http.get<any>(`${environment.BASE_URL}/property/getSingleProperty/${propertySlug}/${email}`);
  }

  filterProperties(param = '') {
    return this.http.get<any>(environment.BASE_URL + '/property/filter' + param);
  }
  editProperty(dataToSend: any,id: number,) {
    const url = `${environment.BASE_URL}/property/edit/${id}`;
    const requestBody = { id, dataToSend };
    return this.http.put(url, requestBody);
  }
  deleteProperty(id:any){
    return this.http.delete(environment.BASE_URL + "/property/deleteProperty/" + id);
  }
  //End Property
  //Start Menu

  getMenu1List(filters: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/menu/getMenuList`, filters);
  }

  // Add or update menu — ONE API for both
  addEditMenu(menudata: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/menu`, menudata);
  }

  // Get menu by ID
  getMenuById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/menu/${id}`);
  }

  // Delete menu
  deleteMenu(menuId: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/menu/${menuId}`);
  }
  
  //End Menu service
//Start role
getRoleDDlList(){
  return this.http.get<any>(environment.BASE_URL+"/common/getRoleDDL");
}
 getRoleList(filters:any){
    return this.http.post(environment.BASE_URL + "/common/roleList",filters);
  }

  addEditRole(roledata: any) {
    if (roledata.id) {
      // If `roledata` has an `id`, use `updateRole` API
      return this.http.put(environment.BASE_URL + "/common/role/" + roledata.id, roledata);
    } else {
      // Otherwise, use `addRole` API
      return this.http.post(environment.BASE_URL + "/common/addEditRole", roledata);
    }
  }
 
  
  deleterole(roleId: string) {
    return this.http.delete(environment.BASE_URL + "/common/deleteRole/" + roleId);
  }
//End Role

//start User
getUserList(filters: any): Observable<any> {
  return this.http.post<any>(`${environment.BASE_URL}/user/getUserList`, filters);
}
// getUserList(filters:any){
//   return this.http.post(environment.BASE_URL + '/common/userDetailList',filters);
// }

addEditUser(userdata: any){
  return this.http.post(environment.BASE_URL + "/common/addEditUser", userdata);
}



deleteUser(userId: any) {
  return this.http.delete(`${environment.BASE_URL}/common/deleteUser/${userId}`);
}

//End User

//Start Permission
getPermissions(roleId: number) {
  return this.http.get<any>(`${environment.BASE_URL}/common/permissions/${roleId}`);
}
postPermissions(permissionData: any) {
  return this.http.post<any>(`${environment.BASE_URL}/permission/postPermission`, permissionData);
}
deletePermissions(permissionData: any) {
  return this.http.post<any>(`${environment.BASE_URL}/permission/deletePermission`, permissionData);
}
getMenuListByPermission(role:any){
  return this.http.post<any>(`${environment.BASE_URL}/permission/menulist`,role);
}
//End Permission

//Start builder

// getBuilderList(): Observable<any> {
//   return this.http.get(environment.BASE_URL + '/common/builderList1');
// }

getBuilderList(filters:any){
  return this.http.post(environment.BASE_URL + '/common/builderList1',filters);
}

getBuilderDdlList() {
  return this.http.get<any>(environment.BASE_URL + '/common/GetBuilderList');
}
getBuilderDDLList(){
  return this.http.get<any>(environment.BASE_URL + '/builder/GetBuilderDDLList');
}
// addBuilder(builderData: any): Observable<any> {
//   return this.http.post(environment.BASE_URL + '/common/addBuilder', builderData);
// }

// getBuilderById(id: number): Observable<Builder> {
//   return this.http.get<Builder>(`${environment.BASE_URL}/common/builder/${id}`);
// }


addEditBuilder(builderdata: any) {
  return this.http.post(environment.BASE_URL + "/common/addEditBuilder", builderdata);
}


deleteBuilder(BuilderId: any) {
  return this.http.delete(`${environment.BASE_URL}/common/deleteBuilder/${BuilderId}`);
}

//End builder
forgotPassword(formData:any){
  return this.http.put(environment.BASE_URL + "/auth/user/forgotPassword",formData); 
}
initiatePayment(paymentData: any) {
  return this.http.post<{ paymentUrl: string }>('http://localhost:5026/api/payments/initiate-payment', paymentData);
}
payUBuy(amount:any,firstName:any,plainName:any,currentUserEmail) {
  return this.http.get<any>(`${environment.BASE_URL}/payments1/payu-payment`,{
    params: {
           amount: amount,
           firstName:firstName,
           planName:plainName,
           email:currentUserEmail
    }
  });
}
initiatePayment1(paymentData: any) {
  return this.http.post(`${environment.BASE_URL}/payments2/initiate-payment`, paymentData);
}
getPropertyContactDetails(propertyId:any,currentUserId:any){
  return this.http.get<any>(`${environment.BASE_URL}/Property/GetPropertyContactDetails/${propertyId}/${currentUserId}`);
}
getPrintData(id:any){
  return this.http.get(`${environment.BASE_URL}/common/${id}/notary`);
}
}
