import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationService } from 'src/app/modules/shared/services/confirmation-service/confirmation.service';
import { ErrorService } from 'src/app/modules/shared/services/error-service/error.service';
import { SectionService } from '../../services/section-service/section.service';
import { ReadSectionResponse } from '../../types/ReadSectionResponse';
import { Table } from '../../types/Table';
import { CreateUpdateSectionDialogComponent } from '../create-update-section-dialog/create-update-section-dialog.component';

@Component({
  selector: 'app-section-tabs-view',
  templateUrl: './section-tabs-view.component.html',
  styleUrls: ['./section-tabs-view.component.scss']
})
export class SectionTabsViewComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'actions',
  ];
  dataSource: MatTableDataSource<ReadSectionResponse> = new MatTableDataSource<ReadSectionResponse>();

  private sections: ReadSectionResponse[] = []

  constructor(
    private sectionService: SectionService,
    private dialogService: MatDialog,
    private errorService: ErrorService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.sectionService.read().subscribe(response => {
      response.sort((s1, s2) => s1.id - s2.id);
      this.sections = response;
      this.refreshTable();
    })
  }

  refreshTable(): void {
    this.dataSource.data = this.sections;
  }

  onCreateSection(): void {
    this.dialogService.open(CreateUpdateSectionDialogComponent, {
      data: {
        id: 0, name: ''
      }
    }).componentInstance.saveChanges.subscribe(request => {
      this.sectionService.create(request).subscribe({
        next: response => {
          this.sections.push({
            ...request, ...response
          });
          this.refreshTable();
        },
        error: err => this.errorService.handle(err)
      })
    });
  }

  onUpdateSection(section: ReadSectionResponse): void {
    this.dialogService.open(CreateUpdateSectionDialogComponent, {
      data: section
    }).componentInstance.saveChanges.subscribe(request => {
      this.sectionService.update(section.id, request).subscribe({
        next: _ => section.name = request.name,
        error: err => this.errorService.handle(err)
      })
    });
  }

  onDeleteSection(section: ReadSectionResponse): void {
    this.confirmationService.confirm({
      title: 'Delete section',
      message: `Are you sure you want to delete section '${section.name}'?`
    }).subscribe(confirmation => {
      if (confirmation) {
        this.sectionService.delete(section.id).subscribe({
          next: _ => {
            this.sections = this.sections.filter(s => s.id !== section.id);
            this.refreshTable();
          },
          error: err => this.errorService.handle(err)
        })
      }
    })
  }

}
