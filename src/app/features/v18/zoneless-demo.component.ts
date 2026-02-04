import { Component, ChangeDetectionStrategy, signal, computed, provideZonelessChangeDetection } from '@angular/core';

@Component({
  selector: 'app-zoneless-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Zoneless Change Detection (v18-21)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is Zoneless Angular?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Zoneless</strong> means running Angular without zone.js:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>No zone.js:</strong> Removes the monkey-patching of async APIs</li>
            <li><strong>Smaller bundles:</strong> zone.js is ~15KB minified</li>
            <li><strong>Better performance:</strong> No unnecessary change detection cycles</li>
            <li><strong>Signal-driven:</strong> Change detection triggered by signals</li>
            <li><strong>Explicit triggers:</strong> Use markForCheck() or signals</li>
          </ul>
        </div>
      </section>

      <!-- Version Progress -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📅 Zoneless Version History</h2>
        <div class="space-y-2 text-gray-700">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-yellow-200 rounded text-sm font-mono">v18</span>
            <span>Experimental zoneless (provideExperimentalZonelessChangeDetection)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-orange-200 rounded text-sm font-mono">v19</span>
            <span>Developer preview (provideZonelessChangeDetection)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-green-200 rounded text-sm font-mono">v21</span>
            <span>Stable release ready for production</span>
          </div>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is zone.js and why remove it?</li>
          <li class="ml-4 text-green-700">A: zone.js patches async APIs (setTimeout, Promise, etc.) to trigger change detection. Removing it reduces bundle size and gives more control.</li>
          
          <li><strong>Q2:</strong> How does change detection work without zone.js?</li>
          <li class="ml-4 text-green-700">A: Angular schedules change detection when signals change, or when you explicitly call markForCheck(), ChangeDetectorRef.detectChanges(), or ApplicationRef.tick().</li>
          
          <li><strong>Q3:</strong> What changes are needed for zoneless?</li>
          <li class="ml-4 text-green-700">A: Use signals for state, use OnPush change detection, avoid relying on automatic detection from async operations.</li>
          
          <li><strong>Q4:</strong> Can existing apps migrate to zoneless?</li>
          <li class="ml-4 text-green-700">A: Yes, gradually. Start with OnPush and signals, then remove zone.js. Some third-party libs may need updates.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Zoneless-Ready Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Signal-based State (Zoneless Ready ✅)</h3>
            <p class="text-3xl font-bold text-purple-600 mb-2">{{ count() }}</p>
            <div class="flex gap-2">
              <button (click)="decrement()" class="px-4 py-2 bg-red-500 text-white rounded">-</button>
              <button (click)="increment()" class="px-4 py-2 bg-green-500 text-white rounded">+</button>
            </div>
            <p class="text-sm text-gray-500 mt-2">
              ✅ Uses signal - automatically triggers change detection
            </p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Computed Values (Zoneless Ready ✅)</h3>
            <p>Count × 2 = <span class="font-bold text-blue-600">{{ doubled() }}</span></p>
            <p>Count × 10 = <span class="font-bold text-purple-600">{{ timesTen() }}</span></p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Async Operations with Signals</h3>
            <button 
              (click)="simulateAsync()"
              [disabled]="loading()"
              class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {{ loading() ? 'Loading...' : 'Fetch Data' }}
            </button>
            @if (asyncData()) {
              <p class="mt-2 text-green-600">Data: {{ asyncData() }}</p>
            }
            <p class="text-sm text-gray-500 mt-2">
              ✅ Signals update after async, triggering change detection
            </p>
          </div>
        </div>
      </section>

      <!-- How to Enable -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">⚙️ How to Enable Zoneless</h2>
        <div class="p-4 bg-white rounded font-mono text-sm">
          <pre>{{ enableZonelessCode }}</pre>
        </div>
      </section>

      <!-- Migration Checklist -->
      <section class="mb-8 p-6 bg-red-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-red-800">📋 Migration Checklist</h2>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Use <code class="bg-gray-200 px-1 rounded">ChangeDetectionStrategy.OnPush</code> in all components</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Replace class properties with <code class="bg-gray-200 px-1 rounded">signal()</code></span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Use <code class="bg-gray-200 px-1 rounded">computed()</code> for derived state</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Use <code class="bg-gray-200 px-1 rounded">input()</code> and <code class="bg-gray-200 px-1 rounded">output()</code> instead of decorators</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Update signals in async callbacks (they'll trigger CD)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-yellow-500">⚠️</span>
            <span>Check third-party libraries for zone.js dependencies</span>
          </li>
        </ul>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Zoneless Code Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ZonelessDemoComponent {
  protected readonly count = signal(0);
  protected readonly doubled = computed(() => this.count() * 2);
  protected readonly timesTen = computed(() => this.count() * 10);
  
  protected readonly loading = signal(false);
  protected readonly asyncData = signal<string | null>(null);

  protected increment(): void {
    this.count.update(c => c + 1);
  }

  protected decrement(): void {
    this.count.update(c => c - 1);
  }

  protected simulateAsync(): void {
    this.loading.set(true);
    this.asyncData.set(null);
    
    // Simulate API call
    setTimeout(() => {
      this.asyncData.set(`Data loaded at ${new Date().toLocaleTimeString()}`);
      this.loading.set(false);
      // Signal update automatically triggers change detection!
    }, 1500);
  }

  protected readonly enableZonelessCode = `
// app.config.ts
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    // ... other providers
  ]
};

// Also remove zone.js from angular.json polyfills
// "polyfills": [] // Remove "zone.js"`;

  protected readonly codeExample = `
// ===== Enabling Zoneless (v18+ experimental, v19+ preview, v21 stable) =====

// app.config.ts
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // v19+
    // Or for v18:
    // provideExperimentalZonelessChangeDetection(),
  ]
};

// ===== Zoneless-Ready Component =====

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Required!
  template: \`
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">+</button>
  \`
})
export class CounterComponent {
  count = signal(0);
  
  increment() {
    this.count.update(c => c + 1);
    // Signal change automatically schedules change detection
  }
}

// ===== Handling Async Operations =====

@Component({...})
export class DataComponent {
  data = signal<Data | null>(null);
  loading = signal(false);
  
  async loadData() {
    this.loading.set(true);
    
    try {
      const result = await fetch('/api/data').then(r => r.json());
      this.data.set(result); // ✅ Triggers change detection
    } finally {
      this.loading.set(false);
    }
  }
}

// ===== Manual Change Detection (when needed) =====

@Component({...})
export class LegacyComponent {
  private cdr = inject(ChangeDetectorRef);
  
  // For non-signal state that changes outside Angular
  legacyData: string;
  
  externalCallback() {
    this.legacyData = 'updated';
    this.cdr.markForCheck(); // Manual trigger
  }
}

// ===== What NOT to do in Zoneless =====

// ❌ Mutating regular properties won't trigger updates
@Component({...})
export class BadComponent {
  count = 0; // ❌ Not a signal
  
  increment() {
    this.count++; // ❌ Won't update UI in zoneless!
  }
}

// ✅ Use signals instead
@Component({...})
export class GoodComponent {
  count = signal(0);
  
  increment() {
    this.count.update(c => c + 1); // ✅ Works!
  }
}`;
}
