import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from "@angular/router";
import { fadeAnimation } from '../../animations/animations';

interface Breadcrumb {
    label: string;
    params: Params;
    url: string;
}
  
@Component({
  selector: 'app-shared/layout/nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations:[fadeAnimation]
})
export class NavComponent implements OnInit {

    public breadcrumbs: Array<Breadcrumb> = [];
  
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
        map(result => result.matches)
        );
    
  constructor(
      private breakpointObserver: BreakpointObserver,
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) {
        this.breadcrumbs = [];
    }
  
    ngOnInit(): void {
        const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";
        let root: ActivatedRoute = this.activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
        //subscribe to the NavigationEnd event
        this.router.events.subscribe(event => {
          //set breadcrumbs
            if(event instanceof NavigationEnd){
                let root: ActivatedRoute = this.activatedRoute.root;
                this.breadcrumbs = this.getBreadcrumbs(root);
            }
        });
    }

private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: Array<Breadcrumb>=[]): Array<Breadcrumb> {
    const ROUTE_DATA_BREADCRUMB: string = "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }

};