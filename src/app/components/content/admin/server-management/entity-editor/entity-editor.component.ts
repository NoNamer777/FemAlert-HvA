import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ServerManagementService } from '../../../../../services/server-management.service';
import { SessionStorageService } from '../../../../../services/session-storage.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { faEraser, faSave, faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss'],
  providers: []
})
export class EntityEditorComponent implements OnInit, OnDestroy {

  iconSave = faSave;
  iconDelete = faTrashAlt;
  iconReset = faSyncAlt;
  iconClear = faEraser;

  @ViewChild(NgForm, { static: true })
  private _entityEditorForm: NgForm;

  get entity(): any {
    return this._entity;
  }

  set entity(entity: any) {
    this._entity = this._sessionStorageService.deserialize(
      entity,
      this.serverManagementService.type.value
    );

    this._checkForm();
  }

  private _entity: any = null;

  private _destroyed = new Subject<void>();

  constructor(
    public serverManagementService: ServerManagementService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.serverManagementService.entityChange.pipe(takeUntil(this._destroyed))
      .subscribe(entity => {
        this.entity = entity;
    });

    this._entityEditorForm.valueChanges.pipe(takeUntil(this._destroyed), debounceTime(300))
      .subscribe(() => this._checkForm());

    this.entity = this.serverManagementService.entity;
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  onSubmit(): void {
    if (this.entity.id == null) this.serverManagementService.saveEntity(this.entity);
    else this.serverManagementService.updateEntity(this.entity);
  }

  onResetForm(empty?: boolean): void {
    if (empty) {
      this.entity = { id: this.entity.id };

      return;
    }

    this.entity = this.serverManagementService.entity;
  }

  onDelete(): void {
    if (this.serverManagementService.isNewEntity() && this.hasChanged) {
      if (!confirm('Je staat op het punt om iest permanent te verwijderen, weet je zeker dat je dat wilt doen?')) return;

      if (!this.serverManagementService.isNewEntity()) {
        this.serverManagementService.deleteFromRemote();

        return;
      }
    }
    this.serverManagementService.deleteOrReplaceLocally();
  }

  get hasValue(): boolean {
    return this._route.snapshot.queryParams.hasValue === 'true';
  }

  get hasChanged(): boolean {
    return this._route.snapshot.queryParams.hasChanged === 'true';
  }

  get isRemovable(): boolean {
    return !this.serverManagementService.hasProperty('removable')
      || (this.serverManagementService.hasProperty('removable') && this.entity.removable);
  }

  private _checkForm(): void {
    const properties = this.serverManagementService.entityProperties[this.serverManagementService.type.value];
    let hasValue = false;

    for (const prop of properties) {
      const property = this.serverManagementService.propertyName(prop);

      if (!hasValue && property !== 'id' && this.entity[property] != null) {
        hasValue = true;
        break;
      }
    }
    const original = JSON.stringify(this.serverManagementService.entity);
    const current = JSON.stringify(this.entity);

    const hasChanged = !(original === current);

    this._router.navigate([], { queryParams: { hasValue, hasChanged }});
  }
}
