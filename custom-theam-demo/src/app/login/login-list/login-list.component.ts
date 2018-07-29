import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginModel } from '../login.model';
import { UpdateLoginComponent } from "../update-login/update-login.component";
import { LoginServiceService } from '../login-service.service';
import {MatPaginator,MatTableDataSource,MatDialog} from '@angular/material';
@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.scss'],
  providers: [LoginServiceService]
  
})
export class LoginListComponent implements OnInit {
  
  nullDataSource: Observable<LoginModel[]>;
  paginatedDataSource:MatTableDataSource<LoginModel>;
  displayedColumns = ['username', 'address', 'email', 'phone','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  constructor(private loginService: LoginServiceService,private dialogC:MatDialog) { }

  ngOnInit() {
   
    this.paginatedDataSource = new MatTableDataSource([]);
    this.clentSidePaginator();
    
    this.paginatedDataSource.paginator = this.paginator;
  }
  clentSidePaginator()
  {
    this.loginService.getUserList()
    .subscribe(
      res => {  
       this.array = res;
       this.totalSize = this.array.length;   
       this.iterator();   
      
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.paginatedDataSource = new MatTableDataSource(part);
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
  onRowDelete(row)
  {
    this.loginService.deleteCustomer(row.id)
    .subscribe(
      res=>{
       this. clentSidePaginator();
      }
    )
  }
  onRowUpdate(row)
  {
    const dialogRef = 
    this.dialogC.open(UpdateLoginComponent,{
      data:{rowData:row}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clentSidePaginator();
    });
  }
}

