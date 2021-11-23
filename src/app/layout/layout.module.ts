import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageHeaderModule } from './../shared';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../material/material-module';
import { NewTaskComponent } from './new-task/new-task.component';
import { ExistingTaskComponent } from './existing-task/existing-task.component';
import { CompletedTaskComponent } from './completed-task/completed-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockworkersComponent } from './blockworkers/blockworkers.component';
import { ExistingtaskDetailsComponent } from './existing-task/existingtask-details/existingtask-details.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsDialogComponent } from './assignments-dialog/assignments-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { MatRadioModule } from '@angular/material/radio';
import { LeaveComponent } from './leave/leave.component';
import { EmployeeComponent } from './employee/employee.component';
import { PayrollComponent } from './payroll/payroll.component';
import { MatDialogModule } from "@angular/material/dialog";
import { PayrollDialogComponent } from './payroll-dialog/payroll-dialog.component';
import { EmployeeEditDialogComponent } from './employee-edit-dialog/employee-edit-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        PageHeaderModule,
        NgbDropdownModule,
        MaterialModule,
        MatRadioModule,
        MatDialogModule,
        NgbModule,
  
    ],
    declarations: [
        LayoutComponent,
        NewTaskComponent,
        ExistingTaskComponent,
        CompletedTaskComponent,
        SidebarComponent,
        HeaderComponent,
        ExistingtaskDetailsComponent,
        BlockworkersComponent,
        AssignmentsComponent,
        AssignmentsDialogComponent,
        DashboardComponent,
        AttendanceComponent,
        LeaveComponent,
        EmployeeComponent,
        PayrollComponent,
        PayrollDialogComponent,
        EmployeeEditDialogComponent
    ],
    entryComponents: [PayrollDialogComponent],
    bootstrap: [DashboardComponent]
})

export class LayoutModule { }
