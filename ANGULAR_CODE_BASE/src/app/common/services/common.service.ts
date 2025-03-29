import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Menu } from 'app/features/menu1/model/menu';
import { Role } from 'app/features/role/model/role';
import { Builder } from 'app/features/builder/builder';
import { User } from 'app/features/users/components/user/user';
import { Observable, Subject } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable()
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
  getPropertyTypeList(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/property/propertyTypeList`);
  }

  getPropertyList(filters: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/property/propertyList`, filters);
  }
  getProperty(): Observable<any>{
    return this.http.get<any>(environment.BASE_URL + '/property');
  }

  propertyList(param = '') {
    return this.http.get<any>(environment.BASE_URL + '/property/list/' + param);
  }

  getSingleProperty(propertySlug) {
    return this.http.get<any>(environment.BASE_URL + '/property/getSingleProperty/' + propertySlug);
  }

  // filterProperties(param = '') {    
  //   return this.http.get<any>(environment.BASE_URL + '/property/filter' + param);
  // }

  filterProperties(params: any) {
    return this.http.get(`${environment.BASE_URL}/Property/filterProperties`, { params });
  }  

  // filterProperties(param = '') {    
  //   // return this.http.get<any>(environment.BASE_URL + '/property/filter' + param);
  //   return this.http.get<any>(`${environment.BASE_URL}/property/filterProperties` + param);
  // }
  editProperty(dataToSend: FormData, id: number) {
    const url = `${environment.BASE_URL}/property/edit/${id}`;
    return this.http.put(url, dataToSend);
  }
  deleteProperty(id: any): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/property/deleteProperty/${id}`);
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
  getPropertyList1(filters: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/property/getpropertyList12`, filters);
  }
  getPaymentList(filters: any) {
    return this.http.post<any>(`${environment.BASE_URL}/Payments1/getPaymentList`, filters);
  }
  //End Menu service
//Start role
// getRoleDDlList(){
//   return this.http.get<any>(environment.BASE_URL+"/common/getRoleDDL");
// }
//  getRoleList(filters:any){
//     return this.http.post(environment.BASE_URL + "/common/roleList",filters);
//   }

//   addEditRole(roledata: any) {
//     if (roledata.id) {
//       // If `roledata` has an `id`, use `updateRole` API
//       return this.http.put(environment.BASE_URL + "/common/role/" + roledata.id, roledata);
//     } else {
//       // Otherwise, use `addRole` API
//       return this.http.post(environment.BASE_URL + "/common/addEditRole", roledata);
//     }
//   }
//   getRoleById(id: number) {
//     return this.http.get<Role>(`${environment.BASE_URL}/common/role/${id}`);
//   }
  
//   deleterole(roleId: string) {
//     return this.http.delete(environment.BASE_URL + "/common/deleteRole/" + roleId);
//   }
getRoleDDlList(){
  return this.http.post<any>(environment.BASE_URL + "/role/getRoleList", {}); // Sending an empty object
}
getRoleList(filters: any): Observable<any> {
  return this.http.post<any>(`${environment.BASE_URL}/role/getRoleList`, filters);
}

addEditRole(roledata: any): Observable<any> {
  return this.http.post(`${environment.BASE_URL}/role`, roledata);
}

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/role/${id}`);
  }

     // Delete menu
  deleterole(id: number): Observable<any> {
    return this.http.delete(`${environment.BASE_URL}/role/${id}`);
   }
//End Role

//start User
// getUserList(filters: any): Observable<any> {
//   return this.http.post<any>(`${environment.BASE_URL}/user/getUserList`, filters);
// }
// // getUserList(filters:any){
// //   return this.http.post(environment.BASE_URL + '/common/userDetailList',filters);
// // }

// addEditUser(userdata: any){
//   return this.http.post(environment.BASE_URL + "/common/addEditUser", userdata);
// }

// getUserById(id: number) {
//   return this.http.get<User>(`${environment.BASE_URL}/common/user/${id}`);
// }

// deleteUser(userId: any) {
//   return this.http.delete(`${environment.BASE_URL}/common/deleteUser/${userId}`);
// }
getUserList(filters: any): Observable<any> {
  return this.http.post<any>(`${environment.BASE_URL}/user/getUserList`, filters);
}

getUserDdlList() {
  return this.http.get<any>(`${environment.BASE_URL}/user/GetUserDDLList`);
}

addEditUser(userdata: any): Observable<any> {
  return this.http.post(`${environment.BASE_URL}/user`, userdata);
}

getUserById(id: number): Observable<any> {
  return this.http.get<any>(`${environment.BASE_URL}/user/${id}`);
}

deleteUser(id: number): Observable<any> {
  return this.http.delete(`${environment.BASE_URL}/user/${id}`);
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

getBuilderList(filters: any): Observable<any> {
  return this.http.post<any>(`${environment.BASE_URL}/builder/GetBuilderList`, filters);
}

getBuilderDdlList() {
  return this.http.get<any>(`${environment.BASE_URL}/builder/GetBuilderDDLList`);
}

getBuilderById(id: number): Observable<any> {
  return this.http.get<any>(`${environment.BASE_URL}/builder/${id}`);
}
addEditBuilder(builderdata: any): Observable<any> {
  return this.http.post(`${environment.BASE_URL}/builder`, builderdata);
}
deleteBuilder(BuilderId: number): Observable<any> {
  return this.http.delete(`${environment.BASE_URL}/builder/${BuilderId}`);
}


//End builder
forgotPassword(formData:any){
  return this.http.put(environment.BASE_URL + "/auth/user/forgotPassword",formData); 
}
}
