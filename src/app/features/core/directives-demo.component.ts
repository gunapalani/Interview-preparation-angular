import { Component, ChangeDetectionStrategy, Directive, ElementRef, HostListener, inject, input } from '@angular/core';

// Custom Attribute Directive
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);
  
  appHighlight = input<string>('yellow');

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight() || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Custom Structural Directive
@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  // This would use TemplateRef and ViewContainerRef in full implementation
}

@Component({
  selector: 'app-directives-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HighlightDirective],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Directives</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What are Directives?</h2>
        <div class="space-y-3 text-gray-700">
          <p>Directives are classes that add additional behavior to elements in Angular applications.</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Component Directives:</strong> Directives with templates (Components are directives!)</li>
            <li><strong>Attribute Directives:</strong> Change appearance or behavior of elements (ngClass, ngStyle)</li>
            <li><strong>Structural Directives:</strong> Change DOM structure (&#64;if, &#64;for, &#64;switch in v17+)</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the difference between structural and attribute directives?</li>
          <li class="ml-4 text-green-700">A: Structural directives modify DOM structure (add/remove elements), attribute directives modify element appearance/behavior.</li>
          
          <li><strong>Q2:</strong> How do you create a custom directive?</li>
          <li class="ml-4 text-green-700">A: Use &#64;Directive decorator with a selector. Inject ElementRef to access the element.</li>
          
          <li><strong>Q3:</strong> What is the host property in directives?</li>
          <li class="ml-4 text-green-700">A: Allows binding to host element properties, attributes, and events without &#64;HostBinding/&#64;HostListener.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Attribute Directive</h2>
        
        <div class="space-y-4">
          <p 
            appHighlight="lightblue" 
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Hover over me! I have a custom highlight directive (light blue)
          </p>
          
          <p 
            appHighlight="lightgreen" 
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Hover over me too! Different color (light green)
          </p>
          
          <p 
            appHighlight 
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Default color (yellow)
          </p>
        </div>
      </section>

      <!-- Built-in Directives Reference -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Built-in Directives</h2>
        <div class="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 class="font-semibold">Attribute Directives:</h3>
            <ul class="list-disc list-inside ml-4">
              <li>NgClass (use [class] instead)</li>
              <li>NgStyle (use [style] instead)</li>
              <li>NgModel</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold">Structural (v17+ syntax):</h3>
            <ul class="list-disc list-inside ml-4">
              <li>&#64;if / &#64;else</li>
              <li>&#64;for with track</li>
              <li>&#64;switch / &#64;case</li>
              <li>&#64;defer</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Custom Directive Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class DirectivesDemoComponent {
  protected readonly codeExample = `
import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);
  
  // Signal input (Angular 18+)
  appHighlight = input<string>('yellow');

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight() || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Usage in template:
// <p appHighlight="lightblue">Hover me!</p>`;
}
