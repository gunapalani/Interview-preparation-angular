import { Component, ChangeDetectionStrategy, Directive, ElementRef, HostListener, inject, input } from '@angular/core';

// Host Directives for composition
@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  private readonly el = inject(ElementRef);
  
  appTooltip = input('');

  @HostListener('mouseenter') onMouseEnter() {
    // Simple tooltip simulation
    this.el.nativeElement.title = this.appTooltip();
  }
}

@Directive({
  selector: '[appHighlightable]',
})
export class HighlightableDirective {
  private readonly el = inject(ElementRef);
  
  highlightColor = input('yellow');

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor();
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

@Directive({
  selector: '[appClickable]',
})
export class ClickableDirective {
  private readonly el = inject(ElementRef);

  @HostListener('click') onClick() {
    this.el.nativeElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.el.nativeElement.style.transform = '';
    }, 100);
  }
}

// Composed directive using hostDirectives
@Directive({
  selector: '[appInteractiveCard]',
  hostDirectives: [
    {
      directive: HighlightableDirective,
      inputs: ['highlightColor'],
    },
    ClickableDirective,
  ],
})
export class InteractiveCardDirective {
  // This directive combines HighlightableDirective and ClickableDirective
  // without needing to reimplement their logic!
}

@Component({
  selector: 'app-directive-composition-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, HighlightableDirective, ClickableDirective, InteractiveCardDirective],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">Directive Composition API (v15)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is Directive Composition API?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>hostDirectives</strong> lets you compose directives together, applying multiple behaviors:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Code reuse:</strong> Combine existing directive behaviors</li>
            <li><strong>No inheritance:</strong> Composition over inheritance</li>
            <li><strong>Expose inputs/outputs:</strong> Selectively expose directive APIs</li>
            <li><strong>Works on components:</strong> Components can have host directives too</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What is the Directive Composition API?</li>
          <li class="ml-4 text-green-700">A: Feature that allows applying multiple directives to a host element using hostDirectives property, enabling composition without inheritance.</li>
          
          <li><strong>Q2:</strong> How do you expose host directive inputs/outputs?</li>
          <li class="ml-4 text-green-700">A: In hostDirectives array, specify inputs: ['inputName'] and outputs: ['outputName'] to expose them on the host.</li>
          
          <li><strong>Q3:</strong> Can you use host directives on components?</li>
          <li class="ml-4 text-green-700">A: Yes! Components can use hostDirectives just like directives, allowing behavior composition.</li>
          
          <li><strong>Q4:</strong> What's the execution order of host directives?</li>
          <li class="ml-4 text-green-700">A: Host directives are instantiated before the host class, in the order specified in the array.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Individual Directives</h2>
        
        <div class="space-y-4">
          <div 
            appHighlightable 
            highlightColor="lightblue"
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Hover me - I have appHighlightable directive (light blue)
          </div>

          <div 
            appHighlightable 
            highlightColor="lightgreen"
            appClickable
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Hover & Click me - I have BOTH directives applied manually
          </div>
        </div>
      </section>

      <!-- Composed Directive Demo -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">🔧 Live Demo - Composed Directive</h2>
        
        <div class="space-y-4">
          <div 
            appInteractiveCard
            highlightColor="lavender"
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Hover & Click me - I use appInteractiveCard which COMPOSES both behaviors!
          </div>
          
          <div 
            appInteractiveCard
            highlightColor="lightyellow"
            class="p-4 bg-white rounded-lg shadow cursor-pointer transition-all"
          >
            👆 Another card with different highlight color
          </div>
        </div>
        
        <p class="mt-4 text-sm text-purple-700">
          The appInteractiveCard directive uses hostDirectives to combine HighlightableDirective and ClickableDirective!
        </p>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 Directive Composition Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class DirectiveCompositionDemoComponent {
  protected readonly codeExample = `
import { Directive, Component, input } from '@angular/core';

// ===== Base directives to compose =====

@Directive({ selector: '[appHighlightable]' })
export class HighlightableDirective {
  highlightColor = input('yellow');
  
  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = this.highlightColor();
  }
  
  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}

@Directive({ selector: '[appClickable]' })
export class ClickableDirective {
  @HostListener('click') onClick() {
    // Click effect
  }
}

// ===== Composed directive using hostDirectives =====

@Directive({
  selector: '[appInteractiveCard]',
  hostDirectives: [
    {
      directive: HighlightableDirective,
      inputs: ['highlightColor'], // Expose this input
    },
    ClickableDirective, // No need to expose anything
  ],
})
export class InteractiveCardDirective {
  // All the behaviors are composed automatically!
}

// ===== Using on a component =====

@Component({
  selector: 'app-button',
  hostDirectives: [
    {
      directive: TooltipDirective,
      inputs: ['appTooltip: tooltip'], // Alias: appTooltip -> tooltip
    },
    {
      directive: DisabledDirective,
      inputs: ['disabled'],
      outputs: ['disabledChange'],
    },
  ],
  template: \`<ng-content />\`,
})
export class ButtonComponent {
  // Component now has tooltip and disabled behaviors!
}

// Usage:
// <app-button tooltip="Click me!" [disabled]="false">
//   Save
// </app-button>`;
}
