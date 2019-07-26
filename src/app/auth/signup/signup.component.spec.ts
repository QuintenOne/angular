import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('SignUpComponent', () => {
    let component: SignupComponent
    let fixture: ComponentFixture<SignupComponent>
    let authService
    
    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [SignupComponent],
            imports: [ FormsModule, ReactiveFormsModule ],
            providers: [
                AuthService, HttpClient, HttpHandler
            ]
        })
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent)
        component = fixture.componentInstance
        authService = fixture.debugElement.injector.get(AuthService)
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })
    
    it('should be succesfull if signed up', () => {
        var spy = spyOn(authService, 'signUp').and.returnValue(Promise.resolve(false))
        component.signup({
            email: "jasmine@croes.be",
            username: "Jasmine",
            password: "123456"
        })
        fixture.whenStable().then(() => {
            expect(component.loginSuccess).toBeTruthy()
        })
    })
})