import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {LoadingService} from "./services/common/loading.service";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Ap Express';
  public isLoading = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private loaderService: LoadingService,
    private primengConfig: PrimeNGConfig
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.loaderService.loading$.subscribe(value => {
      setTimeout(() => {
        this.isLoading = value;
      });

    })
  }
}
