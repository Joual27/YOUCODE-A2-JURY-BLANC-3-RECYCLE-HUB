import { Component, signal } from '@angular/core';
import { HomeLayoutComponent } from "../layout/home-layout/home-layout.component";
import { AuthPopupComponent } from "../../../shared/ui/auth-popup/auth-popup.component";

@Component({
  selector: 'app-home-page',
  imports: [HomeLayoutComponent, AuthPopupComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  shownAuthPopup = signal<boolean>(false);
}
