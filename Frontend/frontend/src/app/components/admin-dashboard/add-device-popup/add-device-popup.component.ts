import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendsService } from 'src/app/services/backends.service';
import { Device } from 'src/app/utils/interfaces/device';
import { ResponseBackend } from 'src/app/utils/interfaces/response';

@Component({
  selector: 'app-add-device-popup',
  templateUrl: './add-device-popup.component.html',
  styleUrls: ['./add-device-popup.component.scss']
})
export class AddDevicePopupComponent {

  inputDevice!: Device;
  addDeviceForm = this.builder.group({
    description: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    consumption: this.builder.control('', Validators.required),
    ownerId: this.builder.control('', Validators.required),
  })

  constructor(private ref: MatDialogRef<AddDevicePopupComponent>, private builder: FormBuilder, private backendService: BackendsService) { }


  closeDialog() {
    this.ref.close();
  }

  addDevice() {
    let deviceToAdd: Device = {
      address: this.addDeviceForm.value.address!,
      description: this.addDeviceForm.value.description!,
      consumption: this.addDeviceForm.value.consumption!,
      userFk: {
        userId: parseInt(this.addDeviceForm.value.ownerId!)
      }
    };
    console.log(deviceToAdd);
    this.backendService.addDevice(deviceToAdd).subscribe((result: ResponseBackend) => {
      if (result.errorMessage == null)
        this.ref.close();
      else{
        console.log(result.errorMessage)
      }
    });

  }

}
