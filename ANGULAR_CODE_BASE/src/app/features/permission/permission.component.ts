  import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/common/services/common.service';

  @Component({
    selector: 'app-permission',
    templateUrl: './permission.component.html',
    styleUrls: ['./permission.component.scss']
  })
  export class PermissionComponent implements OnInit {
    roleList: any[] = [];
    permissionDetails;
    roleId: number;
    selectedRole: any;
    menuList:any[]=[];
    // isSelected:boolean;
    menuId:any;
    selectedMenus: any[] = [];  // To track selected menus
    unselectedMenus: any[] = [];
    constructor(private commonService:CommonService) { }

    ngOnInit() {
      this.getRoleList();
      this.getMenuList();
    }
    getRoleList() {
      this.commonService.getRoleDDList()
        .subscribe((result:any[]) => {
          this.roleList = result;
        });
    }
    getMenuList(){
      this.commonService.getMenuDDList()
        .subscribe((result:any[]) =>{
          this.menuList = result;
          if (this.selectedRole) {
            console.log(this.selectedRole,"selectedRole");
            this.commonService.getPermissions(this.selectedRole).subscribe(
              (permissions) => {
                this.permissionDetails = permissions;
                const permissionsObject = {};
                for (const key in permissions) {
                  if (permissions.hasOwnProperty(key)) {
                    const permission = permissions[key];
                    permissionsObject[permission.menuId] = permission.roleId === this.selectedRole;
                  }
                }
                this.menuList.forEach((menu) => {
                  menu.isSelected = permissionsObject[menu._id] === true;
                });
              },
              (error) => {
                console.error(error);
              }
            );
          }
        })
    }
    onChangeRole(role) {
      this.selectedRole = role;
      this.getMenuList();
    }

onChange_Menu(isSelected: boolean, menuId: string) {
      // If checkbox is selected
      if (isSelected) {
        // Remove from unselected if it was previously there
        this.unselectedMenus = this.unselectedMenus.filter(menu => menu !== menuId);
        
        // Add to selectedMenus if it's not already there
        if (!this.selectedMenus.includes(menuId)) {
          this.selectedMenus.push(menuId);
        }
        
      } else {
        // Remove from selectedMenus if it's being unchecked
        this.selectedMenus = this.selectedMenus.filter(menu => menu !== menuId);
        
        // Add to unselectedMenus if it's not already there
        if (!this.unselectedMenus.includes(menuId)) {
          this.unselectedMenus.push(menuId);
        }
      }
    }
    onClickSubmit() {
      if (this.selectedMenus.length > 0) {
        const saveData = this.selectedMenus.map(menuId => ({
          menuId: menuId,
          roleId: this.selectedRole
        }));
        this.commonService.postPermissions(saveData)
          .subscribe(
            (response) => {
              console.log('Menu selection saved successfully', response);
              this.getMenuList(); 
            },
            (error) => {
              console.error('Error saving menu selection', error);
            }
          );
      }
    
      if (this.unselectedMenus.length > 0) {
        const deleteData = this.unselectedMenus.map(menuId => ({
          menuId: menuId,
          roleId: this.selectedRole
        }));
    
        this.commonService.deletePermissions(deleteData)
          .subscribe(
            (response) => {
              console.log('Menu selection deleted successfully', response);
              this.getMenuList();  
            },
            (error) => {
              console.error('Error deleting menu selection', error);
            }
          );
      }
    }
}
