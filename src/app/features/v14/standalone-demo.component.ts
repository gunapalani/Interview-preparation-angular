import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-standalone-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Standalone Components (v14)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Standalone Components?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Standalone components</strong> were introduced in Angular 14 and became the default in Angular 19+.</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>No NgModule required:</strong> Components can be used directly</li>
            <li><strong>Self-contained:</strong> Imports are declared in the component itself</li>
            <li><strong>Better tree-shaking:</strong> Only import what you need</li>
            <li><strong>Simpler mental model:</strong> No need to understand NgModule system</li>
            <li><strong>v19+:</strong> standalone: true is now the default (no need to specify)</li>
          </ul>
        </div>
      </section>

      <!-- Version History -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📅 Version History</h2>
        <div class="space-y-2 text-gray-700">
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v14</span>
            <span>Standalone components introduced (Developer Preview)</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v15</span>
            <span>Standalone APIs stable, standalone bootstrapping</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v17</span>
            <span>Standalone by default for new projects with ng new</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-1 bg-purple-200 rounded text-sm font-mono">v19+</span>
            <span>standalone: true is implicit (no need to declare)</span>
          </div>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What are the benefits of standalone components?</li>
          <li class="ml-4 text-green-700">A: Simpler code, better tree-shaking, no NgModule boilerplate, easier lazy loading, clearer dependencies.</li>
          
          <li><strong>Q2:</strong> How do you import dependencies in a standalone component?</li>
          <li class="ml-4 text-green-700">A: Use the 'imports' array in &#64;Component decorator to import other components, directives, and pipes.</li>
          
          <li><strong>Q3:</strong> How do you bootstrap a standalone application?</li>
          <li class="ml-4 text-green-700">A: Use bootstrapApplication() in main.ts instead of platformBrowserDynamic().bootstrapModule().</li>
          
          <li><strong>Q4:</strong> Can standalone components work with NgModules?</li>
          <li class="ml-4 text-green-700">A: Yes! You can import NgModules in standalone components, and export standalone components from NgModules.</li>
        </ul>
      </section>

      <!-- Comparison -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔄 NgModule vs Standalone Comparison</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-red-100 rounded-lg">
            <h3 class="font-semibold text-red-800 mb-2">❌ Old Way (NgModule)</h3>
            <ul class="text-sm space-y-1">
              <li>• Declare in NgModule</li>
              <li>• Export from NgModule</li>
              <li>• Import NgModule to use</li>
              <li>• Complicated dependency chain</li>
            </ul>
          </div>
          <div class="p-4 bg-green-100 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">✅ New Way (Standalone)</h3>
            <ul class="text-sm space-y-1">
              <li>• No NgModule needed</li>
              <li>• Import directly in component</li>
              <li>• Clear, explicit dependencies</li>
              <li>• Better tree-shaking</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Live Example Component -->
      <section class="mb-8 p-6 bg-orange-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-orange-800">🔧 This Component is Standalone!</h2>
        <div class="p-4 bg-white rounded-lg shadow">
          <p class="text-gray-700">
            This very component you're looking at is a standalone component. 
            Notice how it doesn't need to be declared in any NgModule - it just works!
          </p>
          <p class="mt-2 text-sm text-gray-500">
            In Angular 19+, you don't even need to write standalone: true - it's the default!
          </p>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Code Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class StandaloneDemoComponent {
  protected readonly codeExample = `
// ============ OLD WAY: NgModule (Angular < 14) ============
// app.module.ts
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}

// main.ts (old)
platformBrowserDynamic().bootstrapModule(AppModule);

// ============ NEW WAY: Standalone (Angular 14+) ============

// Angular 14-18: Must specify standalone: true
@Component({
  selector: 'app-header',
  standalone: true,  // Required in v14-18
  imports: [CommonModule, RouterLink],
  template: \`<nav>...</nav>\`
})
export class HeaderComponent {}

// Angular 19+: standalone: true is DEFAULT
@Component({
  selector: 'app-header',
  // standalone: true is implicit!
  imports: [RouterLink],
  template: \`<nav>...</nav>\`
})
export class HeaderComponent {}

// main.ts (new standalone bootstrap)
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));

// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // provideHttpClient(),
    // provideAnimations(),
  ]
};`;
}
