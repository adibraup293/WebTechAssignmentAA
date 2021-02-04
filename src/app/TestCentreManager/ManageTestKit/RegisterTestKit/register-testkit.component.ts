import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {TestKit} from '../testKit.model';
import {TestKitsService} from '../testKit.service';

@Component({
  selector: 'kit-register',
  templateUrl: './register-testkit.component.html',
  styleUrls: ['./register-testkit.component.css']
})

export class RegisterKitComponent implements OnInit{

  testkit: TestKit;
  private mode = 'create';
  private testkitId: string;

  constructor(public testKitsService: TestKitsService, public route: ActivatedRoute) {}

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('testkitId')) {
        this.mode = 'edit';
        this.testkitId = paramMap.get('testkitId');
        this.testkit = this.testKitsService.getTestkit(this.testkitId);

      } else {
        this.mode = 'create';
        this.testkitId = null;
      }
    });
  }

  onSaveTestKit(form: NgForm){
    if (form.invalid){
      return;
   }
   if (this.mode === 'create'){
     this.testKitsService.addTestkit(form.value.testkitname, form.value.testkitstock);
   }else {
     this.testKitsService.updateTestkit(this.testkitId, form.value.testkitname, form.value.testkitstock);
   }
    form.resetForm();
  }
}
