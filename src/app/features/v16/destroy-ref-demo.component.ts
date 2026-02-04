import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal, toObservable } from '@angular/core/rxjs-interop';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-destroy-ref-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">DestroyRef & takeUntilDestroyed (v16)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is DestroyRef?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>DestroyRef</strong> and <strong>takeUntilDestroyed</strong> simplify cleanup:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>DestroyRef:</strong> Injectable that lets you register cleanup callbacks</li>
            <li><strong>takeUntilDestroyed():</strong> RxJS operator that auto-unsubscribes on destroy</li>
            <li><strong>No OnDestroy needed:</strong> Cleaner code without implementing interface</li>
            <li><strong>Works in services:</strong> Not limited to components</li>
            <li><strong>Injection context:</strong> Must be called in injection context (constructor/field)</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What problem does takeUntilDestroyed solve?</li>
          <li class="ml-4 text-green-700">A: Automatically unsubscribes from observables when component is destroyed, preventing memory leaks without manual unsubscribe logic.</li>
          
          <li><strong>Q2:</strong> When must takeUntilDestroyed be called?</li>
          <li class="ml-4 text-green-700">A: In injection context: constructor, field initializer, or inside runInInjectionContext().</li>
          
          <li><strong>Q3:</strong> How is DestroyRef different from ngOnDestroy?</li>
          <li class="ml-4 text-green-700">A: DestroyRef is injectable and can be used in services/functions. onDestroy callbacks can be registered from anywhere with access to DestroyRef.</li>
          
          <li><strong>Q4:</strong> What are toSignal and toObservable?</li>
          <li class="ml-4 text-green-700">A: toSignal converts Observable to Signal. toObservable converts Signal to Observable. Part of rxjs-interop.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - takeUntilDestroyed</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Auto-cleaned Timer (takeUntilDestroyed)</h3>
            <p class="text-3xl font-bold text-purple-600">{{ timerValue() }} seconds</p>
            <p class="text-sm text-gray-500 mt-2">
              This timer uses takeUntilDestroyed() - no manual unsubscribe needed!
              Navigate away and it auto-cleans up.
            </p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">DestroyRef Callbacks</h3>
            <p>Registered {{ callbackCount }} cleanup callbacks</p>
            <button 
              (click)="registerCallback()"
              class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register Cleanup Callback
            </button>
            <p class="text-sm text-gray-500 mt-2">
              Check console when you navigate away - callbacks will fire!
            </p>
          </div>
        </div>
      </section>

      <!-- Comparison -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔄 Old vs New Cleanup Patterns</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-red-100 rounded-lg">
            <h3 class="font-semibold text-red-800 mb-2">❌ Old Way (Manual)</h3>
            <pre class="text-xs bg-white p-2 rounded overflow-x-auto">{{ oldWayExample }}</pre>
          </div>
          <div class="p-4 bg-green-100 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">✅ New Way (v16+)</h3>
            <pre class="text-xs bg-white p-2 rounded overflow-x-auto">{{ newWayExample }}</pre>
          </div>
        </div>
      </section>

      <!-- RxJS Interop -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔄 RxJS Interop (Signal ↔ Observable)</h2>
        <div class="space-y-2">
          <div class="p-3 bg-white rounded">
            <code class="text-sm">toSignal(observable$)</code>
            <p class="text-gray-600 text-sm">Convert Observable to Signal. Auto-subscribes and unsubscribes.</p>
          </div>
          <div class="p-3 bg-white rounded">
            <code class="text-sm">toObservable(signal)</code>
            <p class="text-gray-600 text-sm">Convert Signal to Observable. Emits on signal changes.</p>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 DestroyRef Code Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class DestroyRefDemoComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  
  protected readonly timerValue = signal(0);
  protected callbackCount = 0;

  constructor() {
    // takeUntilDestroyed in constructor - injection context
    interval(1000).pipe(
      takeUntilDestroyed() // Auto-cleans up!
    ).subscribe(val => {
      this.timerValue.set(val + 1);
    });
  }

  ngOnInit(): void {
    // Register cleanup callback using DestroyRef
    this.destroyRef.onDestroy(() => {
      console.log('🧹 Component destroyed - cleanup callback 1');
    });
  }

  protected registerCallback(): void {
    this.callbackCount++;
    const num = this.callbackCount;
    
    this.destroyRef.onDestroy(() => {
      console.log(`🧹 Cleanup callback ${num} executed`);
    });
  }

  protected readonly oldWayExample = `
// OLD: Manual subscription management
export class OldComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    interval(1000).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`;

  protected readonly newWayExample = `
// NEW: takeUntilDestroyed (v16+)
export class NewComponent {
  constructor() {
    interval(1000).pipe(
      takeUntilDestroyed() // That's it!
    ).subscribe();
  }
}`;

  protected readonly codeExample = `
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal, toObservable } from '@angular/core/rxjs-interop';

// ===== takeUntilDestroyed() =====

@Component({...})
export class TimerComponent {
  constructor() {
    // Must be in injection context (constructor or field initializer)
    interval(1000).pipe(
      takeUntilDestroyed() // Auto-unsubscribes on destroy!
    ).subscribe(val => console.log(val));
  }
}

// ===== DestroyRef for Custom Cleanup =====

@Component({...})
export class ResourceComponent {
  private destroyRef = inject(DestroyRef);
  
  connect() {
    const socket = new WebSocket('ws://...');
    
    // Register cleanup callback
    this.destroyRef.onDestroy(() => {
      socket.close();
      console.log('Socket closed');
    });
  }
}

// ===== In Services =====

@Injectable({ providedIn: 'root' })
export class PollingService {
  private destroyRef = inject(DestroyRef);
  
  startPolling() {
    interval(5000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.fetchData());
  }
}

// ===== toSignal - Observable to Signal =====

@Component({...})
export class DataComponent {
  private http = inject(HttpClient);
  
  // Convert Observable to Signal
  users = toSignal(
    this.http.get<User[]>('/api/users'),
    { initialValue: [] } // Required for sync access
  );
  
  // In template: {{ users() }}
}

// ===== toObservable - Signal to Observable =====

@Component({...})
export class SearchComponent {
  searchTerm = signal('');
  
  // Convert Signal to Observable
  searchTerm$ = toObservable(this.searchTerm);
  
  constructor() {
    this.searchTerm$.pipe(
      debounceTime(300),
      switchMap(term => this.search(term)),
      takeUntilDestroyed()
    ).subscribe();
  }
}

// ===== Outside Injection Context =====

import { runInInjectionContext, Injector } from '@angular/core';

@Component({...})
export class LateInitComponent {
  private injector = inject(Injector);
  
  initLater() {
    // Can't use takeUntilDestroyed() directly here
    // Use runInInjectionContext instead:
    runInInjectionContext(this.injector, () => {
      interval(1000).pipe(
        takeUntilDestroyed()
      ).subscribe();
    });
  }
}`;
}
