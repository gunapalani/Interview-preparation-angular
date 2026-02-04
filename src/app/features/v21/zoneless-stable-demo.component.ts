import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-zoneless-stable-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Zoneless Angular - Production Ready (v21)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Zoneless is Stable!</h2>
        <div class="space-y-3 text-gray-700">
          <p>Angular 21 marks <strong>zoneless mode as production-ready</strong>:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>No Zone.js:</strong> Remove 12KB+ from bundle</li>
            <li><strong>Better performance:</strong> No unnecessary change detection</li>
            <li><strong>Signal-driven:</strong> Components update via signals</li>
            <li><strong>Simpler debugging:</strong> Stack traces without Zone patches</li>
            <li><strong>Framework integration:</strong> Works with all Angular features</li>
          </ul>
        </div>
      </section>

      <!-- Migration Path -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🛤️ Migration Path</h2>
        <div class="space-y-3">
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
            <div>
              <p class="font-semibold">Enable OnPush everywhere</p>
              <p class="text-sm text-gray-600">All components use ChangeDetectionStrategy.OnPush</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
            <div>
              <p class="font-semibold">Convert to Signals</p>
              <p class="text-sm text-gray-600">Replace mutable properties with signal(), input(), model()</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
            <div>
              <p class="font-semibold">Remove async triggers</p>
              <p class="text-sm text-gray-600">Replace setTimeout-based updates with signal updates</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
            <div>
              <p class="font-semibold">Enable zoneless</p>
              <p class="text-sm text-gray-600">Add provideZonelessChangeDetection() to config</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What triggers change detection in zoneless mode?</li>
          <li class="ml-4 text-green-700">A: Signal changes, event handlers (still work!), async pipe, markForCheck(). NOT setTimeout/setInterval or plain property assignments.</li>
          
          <li><strong>Q2:</strong> Do event handlers still work without Zone.js?</li>
          <li class="ml-4 text-green-700">A: Yes! Angular's event handlers (() = method()) automatically trigger change detection.</li>
          
          <li><strong>Q3:</strong> What about third-party libraries?</li>
          <li class="ml-4 text-green-700">A: Libraries that rely on Zone.js patching need updates. Signal-based libraries work fine.</li>
          
          <li><strong>Q4:</strong> How much smaller is the bundle?</li>
          <li class="ml-4 text-green-700">A: Zone.js is ~12-15KB gzipped. Removing it also improves startup time.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Zoneless-Ready Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">Signal-Based Counter (Zoneless Ready)</h3>
            
            <div class="flex items-center gap-4 mb-3">
              <button 
                (click)="decrement()"
                class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                -
              </button>
              <span class="text-3xl font-bold w-20 text-center">{{ count() }}</span>
              <button 
                (click)="increment()"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +
              </button>
            </div>

            <div class="text-sm text-gray-600 space-y-1">
              <p>✅ Event handlers work in zoneless</p>
              <p>✅ Signal updates trigger change detection</p>
              <p>✅ OnPush strategy enabled</p>
            </div>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">What Would Break Without Signals?</h3>
            
            <div class="p-3 bg-red-100 rounded text-sm">
              <p class="font-mono text-red-700">
                // ❌ This won't update UI in zoneless:
              </p>
              <pre class="text-red-600 mt-1">
setTimeout(() => {{ '{' }}
  this.value = 'new'; // Plain property!
{{ '}' }}, 1000);
              </pre>
            </div>
            
            <div class="p-3 bg-green-100 rounded text-sm mt-3">
              <p class="font-mono text-green-700">
                // ✅ This works in zoneless:
              </p>
              <pre class="text-green-600 mt-1">
