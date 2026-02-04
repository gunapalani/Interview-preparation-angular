import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { Router, CanActivateFn, CanDeactivateFn, ResolveFn, CanMatchFn } from '@angular/router';

// Example Functional Guards

// CanActivate Guard
export const authGuard: CanActivateFn = (route, state) => {
  // In real app, inject AuthService
  // const auth = inject(AuthService);
  const isAuthenticated = true; // Simulated
  
  if (isAuthenticated) {
    return true;
  }
  
  const router = inject(Router);
  return router.createUrlTree(['/login']);
};

// CanDeactivate Guard
export const unsavedChangesGuard: CanDeactivateFn<{ hasUnsavedChanges: () => boolean }> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Leave anyway?');
  }
  return true;
};

// CanMatch Guard (replaces CanLoad)
export const featureGuard: CanMatchFn = (route, segments) => {
  // const featureFlags = inject(FeatureFlagService);
  // return featureFlags.isEnabled('newFeature');
  return true;
};

// Resolver
export const userResolver: ResolveFn<{ name: string; email: string }> = (route, state) => {
  // const userService = inject(UserService);
  // return userService.getUser(route.params['id']);
  return { name: 'John Doe', email: 'john@example.com' };
};

@Component({
  selector: 'app-functional-guards-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Functional Guards & Resolvers (v15)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Functional Guards?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>Functional guards</strong> replace class-based guards with simpler functions:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>CanActivateFn:</strong> Controls if route can be activated</li>
            <li><strong>CanDeactivateFn:</strong> Controls if user can leave route</li>
            <li><strong>CanMatchFn:</strong> Controls if route can be matched (replaces CanLoad)</li>
            <li><strong>ResolveFn:</strong> Pre-fetches data before route activation</li>
            <li><strong>inject() works:</strong> Use inject() inside functional guards</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the advantage of functional guards over class-based guards?</li>
          <li class="ml-4 text-green-700">A: Less boilerplate, no need for classes, better tree-shaking, can use inject() for dependencies.</li>
          
          <li><strong>Q2:</strong> How do you inject services in functional guards?</li>
          <li class="ml-4 text-green-700">A: Use inject() function inside the guard: const auth = inject(AuthService);</li>
          
          <li><strong>Q3:</strong> What replaced CanLoad in Angular 15?</li>
          <li class="ml-4 text-green-700">A: CanMatchFn - controls whether route can be matched during navigation.</li>
          
          <li><strong>Q4:</strong> How do you redirect in a functional guard?</li>
          <li class="ml-4 text-green-700">A: Return router.createUrlTree(['/path']) or router.parseUrl('/path').</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Guard Types Demo</h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold text-green-700 mb-2">✅ CanActivateFn</h3>
            <p class="text-sm text-gray-600">Protects routes from unauthorized access</p>
            <p class="text-sm mt-2">Simulated: User is {{ isAuthenticated() ? 'authenticated ✓' : 'not authenticated ✗' }}</p>
            <button 
              (click)="isAuthenticated.set(!isAuthenticated())" 
              class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Toggle Auth Status
            </button>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold text-yellow-700 mb-2">⚠️ CanDeactivateFn</h3>
            <p class="text-sm text-gray-600">Warns before leaving with unsaved changes</p>
            <label class="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                [checked]="hasChanges()"
                (change)="hasChanges.set(!hasChanges())"
              />
              <span>Has unsaved changes</span>
            </label>
          </div>

          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold text-purple-700 mb-2">🔄 ResolveFn</h3>
            <p class="text-sm text-gray-600">Pre-fetches data before route loads</p>
            <p class="text-sm mt-2">Resolved user: {{ resolvedUser.name }} ({{ resolvedUser.email }})</p>
          </div>
        </div>
      </section>

      <!-- Comparison -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔄 Class vs Functional Guards</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-red-100 rounded-lg">
            <h3 class="font-semibold text-red-800 mb-2">❌ Class-based (Old)</h3>
            <pre class="text-xs bg-white p-2 rounded overflow-x-auto">{{ classGuardExample }}</pre>
          </div>
          <div class="p-4 bg-green-100 rounded-lg">
            <h3 class="font-semibold text-green-800 mb-2">✅ Functional (New)</h3>
            <pre class="text-xs bg-white p-2 rounded overflow-x-auto">{{ functionalGuardExample }}</pre>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Functional Guards Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class FunctionalGuardsDemoComponent {
  protected readonly isAuthenticated = signal(true);
  protected readonly hasChanges = signal(false);
  protected readonly resolvedUser = { name: 'John Doe', email: 'john@example.com' };

  protected readonly classGuardExample = `
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}`;

  protected readonly functionalGuardExample = `
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isLoggedIn()) {
    return true;
  }
  return router.parseUrl('/login');
};`;

  protected readonly codeExample = `
import { inject } from '@angular/core';
import { 
  CanActivateFn, 
  CanDeactivateFn, 
  CanMatchFn, 
  ResolveFn, 
  Router 
} from '@angular/router';

// ===== CanActivateFn - Route Protection =====
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isAuthenticated()) {
    return true;
  }
  // Redirect to login with return URL
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// ===== CanDeactivateFn - Unsaved Changes =====
export const unsavedChangesGuard: CanDeactivateFn<{ hasChanges: () => boolean }> = 
  (component, currentRoute, currentState, nextState) => {
    if (component.hasChanges()) {
      return confirm('Discard unsaved changes?');
    }
    return true;
  };

// ===== CanMatchFn - Feature Flags =====
export const featureGuard: CanMatchFn = (route, segments) => {
  const features = inject(FeatureFlagService);
  return features.isEnabled(route.data?.['feature']);
};

// ===== ResolveFn - Data Pre-fetching =====
export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  return userService.getUser(route.params['id']);
};

// ===== Using in Routes =====
export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    resolve: { user: userResolver }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canDeactivate: [unsavedChangesGuard]
  },
  {
    path: 'beta-feature',
    loadComponent: () => import('./beta.component'),
    canMatch: [featureGuard],
    data: { feature: 'beta' }
  }
];`;
}
