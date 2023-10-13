import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmailService} from '../email.service';
import {switchMap} from 'rxjs/operators';
import {Email} from '../email';
import { response } from 'express';


@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent {

  email: Email;

  constructor(private route: ActivatedRoute, private emailService: EmailService){
   this.route.data.subscribe(({email})=>{
       this.email = email;
   });
  }

  ngOnInit(){
    // console.log(this.route);
    // console.log(this.route.snapshot);
    // this.route.params.subscribe(({id})=>{
    //   this.emailService.getEmail(id);
    // });

    // this.route.params.pipe(
    //   switchMap(({id})=>{
    //       return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email)=>{
    //     this.email = email;
    // });
  }

}