setTimeout(() => {{ '{' }}
  this.value.set('new'); // Signal!
{{ '}' }}, 1000);
              </pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Checklist -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">✅ Zoneless Readiness Checklist</h2>
        <div class="space-y-2">
          @for (item of checklist; track item.text) {
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                [checked]="item.checked()"
                (change)="item.checked.set(!item.checked())"
                class="w-4 h-4"
              />
              <span [class.line-through]="item.checked()" [class.text-gray-400]="item.checked()">
                {{ item.text }}
              </span>
            </label>
          }
        </div>
        <p class="mt-4 text-sm text-gray-600">
          Progress: {{ completedCount() }}/{{ checklist.length }} items
        </p>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Zoneless Setup Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ZonelessStableDemoComponent {
  protected readonly count = signal(0);
  
  protected increment(): void {
    this.count.update(v => v + 1);
  }

  protected decrement(): void {
    this.count.update(v => v - 1);
  }
  
  protected readonly checklist = [
    { text: 'All components use OnPush change detection', checked: signal(false) },
    { text: 'State managed with signals (not plain properties)', checked: signal(false) },
    { text: 'No direct Zone.js API usage', checked: signal(false) },
    { text: 'Async operations update signals', checked: signal(false) },
    { text: 'Third-party libraries are zone-compatible', checked: signal(false) },
    { text: 'Tests don\'t rely on Zone.js fakeAsync', checked: signal(false) },
  ];

  protected readonly completedCount = signal(0);

  constructor() {
    // In real app, would use computed()
  }

  protected updateProgress(): void {
    this.completedCount.set(
      this.checklist.filter(item => item.checked()).length
    );
  }

  protected readonly codeExample = `
// ===== Enable Zoneless in Angular 21+ =====

// app.config.ts
import { 
  ApplicationConfig,
  provideZonelessChangeDetection 
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(), // That's it!
    provideRouter(routes),
    provideHttpClient(),
  ]
};

// ===== Remove zone.js from polyfills =====

// angular.json - remove from polyfills array
{
  "build": {
    "options": {
      "polyfills": [
        // "zone.js"  <-- Remove this!
      ]
    }
  }
}

// Or in package.json, remove zone.js dependency entirely

// ===== Component Patterns for Zoneless =====

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // Required!
  template: \`
    <button (click)="increment()">Count: {{ count() }}</button>
  \`
})
export class ZonelessComponent {
  count = signal(0);
  
  // ✅ Event handlers work - Angular handles them
  increment() {
    this.count.update(v => v + 1);
  }
  
  // ✅ Signal updates trigger change detection
  loadData() {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => this.data.set(data)); // Signal update!
  }
  
  // ✅ Using resource() - recommended for HTTP
  data = resource({
    loader: async () => {
      const res = await fetch('/api/data');
      return res.json();
    }
  });
}

// ===== What DOESN'T Work Without Signals =====

@Component({...})
export class BrokenZonelessComponent {
  value = 'initial'; // ❌ Plain property
  
  updateLater() {
    // ❌ Won't trigger UI update in zoneless!
    setTimeout(() => {
      this.value = 'updated';
    }, 1000);
  }
  
  // ❌ Interval won't update UI
  ngOnInit() {
    setInterval(() => {
      this.value = 'ticking'; // Nothing happens!
    }, 1000);
  }
}

// ===== Fixed Version =====

@Component({...})
export class FixedZonelessComponent {
  value = signal('initial'); // ✅ Signal
  
  updateLater() {
    // ✅ Works! Signal update triggers CD
    setTimeout(() => {
      this.value.set('updated');
    }, 1000);
  }
  
  // ✅ Effect with cleanup for intervals
  constructor() {
    effect((onCleanup) => {
      const interval = setInterval(() => {
        this.value.set('ticking'); // Works!
      }, 1000);
      onCleanup(() => clearInterval(interval));
    });
  }
}

// ===== Testing Without Zone =====

// Use async/await instead of fakeAsync
describe('ZonelessComponent', () => {
  it('should update count', async () => {
    const fixture = TestBed.createComponent(ZonelessComponent);
    const component = fixture.componentInstance;
    
    component.increment();
    fixture.detectChanges(); // Manual CD trigger
    
    expect(component.count()).toBe(1);
  });
});

// ===== Manual Change Detection (if needed) =====

@Component({...})
export class ManualCDComponent {
  private cdr = inject(ChangeDetectorRef);
  
  // For rare cases where you need manual trigger
  forceUpdate() {
    this.cdr.markForCheck();
    // or
    this.cdr.detectChanges();
  }
}

// ===== Framework Features That Work in Zoneless =====

// ✅ Event bindings ((click), (input), etc.)
// ✅ Signal updates
// ✅ Async pipe (internally uses markForCheck)
// ✅ Router navigation
// ✅ Form controls (reactive & template-driven)
// ✅ Animations
// ✅ HTTP interceptors
// ✅ resource() / httpResource()`;
}
