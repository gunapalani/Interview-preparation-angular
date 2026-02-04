import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-defer-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Deferrable Views &#64;defer (v17)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Deferrable Views?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>&#64;defer</strong> enables lazy loading of template parts:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Lazy loading:</strong> Components load only when needed</li>
            <li><strong>Triggers:</strong> on viewport, on interaction, on hover, on timer, when condition</li>
            <li><strong>&#64;placeholder:</strong> Content shown before loading starts</li>
            <li><strong>&#64;loading:</strong> Content shown during loading</li>
            <li><strong>&#64;error:</strong> Content shown if loading fails</li>
            <li><strong>No route needed:</strong> Lazy load anywhere in templates!</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What triggers are available for &#64;defer?</li>
          <li class="ml-4 text-green-700">A: on viewport, on interaction, on hover, on immediate, on idle, on timer(ms), when condition</li>
          
          <li><strong>Q2:</strong> What is the difference between &#64;placeholder and &#64;loading?</li>
          <li class="ml-4 text-green-700">A: &#64;placeholder shows before defer triggers. &#64;loading shows while content is being fetched after trigger.</li>
          
          <li><strong>Q3:</strong> How does &#64;defer improve performance?</li>
          <li class="ml-4 text-green-700">A: Reduces initial bundle size by splitting code. Components inside &#64;defer are in separate chunks loaded on demand.</li>
          
          <li><strong>Q4:</strong> Can you combine multiple triggers?</li>
          <li class="ml-4 text-green-700">A: Yes! Use semicolons: &#64;defer (on viewport; on timer(5s)) - loads when either triggers first.</li>
        </ul>
      </section>

      <!-- Triggers Reference -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Defer Triggers Reference</h2>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on viewport</code>
            <p class="text-gray-600">When enters viewport</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on interaction</code>
            <p class="text-gray-600">On click/keydown</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on hover</code>
            <p class="text-gray-600">On mouse hover</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on immediate</code>
            <p class="text-gray-600">Load immediately</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on idle</code>
            <p class="text-gray-600">When browser idle</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">on timer(2s)</code>
            <p class="text-gray-600">After time delay</p>
          </div>
          <div class="p-2 bg-white rounded col-span-2">
            <code class="text-purple-600">when condition</code>
            <p class="text-gray-600">When expression becomes true</p>
          </div>
        </div>
      </section>

      <!-- Live Demo - Viewport -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Demo: on viewport</h2>
        <p class="mb-4 text-gray-600">Scroll down to see the deferred content load:</p>
        
        <div class="h-40 overflow-y-auto border rounded bg-white p-4">
          <div class="h-32 bg-gray-100 flex items-center justify-center mb-4">
            ⬇️ Scroll down ⬇️
          </div>
          
          @defer (on viewport) {
            <div class="p-4 bg-green-200 rounded animate-pulse">
              <h3 class="font-bold">🎉 Loaded on viewport!</h3>
              <p>This content was lazy loaded when it entered the viewport.</p>
            </div>
          } @placeholder {
            <div class="p-4 bg-gray-200 rounded">
              <p class="text-gray-500">Placeholder - scroll to load content...</p>
            </div>
          } @loading {
            <div class="p-4 bg-blue-200 rounded">
              <p>⏳ Loading...</p>
            </div>
          }
        </div>
      </section>

      <!-- Live Demo - Interaction -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 Demo: on interaction</h2>
        
        @defer (on interaction) {
          <div class="p-4 bg-orange-200 rounded">
            <h3 class="font-bold">🖱️ Clicked!</h3>
            <p>Heavy component loaded after interaction.</p>
            <p class="text-sm text-gray-600">In real app, this could be a complex chart or form.</p>
          </div>
        } @placeholder {
          <button class="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            👆 Click me to load content
          </button>
        } @loading (minimum 500ms) {
          <div class="p-4 bg-orange-100 rounded flex items-center gap-2">
            <span class="animate-spin">⏳</span> Loading for at least 500ms...
          </div>
        }
      </section>

      <!-- Live Demo - Hover -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">🔧 Demo: on hover</h2>
        
        @defer (on hover) {
          <div class="p-4 bg-blue-200 rounded">
            <h3 class="font-bold">🎯 Hoverd!</h3>
            <p>Content loaded when you hovered over the placeholder.</p>
          </div>
        } @placeholder {
          <div class="p-4 bg-blue-100 rounded cursor-pointer hover:bg-blue-200 transition">
            👆 Hover over me to load content
          </div>
        }
      </section>

      <!-- Live Demo - Timer -->
      <section class="mb-8 p-6 bg-pink-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-pink-800">🔧 Demo: on timer(3s)</h2>
        
        @defer (on timer(3s)) {
          <div class="p-4 bg-pink-200 rounded">
            <h3 class="font-bold">⏰ Timer complete!</h3>
            <p>This loaded automatically after 3 seconds.</p>
          </div>
        } @placeholder {
          <div class="p-4 bg-pink-100 rounded">
            <p>⏳ Loading in 3 seconds...</p>
          </div>
        } @loading {
          <div class="p-4 bg-pink-100 rounded">
            <p class="animate-pulse">Loading now...</p>
          </div>
        }
      </section>

      <!-- Live Demo - When condition -->
      <section class="mb-8 p-6 bg-teal-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-teal-800">🔧 Demo: when condition</h2>
        
        <button 
          (click)="showAdvanced.set(true)"
          [disabled]="showAdvanced()"
          class="mb-4 px-4 py-2 bg-teal-500 text-white rounded disabled:opacity-50"
        >
          {{ showAdvanced() ? '✓ Advanced Mode Enabled' : 'Enable Advanced Mode' }}
        </button>
        
        @defer (when showAdvanced()) {
          <div class="p-4 bg-teal-200 rounded">
            <h3 class="font-bold">🚀 Advanced Mode!</h3>
            <p>This heavy feature loaded when condition became true.</p>
          </div>
        } @placeholder {
          <div class="p-4 bg-teal-100 rounded">
            <p class="text-gray-600">Advanced features not enabled</p>
          </div>
        }
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Defer Code Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class DeferDemoComponent {
  protected readonly showAdvanced = signal(false);

  protected readonly codeExample = `
// ===== Basic @defer =====

@defer {
  <app-heavy-component />
} @placeholder {
  <p>Click to load</p>
} @loading {
  <p>Loading...</p>
} @error {
  <p>Failed to load</p>
}

// ===== Trigger: on viewport =====
// Loads when element enters viewport

@defer (on viewport) {
  <app-lazy-chart />
} @placeholder {
  <div class="chart-placeholder">Chart loading area</div>
}

// ===== Trigger: on interaction =====
// Loads on click or keydown

@defer (on interaction) {
  <app-comment-form />
} @placeholder {
  <button>Add Comment</button>
}

// ===== Trigger: on hover =====
// Loads when mouse enters placeholder

@defer (on hover) {
  <app-tooltip-content />
} @placeholder {
  <span>Hover for details</span>
}

// ===== Trigger: on timer =====
// Loads after specified delay

@defer (on timer(2000ms)) {
  <app-delayed-content />
}

// ===== Trigger: on idle =====
// Loads when browser is idle

@defer (on idle) {
  <app-analytics />
}

// ===== Trigger: when condition =====
// Loads when expression is true

@defer (when showDetails) {
  <app-details [id]="itemId" />
}

// ===== Combine triggers =====
// First trigger wins

@defer (on viewport; on timer(5s)) {
  <app-feature />
}

// ===== Loading with minimum time =====
// Prevents flash of loading state

@defer (on interaction) {
  <app-content />
} @loading (minimum 500ms) {
  <app-skeleton />
}

// ===== Loading with delay =====
// Only show if loading takes longer

@defer (on viewport) {
  <app-content />
} @loading (after 100ms; minimum 1s) {
  <app-spinner />
}

// ===== Prefetching =====
// Start loading before trigger

@defer (on interaction; prefetch on hover) {
  <app-heavy />
} @placeholder {
  <button>Click me</button>
}

@defer (on viewport; prefetch on idle) {
  <app-below-fold />
}`;
}
