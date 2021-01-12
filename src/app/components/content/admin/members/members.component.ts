import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User';

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

  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
        this.isLoading = false;
        if (this.users.length === 0) this.noUserFound = true;
      },
      error => {
        this.getUserError = true;
        this.isLoading = false;
      }
    );
  }

}
