import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBoardComponent } from './auth-board.component';

describe('AuthBoardComponent', () => {
    let component: AuthBoardComponent;
    let fixture: ComponentFixture<AuthBoardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthBoardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AuthBoardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
