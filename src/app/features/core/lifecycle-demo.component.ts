import { 
  Component, 
  ChangeDetectionStrategy, 
  OnInit, 
  OnChanges, 
  AfterViewInit, 
  OnDestroy,
  signal,
  input,
  SimpleChanges,
  DestroyRef,
  inject
} from '@angular/core';

// Child component to demonstrate lifecycle (defined first to avoid forward reference)
@Component({
  selector: 'app-lifecycle-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4 bg-blue-100 rounded-lg">
      <h4 class="font-semibold">Child Component</h4>
      <p>Input count: {{ count() }}</p>
      <p class="text-sm text-gray-500">Check console for lifecycle logs</p>
    </div>
  `,
})
export class LifecycleChildComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  count = input(0);
  
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    console.log('👶 Child: constructor');
    
    // Modern cleanup registration
    this.destroyRef.onDestroy(() => {
      console.log('🧹 Child: DestroyRef cleanup');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('🔄 Child: ngOnChanges', changes);
  }

  ngOnInit(): void {
    console.log('✅ Child: ngOnInit');
  }

  ngAfterViewInit(): void {
    console.log('👁️ Child: ngAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('💀 Child: ngOnDestroy');
  }
}

@Component({
  selector: 'app-lifecycle-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LifecycleChildComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Lifecycle Hooks</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Lifecycle Hooks?</h2>
        <div class="space-y-3 text-gray-700">
          <p>Angular calls lifecycle hook methods at specific moments in a component's lifecycle:</p>
          <ol class="list-decimal list-inside ml-4 space-y-1">
            <li><strong>constructor:</strong> Called first, before any lifecycle hook</li>
            <li><strong>ngOnChanges:</strong> Called when input properties change</li>
            <li><strong>ngOnInit:</strong> Called once after first ngOnChanges</li>
            <li><strong>ngDoCheck:</strong> Called during every change detection</li>
            <li><strong>ngAfterContentInit:</strong> After content projection (ng-content)</li>
            <li><strong>ngAfterContentChecked:</strong> After every content check</li>
            <li><strong>ngAfterViewInit:</strong> After component's view initialized</li>
            <li><strong>ngAfterViewChecked:</strong> After every view check</li>
            <li><strong>ngOnDestroy:</strong> Before component is destroyed</li>
          </ol>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between ngOnInit and constructor?</li>
          <li class="ml-4 text-green-700">A: Constructor is for DI setup. ngOnInit is for initialization logic when inputs are ready.</li>
          
          <li><strong>Q2:</strong> When should you use ngOnDestroy?</li>
          <li class="ml-4 text-green-700">A: For cleanup: unsubscribe from observables, remove event listeners, clear timers.</li>
          
          <li><strong>Q3:</strong> What is DestroyRef? (Angular 16+)</li>
          <li class="ml-4 text-green-700">A: Injectable that allows registering cleanup callbacks, can be used outside component class.</li>
          
          <li><strong>Q4:</strong> What is takeUntilDestroyed()? (Angular 16+)</li>
          <li class="ml-4 text-green-700">A: RxJS operator that auto-unsubscribes when component is destroyed. Cleaner than manual unsubscribe.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Lifecycle Events</h2>
        
        <div class="space-y-4">
          <div class="flex gap-2 mb-4">
            <button 
              (click)="showChild.set(!showChild())" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {{ showChild() ? 'Destroy' : 'Create' }} Child Component
            </button>
            <button 
              (click)="counter.set(counter() + 1)" 
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Change Input ({{ counter() }})
            </button>
          </div>

          @if (showChild()) {
            <app-lifecycle-child [count]="counter()" />
          }

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Lifecycle Log (check console)</h3>
            <p class="text-sm text-gray-500">Open browser DevTools to see lifecycle hooks firing</p>
          </div>
        </div>
      </section>

      <!-- Lifecycle Order Diagram -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Lifecycle Order</h2>
        <div class="space-y-2 font-mono text-sm">
          <div class="p-2 bg-gray-200 rounded">1. constructor()</div>
          <div class="p-2 bg-yellow-200 rounded">2. ngOnChanges() ← when inputs change</div>
          <div class="p-2 bg-green-200 rounded">3. ngOnInit() ← initialization</div>
          <div class="p-2 bg-gray-200 rounded">4. ngDoCheck()</div>
          <div class="p-2 bg-blue-200 rounded">5. ngAfterContentInit() ← ng-content ready</div>
          <div class="p-2 bg-gray-200 rounded">6. ngAfterContentChecked()</div>
          <div class="p-2 bg-blue-200 rounded">7. ngAfterViewInit() ← view ready</div>
          <div class="p-2 bg-gray-200 rounded">8. ngAfterViewChecked()</div>
          <div class="p-2 bg-red-200 rounded">9. ngOnDestroy() ← cleanup</div>
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
export class LifecycleDemoComponent {
  protected readonly showChild = signal(false);
  protected readonly counter = signal(0);

  protected readonly codeExample = `
import { Component, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({...})
export class MyComponent implements OnInit, OnDestroy {
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Modern approach with takeUntilDestroyed (v16+)
    interval(1000).pipe(
      takeUntilDestroyed() // Auto-unsubscribes!
    ).subscribe(console.log);
  }

  ngOnInit(): void {
    console.log('Component initialized, inputs ready');
    
    // Register cleanup with DestroyRef (v16+)
    this.destroyRef.onDestroy(() => {
      console.log('Cleanup via DestroyRef');
    });
  }

  ngOnDestroy(): void {
    console.log('Component destroyed - cleanup here');
  }
}`;
}
