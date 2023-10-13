import {AbstractControl, FormGroup, Validator} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator{
    validate(control: AbstractControl){
        const {password, passwordConfirmation} = control.value;

        if(password === passwordConfirmation){
            return null;
        }
        else{
            return {passwordsDontMatch: true};
        }
    }
}
