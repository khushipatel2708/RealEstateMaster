import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  isVisible = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach((section) => {
      const sectionPos = section.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.2;

      if (sectionPos < screenPos) {
        section.classList.add('visible'); // Add the 'visible' class
      }
    });
  }
}
