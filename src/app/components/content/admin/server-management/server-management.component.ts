import { Component, OnInit } from '@angular/core';
import { ServerManagementService } from '../../../../services/server-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-rapport',
  templateUrl: './server-management.component.html',
  styleUrls: ['./server-management.component.scss'],
  providers: [ServerManagementService],
})
export class ServerManagementComponent {

  constructor(public serverManagementService: ServerManagementService, private _route: ActivatedRoute) {}

  onSelectEntity(entity: any): void {
    this.serverManagementService.entity = entity;
  }

  onCreateNewEntity(): void {
    this.serverManagementService.createNewEntity();
  }

  get hasEntities(): boolean {
    return !(this.serverManagementService.entities.length === 0);
  }

  get hasChanged(): boolean {
    return this._route.snapshot.queryParams.hasChanged === 'true';
  }

  entityName(entity: any): string {
    if (!this.serverManagementService.hasSelected(entity)) return this._displayNormalEntityName(entity);

    if (this.hasChanged) return `*${this.serverManagementService.type.name}`;

    return this._displayNormalEntityName(this.serverManagementService.entity);
  }

  private _displayNormalEntityName(entity: any): string {
    return this.serverManagementService.isNewEntity(entity) ? `*${this.serverManagementService.type.name}` :
      this.serverManagementService.hasProperty('question') ?
      entity.question :
      entity.name;
  }
}
