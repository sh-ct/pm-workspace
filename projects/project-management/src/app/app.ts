import { Component, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from 'ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('project-management');
  private mediaQueryList!: MediaQueryList;
  private listener!: (e: MediaQueryListEvent) => void;

  ngOnInit(): void {
    // 1. Define the media query
    this.mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');

    // 2. Define the callback function
    this.listener = (e: MediaQueryListEvent) => this.updateTheme(e.matches);

    // 3. Set initial state on load
    this.updateTheme(this.mediaQueryList.matches);

    // 4. Listen for system/browser theme changes
    this.mediaQueryList.addEventListener('change', this.listener);
  }

  private updateTheme(isDark: boolean): void {
    const rootElement = document.documentElement;
    if (isDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }

  ngOnDestroy(): void {
    // 5. Clean up listener to prevent memory leaks
    if (this.mediaQueryList && this.listener) {
      this.mediaQueryList.removeEventListener('change', this.listener);
    }
  }
}
