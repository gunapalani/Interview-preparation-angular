import { Component, ChangeDetectionStrategy, signal, computed, linkedSignal, WritableSignal } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-resource-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Resource API & linkedSignal (v19)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Resource API</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>resource()</strong> is Angular's built-in async data loading pattern:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Declarative:</strong> Define request as signal, auto-refetches on change</li>
            <li><strong>States:</strong> Tracks idle, loading, resolved, error states</li>
            <li><strong>Signal-based:</strong> Returns signal of data</li>
            <li><strong>Auto-cancellation:</strong> Cancels previous request on new params</li>
            <li><strong>httpResource():</strong> Built-in HTTP integration (v20+)</li>
          </ul>
        </div>
      </section>

      <!-- linkedSignal Section -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📚 linkedSignal</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>linkedSignal()</strong> creates a writable computed signal:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Writable computed:</strong> Like computed but can be set manually</li>
            <li><strong>Auto-resets:</strong> Resets to computed value when dependencies change</li>
            <li><strong>User overrides:</strong> User can override, but source change resets it</li>
            <li><strong>Use cases:</strong> Form defaults, derived state with overrides</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between resource() and httpResource()?</li>
          <li class="ml-4 text-green-700">A: resource() is generic for any async loader. httpResource() is specifically for HTTP requests with built-in HttpClient integration.</li>
          
          <li><strong>Q2:</strong> What states does a resource have?</li>
          <li class="ml-4 text-green-700">A: idle, loading, resolved (success), error. Access via resource.status().</li>
          
          <li><strong>Q3:</strong> What is linkedSignal used for?</li>
          <li class="ml-4 text-green-700">A: Creating writable derived state. It computes from sources but can be manually overwritten. Resets when source changes.</li>
          
          <li><strong>Q4:</strong> How does resource handle concurrent requests?</li>
          <li class="ml-4 text-green-700">A: New requests cancel pending ones automatically. Uses AbortController internally.</li>
        </ul>
      </section>

      <!-- linkedSignal Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - linkedSignal</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">Product Configurator</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm mb-1">Select Product:</label>
                <select 
                  (change)="selectProduct($event)"
                  class="w-full px-3 py-2 border rounded"
                >
                  @for (product of products; track product.id) {
                    <option [value]="product.id" [selected]="selectedProductId() === product.id">
                      {{ product.name }} - \${{ product.defaultPrice }}
                    </option>
                  }
                </select>
              </div>
              
              <div>
                <label class="block text-sm mb-1">Base Price (from product):</label>
                <p class="text-2xl font-bold text-gray-600">\${{ selectedProduct()?.defaultPrice }}</p>
              </div>
            </div>

            <div class="p-3 bg-gray-100 rounded mb-3">
              <label class="block text-sm mb-1">Custom Price (linkedSignal - can override):</label>
              <div class="flex gap-2 items-center">
                <input 
                  type="number"
                  [value]="customPrice()"
                  (input)="customPrice.set(+getValue($event))"
                  class="px-3 py-2 border rounded w-32"
                />
                <span class="text-sm text-gray-500">
                  @if (customPrice() !== selectedProduct()?.defaultPrice) {
                    (overridden!)
                    <button 
                      (click)="resetPrice()"
                      class="ml-2 text-blue-500 underline"
                    >Reset</button>
                  }
                </span>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Change product → price auto-resets. Override price → persists until product changes.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">Quantity:</label>
                <input 
                  type="number"
                  [value]="quantity()"
                  (input)="quantity.set(+getValue($event))"
                  min="1"
                  class="w-full px-3 py-2 border rounded"
                />
              </div>
              
              <div>
                <label class="block text-sm mb-1">Total (computed):</label>
                <p class="text-2xl font-bold text-green-600">\${{ total() }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Resource Demo -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 Resource API Concept</h2>
        
        <div class="p-4 bg-white rounded-lg shadow">
          <h3 class="font-semibold mb-3">Simulated Resource Loading</h3>
          
          <div class="flex gap-2 mb-4">
            <input 
              type="text"
              [value]="searchQuery()"
              (input)="searchQuery.set(getValue($event))"
              placeholder="Enter user ID (1-10)"
              class="px-3 py-2 border rounded"
            />
            <button 
              (click)="loadUser()"
              [disabled]="resourceLoading()"
              class="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
            >
              {{ resourceLoading() ? 'Loading...' : 'Load User' }}
            </button>
          </div>

          @switch (resourceStatus()) {
            @case ('idle') {
              <p class="text-gray-500">Enter a user ID and click Load</p>
            }
            @case ('loading') {
              <div class="flex items-center gap-2 text-blue-600">
                <span class="animate-spin">⏳</span> Loading user data...
              </div>
            }
            @case ('resolved') {
              <div class="p-3 bg-green-100 rounded">
                <p class="font-bold text-green-700">User loaded!</p>
                <pre class="text-sm mt-2">{{ userData() | json }}</pre>
              </div>
            }
            @case ('error') {
              <div class="p-3 bg-red-100 rounded">
                <p class="text-red-700">{{ resourceError() }}</p>
              </div>
            }
          }
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Resource & linkedSignal Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ResourceDemoComponent {
  // Products data
  protected readonly products = [
    { id: 1, name: 'Basic Widget', defaultPrice: 29.99 },
    { id: 2, name: 'Pro Widget', defaultPrice: 79.99 },
    { id: 3, name: 'Enterprise Widget', defaultPrice: 199.99 },
  ];

  // Source signal
  protected readonly selectedProductId = signal(1);
  
  // Computed from source
  protected readonly selectedProduct = computed(() => 
    this.products.find(p => p.id === this.selectedProductId())
  );

  // linkedSignal - writable computed!
  // Derives from selectedProduct.defaultPrice but can be overwritten
  // Resets when selectedProduct changes
  protected readonly customPrice: WritableSignal<number> = linkedSignal(() => 
    this.selectedProduct()?.defaultPrice ?? 0
  );

  protected readonly quantity = signal(1);
  
  protected readonly total = computed(() => 
    this.customPrice() * this.quantity()
  );

  protected selectProduct(event: Event): void {
    const id = +(event.target as HTMLSelectElement).value;
    this.selectedProductId.set(id);
    // customPrice automatically resets to new product's default!
  }

  protected resetPrice(): void {
    this.customPrice.set(this.selectedProduct()?.defaultPrice ?? 0);
  }

  protected getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  // Simulated resource state
  protected readonly searchQuery = signal('');
  protected readonly resourceStatus = signal<'idle' | 'loading' | 'resolved' | 'error'>('idle');
  protected readonly userData = signal<object | null>(null);
  protected readonly resourceError = signal<string | null>(null);
  protected readonly resourceLoading = computed(() => this.resourceStatus() === 'loading');

  protected async loadUser(): Promise<void> {
    const query = this.searchQuery();
    if (!query) return;

    this.resourceStatus.set('loading');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      const id = Number.parseInt(query, 10);
      if (id < 1 || id > 10 || Number.isNaN(id)) {
        throw new Error('User not found. Try ID 1-10.');
      }

      this.userData.set({
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        role: id === 1 ? 'admin' : 'user'
      });
      this.resourceStatus.set('resolved');
    } catch (error) {
      this.resourceError.set(error instanceof Error ? error.message : 'Unknown error');
      this.resourceStatus.set('error');
    }
  }

  protected readonly codeExample = `
import { resource, linkedSignal, signal, computed } from '@angular/core';

// ===== resource() - Async Data Loading (v19+) =====

@Component({...})
export class UserComponent {
  userId = signal(1);
  
  // resource auto-fetches when userId changes
  userResource = resource({
    request: () => ({ id: this.userId() }),
    loader: async ({ request, abortSignal }) => {
      const response = await fetch(
        \`/api/users/\${request.id}\`,
        { signal: abortSignal }
      );
      return response.json();
    }
  });
  
  // Access resource state
  // this.userResource.value()    // The data
  // this.userResource.status()   // 'idle' | 'loading' | 'resolved' | 'error'
  // this.userResource.error()    // Error if failed
  // this.userResource.isLoading() // boolean shortcut
}

// Template usage:
// @if (userResource.isLoading()) {
//   <spinner />
// }
// @if (userResource.value(); as user) {
//   <p>{{ user.name }}</p>
// }

// ===== httpResource() - HTTP-specific (v20+) =====

import { httpResource } from '@angular/common/http';

@Component({...})
export class ProductComponent {
  productId = signal(1);
  
  // Simplified HTTP resource
  product = httpResource<Product>({
    url: () => \`/api/products/\${this.productId()}\`,
  });
  
  // With options
  products = httpResource<Product[]>({
    url: '/api/products',
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  });
}

// ===== linkedSignal() - Writable Computed (v19+) =====

@Component({...})
export class ConfigComponent {
  // Source signal
  selectedSize = signal<'sm' | 'md' | 'lg'>('md');
  
  // Size to pixels mapping
  sizeToPx = { sm: 12, md: 16, lg: 20 };
  
  // linkedSignal: derived but writable!
  fontSize = linkedSignal(() => this.sizeToPx[this.selectedSize()]);
  
  // User can override fontSize manually
  setCustomSize(px: number) {
    this.fontSize.set(px);  // Allowed!
  }
  
  // But when selectedSize changes, fontSize resets to computed value
  changeSize(size: 'sm' | 'md' | 'lg') {
    this.selectedSize.set(size);
    // fontSize automatically resets!
  }
}

// ===== linkedSignal with source option =====

// Alternative syntax with explicit source/computation
const derivedValue = linkedSignal({
  source: someSignal,
  computation: (sourceValue, previous) => {
    // Can access previous value!
    return sourceValue * 2;
  }
});

// ===== Real World Example: Form Defaults =====

@Component({...})
export class OrderForm {
  selectedProduct = signal<Product | null>(null);
  
  // Default quantity based on product, but user can change
  quantity = linkedSignal(() => 
    this.selectedProduct()?.minQuantity ?? 1
  );
  
  // Default notes based on product
  notes = linkedSignal(() =>
    this.selectedProduct()?.defaultNotes ?? ''
  );
  
  // When user selects new product, form resets to defaults
  // But user's manual edits persist until product changes
}`;
}
