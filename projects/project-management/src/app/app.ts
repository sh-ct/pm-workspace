import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskCard } from 'ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('project-management');
}
