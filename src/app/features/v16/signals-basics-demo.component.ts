import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  selector: 'app-signals-basics-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Signals Basics (v16)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Signals?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Signals</strong> are Angular's reactive primitive for state management:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Reactive:</strong> UI updates automatically when signal value changes</li>
            <li><strong>Fine-grained:</strong> Only affected parts of UI update</li>
            <li><strong>Synchronous:</strong> Values are read synchronously (not like observables)</li>
            <li><strong>Simple API:</strong> signal(), get(), set(), update()</li>
            <li><strong>No subscriptions:</strong> No memory leaks from forgotten unsubscribes</li>
          </ul>
        </div>
      </section>

      <!-- Version History -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📅 Signals Version History</h2>
        <div class="space-y-2 text-gray-700">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v16</span>
            <span>Signals introduced (Developer Preview)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v17</span>
            <span>signal(), computed(), effect() stable</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v18</span>
            <span>input(), output(), model() stable</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v19</span>
            <span>resource(), linkedSignal() added</span>
          </div>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between signals and observables?</li>
          <li class="ml-4 text-green-700">A: Signals are synchronous and always have a value. Observables are async streams. Signals don't need subscriptions/unsubscriptions.</li>
          
          <li><strong>Q2:</strong> How do you read a signal value?</li>
          <li class="ml-4 text-green-700">A: Call the signal as a function: mySignal(). In templates: {{ '{{ mySignal() }}' }}</li>
          
          <li><strong>Q3:</strong> What is the difference between set() and update()?</li>
          <li class="ml-4 text-green-700">A: set(newValue) replaces entirely. update(fn) takes previous value: update(prev => prev + 1)</li>
          
          <li><strong>Q4:</strong> How do signals improve performance?</li>
          <li class="ml-4 text-green-700">A: Fine-grained reactivity means only components reading changed signals update, not entire component tree.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Signal Operations</h2>
        
        <div class="space-y-4">
          <!-- Basic Counter -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Basic Counter Signal</h3>
            <p class="text-3xl font-bold text-purple-600 mb-2">{{ count() }}</p>
            <div class="flex gap-2">
              <button (click)="decrementCount()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                set(count() - 1)
              </button>
              <button (click)="incrementCount()" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                update(c =&gt; c + 1)
              </button>
              <button (click)="count.set(0)" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                set(0)
              </button>
            </div>
          </div>

          <!-- Object Signal -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Object Signal</h3>
            <p>Name: <span class="font-bold">{{ user().name }}</span></p>
            <p>Age: <span class="font-bold">{{ user().age }}</span></p>
            <div class="flex gap-2 mt-2">
              <button 
                (click)="incrementAge()" 
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment Age
              </button>
              <button 
                (click)="user.set({ name: 'Jane', age: 25 })" 
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Replace User
              </button>
            </div>
          </div>

          <!-- Array Signal -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Array Signal</h3>
            <ul class="list-disc list-inside mb-2">
              @for (item of items(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
            <div class="flex gap-2">
              <input 
                #newItem 
                type="text" 
                placeholder="New item" 
                class="px-3 py-2 border rounded"
              />
              <button 
                (click)="addItem(newItem.value); newItem.value = ''" 
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Item
              </button>
            </div>
          </div>

          <!-- Read-only Signal -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Read-only Signal (asReadonly)</h3>
            <p>Read-only count: <span class="font-bold text-purple-600">{{ readonlyCount() }}</span></p>
            <p class="text-sm text-gray-500 mt-2">
              asReadonly() creates a read-only view - useful for exposing state publicly
            </p>
          </div>
        </div>
      </section>

      <!-- API Reference -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">📋 Signal API Reference</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-orange-200">
                <th class="p-2">Method</th>
                <th class="p-2">Description</th>
                <th class="p-2">Example</th>
              </tr>
            </thead>
            <tbody class="text-gray-700">
              <tr class="border-b">
                <td class="p-2 font-mono">signal()</td>
                <td class="p-2">Create writable signal</td>
                <td class="p-2 font-mono text-xs">signal(0)</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">mySignal()</td>
                <td class="p-2">Read signal value</td>
                <td class="p-2 font-mono text-xs">count()</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">.set(value)</td>
                <td class="p-2">Set new value</td>
                <td class="p-2 font-mono text-xs">count.set(10)</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono">.update(fn)</td>
                <td class="p-2">Update based on previous</td>
                <td class="p-2 font-mono text-xs">count.update(c => c + 1)</td>
              </tr>
              <tr>
                <td class="p-2 font-mono">.asReadonly()</td>
                <td class="p-2">Create read-only view</td>
                <td class="p-2 font-mono text-xs">count.asReadonly()</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Signals Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class SignalsBasicsDemoComponent {
  // Basic signal
  protected readonly count = signal(0);
  
  // Object signal
  protected readonly user = signal({ name: 'John', age: 30 });
  
  // Array signal
  protected readonly items = signal(['Apple', 'Banana', 'Cherry']);
  
  // Read-only signal
  protected readonly readonlyCount = this.count.asReadonly();

  protected incrementCount(): void {
    this.count.update(c => c + 1);
  }

  protected decrementCount(): void {
    this.count.set(this.count() - 1);
  }

  protected incrementAge(): void {
    this.user.update(u => ({ ...u, age: u.age + 1 }));
  }

  protected addItem(item: string): void {
    if (item.trim()) {
      this.items.update(current => [...current, item]);
    }
  }

  protected readonly codeExample = `
import { signal } from '@angular/core';

// ===== Creating Signals =====

// Primitive signal
const count = signal(0);

// Object signal
const user = signal({ name: 'John', age: 30 });

// Array signal
const items = signal<string[]>([]);

// ===== Reading Signals =====

// Call signal as function to read
const currentCount = count(); // 0
const userName = user().name; // 'John'

// In template
// {{ count() }}
// {{ user().name }}

// ===== Updating Signals =====

// set() - replace value entirely
count.set(10);
user.set({ name: 'Jane', age: 25 });

// update() - based on previous value
count.update(c => c + 1);
user.update(u => ({ ...u, age: u.age + 1 }));
items.update(arr => [...arr, 'New Item']);

// ===== Read-only Signals =====

// Expose read-only version publicly
private readonly _count = signal(0);
readonly count = this._count.asReadonly();

// Outside code can read but not modify
console.log(this.count()); // ✅ Works
// this.count.set(5);      // ❌ Error - no set method

// ===== Signal Options =====

// Custom equality function
const obj = signal({ a: 1 }, {
  equal: (prev, curr) => prev.a === curr.a
});

// ===== Signals vs BehaviorSubject =====

// BehaviorSubject (RxJS)
const subject = new BehaviorSubject(0);
subject.subscribe(v => console.log(v)); // Need subscription
subject.next(1);
subject.unsubscribe(); // Need cleanup

// Signal (Angular)
const sig = signal(0);
console.log(sig()); // Just read, no subscription!
sig.set(1);
// No cleanup needed!`;
}
