import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';

@Component({
  selector: 'app-effect-scheduling-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Effect Scheduling & Execution (v20-21)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Effect Scheduling</h2>
        <div class="space-y-3 text-gray-700">
          <p>Angular 20-21 gives you more control over <strong>when effects execute</strong>:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Default:</strong> Effects run during change detection</li>
            <li><strong>forceRoot:</strong> Effect runs in root injector context</li>
            <li><strong>allowSignalWrites:</strong> Allow setting signals in effects</li>
            <li><strong>manualCleanup:</strong> Control cleanup timing</li>
            <li><strong>Zoneless aware:</strong> Works correctly without Zone.js</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> When do effects run by default?</li>
          <li class="ml-4 text-green-700">A: During change detection, after the component's view is checked. They're batched for efficiency.</li>
          
          <li><strong>Q2:</strong> Why is allowSignalWrites not recommended?</li>
          <li class="ml-4 text-green-700">A: Writing signals in effects can create infinite loops and makes state flow hard to reason about. Use computed() instead.</li>
          
          <li><strong>Q3:</strong> How do you clean up an effect early?</li>
          <li class="ml-4 text-green-700">A: Call the EffectRef.destroy() method, or return a cleanup function from the effect callback.</li>
          
          <li><strong>Q4:</strong> What is effect() onCleanup callback for?</li>
          <li class="ml-4 text-green-700">A: For cleanup when effect re-runs or is destroyed. Useful for canceling subscriptions, timers, or pending operations.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Effect Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">Counter with Effect Logging</h3>
            
            <div class="flex items-center gap-4 mb-4">
              <button 
                (click)="incrementCounter()"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Increment
              </button>
              <span class="text-2xl font-bold">{{ counter() }}</span>
            </div>

            <div class="p-3 bg-gray-100 rounded">
              <h4 class="text-sm font-semibold mb-2">Effect Log (last 5):</h4>
              <div class="text-xs font-mono space-y-1">
                @for (log of effectLogs(); track log) {
                  <div class="text-gray-600">{{ log }}</div>
                }
              </div>
            </div>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">Effect with Cleanup</h3>
            
            <button 
              (click)="toggleTimer()"
              class="px-4 py-2 rounded text-white"
              [class.bg-green-500]="!timerActive()"
              [class.bg-red-500]="timerActive()"
            >
              {{ timerActive() ? 'Stop Timer' : 'Start Timer' }}
            </button>
            
            <span class="ml-4 text-xl">Timer: {{ timerValue() }}</span>
            
            <p class="text-sm text-gray-500 mt-2">
              Effect starts/cleans up interval based on timerActive signal
            </p>
          </div>
        </div>
      </section>

      <!-- Effect Options Reference -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Effect Options</h2>
        <div class="space-y-2 text-sm">
          <div class="p-3 bg-white rounded">
            <code class="text-purple-600 block">effect(fn, {{ '{' }} injector {{ '}' }})</code>
            <p class="text-gray-600 mt-1">Specify custom injector context for the effect</p>
          </div>
          <div class="p-3 bg-white rounded">
            <code class="text-purple-600 block">effect(fn, {{ '{' }} manualCleanup: true {{ '}' }})</code>
            <p class="text-gray-600 mt-1">Effect won't auto-destroy with component</p>
          </div>
          <div class="p-3 bg-white rounded">
            <code class="text-purple-600 block">effect(fn, {{ '{' }} allowSignalWrites: true {{ '}' }})</code>
            <p class="text-gray-600 mt-1">Allow setting signals inside effect (use sparingly!)</p>
          </div>
          <div class="p-3 bg-white rounded">
            <code class="text-purple-600 block">effect((onCleanup) => {{ '{' }} onCleanup(() => ...) {{ '}' }})</code>
            <p class="text-gray-600 mt-1">Register cleanup callback</p>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Effect Scheduling Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class EffectSchedulingDemoComponent {
  protected readonly counter = signal(0);
  protected readonly effectLogs = signal<string[]>([]);
  
  protected readonly timerActive = signal(false);
  protected readonly timerValue = signal(0);

  protected incrementCounter(): void {
    this.counter.update(v => v + 1);
  }

  constructor() {
    // Effect that logs counter changes
    effect(() => {
      const value = this.counter();
      const timestamp = new Date().toLocaleTimeString();
      
      this.effectLogs.update(logs => 
        [...logs.slice(-4), `[${timestamp}] Counter changed to: ${value}`]
      );
    }, { allowSignalWrites: true });

    // Effect with cleanup for timer
    effect((onCleanup) => {
      const active = this.timerActive();
      let interval: ReturnType<typeof setInterval> | null = null;

      if (active) {
        interval = setInterval(() => {
          this.timerValue.update(v => v + 1);
        }, 1000);
      }

      onCleanup(() => {
        if (interval) {
          clearInterval(interval);
        }
      });
    }, { allowSignalWrites: true });
  }

  protected toggleTimer(): void {
    this.timerActive.update(v => !v);
    if (!this.timerActive()) {
      this.timerValue.set(0);
    }
  }

  protected readonly codeExample = `
import { effect, signal, untracked } from '@angular/core';

@Component({...})
export class EffectsComponent {
  counter = signal(0);
  name = signal('Angular');
  
  // ===== Basic Effect =====
  
  constructor() {
    effect(() => {
      // Runs whenever counter changes
      console.log('Counter:', this.counter());
    });
  }
  
  // ===== Effect with Cleanup =====
  
  setupPolling() {
    const isPolling = signal(true);
    
    effect((onCleanup) => {
      if (!isPolling()) return;
      
      const interval = setInterval(() => {
        console.log('Polling...');
      }, 5000);
      
      // Cleanup runs when:
      // 1. Effect re-runs (dependency changed)
      // 2. Effect is destroyed
      onCleanup(() => {
        clearInterval(interval);
        console.log('Polling stopped');
      });
    });
  }
  
  // ===== Effect Options =====
  
  // Allow writing to signals (use sparingly!)
  effectWithWrites = effect(() => {
    const count = this.counter();
    // Normally forbidden, but allowed with option
    this.derivedValue.set(count * 2);
  }, { allowSignalWrites: true });
  
  derivedValue = signal(0);
  
  // ===== untracked() - Exclude Dependencies =====
  
  logEffect = effect(() => {
    // counter is tracked - effect reruns on change
    const count = this.counter();
    
    // name is NOT tracked - won't trigger rerun
    const currentName = untracked(() => this.name());
    
    console.log(\`\${currentName}: \${count}\`);
  });
  
  // ===== Manual Effect Management =====
  
  private effectRef = effect(() => {
    console.log('Value:', this.counter());
  });
  
  stopEffect() {
    this.effectRef.destroy();
  }
  
  // ===== Effect with Injector =====
  
  // For effects created outside injection context
  createEffectOutsideConstructor(injector: Injector) {
    effect(() => {
      console.log('Count:', this.counter());
    }, { injector });
  }
  
  // ===== Best Practices =====
  
  // ❌ AVOID: Writing signals in effects
  badEffect = effect(() => {
    this.otherSignal.set(this.counter() * 2); // Creates coupling!
  }, { allowSignalWrites: true });
  
  // ✅ BETTER: Use computed for derived state
  goodDerived = computed(() => this.counter() * 2);
  
  // ❌ AVOID: Fetching in effects (unless necessary)
  fetchEffect = effect(() => {
    fetch(\`/api/item/\${this.itemId()}\`); // Hard to track!
  });
  
  // ✅ BETTER: Use resource() for data fetching
  itemResource = resource({
    request: () => ({ id: this.itemId() }),
    loader: async ({ request }) => {
      const res = await fetch(\`/api/item/\${request.id}\`);
      return res.json();
    }
  });
  
  // ===== When to Use Effects =====
  
  // 1. Logging / debugging
  effect(() => console.log('Debug:', this.state()));
  
  // 2. Syncing with external systems
  effect(() => localStorage.setItem('state', JSON.stringify(this.state())));
  
  // 3. Manual DOM manipulation (rare)
  effect(() => {
    document.title = \`Count: \${this.counter()}\`;
  });
  
  // 4. Starting/stopping subscriptions
  effect((onCleanup) => {
    const sub = someObservable$.subscribe(/* ... */);
    onCleanup(() => sub.unsubscribe());
  });
}`;
}
