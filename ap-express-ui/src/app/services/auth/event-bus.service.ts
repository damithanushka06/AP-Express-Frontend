import { Injectable } from '@angular/core';
import {EventData} from "@angular/cdk/testing";
import {filter, map, Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class EventBusService {
  private subject$ = new Subject<EventData>();

  constructor() { }

  emit(event: any) {
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(
      filter((e: any) => e.name === eventName),
      map((e: any) => e["value"])).subscribe(action);
  }
}
