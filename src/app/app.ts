import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <a routerLink="/" class="flex items-center gap-3 hover:opacity-90 transition">
              <span class="text-3xl">🅰️</span>
              <div>
                <h1 class="text-xl font-bold">Angular Features Showcase</h1>
                <p class="text-sm opacity-80">v14 - v21 Interview Preparation</p>
              </div>
            </a>
            <nav class="hidden md:flex gap-4 text-sm">
              <a routerLink="/" class="hover:underline">Home</a>
              <a routerLink="/core/components" class="hover:underline">Core</a>
              <a routerLink="/v16/signals-basics" class="hover:underline">Signals</a>
              <a routerLink="/v17/control-flow" class="hover:underline">Control Flow</a>
              <a routerLink="/v21/zoneless-stable" class="hover:underline">Zoneless</a>
            </nav>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="mx-auto">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="bg-gray-800 text-gray-400 text-center py-4 mt-8">
        <p>Angular Features Showcase - Interview Preparation Resource</p>
        <p class="text-sm mt-1">Built with Angular {{ angularVersion }}</p>
      </footer>
    </div>
  `,
})
export class App {
  protected readonly title = signal('Angular Features Showcase');
  protected readonly angularVersion = '21';
}
