import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-standalone-default-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Standalone by Default (v20+)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What Changed in v20?</h2>
        <div class="space-y-3 text-gray-700">
          <p>Starting with Angular 19/20, <strong>standalone: true</strong> is the default:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>No need to declare:</strong> standalone: true is implicit</li>
            <li><strong>To opt-out:</strong> Must explicitly set standalone: false</li>
            <li><strong>Cleaner decorators:</strong> Less boilerplate in &#64;Component</li>
            <li><strong>NgModules still work:</strong> For legacy code compatibility</li>
          </ul>
        </div>
      </section>

      <!-- Timeline -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📅 Standalone Evolution</h2>
        <div class="space-y-3 text-gray-700">
          <div class="flex items-start gap-3">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono w-12">v14</span>
            <div>
              <p class="font-semibold">Introduced as opt-in</p>
              <p class="text-sm text-gray-500">Required explicit standalone: true</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono w-12">v17</span>
            <div>
              <p class="font-semibold">Default for ng generate</p>
              <p class="text-sm text-gray-500">CLI generates standalone by default</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="px-2 py-1 bg-green-200 rounded text-sm font-mono w-12">v19+</span>
            <div>
              <p class="font-semibold">Language default</p>
              <p class="text-sm text-gray-500">standalone: true is implicit, no declaration needed</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> Do you need to write standalone: true in Angular 20?</li>
          <li class="ml-4 text-green-700">A: No! It's the default. Only write standalone: false if you need NgModule-based component.</li>
          
          <li><strong>Q2:</strong> Can you still use NgModules in Angular 20?</li>
          <li class="ml-4 text-green-700">A: Yes, NgModules still work. Set standalone: false on components that need to be declared in modules.</li>
          
          <li><strong>Q3:</strong> What imports do standalone components need?</li>
          <li class="ml-4 text-green-700">A: Declare dependencies in the imports array of &#64;Component decorator - other components, directives, pipes.</li>
          
          <li><strong>Q4:</strong> How do you provide services in standalone apps?</li>
          <li class="ml-4 text-green-700">A: Use providedIn: 'root' in services, or provide in app.config.ts providers array, or component providers array.</li>
        </ul>
      </section>

      <!-- Comparison -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔄 Before vs After v20</h2>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-white rounded-lg">
            <h3 class="font-semibold text-gray-700 mb-2">v14-18 (Explicit)</h3>
            <pre class="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{ beforeCode }}</pre>
          </div>
          <div class="p-4 bg-white rounded-lg">
            <h3 class="font-semibold text-green-700 mb-2">v20+ (Implicit) ✅</h3>
            <pre class="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{ afterCode }}</pre>
          </div>
        </div>
      </section>

      <!-- This Component -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🎯 This Component</h2>
        <div class="p-4 bg-white rounded-lg shadow">
          <p class="text-gray-700">
            Notice this component's decorator - there's no <code class="bg-gray-200 px-1 rounded">standalone: true</code>!
          </p>
          <pre class="text-sm bg-gray-100 p-3 rounded mt-3 overflow-x-auto">{{ thisComponentCode }}</pre>
          <p class="text-sm text-gray-500 mt-2">
            In Angular 20+, this component is automatically standalone.
          </p>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Standalone by Default Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class StandaloneDefaultDemoComponent {
  protected readonly beforeCode = `
@Component({
  selector: 'app-example',
  standalone: true,  // Required!
  imports: [CommonModule],
  template: '...'
})
export class ExampleComponent {}`;

  protected readonly afterCode = `
@Component({
  selector: 'app-example',
  // standalone: true is implicit!
  imports: [CommonModule],
  template: '...'
})
export class ExampleComponent {}`;

  protected readonly thisComponentCode = `
@Component({
  selector: 'app-standalone-default-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`...\`
})
export class StandaloneDefaultDemoComponent {}`;

  protected readonly codeExample = `
// ===== Angular 20+ Component (standalone by default) =====

import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  // No standalone: true needed!
  imports: [SomeDirective, SomePipe],
  template: \`<p>Hello World!</p>\`
})
export class MyComponent {}

// ===== Directive (also standalone by default) =====

@Directive({
  selector: '[appHighlight]',
  // No standalone: true needed!
})
export class HighlightDirective {}

// ===== Pipe (also standalone by default) =====

@Pipe({
  name: 'myPipe',
  // No standalone: true needed!
})
export class MyPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

// ===== Opting OUT to use NgModule =====

@Component({
  selector: 'app-legacy',
  standalone: false, // Explicit opt-out!
  template: \`<p>I belong to a module</p>\`
})
export class LegacyComponent {}

// Then declare in NgModule:
@NgModule({
  declarations: [LegacyComponent],
  exports: [LegacyComponent]
})
export class LegacyModule {}

// ===== Full Application Structure (v20+) =====

// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig);

// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // provideAnimations(),
    // other providers...
  ]
};

// app.ts (root component)
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: \`
    <app-header />
    <router-outlet />
    <app-footer />
  \`
})
export class App {}

// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'feature',
    loadComponent: () => import('./feature/feature').then(m => m.FeatureComponent)
  }
];`;
}
