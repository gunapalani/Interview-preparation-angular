import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-http-resource-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">httpResource (v20+)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is httpResource?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>httpResource()</strong> is the HTTP-specific version of resource():</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Built-in HTTP:</strong> No need to write fetch/HttpClient logic</li>
            <li><strong>Reactive URL:</strong> URL can be signal-based, auto-refetches</li>
            <li><strong>Type-safe:</strong> Generic type parameter for response</li>
            <li><strong>States:</strong> loading, resolved, error states built-in</li>
            <li><strong>SSR support:</strong> Works with server-side rendering</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between httpResource and HttpClient?</li>
          <li class="ml-4 text-green-700">A: httpResource is declarative and signal-based. It auto-refetches when URL signal changes. HttpClient is imperative, you manually call methods.</li>
          
          <li><strong>Q2:</strong> How do you handle errors with httpResource?</li>
          <li class="ml-4 text-green-700">A: Check resource.status() === 'error' and resource.error() for the error details.</li>
          
          <li><strong>Q3:</strong> Does httpResource need HttpClient setup?</li>
          <li class="ml-4 text-green-700">A: Yes, you still need provideHttpClient() in app config. httpResource uses HttpClient internally.</li>
          
          <li><strong>Q4:</strong> Can you pass custom headers with httpResource?</li>
          <li class="ml-4 text-green-700">A: Yes, use the headers option in httpResource config.</li>
        </ul>
      </section>

      <!-- Simulated Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 httpResource Concept Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-3">User Lookup (Simulated)</h3>
            
            <div class="flex gap-2 mb-4">
              <input 
                type="number"
                [value]="userId()"
                (input)="userId.set(+getValue($event))"
                placeholder="User ID (1-10)"
                min="1"
                max="10"
                class="px-3 py-2 border rounded w-32"
              />
              <button 
                (click)="fetchUser()"
                [disabled]="loading()"
                class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {{ loading() ? 'Loading...' : 'Fetch User' }}
              </button>
            </div>

            <p class="text-sm text-gray-500 mb-3">
              In real httpResource, changing userId signal would auto-fetch!
            </p>

            @if (loading()) {
              <div class="flex items-center gap-2 text-blue-600">
                <span class="animate-spin">⏳</span>
                Loading user {{ userId() }}...
              </div>
            } @else if (error()) {
              <div class="p-3 bg-red-100 text-red-700 rounded">
                Error: {{ error() }}
              </div>
            } @else if (user()) {
              <div class="p-3 bg-green-100 rounded">
                <h4 class="font-bold">{{ user()!.name }}</h4>
                <p>Email: {{ user()!.email }}</p>
                <p>Company: {{ user()!.company }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- API Reference -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 httpResource API</h2>
        <div class="space-y-2 text-sm">
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">httpResource&lt;T&gt;({{ '{' }} url {{ '}' }})</code>
            <p class="text-gray-600">Basic GET request</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">httpResource&lt;T&gt;({{ '{' }} url, method: 'POST', body {{ '}' }})</code>
            <p class="text-gray-600">POST with body</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">resource.value()</code>
            <p class="text-gray-600">The response data (Signal)</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">resource.status()</code>
            <p class="text-gray-600">'idle' | 'loading' | 'resolved' | 'error'</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">resource.isLoading()</code>
            <p class="text-gray-600">Boolean shortcut for loading state</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">resource.error()</code>
            <p class="text-gray-600">Error details if failed</p>
          </div>
          <div class="p-2 bg-white rounded">
            <code class="text-purple-600">resource.reload()</code>
            <p class="text-gray-600">Manually trigger refetch</p>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 httpResource Code Examples</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class HttpResourceDemoComponent {
  protected readonly userId = signal(1);
  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly user = signal<{ name: string; email: string; company: string } | null>(null);

  protected getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  protected async fetchUser(): Promise<void> {
    const id = this.userId();
    this.loading.set(true);
    this.error.set(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (id < 1 || id > 10) {
        throw new Error('User not found');
      }

      this.user.set({
        name: `User ${id}`,
        email: `user${id}@example.com`,
        company: `Company ${id}`
      });
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'Unknown error');
      this.user.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  protected readonly codeExample = `
import { httpResource } from '@angular/common/http';
import { signal, computed } from '@angular/core';

@Component({...})
export class UserComponent {
  // Reactive parameter
  userId = signal(1);
  
  // ===== Basic httpResource (GET) =====
  
  userResource = httpResource<User>({
    url: () => \`/api/users/\${this.userId()}\`
  });
  
  // In template:
  // @if (userResource.isLoading()) {
  //   <spinner />
  // }
  // @if (userResource.value(); as user) {
  //   {{ user.name }}
  // }
  // @if (userResource.error(); as error) {
  //   {{ error.message }}
  // }
  
  // ===== Static URL =====
  
  allUsers = httpResource<User[]>({
    url: '/api/users'
  });
  
  // ===== With Headers =====
  
  protectedResource = httpResource<Data>({
    url: '/api/protected',
    headers: {
      'Authorization': 'Bearer token123',
      'Accept': 'application/json'
    }
  });
  
  // ===== POST Request =====
  
  createUser = httpResource<User>({
    url: '/api/users',
    method: 'POST',
    body: () => ({
      name: this.newUserName(),
      email: this.newUserEmail()
    })
  });
  
  // ===== With Query Parameters =====
  
  searchTerm = signal('');
  page = signal(1);
  
  searchResults = httpResource<SearchResult[]>({
    url: () => \`/api/search?q=\${this.searchTerm()}&page=\${this.page()}\`
  });
  
  // ===== Using Resource State =====
  
  // Computed based on resource
  userCount = computed(() => this.allUsers.value()?.length ?? 0);
  
  isUserLoaded = computed(() => 
    this.userResource.status() === 'resolved'
  );
  
  // ===== Manual Reload =====
  
  refresh() {
    this.userResource.reload();
  }
  
  // ===== Error Handling =====
  
  handleError() {
    const error = this.userResource.error();
    if (error) {
      console.error('Failed to load:', error.message);
      // error.status - HTTP status code
      // error.statusText - Status text
    }
  }
}

// ===== Setup in app.config.ts =====

import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // Required!
    // Or without fetch: provideHttpClient()
  ]
};

// ===== Comparison: HttpClient vs httpResource =====

// HttpClient (imperative)
@Component({...})
export class OldWay {
  private http = inject(HttpClient);
  
  user = signal<User | null>(null);
  loading = signal(false);
  error = signal<Error | null>(null);
  
  loadUser(id: number) {
    this.loading.set(true);
    this.http.get<User>(\`/api/users/\${id}\`).subscribe({
      next: user => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err);
        this.loading.set(false);
      }
    });
  }
}

// httpResource (declarative)
@Component({...})
export class NewWay {
  userId = signal(1);
  
  // Everything handled automatically!
  user = httpResource<User>({
    url: () => \`/api/users/\${this.userId()}\`
  });
  
  // Change userId and it auto-refetches
  changeUser(id: number) {
    this.userId.set(id); // That's it!
  }
}`;
}
