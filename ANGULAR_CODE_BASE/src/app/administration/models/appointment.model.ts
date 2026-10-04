export interface Appointment {
  id?: number;
  propertyId: number;
  builderId: number;
  userId: number;
  availabilityId: number;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  remarks?: string;
}