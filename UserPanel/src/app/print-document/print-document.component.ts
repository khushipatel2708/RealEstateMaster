import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'app/services/common.service';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-print-document',
  templateUrl: './print-document.component.html',
  styleUrls: ['./print-document.component.scss']
})
export class PrintDocumentComponent {

  @Input() propertyId!: number;

  notaryData: any;

  @ViewChild('printSection', { static: false })
  printSection!: ElementRef;

  @ViewChild('vendorSignatureCanvas', { static: false })
  vendorSignatureCanvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('vendeeSignatureCanvas', { static: false })
  vendeeSignatureCanvas!: ElementRef<HTMLCanvasElement>;

  vendorSignaturePad!: SignaturePad;
  vendeeSignaturePad!: SignaturePad;

  vendorSignatureImage: string = '';
  vendeeSignatureImage: string = '';

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.params['id'];
    this.loadNotaryData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeSignaturePads();
    }, 500);
  }

  initializeSignaturePads() {

    if (this.vendorSignatureCanvas) {
      this.vendorSignaturePad = new SignaturePad(
        this.vendorSignatureCanvas.nativeElement
      );
    }

    if (this.vendeeSignatureCanvas) {
      this.vendeeSignaturePad = new SignaturePad(
        this.vendeeSignatureCanvas.nativeElement
      );
    }
  }

  loadNotaryData() {

    this.commonService.getPrintData(this.propertyId)
      .subscribe(data => {

        this.notaryData = data;

        setTimeout(() => {
          this.initializeSignaturePads();
        }, 100);

      });
  }

  clearVendorSignature() {

    if (this.vendorSignaturePad) {
      this.vendorSignaturePad.clear();
    }

    this.vendorSignatureImage = '';
  }

  clearVendeeSignature() {

    if (this.vendeeSignaturePad) {
      this.vendeeSignaturePad.clear();
    }

    this.vendeeSignatureImage = '';
  }

  saveVendorSignature() {

    if (this.vendorSignaturePad.isEmpty()) {
      alert('Please provide Vendor signature');
      return;
    }

    this.vendorSignatureImage =
      this.vendorSignaturePad.toDataURL('image/png');
  }

  saveVendeeSignature() {

    if (this.vendeeSignaturePad.isEmpty()) {
      alert('Please provide Vendee signature');
      return;
    }

    this.vendeeSignatureImage =
      this.vendeeSignaturePad.toDataURL('image/png');
  }

  onVendorSignatureUpload(event: any) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.vendorSignatureImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onVendeeSignatureUpload(event: any) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.vendeeSignatureImage = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  printPDF() {

    if (!this.vendorSignatureImage) {
      alert('Please add Vendor signature');
      return;
    }

    if (!this.vendeeSignatureImage) {
      alert('Please add Vendee signature');
      return;
    }

    const printContents =
      this.printSection.nativeElement.innerHTML;

    const originalContents =
      document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;

    window.location.reload();
  }
}