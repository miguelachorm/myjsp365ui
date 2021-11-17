import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffMemberPage } from './staff-member.page';

describe('StaffMemberPage', () => {
  let component: StaffMemberPage;
  let fixture: ComponentFixture<StaffMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
