import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/services/common.service';

@Component({
  selector: 'app-print-document',
  templateUrl: './print-document.component.html',
  styleUrls: ['./print-document.component.scss']
})
export class PrintDocumentComponent {
  @Input() propertyId!: number;
  notaryData: any;

  @ViewChild('printSection', { static: false }) printSection!: ElementRef;

  constructor(private http: HttpClient,private commonService:CommonService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.propertyId=this.route.snapshot.params['id'];
    this.loadNotaryData();
  }
  loadNotaryData() {
    this.commonService.getPrintData(this.propertyId)
      .subscribe(data => {
        this.notaryData = data;
      });
  }

  printPDF() {
    const printContents = this.printSection.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
}
