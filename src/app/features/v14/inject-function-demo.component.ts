import { Component, ChangeDetectionStrategy, Injectable, inject, InjectionToken, signal } from '@angular/core';

// Example services for DI demonstration
@Injectable({ providedIn: 'root' })
export class LoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly logger = inject(LoggerService); // inject() in service!
  
  getData(): string[] {
    this.logger.log('Fetching data...');
    return ['Item 1', 'Item 2', 'Item 3'];
  }
}

// Injection Token example
export const API_CONFIG = new InjectionToken<{ baseUrl: string; timeout: number }>('API_CONFIG');

@Component({
  selector: 'app-inject-function-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">inject() Function (v14)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is inject() Function?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>inject()</strong> is a functional way to access dependency injection, introduced in Angular 14:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Functional approach:</strong> No constructor needed</li>
            <li><strong>Works everywhere:</strong> Components, services, guards, pipes, directives</li>
            <li><strong>Field initializers:</strong> Can be used in class field declarations</li>
            <li><strong>Factory functions:</strong> Enables functional patterns and composition</li>
            <li><strong>Must be in injection context:</strong> Constructor, field initializer, or factory function</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the advantage of inject() over constructor injection?</li>
          <li class="ml-4 text-green-700">A: Can be used outside constructors (field initializers, factory functions), supports functional patterns, cleaner syntax for many dependencies.</li>
          
          <li><strong>Q2:</strong> Where can you use inject()?</li>
          <li class="ml-4 text-green-700">A: In injection context: constructor, field initializer, factory function called from injection context, or runInInjectionContext().</li>
          
          <li><strong>Q3:</strong> What is runInInjectionContext()?</li>
          <li class="ml-4 text-green-700">A: Function that allows running code in an injection context outside of normal DI flow, useful for dynamic injection.</li>
          
          <li><strong>Q4:</strong> How do you inject optional dependencies with inject()?</li>
          <li class="ml-4 text-green-700">A: Use inject(Service, {{ '{' }} optional: true {{ '}' }}) to return undefined if not found instead of throwing error.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - inject() Usage</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Data from DataService (using inject):</h3>
            <ul class="list-disc list-inside">
              @for (item of data(); track item) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Injected Config (InjectionToken):</h3>
            @if (config) {
              <p>Base URL: {{ config.baseUrl }}</p>
              <p>Timeout: {{ config.timeout }}ms</p>
            } @else {
              <p class="text-gray-500">Config not provided (optional injection)</p>
            }
          </div>

          <button 
            (click)="loadData()" 
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Reload Data (check console for logs)
          </button>
        </div>
      </section>

      <!-- Comparison -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔄 Constructor vs inject() Comparison</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-white rounded-lg">
            <h3 class="font-semibold text-gray-800 mb-2">Constructor Injection (Old)</h3>
            <pre class="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{ constructorExample }}</pre>
          </div>
          <div class="p-4 bg-white rounded-lg">
            <h3 class="font-semibold text-purple-800 mb-2">inject() Function (New) ✅</h3>
            <pre class="text-xs bg-gray-100 p-2 rounded overflow-x-auto">{{ injectExample }}</pre>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 inject() Function Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
  providers: [
    // Provide config for this component
    { provide: API_CONFIG, useValue: { baseUrl: 'https://api.example.com', timeout: 5000 } }
  ]
})
export class InjectFunctionDemoComponent {
  // Modern inject() function - cleaner than constructor!
  private readonly dataService = inject(DataService);
  private readonly logger = inject(LoggerService);
  
  // Optional injection - returns undefined if not found
  protected readonly config = inject(API_CONFIG, { optional: true });
  
  protected readonly data = signal<string[]>([]);

  constructor() {
    // Can also use inject() in constructor
    this.loadData();
  }

  protected loadData(): void {
    this.logger.log('Loading data in component');
    this.data.set(this.dataService.getData());
  }

  protected readonly constructorExample = `
constructor(
  private dataService: DataService,
  private logger: LoggerService,
  @Optional() private config: Config
) {}`;

  protected readonly injectExample = `
private dataService = inject(DataService);
private logger = inject(LoggerService);
private config = inject(Config, { optional: true });`;

  protected readonly codeExample = `
import { inject, InjectionToken } from '@angular/core';

// ===== Basic inject() usage =====
@Component({...})
export class MyComponent {
  // Field initializer - cleaner syntax!
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly service = inject(MyService);
  
  // No constructor needed for simple cases!
}

// ===== inject() in Services =====
@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly logger = inject(LoggerService);
  
  fetchData() {
    this.logger.log('Fetching...');
    return this.http.get('/api/data');
  }
}

// ===== Optional and Self/SkipSelf =====
private optional = inject(Service, { optional: true }); // undefined if not found
private self = inject(Service, { self: true }); // Only this injector
private skipSelf = inject(Service, { skipSelf: true }); // Parent injector only

// ===== InjectionToken with inject() =====
const API_URL = new InjectionToken<string>('API_URL');

// In component
private apiUrl = inject(API_URL);

// ===== Factory function pattern =====
function createDataLoader() {
  const http = inject(HttpClient);
  const baseUrl = inject(API_URL);
  
  return {
    load: (id: string) => http.get(\`\${baseUrl}/items/\${id}\`)
  };
}

@Component({...})
export class MyComponent {
  private loader = createDataLoader(); // Works!
}

// ===== Functional Guards with inject() =====
export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isAuthenticated()) {
    return true;
  }
  return router.parseUrl('/login');
};`;
}
