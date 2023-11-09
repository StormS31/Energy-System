import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendsService } from 'src/app/services/backends.service';
import { Device } from 'src/app/utils/interfaces/device';
import { ResponseBackend } from 'src/app/utils/interfaces/response';

@Component({
  selector: 'app-edit-device-popup',
  templateUrl: './edit-device-popup.component.html',
  styleUrls: ['./edit-device-popup.component.scss']
})
export class EditDevicePopupComponent {
  inputDevice!: Device;
  editDeviceForm = this.builder.group({
    address: this.builder.control(''),
    id: this.builder.control(''),
    consumption: this.builder.control(''),
    ownerId: this.builder.control(''),
    description: this.builder.control(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: Device, private ref: MatDialogRef<EditDevicePopupComponent>, private builder: FormBuilder, private backendService: BackendsService) { }

  ngOnInit(): void {
    this.inputDevice = this.data;
    this.editDeviceForm = this.builder.group({
      address: this.builder.control(this.inputDevice.address!),
      id: this.builder.control(this.inputDevice.id! + ""),
      consumption: this.builder.control(this.inputDevice.consumption!),
      ownerId: this.builder.control(this.inputDevice.userFk?.userId! + ""),
      description: this.builder.control(this.inputDevice.description!),
    })
  }

  closeDialog() {
    this.ref.close();
  }

  editDevice(userId: number) {
    let formValue = this.editDeviceForm.value;
    let updateDevice: Device = {
      address: formValue.address!,
      id: parseInt(formValue.id!),
      consumption: formValue.consumption!,
      userFk: {
        userId: parseInt(formValue.ownerId!)
      },
      description: formValue.description!
    };
    console.log(updateDevice);
    this.backendService.updateDevice(this.inputDevice.id!, updateDevice).subscribe((result: ResponseBackend) => {

      if(result.errorMessage == null){
        this.ref.close();
      }
      else console.log(result.errorMessage);

    });
  }
}
