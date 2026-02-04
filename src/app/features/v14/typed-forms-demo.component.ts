import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

// Define interfaces for form types
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
  address: FormGroup<AddressForm>;
}

interface AddressForm {
  street: FormControl<string>;
  city: FormControl<string>;
  zipCode: FormControl<string>;
}

@Component({
  selector: 'app-typed-forms-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Typed Reactive Forms (v14)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Typed Forms?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Typed Reactive Forms</strong> were introduced in Angular 14 for better type safety:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Type inference:</strong> Form values are typed, not 'any'</li>
            <li><strong>Compile-time errors:</strong> Catch typos and type mismatches</li>
            <li><strong>IDE support:</strong> Autocomplete for form controls</li>
            <li><strong>NonNullableFormBuilder:</strong> Controls that reset to initial value</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between typed and untyped forms?</li>
          <li class="ml-4 text-green-700">A: Typed forms have strict typing on .value, providing autocomplete and compile-time type checking. Untyped forms return 'any'.</li>
          
          <li><strong>Q2:</strong> What is NonNullableFormBuilder?</li>
          <li class="ml-4 text-green-700">A: A form builder that creates controls with nonNullable: true by default. On reset(), they return to initial value instead of null.</li>
          
          <li><strong>Q3:</strong> How do you get the raw value vs value of a form?</li>
          <li class="ml-4 text-green-700">A: .value excludes disabled controls. .getRawValue() includes all controls including disabled ones.</li>
          
          <li><strong>Q4:</strong> What is the difference between FormControl&lt;string&gt; and FormControl&lt;string | null&gt;?</li>
          <li class="ml-4 text-green-700">A: FormControl&lt;string&gt; (nonNullable) can never be null. FormControl&lt;string | null&gt; can be reset to null.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Typed Form</h2>
        
        <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Name *</label>
              <input 
                formControlName="name" 
                class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500"
                [class.border-red-500]="userForm.controls.name.invalid && userForm.controls.name.touched"
              />
              @if (userForm.controls.name.invalid && userForm.controls.name.touched) {
                <p class="text-red-500 text-sm mt-1">Name is required</p>
              }
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Email *</label>
              <input 
                formControlName="email" 
                type="email"
                class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500"
                [class.border-red-500]="userForm.controls.email.invalid && userForm.controls.email.touched"
              />
              @if (userForm.controls.email.errors?.['email']) {
                <p class="text-red-500 text-sm mt-1">Invalid email format</p>
              }
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Age</label>
              <input 
                formControlName="age" 
                type="number"
                class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <!-- Nested FormGroup -->
          <div formGroupName="address" class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">Address (Nested FormGroup)</h3>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Street</label>
                <input formControlName="street" class="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">City</label>
                <input formControlName="city" class="w-full px-3 py-2 border rounded" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Zip Code</label>
                <input formControlName="zipCode" class="w-full px-3 py-2 border rounded" />
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button 
              type="submit" 
              [disabled]="userForm.invalid"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              Submit
            </button>
            <button 
              type="button" 
              (click)="resetForm()"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
            <button 
              type="button" 
              (click)="patchForm()"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Patch Values
            </button>
          </div>
        </form>

        <!-- Form State Display -->
        <div class="mt-4 p-4 bg-white rounded-lg shadow">
          <h3 class="font-semibold mb-2">Form State:</h3>
          <div class="grid grid-cols-3 gap-4 text-sm">
            <p>Valid: <span [class.text-green-600]="userForm.valid" [class.text-red-600]="!userForm.valid">{{ userForm.valid }}</span></p>
            <p>Dirty: {{ userForm.dirty }}</p>
            <p>Touched: {{ userForm.touched }}</p>
          </div>
          <h3 class="font-semibold mt-4 mb-2">Form Value (Typed!):</h3>
          <pre class="text-xs bg-gray-100 p-2 rounded">{{ userForm.value | json }}</pre>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Typed Forms Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class TypedFormsDemoComponent {
  // Typed FormGroup with explicit interface
  protected readonly userForm = new FormGroup<UserForm>({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    age: new FormControl<number | null>(null),
    address: new FormGroup<AddressForm>({
      street: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
      zipCode: new FormControl('', { nonNullable: true }),
    }),
  });

  protected onSubmit(): void {
    if (this.userForm.valid) {
      // value is fully typed!
      const formValue = this.userForm.value;
      console.log('Form submitted:', formValue);
      console.log('Name:', formValue.name); // TypeScript knows this is string
      console.log('City:', formValue.address?.city); // Proper optional chaining
      alert(`Submitted: ${formValue.name} (${formValue.email})`);
    }
  }

  protected resetForm(): void {
    this.userForm.reset(); // nonNullable controls reset to initial value ''
  }

  protected patchForm(): void {
    this.userForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      address: {
        city: 'New York',
      },
    });
  }

  protected readonly codeExample = `
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Define interfaces for type safety
interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  age: FormControl<number | null>;
}

// Create typed form
userForm = new FormGroup<UserForm>({
  // nonNullable: true - resets to initial value, not null
  name: new FormControl('', { 
    nonNullable: true, 
    validators: [Validators.required] 
  }),
  email: new FormControl('', { 
    nonNullable: true, 
    validators: [Validators.email] 
  }),
  age: new FormControl<number | null>(null), // Can be null
});

// Type-safe access!
const name: string = this.userForm.controls.name.value; // ✅ Typed!
const email = this.userForm.value.email; // string | undefined

// Using NonNullableFormBuilder (shorthand)
import { NonNullableFormBuilder, inject } from '@angular/core';

class MyComponent {
  private fb = inject(NonNullableFormBuilder);
  
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
  });
  // All controls are nonNullable by default!
}

// getRawValue() includes disabled controls
const rawValue = this.userForm.getRawValue();`;
}
