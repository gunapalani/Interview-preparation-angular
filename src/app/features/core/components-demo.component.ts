import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-components-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Components - Building Blocks</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Components?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Components</strong> are the fundamental building blocks of Angular applications. Each component consists of:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Class:</strong> Contains data and logic (TypeScript)</li>
            <li><strong>Template:</strong> Defines the view (HTML)</li>
            <li><strong>Styles:</strong> Component-specific CSS</li>
            <li><strong>Metadata:</strong> &#64;Component decorator configuration</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between a component and a directive?</li>
          <li class="ml-4 text-green-700">A: Components have templates, directives don't. Components are directives with a view.</li>
          
          <li><strong>Q2:</strong> What is ViewEncapsulation?</li>
          <li class="ml-4 text-green-700">A: Controls how styles are scoped. Options: Emulated (default), None, ShadowDom.</li>
          
          <li><strong>Q3:</strong> What is ChangeDetectionStrategy?</li>
          <li class="ml-4 text-green-700">A: Default checks all components, OnPush only checks when inputs change or events occur.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Component with Signal State</h3>
            <p class="mb-2">Counter Value: <span class="text-2xl font-bold text-purple-600">{{ count() }}</span></p>
            <p class="mb-2">Doubled: <span class="text-xl text-blue-600">{{ doubled() }}</span></p>
            <div class="flex gap-2">
              <button 
                (click)="decrement()" 
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >-</button>
              <button 
                (click)="increment()" 
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >+</button>
              <button 
                (click)="reset()" 
                class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >Reset</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Code Example</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ComponentsDemoComponent {
  // Signal-based state (Angular 16+)
  protected readonly count = signal(0);
  
  // Computed value - derived state
  protected readonly doubled = computed(() => this.count() * 2);

  protected increment(): void {
    this.count.update(value => value + 1);
  }

  protected decrement(): void {
    this.count.update(value => value - 1);
  }

  protected reset(): void {
    this.count.set(0);
  }

  protected readonly codeExample = `
import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <p>Count: {{ count() }}</p>
    <p>Doubled: {{ doubled() }}</p>
    <button (click)="increment()">+</button>
  \`
})
export class CounterComponent {
  // Signal state
  count = signal(0);
  
  // Computed derived state
  doubled = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(v => v + 1);
  }
}`;
}
