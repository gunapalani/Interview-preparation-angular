import { Component, ChangeDetectionStrategy, Injectable, inject, signal } from '@angular/core';

// Example Service with providedIn: 'root' (Singleton)
@Injectable({
  providedIn: 'root', // Tree-shakable, singleton service
})
export class CounterService {
  private readonly count = signal(0);
  
  readonly currentCount = this.count.asReadonly();

  increment(): void {
    this.count.update(v => v + 1);
  }

  decrement(): void {
    this.count.update(v => v - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}

// Example Service for API calls
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly users = signal<string[]>(['Alice', 'Bob', 'Charlie']);
  
  readonly allUsers = this.users.asReadonly();

  addUser(name: string): void {
    this.users.update(users => [...users, name]);
  }
}

@Component({
  selector: 'app-services-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Services & Dependency Injection</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Services?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Services</strong> are classes that handle business logic, data access, and shared functionality.</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Dependency Injection (DI):</strong> Angular's powerful pattern for providing dependencies</li>
            <li><strong>Singleton:</strong> providedIn: 'root' creates one instance for entire app</li>
            <li><strong>inject() function:</strong> Modern way to inject dependencies (v14+)</li>
            <li><strong>Hierarchical Injectors:</strong> Component-level providers create separate instances</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is Dependency Injection?</li>
          <li class="ml-4 text-green-700">A: Design pattern where dependencies are provided rather than created. Angular's DI creates and manages instances.</li>
          
          <li><strong>Q2:</strong> What is the difference between providedIn: 'root' vs component-level providers?</li>
          <li class="ml-4 text-green-700">A: 'root' creates singleton for entire app. Component-level creates new instance per component (and its children).</li>
          
          <li><strong>Q3:</strong> What is inject() function vs constructor injection?</li>
          <li class="ml-4 text-green-700">A: inject() is functional approach (v14+), works outside constructors. Constructor injection is class-based (older approach).</li>
          
          <li><strong>Q4:</strong> What are Injection Tokens?</li>
          <li class="ml-4 text-green-700">A: Used for injecting non-class values like config objects or primitives.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Shared Service</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Counter Service (Singleton)</h3>
            <p class="mb-2">Count: <span class="text-2xl font-bold text-purple-600">{{ counterService.currentCount() }}</span></p>
            <div class="flex gap-2">
              <button (click)="counterService.decrement()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">-</button>
              <button (click)="counterService.increment()" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">+</button>
              <button (click)="counterService.reset()" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Reset</button>
            </div>
            <p class="mt-2 text-sm text-gray-500">This value is shared across the entire app!</p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">User Service</h3>
            <ul class="mb-2">
              @for (user of userService.allUsers(); track user) {
                <li class="text-gray-700">• {{ user }}</li>
              }
            </ul>
            <div class="flex gap-2">
              <input 
                #newUser 
                type="text" 
                placeholder="New user name" 
                class="px-3 py-2 border rounded"
              />
              <button 
                (click)="addUser(newUser.value); newUser.value = ''" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >Add User</button>
            </div>
          </div>
        </div>
      </section>

      <!-- DI Providers Table -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Provider Types</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-purple-200">
                <th class="p-2">Provider Type</th>
                <th class="p-2">Description</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr class="border-b">
                <td class="p-2 font-mono">useClass</td>
                <td class="p-2">Provide a different class implementation</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">useValue</td>
                <td class="p-2">Provide a static value</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">useFactory</td>
                <td class="p-2">Provide value from a factory function</td>
              </tr>
              <tr>
                <td class="p-2 font-mono">useExisting</td>
                <td class="p-2">Alias to another provider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Service Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ServicesDemoComponent {
  // Modern inject() function (Angular 14+)
  protected readonly counterService = inject(CounterService);
  protected readonly userService = inject(UserService);

  protected addUser(name: string): void {
    if (name.trim()) {
      this.userService.addUser(name);
    }
  }

  protected readonly codeExample = `
import { Injectable, inject, signal } from '@angular/core';

// Singleton Service (providedIn: 'root')
@Injectable({
  providedIn: 'root', // Tree-shakable singleton
})
export class CounterService {
  private readonly count = signal(0);
  
  // Expose read-only signal
  readonly currentCount = this.count.asReadonly();

  increment(): void {
    this.count.update(v => v + 1);
  }
}

// Component using the service
@Component({...})
export class MyComponent {
  // Modern inject() function (v14+)
  private readonly counterService = inject(CounterService);
  
  // Or constructor injection (older approach)
  // constructor(private counterService: CounterService) {}
}

// Injection Token for non-class values
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

// Providing in app config
export const appConfig = {
  providers: [
    { provide: API_URL, useValue: 'https://api.example.com' }
  ]
};`;
}
