import { Component, OnInit } from '@angular/core';
import { BuilderAvailability } from 'app/administration/models/builder-availability.model';
import { AvailabilityService } from 'app/common/services/availability.service';
import { UserService } from 'app/common/services/user.service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit{
  builderId!: number;

  selectedDate: string = '';

  startTime: string = '';

  endTime: string = '';

  availabilityList: BuilderAvailability[] = [];

  constructor(
    private availabilityService: AvailabilityService,
    private userService:UserService
  ) {}

ngOnInit(): void {

  this.userService.getCurrentUserDetails().subscribe({
    next: (userDetails) => {
      this.builderId = userDetails?.id;
      if(this.builderId != null){
      this.loadAvailability();
      }
    },

    error: (error) => {
      console.error('Error getting user details:', error);
    }
  });

}

loadAvailability(): void {

    this.availabilityService
      .getBuilderAvailability(this.builderId)
      .subscribe({

        next: (data:any) => {

          this.availabilityList = data;

        },

        error: (error) => {

          console.error(
            'Error loading availability:',
            error
          );

        }

      });
  }

  addAvailability(): void {

    if (
      !this.selectedDate ||
      !this.startTime ||
      !this.endTime
    ) {

      alert('Please select date and time');

      return;
    }

    if (this.startTime >= this.endTime) {

      alert(
        'End time must be greater than start time'
      );

      return;
    }

    const availability: BuilderAvailability = {

      builderId: this.builderId,

      availabilityDate: this.selectedDate,

      startTime: this.startTime,

      endTime: this.endTime,

      status: true

    };

    this.availabilityService
      .createAvailability(availability)
      .subscribe({

        next: () => {

          alert(
            'Availability added successfully'
          );

          this.selectedDate = '';

          this.startTime = '';

          this.endTime = '';

          this.loadAvailability();

        },

        error: (error) => {

          console.error(error);

          alert(
            error?.error?.message ||
            'Unable to add availability'
          );

        }

      });
  }

  deleteAvailability(id: number): void {

    if (
      !confirm(
        'Are you sure you want to delete this slot?'
      )
    ) {

      return;
    }

    this.availabilityService
      .deleteAvailability(id)
      .subscribe({

        next: () => {

          alert(
            'Availability deleted'
          );

          this.loadAvailability();

        },

        error: (error) => {

          console.error(error);

          alert(
            'Unable to delete availability'
          );

        }

      });
  }

}
