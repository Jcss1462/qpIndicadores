import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  toogleNavVar() {

    const navMenu = document.getElementById("right-panel");
    if (navMenu != null) {

      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      } else {
        navMenu.classList.add('open');
      }
    }

  }


  closeNavVar() {

    const navMenu = document.getElementById("right-panel");
    if (navMenu != null) {
      navMenu.classList.remove('open');
    }

  }

}
