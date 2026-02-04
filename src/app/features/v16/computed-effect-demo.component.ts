import { Component, ChangeDetectionStrategy, signal, computed, effect, untracked, Injector, inject, runInInjectionContext } from '@angular/core';

@Component({
  selector: 'app-computed-effect-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Computed & Effect (v16)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Computed and Effect</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>computed()</strong> - Derived state that auto-updates:</p>
          <ul class="list-disc list-inside ml-4 space-y-1">
            <li>Memoized - only recalculates when dependencies change</li>
            <li>Read-only - cannot be set directly</li>
            <li>Lazy - only calculates when read</li>
          </ul>
          <p class="mt-3"><strong>effect()</strong> - Side effects when signals change:</p>
          <ul class="list-disc list-inside ml-4 space-y-1">
            <li>Runs when tracked signals change</li>
            <li>Great for logging, localStorage, external APIs</li>
            <li>Auto-cleanup on destroy</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between computed() and effect()?</li>
          <li class="ml-4 text-green-700">A: computed() creates derived read-only values. effect() runs side effects when signals change but returns nothing.</li>
          
          <li><strong>Q2:</strong> Is computed() lazy or eager?</li>
          <li class="ml-4 text-green-700">A: Lazy - it only calculates when the value is read, not when dependencies change.</li>
          
          <li><strong>Q3:</strong> Can you write to signals inside effect()?</li>
          <li class="ml-4 text-green-700">A: By default no (to prevent infinite loops). Use allowSignalWrites: true or untracked() to do it safely.</li>
          
          <li><strong>Q4:</strong> What is untracked()?</li>
          <li class="ml-4 text-green-700">A: Reads signal value without creating dependency. Useful in effects when you don't want to track certain signals.</li>
        </ul>
      </section>

      <!-- Live Demo - Computed -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - computed()</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Shopping Cart Example</h3>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm mb-1">Price ($)</label>
                <input 
                  type="number" 
                  [value]="price()"
                  (input)="price.set(+getValue($event))"
                  class="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label class="block text-sm mb-1">Quantity</label>
                <input 
                  type="number" 
                  [value]="quantity()"
                  (input)="quantity.set(+getValue($event))"
                  class="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
            <div class="p-3 bg-gray-100 rounded">
              <p>Subtotal: <span class="font-bold">\${{ subtotal().toFixed(2) }}</span> <span class="text-sm text-gray-500">(computed: price × quantity)</span></p>
              <p>Tax (8%): <span class="font-bold">\${{ tax().toFixed(2) }}</span> <span class="text-sm text-gray-500">(computed: subtotal × 0.08)</span></p>
              <p class="text-xl mt-2">Total: <span class="font-bold text-green-600">\${{ total().toFixed(2) }}</span> <span class="text-sm text-gray-500">(computed: subtotal + tax)</span></p>
            </div>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Filtered List (computed)</h3>
            <input 
              type="text" 
              [value]="searchTerm()"
              (input)="searchTerm.set(getValue($event))"
              placeholder="Search fruits..."
              class="w-full px-3 py-2 border rounded mb-2"
            />
            <ul class="space-y-1">
              @for (fruit of filteredFruits(); track fruit) {
                <li class="p-2 bg-gray-100 rounded">{{ fruit }}</li>
              } @empty {
                <li class="text-gray-500">No fruits found</li>
              }
            </ul>
            <p class="text-sm text-gray-500 mt-2">Found: {{ filteredFruits().length }} of {{ fruits().length }}</p>
          </div>
        </div>
      </section>

      <!-- Live Demo - Effect -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 Live Demo - effect()</h2>
        
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="font-semibold mb-2">Effect Logger</h3>
          <p class="mb-2">Theme: <span class="font-bold">{{ theme() }}</span></p>
          <div class="flex gap-2 mb-4">
            <button 
              (click)="theme.set('light')" 
              class="px-4 py-2 bg-yellow-400 text-black rounded"
            >Light</button>
            <button 
              (click)="theme.set('dark')" 
              class="px-4 py-2 bg-gray-800 text-white rounded"
            >Dark</button>
            <button 
              (click)="theme.set('system')" 
              class="px-4 py-2 bg-blue-500 text-white rounded"
            >System</button>
          </div>
          <div class="p-3 bg-gray-100 rounded">
            <p class="text-sm font-semibold">Effect Log (check console too):</p>
            <ul class="text-sm mt-2 space-y-1">
              @for (log of effectLogs(); track log) {
                <li class="text-gray-600">{{ log }}</li>
              }
            </ul>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Computed & Effect Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ComputedEffectDemoComponent {
  private readonly injector = inject(Injector);
  
  // Signals for computed demo
  protected readonly price = signal(29.99);
  protected readonly quantity = signal(2);
  
  // Computed values (derived state)
  protected readonly subtotal = computed(() => this.price() * this.quantity());
  protected readonly tax = computed(() => this.subtotal() * 0.08);
  protected readonly total = computed(() => this.subtotal() + this.tax());
  
  // Filtered list demo
  protected readonly fruits = signal(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);
  protected readonly searchTerm = signal('');
  protected readonly filteredFruits = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.fruits().filter(f => f.toLowerCase().includes(term));
  });
  
  // Effect demo
  protected readonly theme = signal<'light' | 'dark' | 'system'>('light');
  protected readonly effectLogs = signal<string[]>([]);

  constructor() {
    // Effect - runs when theme changes
    effect(() => {
      const currentTheme = this.theme();
      const logMessage = `[${new Date().toLocaleTimeString()}] Theme changed to: ${currentTheme}`;
      
      // Log to console
      console.log(logMessage);
      
      // Update logs (need untracked to avoid infinite loop)
      untracked(() => {
        this.effectLogs.update(logs => [...logs.slice(-4), logMessage]);
      });
      
      // Simulate saving to localStorage
      // localStorage.setItem('theme', currentTheme);
    });
  }

  protected getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected readonly codeExample = `
import { signal, computed, effect, untracked } from '@angular/core';

// ===== computed() - Derived State =====

const price = signal(10);
const quantity = signal(2);

// Computed automatically recalculates when dependencies change
const total = computed(() => price() * quantity());

console.log(total()); // 20
price.set(15);
console.log(total()); // 30 (auto-updated!)

// Computed is read-only
// total.set(100); // ❌ Error!

// ===== effect() - Side Effects =====

const theme = signal<'light' | 'dark'>('light');

// Effect runs when theme signal changes
effect(() => {
  const currentTheme = theme();
  console.log('Theme changed to:', currentTheme);
  localStorage.setItem('theme', currentTheme);
  document.body.className = currentTheme;
});

theme.set('dark'); // Effect runs automatically!

// ===== untracked() - Read Without Tracking =====

const firstName = signal('John');
const lastName = signal('Doe');
const logCount = signal(0);

effect(() => {
  // This effect only tracks firstName
  const first = firstName();
  
  // Read lastName without tracking (won't re-run if lastName changes)
  const last = untracked(() => lastName());
  
  console.log(\`Name: \${first} \${last}\`);
});

// ===== Effect Cleanup =====

effect((onCleanup) => {
  const interval = setInterval(() => {
    console.log('Tick:', Date.now());
  }, 1000);
  
  // Cleanup when effect re-runs or component destroys
  onCleanup(() => clearInterval(interval));
});

// ===== Effect Options =====

effect(() => { ... }, {
  allowSignalWrites: true, // Allow writing to signals (careful!)
  injector: this.injector, // Custom injector
});

// ===== Creating Effect Outside Constructor =====

// In a method (need injector)
const injector = inject(Injector);

someMethod() {
  runInInjectionContext(this.injector, () => {
    effect(() => {
      console.log('This works!');
    });
  });
}`;
}
