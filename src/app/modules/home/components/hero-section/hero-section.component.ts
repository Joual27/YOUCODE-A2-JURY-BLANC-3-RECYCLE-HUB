import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as homeActions from '../../state/home.actions'

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  private store = inject(Store);

  dispatchShowingAuthPopupCaseLogin = () => {
    this.store.dispatch(homeActions.showAuthPopup());
    this.store.dispatch(homeActions.showLoginForm());
  }

  dispatchShowingAuthPopupCaseRegister = () => {
    this.store.dispatch(homeActions.showAuthPopup());
    this.store.dispatch(homeActions.showRegisterForm());
  }
}
