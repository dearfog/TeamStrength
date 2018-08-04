import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavComponent } from './shared/layout/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PathNotFoundComponent } from './pages/path-not-found/path-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: NavComponent, 
        children: [
            { 
                path: 'home', 
                component: HomeComponent,
                data: {
                    breadcrumb: 'Home'
                }
            },
            { 
                path: 'dashboard', 
                component: DashboardComponent,
                data: {
                    breadcrumb: 'Dashboard'
                }            
            },
            { 
                path: '', 
                pathMatch: 'full', 
                redirectTo: 'dashboard' 
            },
            { path: '**', pathMatch: 'full', component: HomeComponent }
        ]
    },
    { path: '**', pathMatch: 'full', component: PathNotFoundComponent },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
