import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MemberPopupComponent } from './member-popup/member-popup.component';
import { AuthenticateService } from '../../../../services/authenticate.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  /** Font awesome Icons */
  deleteIcon = faTrashAlt;
  editIcon = faPencilAlt;

  /** booleans for errors and loading */
  getUserError = false;
  noUserFound = false;
  isLoading = true;
  userIsSameError = false;

  /** List of Users from database */
  users: User[];

  constructor(private userService: UserService,
              private dialog: MatDialog,
              private authenticateService: AuthenticateService) {}

  /**
   * On init add all users from database
   */
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.isLoading = false;
        if (this.users.length === 0) this.noUserFound = true;
      },
      error => {
        this.users = [];
        this.getUserError = true;
        this.isLoading = false;
      }
    );
  }

  /**
   * Deletes chosen user in database
   * @param index is index in table
   */
  deleteUser(index: number): void {
    if (this.checkIfUserIsSame(index)) return;

    const id = this.users[index].id;
    this.isLoading = true;

    this.userService.deleteUser(id).subscribe(
      () => {
        this.users.splice(index, 1);
        this.isLoading = false;
      },
      () => this.getUserError = true
    );
  }

  /**
   * Creates popup to edit user
   * @param index is index of User in table
   */
  editUser(index: number): void {
    // Checks if user is same if yes nothing happens
    if (this.checkIfUserIsSame(index)) return;

    // Creating dialog config with chosen User
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;
    dialogConfig.data = this.users[index];

    this.dialog.open(MemberPopupComponent, dialogConfig);

    // Subscribe on dialog closing if closed than refresh page
    this.dialog.afterAllClosed.subscribe(
      () => this.ngOnInit()
    );
  }

  /**
   * Check if chosen User is same as current logged in User
   * Show userIsSame Error when true
   * @param index is index of User in table
   */
  checkIfUserIsSame(index: number): boolean {
    if (this.users[index] == null || this.authenticateService.currentUser == null) return false;

    if (this.users[index].id === this.authenticateService.currentUser.id) {
      this.userIsSameError = true;
      return true;
    } else {
      this.userIsSameError = false;
      return false;
    }
  }
}
