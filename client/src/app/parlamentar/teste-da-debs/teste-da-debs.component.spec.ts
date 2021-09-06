import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteDaDebsComponent } from './teste-da-debs.component';

describe('TesteDaDebsComponent', () => {
  let component: TesteDaDebsComponent;
  let fixture: ComponentFixture<TesteDaDebsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteDaDebsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteDaDebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
