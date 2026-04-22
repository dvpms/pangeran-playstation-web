# Animation Components - Dokumentasi

Komponen utility animasi menggunakan Framer Motion untuk landing page. Semua komponen di-export dari `src/components/animations/index.js`.

## Komponen Utility

### 1. **FadeInUp**
Animasi fade + slide up saat component mount.

```jsx
import { FadeInUp } from "@/components/animations";

export default function Example() {
  return (
    <FadeInUp delay={0.2} duration={0.6}>
      <h1>Hello World</h1>
    </FadeInUp>
  );
}
```

**Props:**
- `delay`: Delay in seconds (default: 0)
- `duration`: Duration in seconds (default: 0.5)
- `className`: Additional CSS classes

---

### 2. **ScrollReveal**
Animasi reveal saat elemen masuk viewport (scroll).

```jsx
import { ScrollReveal } from "@/components/animations";

export default function Example() {
  return (
    <ScrollReveal animation="fadeInUp" duration={0.6}>
      <div>This element appears when scrolled into view</div>
    </ScrollReveal>
  );
}
```

**Props:**
- `animation`: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'fadeIn' (default: 'fadeInUp')
- `duration`: Duration in seconds (default: 0.6)
- `className`: Additional CSS classes

---

### 3. **StaggerContainer**
Container untuk animasi stagger (bertahap) saat masuk viewport.

```jsx
import { StaggerContainer } from "@/components/animations";

export default function Example() {
  const items = ["Item 1", "Item 2", "Item 3"];
  
  return (
    <StaggerContainer staggerDelay={0.1} duration={0.5}>
      {items.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </StaggerContainer>
  );
}
```

**Props:**
- `staggerDelay`: Delay between each child in seconds (default: 0.1)
- `duration`: Duration of each animation in seconds (default: 0.5)
- `className`: Additional CSS classes for container

---

### 4. **AnimatedButton**
Button dengan hover dan tap effect.

```jsx
import { AnimatedButton } from "@/components/animations";

export default function Example() {
  return (
    <AnimatedButton 
      onClick={() => console.log("Clicked!")}
      className="px-6 py-3 bg-primary rounded-lg"
      hoverScale={1.05}
      tapScale={0.95}
    >
      Booking Sekarang
    </AnimatedButton>
  );
}
```

**Props:**
- `onClick`: Click handler
- `className`: Button CSS classes
- `hoverScale`: Scale on hover (default: 1.05)
- `tapScale`: Scale on tap (default: 0.95)
- `type`: Button type (default: 'button')
- `disabled`: Button disabled state

---

### 5. **HoverScale**
Elemen dengan scale effect saat hover.

```jsx
import { HoverScale } from "@/components/animations";

export default function Example() {
  return (
    <HoverScale scale={1.1} className="overflow-hidden rounded-lg">
      <img src="/image.jpg" alt="example" />
    </HoverScale>
  );
}
```

**Props:**
- `scale`: Scale value on hover (default: 1.1)
- `duration`: Duration in seconds (default: 0.3)
- `className`: Additional CSS classes

---

### 6. **AnimatedCounter**
Number counter yang berjalan dari 0 ke nilai target saat masuk viewport.

```jsx
import { AnimatedCounter } from "@/components/animations";

export default function Example() {
  return (
    <AnimatedCounter 
      from={0} 
      to={100} 
      duration={2} 
      suffix="+"
      className="text-4xl font-bold"
    />
  );
}
```

**Props:**
- `from`: Start value (default: 0)
- `to`: End value (required)
- `duration`: Duration in seconds (default: 2)
- `suffix`: Text to append (e.g., 'k', '+', '%')
- `className`: Additional CSS classes
- `format`: Custom format function (default: Math.floor)

---

## Contoh Integrasi di Landing Page

### HeroSection dengan FadeInUp
```jsx
import { FadeInUp } from "@/components/animations";

export default function HeroSection() {
  return (
    <section>
      <FadeInUp delay={0} duration={0.6}>
        <h1>Heading</h1>
      </FadeInUp>
      <FadeInUp delay={0.2} duration={0.6}>
        <p>Description</p>
      </FadeInUp>
      <FadeInUp delay={0.4} duration={0.6}>
        <button>CTA Button</button>
      </FadeInUp>
    </section>
  );
}
```

### CatalogUnit dengan StaggerContainer
```jsx
import { StaggerContainer, ScrollReveal } from "@/components/animations";

export default function CatalogSection() {
  return (
    <section>
      <ScrollReveal>
        <h2>Unit Tersedia</h2>
      </ScrollReveal>
      <StaggerContainer staggerDelay={0.15}>
        {items.map((item) => (
          <CatalogUnit key={item.id} {...item} />
        ))}
      </StaggerContainer>
    </section>
  );
}
```

### GamesCarousel dengan ScrollReveal
```jsx
import { ScrollReveal } from "@/components/animations";

export default function GamesCarousel() {
  return (
    <section>
      <ScrollReveal animation="fadeInLeft">
        <h2>Katalog Game Terkini</h2>
      </ScrollReveal>
      {/* carousel content */}
    </section>
  );
}
```

---

## Tips Penggunaan

1. **Scroll Reveal** bagus untuk heading dan section intro
2. **StaggerContainer** untuk list items, cards grid
3. **AnimatedButton** untuk CTA buttons
4. **HoverScale** untuk product images
5. **AnimatedCounter** untuk statistics atau pricing
6. **FadeInUp** untuk initial page load

Gunakan sparingly agar tidak berlebihan dan tetap user-friendly! ✨
