import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Seat Booking App';
  seatLayout: string[][] = [];
  reservedSeats: string[] = [];
  numSeats: number;
  reservationMessage: string;

  constructor() {
    this.generateSeatLayout();
  }

    // Calculate the number of rows
  generateSeatLayout(): void {
    const rows = Math.ceil(80 / 7); 
    let seatNumber = 1;

     // Last row has 3 seats
    for (let i = 1; i <= rows; i++) {
      const seatsInRow = i === rows ? 3 : 7;

      const row: string[] = [];
      for (let j = 1; j <= seatsInRow; j++) {
        row.push(`Seat ${seatNumber}`);
        seatNumber++;
      }

      this.seatLayout.push(row);
    }
  }

 reserveSeats(): void {
    if (this.numSeats > 0 && this.numSeats <= 7) {
      let seatsReserved = 0;
      let rowIndex = 0;
      let seatIndex = 0;
  
      while (seatsReserved < this.numSeats && rowIndex < this.seatLayout.length) {
        const row = this.seatLayout[rowIndex];
  
        if (seatIndex + this.numSeats <= row.length) {
          const availableSeats = row.slice(seatIndex, seatIndex + this.numSeats);
  
          if (availableSeats.every(seat => !this.isSeatReserved(seat))) {
            this.reservedSeats.push(...availableSeats);
            seatsReserved = this.reservedSeats.length;
          }
        }
  
        seatIndex++;
  
        if (seatIndex >= row.length) {
          seatIndex = 0;
          rowIndex++;
        }
      }
  
      if (seatsReserved === this.numSeats) {
        this.updateReservationMessage('Seats booked successfully!');
      } else {
        this.updateReservationMessage('Seats not available.');
      }
    } else {
      this.updateReservationMessage('Please enter a valid number of seats.');
    }
  }
  
  isSeatReserved(seat: string): boolean {
    for (let i = 0; i < this.reservedSeats.length; i++) {
      if (this.reservedSeats[i] === seat) {
        return true;
      }
    }
    return false;
  }

  updateReservationMessage(message: string): void {
    this.reservationMessage = message;
  }
}
