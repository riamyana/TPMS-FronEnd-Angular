import { ProofService } from './../../_services/proof/proof.service';
import { SideNavService } from './../../_services/side-nav/side-nav.service';
import { NotifierService } from './../../_services/notifier/notifier.service';
import { Router } from '@angular/router';
import { LoaderService } from './../../_services/loader/loader.service';
import { Proof } from './../../_models/Proof/proof';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-proof2',
  templateUrl: './manage-proof2.component.html',
  styleUrls: ['./manage-proof2.component.scss']
})
export class ManageProof2Component implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listData: MatTableDataSource<Proof>;
  dispCol: string[] = ['srNo', 'proofName', 'action'];
  uniqueMemberType: string[];

  constructor(
    public loader: LoaderService,
    private router: Router,
    public dialog: MatDialog,
    private notifierService: NotifierService,
    public sideNavService: SideNavService,
    private proofService: ProofService
  ) { }

  ngOnInit(): void {
    this.getProof();
    this.sideNavService.navTitle = "Manage Proof";
  }

  getProof() {
    this.proofService.getProof().subscribe(
      data => {

        this.uniqueMemberType = data
          .map(item => item.memberTypeName)
          .filter((value, index, self) => {
            if (self.indexOf(value) === index) {
              
            }
          });

        this.listData = new MatTableDataSource();
        this.listData.data = data;
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        console.log(data);
      },
      err => {
        if (err.status == 401 || err.stats == 403) {
          this.router.navigateByUrl('admin/login');
        } else {
          this.notifierService.showNotification('Something went wrong..! Please try again.', 'OK', 'error');
        }
      });
  }

}
