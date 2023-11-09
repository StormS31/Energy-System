import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendsService } from 'src/app/services/backends.service';
import { User } from 'src/app/utils/interfaces/user';

@Component({
  selector: 'app-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss']
})
export class AddUserPopupComponent {

  inputUser!: User;
  addUserForm = this.builder.group({
    username:this.builder.control('', Validators.required),
    firstName:this.builder.control('', Validators.required),
    lastName:this.builder.control('', Validators.required),
    password:this.builder.control('', Validators.required),
    role:this.builder.control('', Validators.required)
  })

  constructor(private ref: MatDialogRef<AddUserPopupComponent>, private builder: FormBuilder, private backendService: BackendsService){}


  closeDialog(){
      this.ref.close();
  }
  
  addUser(){
    this.backendService.addUser(this.addUserForm.value).subscribe((result:User) => {
      if(result != null) {
        this.backendService.addUserToDevicesDb(result.id).subscribe((result) => {
          console.log(result);
        })
      }
      console.log(result);
      this.ref.close();
    });
  }

}
