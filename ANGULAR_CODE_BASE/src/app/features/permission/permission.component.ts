  import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/common/services/common.service';
import { ToastrService } from 'ngx-toastr';

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
    constructor(private commonService:CommonService,private toastr:ToastrService) { }

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
    getMenuList() {
      this.commonService.getMenuDDList().subscribe((menuResult: any[]) => {
        this.menuList = menuResult; 
    
        if (this.selectedRole) {
          this.commonService.getPermissions(this.selectedRole).subscribe(
            (permissions) => {
              this.permissionDetails = permissions;
    
              this.menuList.forEach((menu) => {
                const hasPermission = this.permissionDetails.some(
                  (perm) => perm.menuId === menu.id && perm.roleId == this.selectedRole
                );
    
                menu.isSelected = hasPermission;
              });
    
            },
            (error) => {
              console.error(error);
            }
          );
        }
      });
    }
    
    onChangeRole(role) {
      console.log(role,"role");
      this.selectedRole = role;
      this.getMenuList();
    }

onChange_Menu(isSelected: boolean, menuId: string) {
  console.log(isSelected,menuId,"selected");
      if (isSelected) {
        this.unselectedMenus = this.unselectedMenus.filter(menu => menu !== menuId);
        
        if (!this.selectedMenus.includes(menuId)) {
          this.selectedMenus.push(menuId);
        }
        
      } else {
        this.selectedMenus = this.selectedMenus.filter(menu => menu !== menuId);
        console.log(this.selectedMenus,"permission");
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
              this.getMenuList(); 
            },
            (error) => {
              this.toastr.error('Error saving menu selection', error);
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
              this.toastr.success('Menu selection deleted successfully', response);
              this.getMenuList();  
            },
            (error) => {
              this.toastr.error('Error deleting menu selection', error);
            }
          );
      }
    }
}
