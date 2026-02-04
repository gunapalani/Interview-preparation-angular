import { Component, ChangeDetectionStrategy, signal, input, output, model } from '@angular/core';

// Child component demonstrating signal inputs (defined first to avoid forward reference)
@Component({
  selector: 'app-signal-input-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-4 bg-white rounded shadow">
      <h4 
        class="text-xl font-bold cursor-pointer hover:text-purple-600"
        (click)="titleClicked.emit(title())"
      >
        {{ title() }}
      </h4>
      <p>Count: {{ count() }}</p>
      
      <div class="mt-3">
        <p class="text-sm mb-2">Select a value (two-way bound):</p>
        <div class="flex gap-2">
          @for (num of [1, 2, 3, 4, 5]; track num) {
            <button
              (click)="selectedValue.set(num)"
              class="w-10 h-10 rounded"
              [class.bg-purple-500]="selectedValue() === num"
              [class.text-white]="selectedValue() === num"
              [class.bg-gray-200]="selectedValue() !== num"
            >
              {{ num }}
            </button>
          }
        </div>
      </div>
    </div>
  `,
})
export class SignalInputChildComponent {
  // Signal inputs (v18 stable)
  title = input.required<string>();
  count = input(0); // Optional with default
  
  // Model for two-way binding
  selectedValue = model(1);
  
  // Output
  titleClicked = output<string>();
}

@Component({
  selector: 'app-signal-inputs-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SignalInputChildComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Signal Inputs & Outputs (v18)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Signal-based Inputs & Outputs</h2>
        <div class="space-y-3 text-gray-700">
          <p>Angular 18 made signal inputs and outputs stable:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>input():</strong> Creates signal input (optional, can have default)</li>
            <li><strong>input.required():</strong> Required signal input</li>
            <li><strong>output():</strong> Creates output emitter (replaces &#64;Output)</li>
            <li><strong>model():</strong> Two-way binding signal (input + output combined)</li>
            <li><strong>Signal-based:</strong> Inputs are signals, use () to read</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between input() and &#64;Input()?</li>
          <li class="ml-4 text-green-700">A: input() returns a signal that tracks changes automatically. &#64;Input is a property that requires manual change detection.</li>
          
          <li><strong>Q2:</strong> How do you create a required signal input?</li>
          <li class="ml-4 text-green-700">A: Use input.required&lt;T&gt;(). The returned signal is guaranteed to have a value (no undefined).</li>
          
          <li><strong>Q3:</strong> What is the model() function?</li>
          <li class="ml-4 text-green-700">A: Creates two-way binding. Combines input signal with automatic output for changes. Parent uses [(model)]="value".</li>
          
          <li><strong>Q4:</strong> Can you transform input values?</li>
          <li class="ml-4 text-green-700">A: Yes, use transform option: input(0, {{ '{' }} transform: numberAttribute {{ '}' }}) to convert string attributes to numbers.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Parent Component</h2>
        
        <div class="space-y-4">
          <!-- Controls -->
          <div class="p-4 bg-white rounded-lg shadow space-y-3">
            <h3 class="font-semibold">Parent Controls</h3>
            
            <div>
              <label class="block text-sm mb-1">Title (required input):</label>
              <input 
                type="text" 
                [value]="title()"
                (input)="title.set(getValue($event))"
                class="px-3 py-2 border rounded w-full"
              />
            </div>
            
            <div>
              <label class="block text-sm mb-1">Count (optional with default):</label>
              <input 
                type="number" 
                [value]="count()"
                (input)="count.set(+getValue($event))"
                class="px-3 py-2 border rounded w-full"
              />
            </div>
            
            <div>
              <label class="block text-sm mb-1">Selected value (two-way with model):</label>
              <p class="text-2xl font-bold text-purple-600">{{ selectedValue() }}</p>
            </div>
          </div>

          <!-- Child Component -->
          <div class="p-4 bg-purple-100 rounded-lg">
            <h3 class="font-semibold mb-2">Child Component:</h3>
            <app-signal-input-child
              [title]="title()"
              [count]="count()"
              [(selectedValue)]="selectedValue"
              (titleClicked)="onTitleClicked($event)"
            />
          </div>

          <!-- Event Log -->
          <div class="p-4 bg-gray-100 rounded-lg">
            <h3 class="font-semibold mb-2">Event Log:</h3>
            <ul class="text-sm space-y-1">
              @for (event of events(); track event) {
                <li class="text-gray-600">{{ event }}</li>
              } @empty {
                <li class="text-gray-400">No events yet</li>
              }
            </ul>
          </div>
        </div>
      </section>

      <!-- API Comparison -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 API Comparison</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-purple-200">
                <th class="p-2">Old (Decorator)</th>
                <th class="p-2">New (Function)</th>
                <th class="p-2">Type</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;Input() name: string</td>
                <td class="p-2 font-mono text-xs">name = input&lt;string&gt;()</td>
                <td class="p-2">InputSignal&lt;string | undefined&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;Input() name = 'default'</td>
                <td class="p-2 font-mono text-xs">name = input('default')</td>
                <td class="p-2">InputSignal&lt;string&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;Input({{ '{' }} required: true {{ '}' }}) name!: string</td>
                <td class="p-2 font-mono text-xs">name = input.required&lt;string&gt;()</td>
                <td class="p-2">InputSignal&lt;string&gt;</td>
              </tr>
              <tr class="border-b">
                <td class="p-2 font-mono text-xs">&#64;Output() click = new EventEmitter()</td>
                <td class="p-2 font-mono text-xs">click = output&lt;MouseEvent&gt;()</td>
                <td class="p-2">OutputEmitterRef&lt;MouseEvent&gt;</td>
              </tr>
              <tr>
                <td class="p-2 font-mono text-xs">&#64;Input() + &#64;Output() value</td>
                <td class="p-2 font-mono text-xs">value = model(0)</td>
                <td class="p-2">ModelSignal&lt;number&gt;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Signal Inputs/Outputs Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class SignalInputsDemoComponent {
  protected readonly title = signal('Hello World');
  protected readonly count = signal(42);
  protected readonly selectedValue = signal(5);
  protected readonly events = signal<string[]>([]);

  protected getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected onTitleClicked(title: string): void {
    this.events.update(e => [`Title clicked: "${title}"`, ...e.slice(0, 4)]);
  }

  protected readonly codeExample = `
import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: \`
    <div>
      <h2>{{ name() }}</h2>
      <p>Price: \${{ price() }}</p>
      <p>Quantity: {{ quantity() }}</p>
      <button (click)="addToCart.emit(name())">Add</button>
      
      <!-- Two-way binding with model -->
      <input 
        type="number" 
        [value]="quantity()" 
        (input)="quantity.set(+$event.target.value)"
      />
    </div>
  \`
})
export class ProductCardComponent {
  // Required input - must be provided
  name = input.required<string>();
  
  // Optional input with default
  price = input(0);
  
  // Optional input without default
  description = input<string>();
  
  // Input with transform (string attribute to number)
  maxItems = input(10, { transform: numberAttribute });
  
  // Input with alias
  productId = input.required<string>({ alias: 'id' });
  
  // Output
  addToCart = output<string>();
  
  // Two-way binding with model()
  quantity = model(1);
}

// ===== Usage in parent template =====

<app-product-card
  [name]="product.name"
  [price]="product.price"
  [id]="product.id"
  [maxItems]="5"
  (addToCart)="handleAddToCart($event)"
  [(quantity)]="selectedQuantity"
/>

// ===== Reading signal inputs =====

// In component class:
fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);

// inputs are signals, so they work with computed/effect
effect(() => {
  console.log('Name changed:', this.name());
});

// ===== Input transforms =====
import { booleanAttribute, numberAttribute } from '@angular/core';

@Component({...})
export class MyComponent {
  // Transform "true"/"false" string to boolean
  disabled = input(false, { transform: booleanAttribute });
  
  // Transform string to number
  count = input(0, { transform: numberAttribute });
  
  // Custom transform
  tags = input<string[]>([], {
    transform: (value: string) => value.split(',')
  });
}

// Usage: <my-comp disabled="true" count="5" tags="a,b,c" />`;
}
