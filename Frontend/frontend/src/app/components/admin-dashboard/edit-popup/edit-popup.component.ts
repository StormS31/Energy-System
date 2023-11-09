import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { BackendsService } from 'src/app/services/backends.service';
import { User } from 'src/app/utils/interfaces/user';
@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.scss']
})
export class EditPopupComponent implements OnInit{
  
  inputUser!: User;
  editUserForm = this.builder.group({
    username:this.builder.control(''),
    id:this.builder.control(''),
    firstName:this.builder.control(''),
    lastName:this.builder.control(''),
    password:this.builder.control(''),
    role:this.builder.control('')
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,  private ref: MatDialogRef<EditPopupComponent>, private builder: FormBuilder, private backendService: BackendsService){}

  ngOnInit(): void {
    this.inputUser = this.data;  
    this.editUserForm = this.builder.group({
      username:this.builder.control(this.inputUser.username),
      id:this.builder.control(this.inputUser.id+""),
      firstName:this.builder.control(this.inputUser.firstName),
      lastName:this.builder.control(this.inputUser.lastName),
      password:this.builder.control(''),
      role:this.builder.control(this.inputUser.role)
    })
  }

  closeDialog(){
      this.ref.close();
  }
  
  editUser(userId: number){
    this.backendService.updateUser(this.inputUser.id, this.editUserForm.value).subscribe(result => console.log(result));
    this.ref.close();
  }
}
