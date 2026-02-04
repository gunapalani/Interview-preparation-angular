import { Component, ChangeDetectionStrategy, Input, input } from '@angular/core';

// Child component with required inputs (defined first to avoid forward reference)
@Component({
  selector: 'app-child-required',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-3 bg-green-100 rounded">
      <p class="font-semibold">Required Input Component</p>
      <p>Title: {{ title }}</p>
      <p>Count: {{ count }}</p>
    </div>
  `,
})
export class ChildWithRequiredInput {
  // Decorator syntax (v16)
  @Input({ required: true }) title!: string;
  @Input({ required: true }) count!: number;
}

// Child component with optional inputs
@Component({
  selector: 'app-child-optional',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-3 bg-blue-100 rounded">
      <p class="font-semibold">Optional Input Component</p>
      <p>Label: {{ label() }}</p>
      <p>Value: {{ value() }}</p>
    </div>
  `,
})
export class ChildWithOptionalInput {
  // Signal syntax (v18+) with defaults
  label = input('Default Label');
  value = input(0);
}

@Component({
  selector: 'app-required-inputs-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChildWithRequiredInput, ChildWithOptionalInput],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Required Inputs (v16)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Required Inputs?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Required inputs</strong> ensure components receive mandatory data:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Compile-time check:</strong> Error if required input not provided</li>
            <li><strong>No undefined:</strong> TypeScript knows value exists</li>
            <li><strong>&#64;Input decorator:</strong> {{ '{ required: true }' }}</li>
            <li><strong>input.required():</strong> Signal-based required input (v18+)</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> How do you make an input required?</li>
          <li class="ml-4 text-green-700">A: Use &#64;Input({{ '{ required: true }' }}) or input.required() for signal inputs.</li>
          
          <li><strong>Q2:</strong> What happens if required input is not provided?</li>
          <li class="ml-4 text-green-700">A: Compile-time error in template. Runtime error if bypassed.</li>
          
          <li><strong>Q3:</strong> What is the difference between input() and input.required()?</li>
          <li class="ml-4 text-green-700">A: input() returns InputSignal&lt;T | undefined&gt;, input.required() returns InputSignal&lt;T&gt; (no undefined).</li>
          
          <li><strong>Q4:</strong> Can you provide a default value for required input?</li>
          <li class="ml-4 text-green-700">A: No, required inputs cannot have defaults. If you need a default, use optional input with default value.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Required vs Optional</h2>
        
        <div class="space-y-4">
          <!-- Child with required input -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Component with Required Input</h3>
            <app-child-required 
              title="This is required!" 
              [count]="42"
            />
            <p class="text-sm text-gray-500 mt-2">
              Try removing [title] in the template - you'll get a compile error!
            </p>
          </div>

          <!-- Child with optional input -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Component with Optional Input</h3>
            <app-child-optional />
            <p class="text-sm text-gray-500 mt-2">
              Optional inputs use default values when not provided.
            </p>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Optional with Custom Value</h3>
            <app-child-optional 
              label="Custom Label" 
              [value]="100"
            />
          </div>
        </div>
      </section>

      <!-- Comparison Table -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Input Types Comparison</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="bg-purple-200">
                <th class="p-2">Type</th>
                <th class="p-2">Decorator Syntax</th>
                <th class="p-2">Signal Syntax (v18+)</th>
                <th class="p-2">Type</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 bg-white">
              <tr class="border-b">
                <td class="p-2">Required</td>
                <td class="p-2 font-mono text-xs">&#64;Input({{ '{ required: true }' }})</td>
                <td class="p-2 font-mono text-xs">input.required&lt;T&gt;()</td>
                <td class="p-2">T</td>
              </tr>
              <tr class="border-b">
                <td class="p-2">Optional</td>
                <td class="p-2 font-mono text-xs">&#64;Input()</td>
                <td class="p-2 font-mono text-xs">input&lt;T&gt;()</td>
                <td class="p-2">T | undefined</td>
              </tr>
              <tr>
                <td class="p-2">With Default</td>
                <td class="p-2 font-mono text-xs">&#64;Input() value = 'default'</td>
                <td class="p-2 font-mono text-xs">input('default')</td>
                <td class="p-2">T</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Required Inputs Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class RequiredInputsDemoComponent {
  protected readonly codeExample = `
// ===== Decorator Syntax (v16+) =====

import { Component, Input } from '@angular/core';

@Component({...})
export class UserCardComponent {
  // Required input - must be provided
  @Input({ required: true }) userId!: string;
  
  // Optional input with default
  @Input() showAvatar = true;
  
  // Optional input, can be undefined
  @Input() subtitle?: string;
}

// Usage:
// <app-user-card [userId]="'123'" />        ✅ Works
// <app-user-card />                          ❌ Compile error!

// ===== Signal Syntax (v18+) =====

import { Component, input } from '@angular/core';

@Component({...})
export class ProductCardComponent {
  // Required signal input - InputSignal<string>
  productId = input.required<string>();
  
  // Optional with default - InputSignal<number>
  quantity = input(1);
  
  // Optional without default - InputSignal<string | undefined>
  description = input<string>();
  
  // With transform
  price = input.required({
    transform: (value: string) => parseFloat(value)
  });
  
  // With alias
  externalName = input.required<string>({ alias: 'name' });
}

// In template, read signal value:
// {{ productId() }}
// {{ quantity() }}

// ===== Type Safety =====

// Decorator: requires ! assertion or initialization
@Input({ required: true }) name!: string;

// Signal: no assertion needed, type is guaranteed
name = input.required<string>();
// name() returns string, never undefined!

// ===== Input Transform =====

@Component({...})
export class ToggleComponent {
  // Transform string 'true'/'false' to boolean
  @Input({ 
    required: true,
    transform: booleanAttribute 
  }) 
  enabled!: boolean;
}

// Usage: <app-toggle enabled="true" />`;
}
