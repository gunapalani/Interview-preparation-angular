import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-control-flow-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Built-in Control Flow (v17)</h1>

      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is Built-in Control Flow?</h2>
        <div class="space-y-3 text-gray-700">
          <p>Angular 17 introduced new template syntax replacing structural directives:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>&#64;if / &#64;else:</strong> Replaces *ngIf</li>
            <li><strong>&#64;for with track:</strong> Replaces *ngFor (track is required!)</li>
            <li><strong>&#64;switch / &#64;case / &#64;default:</strong> Replaces *ngSwitch</li>
            <li><strong>&#64;empty:</strong> Shows content when &#64;for array is empty</li>
            <li><strong>Better performance:</strong> Optimized change detection</li>
            <li><strong>Better type narrowing:</strong> TypeScript understands the types better</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> Why is track required in &#64;for?</li>
          <li class="ml-4 text-green-700">
            A: Track identifies items for efficient DOM updates. Without it, Angular can't optimize
            re-renders. Use unique identifier.
          </li>

          <li>
            <strong>Q2:</strong> What are the advantages of new control flow over *ngIf/*ngFor?
          </li>
          <li class="ml-4 text-green-700">
            A: Better performance, cleaner syntax, built-in (no imports needed), better type
            narrowing, required track prevents bugs.
          </li>

          <li><strong>Q3:</strong> What implicit variables are available in &#64;for?</li>
          <li class="ml-4 text-green-700">A: $index, $first, $last, $even, $odd, $count</li>

          <li><strong>Q4:</strong> Can you still use *ngIf and *ngFor?</li>
          <li class="ml-4 text-green-700">
            A: Yes, they still work but new syntax is recommended. You need to import
            CommonModule/NgIf/NgFor for old syntax.
          </li>
        </ul>
      </section>

      <!-- @if Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 &#64;if / &#64;else Demo</h2>

        <div class="space-y-4">
          <div class="flex gap-2 mb-4">
            <button
              (click)="isLoggedIn.set(!isLoggedIn())"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Toggle Login: {{ isLoggedIn() }}
            </button>
            <button
              (click)="userRole.set(userRole() === 'admin' ? 'user' : 'admin')"
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Toggle Role: {{ userRole() }}
            </button>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            @if (isLoggedIn()) {
              <div class="text-green-600">
                <p class="font-bold">✅ Welcome back!</p>
                @if (userRole() === 'admin') {
                  <p>You have admin privileges.</p>
                } @else {
                  <p>You are a regular user.</p>
                }
              </div>
            } @else {
              <p class="text-red-600">❌ Please log in to continue.</p>
            }
          </div>
        </div>
      </section>

      <!-- @for Demo -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 &#64;for with track Demo</h2>

        <div class="space-y-4">
          <div class="flex gap-2 mb-4">
            <input
              #taskInput
              type="text"
              placeholder="New task..."
              class="px-3 py-2 border rounded"
            />
            <button
              (click)="addTask(taskInput.value); taskInput.value = ''"
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Task
            </button>
            <button
              (click)="clearTasks()"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All
            </button>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            @for (task of tasks(); track task.id; let i = $index, first = $first, last = $last) {
              <div
                class="flex items-center gap-3 p-2 border-b last:border-b-0"
                [class.bg-yellow-50]="first"
                [class.bg-blue-50]="last"
              >
                <span class="text-gray-400 w-8">{{ i + 1 }}.</span>
                <input type="checkbox" [checked]="task.completed" (change)="toggleTask(task.id)" />
                <span [class.line-through]="task.completed" [class.text-gray-400]="task.completed">
                  {{ task.title }}
                </span>
                <span class="ml-auto text-xs">
                  @if (first) {
                    <span class="text-yellow-600">First</span>
                  }
                  @if (last) {
                    <span class="text-blue-600">Last</span>
                  }
                </span>
              </div>
            } @empty {
              <p class="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
            }
          </div>

          <p class="text-sm text-gray-600">
            Total: {{ tasks().length }} | Completed: {{ completedCount() }}
          </p>
        </div>
      </section>

      <!-- @switch Demo -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 &#64;switch / &#64;case Demo</h2>

        <div class="space-y-4">
          <div class="flex gap-2">
            @for (priority of ['low', 'medium', 'high']; track priority) {
              <button
                (click)="selectedPriority.set(priority)"
                class="px-4 py-2 rounded"
                [class.bg-green-500]="priority === 'low'"
                [class.bg-yellow-500]="priority === 'medium'"
                [class.bg-red-500]="priority === 'high'"
                [class.text-white]="true"
                [class.ring-2]="selectedPriority() === priority"
                [class.ring-black]="selectedPriority() === priority"
              >
                {{ priority | titlecase }}
              </button>
            }
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            @switch (selectedPriority()) {
              @case ('low') {
                <div class="text-green-600">
                  <span class="text-2xl">🟢</span> Low Priority - Take your time
                </div>
              }
              @case ('medium') {
                <div class="text-yellow-600">
                  <span class="text-2xl">🟡</span> Medium Priority - Complete this week
                </div>
              }
              @case ('high') {
                <div class="text-red-600">
                  <span class="text-2xl">🔴</span> High Priority - Urgent attention needed!
                </div>
              }
              @default {
                <div class="text-gray-600">Select a priority level</div>
              }
            }
          </div>
        </div>
      </section>

      <!-- Syntax Comparison -->
      <section class="mb-8 p-6 bg-gray-100 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">📋 Old vs New Syntax</h2>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-red-100 rounded">
            <h3 class="font-semibold mb-2">❌ Old (*ngIf, *ngFor)</h3>
            <pre class="text-xs overflow-x-auto">{{ oldSyntax }}</pre>
          </div>
          <div class="p-3 bg-green-100 rounded">
            <h3 class="font-semibold mb-2">✅ New (&#64;if, &#64;for)</h3>
            <pre class="text-xs overflow-x-auto">{{ newSyntax }}</pre>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Control Flow Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class ControlFlowDemoComponent {
  protected readonly isLoggedIn = signal(true);
  protected readonly userRole = signal<'admin' | 'user'>('user');
  protected readonly selectedPriority = signal<string>('medium');

  protected readonly tasks = signal<Task[]>([
    { id: 1, title: 'Learn Angular signals', completed: true, priority: 'high' },
    { id: 2, title: 'Master control flow', completed: false, priority: 'high' },
    { id: 3, title: 'Build demo app', completed: false, priority: 'medium' },
  ]);

  private nextId = 4;

  protected readonly completedCount = computed(
    () => this.tasks().filter((t) => t.completed).length,
  );

  protected addTask(title: string): void {
    if (title.trim()) {
      this.tasks.update((tasks) => [
        ...tasks,
        {
          id: this.nextId++,
          title,
          completed: false,
          priority: 'low',
        },
      ]);
    }
  }

  protected toggleTask(id: number): void {
    this.tasks.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  protected clearTasks(): void {
    this.tasks.set([]);
  }

  protected readonly oldSyntax = `
<div *ngIf="isLoggedIn; else loggedOut">
  Welcome!
</div>
<ng-template #loggedOut>
  Please log in
</ng-template>

<li *ngFor="let item of items; 
    let i = index;
    trackBy: trackById">
  {{ i }}: {{ item.name }}
</li>

<div [ngSwitch]="status">
  <p *ngSwitchCase="'active'">Active</p>
  <p *ngSwitchDefault>Unknown</p>
</div>`;

  protected readonly newSyntax = `
@if (isLoggedIn) {
  <div>Welcome!</div>
} @else {
  <div>Please log in</div>
}

@for (item of items; track item.id;
     let i = $index) {
  <li>{{ i }}: {{ item.name }}</li>
} @empty {
  <li>No items</li>
}

@switch (status) {
  @case ('active') {
    <p>Active</p>
  }
  @default {
    <p>Unknown</p>
  }
}`;

  protected readonly codeExample = `
// ===== @if / @else / @else if =====

@if (user) {
  <p>Hello, {{ user.name }}!</p>
} @else if (loading) {
  <p>Loading...</p>
} @else {
  <p>Please log in</p>
}

// Type narrowing works!
@if (user) {
  {{ user.email }} // TypeScript knows user is defined here
}

// ===== @for with track (REQUIRED!) =====

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// Available variables:
// $index - zero-based index
// $first - true if first item
// $last - true if last item
// $even - true if even index
// $odd - true if odd index
// $count - total number of items

@for (user of users; track user.id; 
      let idx = $index, 
      let isFirst = $first,
      let isLast = $last) {
  <div [class.highlight]="isFirst">
    {{ idx + 1 }}. {{ user.name }}
    @if (isLast) { (Last one!) }
  </div>
} @empty {
  <p>No users found</p>
}

// track can be a property or expression
@for (item of items; track item.id) { }
@for (item of items; track item) { } // Track by reference
@for (item of items; track $index) { } // Track by index (use carefully)

// ===== @switch / @case / @default =====

@switch (status) {
  @case ('pending') {
    <span class="yellow">Pending...</span>
  }
  @case ('approved') {
    <span class="green">Approved ✓</span>
  }
  @case ('rejected') {
    <span class="red">Rejected ✗</span>
  }
  @default {
    <span>Unknown status</span>
  }
}

// ===== Nesting is clean =====

@for (category of categories; track category.id) {
  <h2>{{ category.name }}</h2>
  @for (item of category.items; track item.id) {
    @if (item.inStock) {
      <p>{{ item.name }} - Available</p>
    }
  } @empty {
    <p>No items in this category</p>
  }
}`;
}
