import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'app/services/common.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent {
 propertySlug!: string;
currentUserId:any;
  selectedDate: string = '';
  selectedSlot: any = null;
hasBookedAppointment: boolean = false;
  slots: any[] = [];

  loading = false;
  confirming = false;
  appointmentBooked = false;

  minDate: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: CommonService,
    private userService:UserService
  ) {}

  ngOnInit(): void {

    this.propertySlug = String(this.route.snapshot.paramMap.get('propertySlug'));

    const today = new Date();

    this.minDate = today.toISOString().split('T')[0];
    this.loadAvailableSlots();
    this.userService.getCurrentUserDetails().subscribe({
    next: (user: any) => {

      this.currentUserId = user.id;

      console.log('Logged in User ID:', this.currentUserId);

    },
    error: (error:any) => {
      console.error('Unable to get current user:', error);
    }
  });
  }

  loadAvailableSlots(): void {

    if (!this.selectedDate) {
      return;
    }

    this.selectedSlot = null;
    this.slots = [];
    this.loading = true;

    this.appointmentService
      .getAvailableSlots(this.propertySlug, this.selectedDate)
      .subscribe({
        next: (response:any) => {

          this.slots = response;

          this.loading = false;

        },
        error: (error:any) => {

          console.error(error);

          this.loading = false;

        }
      });
  }

  selectSlot(slot: any): void {

    this.selectedSlot = slot;

  }

  confirmAppointment(): void {

    if (!this.selectedSlot) {
      return;
    }

    const appointmentData = {

      propertySlug: this.propertySlug,

      availabilityId: this.selectedSlot.id,

      appointmentDate: this.selectedDate,
      userId:this.currentUserId

    };

    this.confirming = true;

    this.appointmentService
      .createAppointment(appointmentData)
      .subscribe({

        next: (response:any) => {

          console.log('Appointment created:', response);

          this.confirming = false;

          this.appointmentBooked = true;

        },

        error: (error:any) => {

          console.error(error);

          this.confirming = false;

        }

      });
  }

}
