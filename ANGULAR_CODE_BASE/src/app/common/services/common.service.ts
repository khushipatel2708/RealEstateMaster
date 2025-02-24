import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { Menu } from 'app/features/menu1/model/menu';
import { Role } from 'app/features/role/model/role';
import { Builder } from 'app/features/builder/builder';
import { User } from 'app/features/users/components/user/user';
import { Subject } from 'rxjs';
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
  return this.http.get<any>(environment.BASE_URL + '/common/menu');
}
getRoleDDList(){
  return this.http.get<any>(environment.BASE_URL + '/common/role');
}
  //Property Service
  getPropertyTypeList() {
    return this.http.get<any>(environment.BASE_URL + '/common/type');
  }

   getPropertyList(data:any){
  return this.http.post(environment.BASE_URL + '/property/list',data);
 }

  propertyList(param = '') {
    return this.http.get<any>(environment.BASE_URL + '/property/list/' + param);
  }

  getSingleProperty(propertySlug) {
    return this.http.get<any>(environment.BASE_URL + '/property/single/' + propertySlug);
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
  getMenu1List(filters: any){
    return this.http.post(environment.BASE_URL + "/common/menu1List", filters);
  }

  addEditMenu(menudata: any) {
    if (menudata.id) {
      // If `roledata` has an `id`, use `updateRole` API
      return this.http.put(environment.BASE_URL + "/common/menu/" + menudata.id, menudata);
    } else {
      // Otherwise, use `addRole` API
      return this.http.post(environment.BASE_URL + "/common/addEditMenu", menudata);
    }
  }

  getMenuById(id: number) {
    return this.http.get<Menu>(`${environment.BASE_URL}/common/menu/${id}`);
  }

  deleteMenu(menuId: string) {
    return this.http.delete(`${environment.BASE_URL}/common/deleteMenu/${menuId}`);
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
  getRoleById(id: number) {
    return this.http.get<Role>(`${environment.BASE_URL}/common/role/${id}`);
  }
  
  deleterole(roleId: string) {
    return this.http.delete(environment.BASE_URL + "/common/deleteRole/" + roleId);
  }
//End Role

//start User
getUserList(filters:any){
  return this.http.post(environment.BASE_URL + '/common/userDetailList',filters);
}

addEditUser(userdata: any){
  return this.http.post(environment.BASE_URL + "/common/addEditUser", userdata);
}

getUserById(id: number) {
  return this.http.get<User>(`${environment.BASE_URL}/common/user/${id}`);
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
  return this.http.post<any>(`${environment.BASE_URL}/common/permissions`, permissionData);
}
deletePermissions(permissionData: any) {
  return this.http.post<any>(`${environment.BASE_URL}/common/permissions/delete`, permissionData);
}
getMenuListByPermission(role:string){
  return this.http.get<any>(`${environment.BASE_URL}/common/permissions/menuList/${role}`);
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
  return this.http.get<any>(environment.BASE_URL + '/common/builderList');
}
// addBuilder(builderData: any): Observable<any> {
//   return this.http.post(environment.BASE_URL + '/common/addBuilder', builderData);
// }

// getBuilderById(id: number): Observable<Builder> {
//   return this.http.get<Builder>(`${environment.BASE_URL}/common/builder/${id}`);
// }
getBuilderById(id: number) {
  return this.http.get<Builder>(`${environment.BASE_URL}/common/builder/${id}`);
}

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
}
