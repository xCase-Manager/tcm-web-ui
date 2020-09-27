import { TestBed, async } from '@angular/core/testing';
import { MenuComponent } from './menu.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent
      ],
    }).compileComponents();
  }));

  it('should create the app menu', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the menu options', () => {
    const fixture = TestBed.createComponent(MenuComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#navbar-dashboard a').textContent).toContain('Dashboard');
    expect(compiled.querySelector('#navbar-project a').textContent).toContain('Projects');
  });
});