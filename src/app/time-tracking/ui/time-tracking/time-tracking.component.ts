import {Component, OnInit} from '@angular/core';
import {TimeTrackingService} from "../../data-access/time-tracking.service";
import {TimeTrackingRecord, TrackingType} from "../../data-access/entities/TimeTrackingRecord";
import {getUserId} from "../../../app-routing.module";


@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.scss']
})
export class TimeTrackingComponent implements OnInit {

  tracking: TimeTrackingRecord[] = [];
  date: { year?: number, month?: number; day?: number };
  fromTime: string;
  toTime: string;
  type = TrackingType.REGULAR_WORK;
  enumType = TrackingType;

  constructor(private service: TimeTrackingService) {
    const now = new Date();
    this.date = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    }
    // Standard starting time
    this.fromTime = "08:00";
    // Standard end time for 7:42 days
    this.toTime = "16:12";
  }

  ngOnInit(): void {
    this.service.loadByMonth().subscribe({
      next: (data) =>
        Array.isArray(data) ? this.tracking = data : [data]

    })
  }

  public save(): void {
    console.log("saving...");
    this.service.creatRecord({
      date: this.date, fromTime: this.fromTime, toTime: this.toTime, userId: getUserId(), type: this.type
    }).subscribe({
      next: (response) => console.log("Next response: ", response)
      , error: (response) => console.log("Error", response)
    });
  }

}
