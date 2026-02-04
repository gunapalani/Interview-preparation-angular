import { Component, ChangeDetectionStrategy, Pipe, PipeTransform } from '@angular/core';
import { DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, DecimalPipe, PercentPipe, JsonPipe, SlicePipe, AsyncPipe } from '@angular/common';
import { interval, map, Observable } from 'rxjs';

// Custom Pure Pipe
@Pipe({
  name: 'exponential',
  pure: true, // Default is true - only recalculates when input changes
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}

// Custom Pipe for Text Transformation
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, ellipsis = '...'): string {
    return value.length > limit ? value.substring(0, limit) + ellipsis : value;
  }
}

// Custom Pipe with multiple arguments
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T>(items: T[], property: keyof T, value: unknown): T[] {
    if (!items || !property) return items;
    return items.filter(item => item[property] === value);
  }
}

@Component({
  selector: 'app-pipes-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, 
    DecimalPipe, PercentPipe, JsonPipe, SlicePipe, AsyncPipe,
    ExponentialPipe, TruncatePipe
  ],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Pipes - Data Transformation</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Pipes?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Pipes</strong> are simple functions that transform data in templates.</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Pure Pipes:</strong> Only execute when input value changes (default)</li>
            <li><strong>Impure Pipes:</strong> Execute on every change detection cycle (pure: false)</li>
            <li><strong>Chaining:</strong> Pipes can be chained: {{ '{{ value | pipe1 | pipe2 }}' }}</li>
            <li><strong>Arguments:</strong> Pass with colon: {{ '{{ value | pipe:arg1:arg2 }}' }}</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between pure and impure pipes?</li>
          <li class="ml-4 text-green-700">A: Pure pipes only run when input reference changes. Impure pipes run on every change detection.</li>
          
          <li><strong>Q2:</strong> What is the async pipe and why is it useful?</li>
          <li class="ml-4 text-green-700">A: Auto-subscribes to Observable/Promise, returns value, and auto-unsubscribes on destroy. Prevents memory leaks!</li>
          
          <li><strong>Q3:</strong> How do you create a custom pipe?</li>
          <li class="ml-4 text-green-700">A: Create class with &#64;Pipe decorator, implement PipeTransform interface, define transform() method.</li>
        </ul>
      </section>

      <!-- Live Demo - Built-in Pipes -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Built-in Pipes Demo</h2>
        
        <div class="space-y-3 text-gray-700">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">DatePipe</p>
              <p class="font-mono">{{ today | date:'fullDate' }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">CurrencyPipe</p>
              <p class="font-mono">{{ price | currency:'USD':'symbol':'1.2-2' }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">UpperCasePipe</p>
              <p class="font-mono">{{ sampleText | uppercase }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">LowerCasePipe</p>
              <p class="font-mono">{{ 'HELLO ANGULAR' | lowercase }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">DecimalPipe</p>
              <p class="font-mono">{{ pi | number:'1.2-4' }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">PercentPipe</p>
              <p class="font-mono">{{ percentage | percent:'1.0-2' }}</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">SlicePipe</p>
              <p class="font-mono">{{ longText | slice:0:20 }}...</p>
            </div>
            <div class="p-3 bg-white rounded shadow">
              <p class="text-sm text-gray-500">JsonPipe</p>
              <p class="font-mono text-xs">{{ user | json }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Live Demo - Custom Pipes -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 Custom Pipes Demo</h2>
        
        <div class="space-y-3">
          <div class="p-3 bg-white rounded shadow">
            <p class="text-sm text-gray-500">ExponentialPipe (2^10)</p>
            <p class="font-mono text-2xl text-purple-600">{{ 2 | exponential:10 }}</p>
          </div>
          <div class="p-3 bg-white rounded shadow">
            <p class="text-sm text-gray-500">TruncatePipe (limit: 30)</p>
            <p class="font-mono">{{ longText | truncate:30 }}</p>
          </div>
        </div>
      </section>

      <!-- Async Pipe Demo -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 Async Pipe Demo (Auto-subscribing)</h2>
        <div class="p-4 bg-white rounded shadow">
          <p class="text-sm text-gray-500">Observable timer (updates every second)</p>
          <p class="font-mono text-3xl text-orange-600">{{ timer$ | async }} seconds</p>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Custom Pipe Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class PipesDemoComponent {
  protected readonly today = new Date();
  protected readonly price = 1234.56;
  protected readonly sampleText = 'hello angular';
  protected readonly pi = 3.14159265359;
  protected readonly percentage = 0.856;
  protected readonly longText = 'This is a very long text that needs to be truncated for display purposes';
  protected readonly user = { name: 'John', age: 30 };
  
  // Observable for async pipe demo
  protected readonly timer$: Observable<number> = interval(1000).pipe(
    map(val => val + 1)
  );

  protected readonly codeExample = `
import { Pipe, PipeTransform } from '@angular/core';

// Custom Pure Pipe
@Pipe({
  name: 'exponential',
  pure: true, // Default - recalculates only when input changes
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}

// Usage in template:
// {{ 2 | exponential:10 }}  // Output: 1024

// Async Pipe Example (auto-subscribes and unsubscribes)
timer$ = interval(1000);
// {{ timer$ | async }}  // Auto-subscribes!

// Chaining Pipes
// {{ 'hello' | uppercase | slice:0:3 }}  // Output: HEL`;
}
