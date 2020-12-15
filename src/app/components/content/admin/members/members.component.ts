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

  users: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        console.log(users);
        this.users = users;
        console.log(this.users);
      },
      error => console.log(error)
    );
  }

}
