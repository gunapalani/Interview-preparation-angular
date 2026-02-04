import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FeatureCategory {
  version: string;
  title: string;
  description: string;
  features: { name: string; route: string; description: string }[];
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header class="py-12 text-center">
        <h1 class="text-5xl font-bold text-white mb-4">
          Angular Features Showcase
        </h1>
        <p class="text-xl text-purple-200">
          v14 to v21 Feature Updates
        </p>
      </header>

      <main class="container mx-auto px-4 pb-16">
        @for (category of featureCategories; track category.version) {
          <section class="mb-12">
            <div class="flex items-center gap-4 mb-6">
              <span class="px-4 py-2 bg-purple-600 text-white font-bold rounded-full text-sm">
                {{ category.version }}
              </span>
              <h2 class="text-2xl font-bold text-white">{{ category.title }}</h2>
            </div>
            <p class="text-purple-200 mb-6">{{ category.description }}</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (feature of category.features; track feature.route) {
                <a 
                  [routerLink]="feature.route" 
                  class="block p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-purple-400 group"
                >
                  <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-purple-300">
                    {{ feature.name }}
                  </h3>
                  <p class="text-sm text-purple-200">{{ feature.description }}</p>
                </a>
              }
            </div>
          </section>
        }
      </main>
    </div>
  `,
})
export class HomeComponent {
  protected readonly featureCategories: FeatureCategory[] = [
    {
      version: 'Core',
      title: 'Angular Core Concepts',
      description: 'Fundamental concepts that are essential for any Angular developer',
      features: [
        { name: 'Components', route: '/core/components', description: 'Building blocks of Angular apps with templates and styles' },
        { name: 'Directives', route: '/core/directives', description: 'Attribute and structural directives to manipulate DOM' },
        { name: 'Pipes', route: '/core/pipes', description: 'Transform data in templates with built-in and custom pipes' },
        { name: 'Services & DI', route: '/core/services', description: 'Dependency injection and singleton services' },
        { name: 'Lifecycle Hooks', route: '/core/lifecycle', description: 'Component and directive lifecycle management' },
        { name: 'Template Syntax', route: '/core/template-syntax', description: 'Interpolation, property binding, event binding' },
      ],
    },
    {
      version: 'v14',
      title: 'Angular 14 Features',
      description: 'Standalone components, typed forms, and inject function',
      features: [
        { name: 'Standalone Components', route: '/v14/standalone', description: 'Components without NgModules' },
        { name: 'Typed Reactive Forms', route: '/v14/typed-forms', description: 'Strictly typed form controls and groups' },
        { name: 'inject() Function', route: '/v14/inject-function', description: 'Functional dependency injection' },
      ],
    },
    {
      version: 'v15',
      title: 'Angular 15 Features',
      description: 'Directive composition, functional guards, and stable standalone APIs',
      features: [
        { name: 'Directive Composition API', route: '/v15/directive-composition', description: 'Compose directives with host directives' },
        { name: 'Functional Guards', route: '/v15/functional-guards', description: 'Guards as functions instead of classes' },
        { name: 'NgOptimizedImage', route: '/v15/optimized-image', description: 'Optimized image loading directive' },
      ],
    },
    {
      version: 'v16',
      title: 'Angular 16 Features',
      description: 'Signals introduction, required inputs, and DestroyRef',
      features: [
        { name: 'Signals Basics', route: '/v16/signals-basics', description: 'Reactive state with signals' },
        { name: 'Computed & Effect', route: '/v16/computed-effect', description: 'Derived state and side effects' },
        { name: 'Required Inputs', route: '/v16/required-inputs', description: 'Mandatory component inputs' },
        { name: 'DestroyRef', route: '/v16/destroy-ref', description: 'Cleanup with DestroyRef injection' },
        { name: 'takeUntilDestroyed', route: '/v16/take-until-destroyed', description: 'Automatic subscription cleanup' },
      ],
    },
    {
      version: 'v17',
      title: 'Angular 17 Features',
      description: 'New control flow, deferrable views, and view transitions',
      features: [
        { name: 'Built-in Control Flow', route: '/v17/control-flow', description: '@if, @for, @switch syntax' },
        { name: 'Deferrable Views', route: '/v17/defer', description: 'Lazy loading with @defer blocks' },
        { name: 'View Transitions', route: '/v17/view-transitions', description: 'Animated route transitions' },
        { name: 'Signal Inputs (Preview)', route: '/v17/signal-inputs-preview', description: 'Inputs as signals' },
      ],
    },
    {
      version: 'v18',
      title: 'Angular 18 Features',
      description: 'Stable signal APIs, zoneless preview, and new control flow',
      features: [
        { name: 'Signal Inputs (Stable)', route: '/v18/signal-inputs', description: 'input() and input.required()' },
        { name: 'Signal Outputs', route: '/v18/signal-outputs', description: 'output() function for events' },
        { name: 'Model Inputs', route: '/v18/model-inputs', description: 'Two-way binding with model()' },
        { name: 'Zoneless (Preview)', route: '/v18/zoneless', description: 'Apps without zone.js' },
      ],
    },
    {
      version: 'v19',
      title: 'Angular 19 Features',
      description: 'Resource API, linkedSignal, and incremental hydration',
      features: [
        { name: 'Resource API', route: '/v19/resource', description: 'Async data loading with resource()' },
        { name: 'linkedSignal', route: '/v19/linked-signal', description: 'Writable computed signals' },
        { name: 'Signal Queries', route: '/v19/signal-queries', description: 'viewChild(), contentChild() as signals' },
        { name: 'Incremental Hydration', route: '/v19/hydration', description: 'Partial SSR hydration' },
      ],
    },
    {
      version: 'v20-21',
      title: 'Angular 20-21 Features',
      description: 'Latest features and experimental APIs',
      features: [
        { name: 'Standalone by Default', route: '/v20/standalone-default', description: 'No standalone: true needed' },
        { name: 'httpResource', route: '/v20/http-resource', description: 'HTTP requests with Resource API' },
        { name: 'Effect Scheduling', route: '/v20/effect-scheduling', description: 'Control effect execution' },
        { name: 'Zoneless Stable', route: '/v21/zoneless-stable', description: 'Production-ready zoneless apps' },
      ],
    },
  ];
}
