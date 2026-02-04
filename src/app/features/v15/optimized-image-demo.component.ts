import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-optimized-image-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-purple-600 mb-6">NgOptimizedImage (v15)</h1>
      
      <!-- Explanation Section -->
      <section class="mb-8 p-6 bg-blue-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-blue-800">📚 What is NgOptimizedImage?</h2>
        <div class="space-y-3 text-gray-700">
          <p><strong>NgOptimizedImage</strong> is a directive for optimized image loading:</p>
          <ul class="list-disc list-inside ml-4 space-y-2">
            <li><strong>Lazy loading:</strong> Images load only when visible (loading="lazy")</li>
            <li><strong>Priority loading:</strong> LCP images loaded immediately (priority)</li>
            <li><strong>Automatic srcset:</strong> Responsive images for different screens</li>
            <li><strong>CDN integration:</strong> Works with image CDNs (Cloudinary, ImageKit, etc.)</li>
            <li><strong>Size enforcement:</strong> Prevents layout shifts with width/height</li>
            <li><strong>Warnings:</strong> Development warnings for best practices</li>
          </ul>
        </div>
      </section>

      <!-- Interview Questions -->
      <section class="mb-8 p-6 bg-yellow-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-yellow-800">🎯 Interview Questions</h2>
        <ul class="space-y-3 text-gray-700">
          <li><strong>Q1:</strong> What are the benefits of NgOptimizedImage?</li>
          <li class="ml-4 text-green-700">A: Lazy loading, priority hints for LCP, automatic srcset generation, size enforcement to prevent CLS, CDN integration.</li>
          
          <li><strong>Q2:</strong> When should you use the priority attribute?</li>
          <li class="ml-4 text-green-700">A: For above-the-fold images that are Largest Contentful Paint (LCP) candidates. Disables lazy loading.</li>
          
          <li><strong>Q3:</strong> Why is width and height required?</li>
          <li class="ml-4 text-green-700">A: To reserve space and prevent Cumulative Layout Shift (CLS). Required for non-fill mode images.</li>
          
          <li><strong>Q4:</strong> What is fill mode?</li>
          <li class="ml-4 text-green-700">A: Image fills parent container, no width/height needed. Parent must have position: relative.</li>
        </ul>
      </section>

      <!-- Live Demo -->
      <section class="mb-8 p-6 bg-green-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-green-800">🔧 Live Demo - Optimized Images</h2>
        
        <div class="space-y-6">
          <!-- Standard Image -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Standard with width/height</h3>
            <img 
              ngSrc="https://picsum.photos/400/300" 
              width="400" 
              height="300"
              alt="Demo image"
              class="rounded"
            />
            <p class="text-sm text-gray-500 mt-2">Width and height prevent layout shift</p>
          </div>

          <!-- Priority Image -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Priority Image (LCP)</h3>
            <img 
              ngSrc="https://picsum.photos/400/250" 
              width="400" 
              height="250"
              priority
              alt="Priority demo image"
              class="rounded"
            />
            <p class="text-sm text-gray-500 mt-2">Priority: loads immediately, no lazy loading</p>
          </div>

          <!-- Fill Mode -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">Fill Mode (responsive)</h3>
            <div class="relative w-full h-48 bg-gray-200 rounded overflow-hidden">
              <img 
                ngSrc="https://picsum.photos/800/400" 
                fill
                alt="Fill mode demo"
                class="object-cover"
              />
            </div>
            <p class="text-sm text-gray-500 mt-2">Fill: image fills parent, parent needs position:relative</p>
          </div>

          <!-- Placeholder -->
          <div class="p-4 bg-white rounded-lg shadow">
            <h3 class="font-semibold mb-2">With Placeholder</h3>
            <img 
              ngSrc="https://picsum.photos/400/200" 
              width="400" 
              height="200"
              placeholder
              alt="Placeholder demo"
              class="rounded"
            />
            <p class="text-sm text-gray-500 mt-2">Placeholder: blur effect while loading</p>
          </div>
        </div>
      </section>

      <!-- Best Practices -->
      <section class="mb-8 p-6 bg-purple-50 rounded-xl">
        <h2 class="text-xl font-semibold mb-4 text-purple-800">📋 Best Practices</h2>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Use <code class="bg-gray-200 px-1 rounded">priority</code> for above-the-fold LCP images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Always provide width and height (or use fill)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Use <code class="bg-gray-200 px-1 rounded">fill</code> for responsive images in containers</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500">✓</span>
            <span>Configure image loaders for CDN optimization</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-500">✗</span>
            <span>Don't use for base64 inline images</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-500">✗</span>
            <span>Don't use priority on lazy-loaded below-the-fold images</span>
          </li>
        </ul>
      </section>

      <!-- Code Example -->
      <section class="p-6 bg-gray-900 rounded-xl text-gray-100">
        <h2 class="text-xl font-semibold mb-4 text-purple-400">💻 NgOptimizedImage Code</h2>
        <pre class="overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
      </section>
    </div>
  `,
})
export class OptimizedImageDemoComponent {
  protected readonly codeExample = `
import { NgOptimizedImage } from '@angular/common';

@Component({
  imports: [NgOptimizedImage],
  template: \`
    <!-- Standard image with width/height -->
    <img 
      ngSrc="image.jpg" 
      width="400" 
      height="300"
      alt="Description"
    />
    
    <!-- Priority image (LCP) - loads immediately -->
    <img 
      ngSrc="hero.jpg" 
      width="800" 
      height="400"
      priority
      alt="Hero image"
    />
    
    <!-- Fill mode - responsive -->
    <div style="position: relative; width: 100%; height: 300px;">
      <img 
        ngSrc="cover.jpg" 
        fill
        style="object-fit: cover"
        alt="Cover image"
      />
    </div>
    
    <!-- With placeholder blur -->
    <img 
      ngSrc="photo.jpg" 
      width="400" 
      height="300"
      placeholder
      alt="Photo"
    />
    
    <!-- With srcset sizes hint -->
    <img 
      ngSrc="responsive.jpg" 
      width="800" 
      height="600"
      sizes="(max-width: 768px) 100vw, 50vw"
      alt="Responsive image"
    />
  \`
})
export class ImageComponent {}

// ===== Image Loader Configuration =====
// In app.config.ts

import { provideImageKitLoader } from '@angular/common';
// Or: provideCloudinaryLoader, provideCloudflareLoader, etc.

export const appConfig = {
  providers: [
    provideImageKitLoader('https://ik.imagekit.io/your-id'),
  ]
};

// Custom loader
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

const customLoader = (config: ImageLoaderConfig) => {
  return \`https://cdn.example.com/\${config.src}?w=\${config.width}\`;
};

export const appConfig = {
  providers: [
    { provide: IMAGE_LOADER, useValue: customLoader }
  ]
};`;
}
