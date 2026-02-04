import { 
  Component, 
  ChangeDetectionStrategy, 
  signal, 
  viewChild, 
  viewChildren, 
  contentChild, 
  contentChildren,
  ElementRef,
  QueryList,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-panel-item',
  template: `<div class="p-2 bg-purple-100 rounded m-1"><ng-content /></div>`,
})
export class PanelItemComponent {
  label = signal('Panel Item');
}

@Component({
  selector: 'app-signal-queries-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PanelItemComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Signal Queries (v19)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Signal-based Queries</h2>
        <div class="space-y-3 text-gray-700">
          <p>Signal queries replace decorator-based queries with reactive signals:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>viewChild():</strong> Query single element in view (replaces &#64;ViewChild)</li>
            <li><strong>viewChildren():</strong> Query multiple elements (replaces &#64;ViewChildren)</li>
            <li><strong>contentChild():</strong> Query projected content (replaces &#64;ContentChild)</li>
            <li><strong>contentChildren():</strong> Query multiple projected (replaces &#64;ContentChildren)</li>
            <li><strong>Signal-based:</strong> Results are signals, reactive to changes</li>
            <li><strong>No need for ngAfterViewInit:</strong> Use computed/effect instead</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the advantage of signal queries over decorator queries?</li>
          <li class="ml-4 text-green-700">A: Signal queries are reactive - you can use them in computed() and effect(). No need for ngAfterViewInit timing issues.</li>
          
          <li><strong>Q2:</strong> What does viewChild.required() return?</li>
          <li class="ml-4 text-green-700">A: A signal guaranteed to have a value. Throws error if element not found.</li>
          
          <li><strong>Q3:</strong> When are signal query results available?</li>
          <li class="ml-4 text-green-700">A: After view initialization, just like decorators. But with signals, you use computed/effect instead of lifecycle hooks.</li>
          
          <li><strong>Q4:</strong> Can you query by template reference variable?</li>
          <li class="ml-4 text-green-700">A: Yes! viewChild('myRef') or viewChild.required('myRef') queries #myRef.</li>
        </ul>
      </section>

      <!-- Live Demo - viewChild -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 viewChild() Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Query by Template Reference</h3>
            <input 
              #searchInput
              type="text" 
              placeholder="Search..."
              class="px-3 py-2 border rounded"
            />
            <button 
              (click)="focusInput()"
              class="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Focus Input
            </button>
            <p class="text-sm text-gray-500 mt-2">
              Button uses viewChild('searchInput') to access the input element
            </p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Query by Component Type</h3>
            <app-panel-item>First Panel</app-panel-item>
            <p class="text-sm text-gray-500">
              First PanelItem component queried via viewChild(PanelItemComponent)
            </p>
          </div>
        </div>
      </section>

      <!-- Live Demo - viewChildren -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 viewChildren() Demo</h2>
        
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="font-semibold mb-2">Query Multiple Elements</h3>
          
          <div class="flex gap-2 mb-3">
            <button 
              (click)="addItem()"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Item
            </button>
            <button 
              (click)="removeItem()"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove Item
            </button>
          </div>

          <div class="border rounded p-2">
            @for (item of items(); track item) {
              <app-panel-item>Item {{ item }}</app-panel-item>
            }
          </div>

          <p class="text-sm text-gray-500 mt-2">
            Panel count (from viewChildren signal): <strong>{{ panelCount() }}</strong>
          </p>
        </div>
      </section>

      <!-- Query Type Reference -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">📋 Query Types Reference</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-orange-200">
                <th class="p-2">Old (Decorator)</th>
                <th class="p-2">New (Signal)</th>
                <th class="p-2">Return Type</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;ViewChild('ref')</td>
                <td class="p-2 font-mono text-xs">viewChild('ref')</td>
                <td class="p-2">Signal&lt;T | undefined&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;ViewChild(Type)</td>
                <td class="p-2 font-mono text-xs">viewChild(Type)</td>
                <td class="p-2">Signal&lt;T | undefined&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;ViewChild('ref', {{ '{' }} static: true {{ '}' }})</td>
                <td class="p-2 font-mono text-xs">viewChild.required('ref')</td>
                <td class="p-2">Signal&lt;T&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;ViewChildren(Type)</td>
                <td class="p-2 font-mono text-xs">viewChildren(Type)</td>
                <td class="p-2">Signal&lt;readonly T[]&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;ContentChild(Type)</td>
                <td class="p-2 font-mono text-xs">contentChild(Type)</td>
                <td class="p-2">Signal&lt;T | undefined&gt;</td>
              </tr>
              <tr>
                <td class="p-2 font-mono text-xs">&#64;ContentChildren(Type)</td>
                <td class="p-2 font-mono text-xs">contentChildren(Type)</td>
                <td class="p-2">Signal&lt;readonly T[]&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Signal Queries Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class SignalQueriesDemoComponent {
  // Signal query for template reference
  private readonly searchInputRef = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  
  // Signal query for component type
  private readonly firstPanel = viewChild(PanelItemComponent);
  
  // Signal query for multiple elements
  private readonly panels = viewChildren(PanelItemComponent);
  
  // Computed from signal query
  protected readonly panelCount = signal(0);
  
  // Items for the list
  protected readonly items = signal([1, 2, 3]);
  private nextId = 4;

  constructor() {
    // Update panel count when panels change (effect runs on signal change)
    // Note: In real app, you'd use computed or effect
  }

  protected focusInput(): void {
    const input = this.searchInputRef();
    if (input) {
      input.nativeElement.focus();
    }
  }

  protected addItem(): void {
    this.items.update(items => [...items, this.nextId++]);
    // Signal query automatically updates!
    setTimeout(() => this.panelCount.set(this.panels().length), 0);
  }

  protected removeItem(): void {
    this.items.update(items => items.slice(0, -1));
    setTimeout(() => this.panelCount.set(this.panels().length), 0);
  }

  protected readonly codeExample = `
import { 
  viewChild, 
  viewChildren, 
  contentChild, 
  contentChildren,
  computed,
  effect 
} from '@angular/core';

@Component({
  template: \`
    <input #searchBox />
    <app-item />
    <app-item />
  \`
})
export class MyComponent {
  // ===== viewChild - Single Element =====
  
  // Query by template reference
  searchBox = viewChild<ElementRef>('searchBox');
  // Returns: Signal<ElementRef | undefined>
  
  // Required - guaranteed to exist
  searchBoxRequired = viewChild.required<ElementRef>('searchBox');
  // Returns: Signal<ElementRef>
  
  // Query by component type
  firstItem = viewChild(ItemComponent);
  // Returns: Signal<ItemComponent | undefined>
  
  // With read option (get ElementRef instead of component)
  itemElement = viewChild(ItemComponent, { read: ElementRef });
  
  // ===== viewChildren - Multiple Elements =====
  
  allItems = viewChildren(ItemComponent);
  // Returns: Signal<readonly ItemComponent[]>
  
  allInputs = viewChildren<ElementRef>('input');
  // Returns: Signal<readonly ElementRef[]>
  
  // ===== contentChild - Projected Content =====
  
  // In parent template: <my-container><app-header /></my-container>
  header = contentChild(HeaderComponent);
  // Returns: Signal<HeaderComponent | undefined>
  
  headerRequired = contentChild.required(HeaderComponent);
  // Returns: Signal<HeaderComponent>
  
  // ===== contentChildren - Multiple Projected =====
  
  tabs = contentChildren(TabComponent);
  // Returns: Signal<readonly TabComponent[]>
  
  // ===== Using with computed/effect =====
  
  // Computed based on query results
  itemCount = computed(() => this.allItems().length);
  
  hasItems = computed(() => this.allItems().length > 0);
  
  firstItemLabel = computed(() => 
    this.firstItem()?.label() ?? 'No item'
  );
  
  // Effect when query results change
  constructor() {
    effect(() => {
      const items = this.allItems();
      console.log('Items changed:', items.length);
    });
  }
  
  // ===== Methods using queries =====
  
  focusSearch() {
    this.searchBox()?.nativeElement.focus();
  }
  
  highlightAllItems() {
    for (const item of this.allItems()) {
      item.highlight();
    }
  }
}

// ===== No more ngAfterViewInit for queries! =====

// OLD way with decorators:
@Component({...})
export class OldComponent implements AfterViewInit {
  @ViewChild('input') input!: ElementRef;
  
  ngAfterViewInit() {
    this.input.nativeElement.focus(); // Had to wait for this hook
  }
}

// NEW way with signal queries:
@Component({...})
export class NewComponent {
  input = viewChild.required<ElementRef>('input');
  
  constructor() {
    // Use effect - runs when view is ready and input exists
    effect(() => {
      const el = this.input();
      el.nativeElement.focus();
    });
  }
}`;
}
