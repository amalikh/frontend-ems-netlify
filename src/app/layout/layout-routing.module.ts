import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { ExistingTaskComponent } from './existing-task/existing-task.component';
import { ExistingtaskDetailsComponent } from './existing-task/existingtask-details/existingtask-details.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { BlockworkersComponent } from './blockworkers/blockworkers.component'
import { AssignmentsComponent } from './assignments/assignments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveComponent } from './leave/leave.component';
import { EmployeeComponent } from './employee/employee.component';
import { PayrollComponent } from './payroll/payroll.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'prefix' },
            {
                path: 'blank-page',
                loadChildren: () => import('./blank-page/blank-page.module').then((m) => m.BlankPageModule)
            },
            { path: 'completedtask', component: CompletedTaskComponent },
            { path: 'existingtask', component: ExistingTaskComponent },
            { path: 'newtask', component: NewTaskComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'attendance', component: AttendanceComponent },
            { path: 'leave', component: LeaveComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'payroll', component: PayrollComponent },



            { path: 'details/:id', component: ExistingtaskDetailsComponent },
            { path: 'blockworker', component: BlockworkersComponent },
            { path: 'assignments', component: AssignmentsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
