import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-template-syntax-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Template Syntax</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 Template Syntax Overview</h2>
        <div class="space-y-3 text-gray-700">
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Interpolation:</strong> {{ '{{ expression }}' }} - Display data</li>
            <li><strong>Property Binding:</strong> [property]="expression" - Bind to element property</li>
            <li><strong>Event Binding:</strong> (event)="handler()" - Listen to events</li>
            <li><strong>Two-way Binding:</strong> [(ngModel)]="property" - Combine property + event</li>
            <li><strong>Attribute Binding:</strong> [attr.name]="value" - Bind to attributes</li>
            <li><strong>Class Binding:</strong> [class.active]="isActive" - Toggle classes</li>
            <li><strong>Style Binding:</strong> [style.color]="color" - Set inline styles</li>
            <li><strong>Template Reference:</strong> #variableName - Reference elements</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between property binding and attribute binding?</li>
          <li class="ml-4 text-green-700">A: Property binding sets DOM property ([value]), attribute binding sets HTML attribute ([attr.value]). Properties are dynamic, attributes are static initial values.</li>
          
          <li><strong>Q2:</strong> What is two-way binding and how does it work?</li>
          <li class="ml-4 text-green-700">A: [(ngModel)] is shorthand for [ngModel]="value" (ngModelChange)="value=$event". Combines property + event binding.</li>
          
          <li><strong>Q3:</strong> What are template reference variables?</li>
          <li class="ml-4 text-green-700">A: #ref creates reference to DOM element or component, accessible within template.</li>
        </ul>
      </section>

      <!-- Live Demo - Interpolation -->
      <section class="mb-6 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Interpolation {{ '{{ }}' }}</h2>
        <div class="p-4 bg-white rounded-lg shadow space-y-2">
          <p>String: {{ greeting }}</p>
          <p>Expression: {{ 5 + 10 }}</p>
          <p>Method call: {{ getMessage() }}</p>
          <p>Signal: {{ count() }}</p>
        </div>
      </section>

      <!-- Live Demo - Property Binding -->
      <section class="mb-6 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">🔧 Property Binding [property]</h2>
        <div class="p-4 bg-white rounded-lg shadow space-y-4">
          <div>
            <label class="block text-sm mb-1">Image source binding:</label>
            <img [src]="imageUrl" [alt]="imageAlt" class="h-20 rounded" />
          </div>
          <div>
            <label class="block text-sm mb-1">Disabled binding:</label>
            <button [disabled]="isDisabled()" class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
              {{ isDisabled() ? 'Disabled' : 'Enabled' }}
            </button>
            <button (click)="isDisabled.set(!isDisabled())" class="ml-2 px-4 py-2 bg-gray-500 text-white rounded">
              Toggle
            </button>
          </div>
        </div>
      </section>

      <!-- Live Demo - Event Binding -->
      <section class="mb-6 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🔧 Event Binding (event)</h2>
        <div class="p-4 bg-white rounded-lg shadow space-y-4">
          <div>
            <button 
              (click)="handleClick()" 
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Click me
            </button>
            <span class="ml-4">Clicked: {{ clickCount() }} times</span>
          </div>
          <div>
            <input 
              (input)="handleInput($event)"
              (keyup.enter)="handleEnter()"
              placeholder="Type and press Enter"
              class="px-3 py-2 border rounded w-64"
            />
            <p class="mt-1 text-sm">Input value: {{ inputValue() }}</p>
          </div>
        </div>
      </section>

      <!-- Live Demo - Class & Style Binding -->
      <section class="mb-6 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 Class & Style Binding</h2>
        <div class="p-4 bg-white rounded-lg shadow space-y-4">
          <div>
            <p 
              [class.text-red-500]="isError()" 
              [class.text-green-500]="!isError()"
              [class.font-bold]="isBold()"
            >
              Dynamic class binding
            </p>
            <button (click)="isError.set(!isError())" class="mr-2 px-3 py-1 bg-gray-500 text-white rounded text-sm">
              Toggle Error
            </button>
            <button (click)="isBold.set(!isBold())" class="px-3 py-1 bg-gray-500 text-white rounded text-sm">
              Toggle Bold
            </button>
          </div>
          <div>
            <p 
              [style.color]="textColor()" 
              [style.font-size.px]="fontSize()"
            >
              Dynamic style binding
            </p>
            <input 
              type="color" 
              [value]="textColor()"
              (input)="textColor.set(getInputValue($event))"
              class="mr-2"
            />
            <input 
              type="range" 
              min="12" 
              max="32"
              [value]="fontSize()"
              (input)="fontSize.set(+getInputValue($event))"
            />
            <span class="ml-2 text-sm">{{ fontSize() }}px</span>
          </div>
        </div>
      </section>

      <!-- Live Demo - Template Reference -->
      <section class="mb-6 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 Template Reference #ref</h2>
        <div class="p-4 bg-white rounded-lg shadow space-y-4">
          <div>
            <input #nameInput type="text" placeholder="Your name" class="px-3 py-2 border rounded" />
            <button 
              (click)="greet(nameInput.value)" 
              class="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Greet
            </button>
            <p class="mt-2">{{ greetingMessage() }}</p>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Template Syntax Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class TemplateSyntaxDemoComponent {
  // Data
  protected readonly greeting = 'Hello, Angular!';
  protected readonly imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  protected readonly imageAlt = 'Angular Logo';
  
  // Signals
  protected readonly count = signal(42);
  protected readonly isDisabled = signal(false);
  protected readonly clickCount = signal(0);
  protected readonly inputValue = signal('');
  protected readonly isError = signal(false);
  protected readonly isBold = signal(false);
  protected readonly textColor = signal('#6b21a8');
  protected readonly fontSize = signal(16);
  protected readonly greetingMessage = signal('');

  protected getMessage(): string {
    return 'This is from a method';
  }

  protected handleClick(): void {
    this.clickCount.update(c => c + 1);
  }

  protected handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue.set(input.value);
  }

  protected handleEnter(): void {
    alert(`You pressed Enter! Value: ${this.inputValue()}`);
  }

  protected getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected greet(name: string): void {
    this.greetingMessage.set(name ? `Hello, ${name}!` : 'Please enter your name');
  }

  protected readonly codeExample = `
// Interpolation
<p>{{ greeting }}</p>
<p>{{ 5 + 10 }}</p>
<p>{{ count() }}</p>  <!-- Signal -->

// Property Binding
<img [src]="imageUrl" [alt]="imageAlt" />
<button [disabled]="isDisabled()">Click</button>

// Event Binding
<button (click)="handleClick()">Click</button>
<input (input)="onInput($event)" />
<input (keyup.enter)="onEnter()" />

// Class Binding (prefer over ngClass)
<p [class.active]="isActive()">Text</p>
<p [class]="{ 'bold': isBold(), 'error': hasError() }">Text</p>

// Style Binding (prefer over ngStyle)
<p [style.color]="textColor()">Text</p>
<p [style.font-size.px]="fontSize()">Text</p>

// Attribute Binding
<button [attr.aria-label]="label">Icon</button>
<td [attr.colspan]="columns">Cell</td>

// Template Reference Variable
<input #nameInput type="text" />
<button (click)="greet(nameInput.value)">Greet</button>

// Two-way Binding (requires FormsModule)
<input [(ngModel)]="name" />`;
}
