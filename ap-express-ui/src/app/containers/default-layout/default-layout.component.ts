import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { navItems } from './_nav';
import {Gtag} from "angular-gtag";
import {SidebarService} from "@coreui/angular";
import {Subscription} from "rxjs";
import {ISidebarAction} from "@coreui/angular/lib/sidebar/sidebar.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit, OnDestroy{
  public navItems = navItems;
  show!:false;
  private sidebarSubscription!: Subscription;


  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private gtag: Gtag, private renderer: Renderer2,
              private hostElement: ElementRef, private sidebarService: SidebarService) {}


  ngOnInit(): void {
    this.trackNavItemClick();
  }

  /**
   Tracks the click event on navigation items in the sidebar.
   */
  trackNavItemClick(): void {
    const navItems = Array.from(this.hostElement.nativeElement.querySelectorAll('.nav-link'));
    navItems.forEach((navItem: any) => {
      this.renderer.listen(navItem, 'click', (event) => {
        const navItemText = navItem.textContent?.trim();
        if (navItemText) {
          this.gtag.event('Navigation', {
            event_category: 'Nav Item Click',
            event_label: 'Sidebar - ' + navItemText
          });
        }
      });
    });
    this.sidebarSubscription = this.sidebarService.sidebarState$.subscribe((action: ISidebarAction) => {
      // Check if the action is for opening a menu
      if (action.visible === true) {
        // Collapse the previous menu
        this.show = false;
      } else {
        action.visible = false;
      }
      this.show = false;
    });

  }

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
  }
}
