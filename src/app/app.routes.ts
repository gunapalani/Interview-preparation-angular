import { Routes } from '@angular/router';

export const routes: Routes = [
  // Home
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },

  // Core Features
  {
    path: 'core/components',
    loadComponent: () => import('./features/core/components-demo.component').then(m => m.ComponentsDemoComponent)
  },
  {
    path: 'core/directives',
    loadComponent: () => import('./features/core/directives-demo.component').then(m => m.DirectivesDemoComponent)
  },
  {
    path: 'core/pipes',
    loadComponent: () => import('./features/core/pipes-demo.component').then(m => m.PipesDemoComponent)
  },
  {
    path: 'core/services',
    loadComponent: () => import('./features/core/services-demo.component').then(m => m.ServicesDemoComponent)
  },
  {
    path: 'core/lifecycle',
    loadComponent: () => import('./features/core/lifecycle-demo.component').then(m => m.LifecycleDemoComponent)
  },
  {
    path: 'core/template-syntax',
    loadComponent: () => import('./features/core/template-syntax-demo.component').then(m => m.TemplateSyntaxDemoComponent)
  },

  // v14 Features
  {
    path: 'v14/standalone',
    loadComponent: () => import('./features/v14/standalone-demo.component').then(m => m.StandaloneDemoComponent)
  },
  {
    path: 'v14/typed-forms',
    loadComponent: () => import('./features/v14/typed-forms-demo.component').then(m => m.TypedFormsDemoComponent)
  },
  {
    path: 'v14/inject-function',
    loadComponent: () => import('./features/v14/inject-function-demo.component').then(m => m.InjectFunctionDemoComponent)
  },

  // v15 Features
  {
    path: 'v15/directive-composition',
    loadComponent: () => import('./features/v15/directive-composition-demo.component').then(m => m.DirectiveCompositionDemoComponent)
  },
  {
    path: 'v15/functional-guards',
    loadComponent: () => import('./features/v15/functional-guards-demo.component').then(m => m.FunctionalGuardsDemoComponent)
  },
  {
    path: 'v15/optimized-image',
    loadComponent: () => import('./features/v15/optimized-image-demo.component').then(m => m.OptimizedImageDemoComponent)
  },

  // v16 Features
  {
    path: 'v16/signals-basics',
    loadComponent: () => import('./features/v16/signals-basics-demo.component').then(m => m.SignalsBasicsDemoComponent)
  },
  {
    path: 'v16/computed-effect',
    loadComponent: () => import('./features/v16/computed-effect-demo.component').then(m => m.ComputedEffectDemoComponent)
  },
  {
    path: 'v16/required-inputs',
    loadComponent: () => import('./features/v16/required-inputs-demo.component').then(m => m.RequiredInputsDemoComponent)
  },
  {
    path: 'v16/destroy-ref',
    loadComponent: () => import('./features/v16/destroy-ref-demo.component').then(m => m.DestroyRefDemoComponent)
  },

  // v17 Features
  {
    path: 'v17/control-flow',
    loadComponent: () => import('./features/v17/control-flow-demo.component').then(m => m.ControlFlowDemoComponent)
  },
  {
    path: 'v17/defer',
    loadComponent: () => import('./features/v17/defer-demo.component').then(m => m.DeferDemoComponent)
  },

  // v18 Features
  {
    path: 'v18/signal-inputs',
    loadComponent: () => import('./features/v18/signal-inputs-demo.component').then(m => m.SignalInputsDemoComponent)
  },
  {
    path: 'v18/zoneless',
    loadComponent: () => import('./features/v18/zoneless-demo.component').then(m => m.ZonelessDemoComponent)
  },

  // v19 Features
  {
    path: 'v19/resource',
    loadComponent: () => import('./features/v19/resource-demo.component').then(m => m.ResourceDemoComponent)
  },
  {
    path: 'v19/signal-queries',
    loadComponent: () => import('./features/v19/signal-queries-demo.component').then(m => m.SignalQueriesDemoComponent)
  },

  // v20 Features
  {
    path: 'v20/standalone-default',
    loadComponent: () => import('./features/v20/standalone-default-demo.component').then(m => m.StandaloneDefaultDemoComponent)
  },
  {
    path: 'v20/http-resource',
    loadComponent: () => import('./features/v20/http-resource-demo.component').then(m => m.HttpResourceDemoComponent)
  },
  {
    path: 'v20/effect-scheduling',
    loadComponent: () => import('./features/v20/effect-scheduling-demo.component').then(m => m.EffectSchedulingDemoComponent)
  },

  // v21 Features
  {
    path: 'v21/zoneless-stable',
    loadComponent: () => import('./features/v21/zoneless-stable-demo.component').then(m => m.ZonelessStableDemoComponent)
  },

  // Fallback
  { path: '**', redirectTo: '' }
];
