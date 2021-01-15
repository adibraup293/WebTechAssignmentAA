import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'kit-register',
  templateUrl: './register-testkit.component.html',
  styleUrls: ['./register-testkit.component.css']
})

export class RegisterKitComponent {
  onSaveTestKit(form: NgForm){
    if (form.invalid){
      return;
    // }
    // if (this.mode === 'create'){
    //   this.testkitsService.addTestKit(form.value.testkitname, form.value.testkitstock);
    // } else {
    //   this.testkitsService.updateTestKit(this.testKitId, form.value.testkitname, form.value.testkitstock);
    }

    form.resetForm();
  }
}
