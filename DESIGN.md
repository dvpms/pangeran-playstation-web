# Design System Strategy: High-End Digital Gaming Rental

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Arcade"**

This design system moves away from the aggressive, dark-mode "gamer" tropes often associated with PlayStation services. Instead, we are leaning into a premium, light-mode editorial experience that treats gaming as a luxury service. We achieve this through **"The Ethereal Arcade"**—a concept defined by high-contrast sky blue, radiant golden accents, and a layout that breathes through expansive white space and layered glass-like surfaces.

Rather than a rigid, blocky grid, this system utilizes **intentional asymmetry**. Hero elements and gaming consoles should break the container boundaries, creating a sense of dynamic motion. We avoid the "template" look by using a sophisticated typographic scale and depth patterns that mimic the physical layering of high-end tech interfaces.

## 2. Colors
Our palette is anchored by a vibrant sky blue, balanced by a sophisticated set of surface tones that create depth without visual noise.

*   **Primary (`#00668a` / `#38bdf8`):** The sky blue drives our brand identity. Use the `primary_container` (`#38bdf8`) for large impact areas to keep the feel "light" and "friendly."
*   **Secondary/Accents (`#795900` / `#ffc329`):** Our "Royal Gold." This is reserved strictly for high-conversion CTAs and critical status indicators (e.g., "In Stock").
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Contrast and containment must be achieved solely through background shifts. For example, a `surface_container_low` section sitting against a `surface` background provides all the separation the eye needs.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers.
    *   **Level 0 (Background):** `surface` (`#f5faff`)
    *   **Level 1 (Cards):** `surface_container_lowest` (`#ffffff`)
    *   **Level 2 (In-Card Accents):** `surface_container` (`#eaeef3`)
*   **The "Glass & Gradient" Rule:** Floating navigation or featured game cards should utilize a "Glassmorphism" effect: `surface_container_lowest` at 80% opacity with a `backdrop-filter: blur(12px)`.
*   **Signature Textures:** Use subtle linear gradients for CTAs, transitioning from `primary` (`#00668a`) to `primary_container` (`#38bdf8`) at a 135-degree angle to give elements a "premium glow."

## 3. Typography
We use **Plus Jakarta Sans** for its modern, geometric clarity and friendly proportions.

*   **Display Scale:** Use `display-lg` (3.5rem) with `font-weight: 800` for hero headlines. Tighten letter-spacing to `-0.02em` for an authoritative, "editorial" feel.
*   **Headline Scale:** `headline-lg` (2rem) handles major sections. These should be `on_surface` to maintain high readability against the light background.
*   **Body & Utility:** `body-lg` (1rem) is the workhorse. Ensure line-height is set to 1.6 to maintain the "light and airy" brand promise.
*   **Visual Hierarchy:** Use `primary` color for `title-sm` or `label-md` when creating category tags (e.g., "PS5 EXCLUSIVE") to draw the eye without the weight of a heavy button.

## 4. Elevation & Depth
Depth is created through **Tonal Layering**, not shadows alone.

*   **The Layering Principle:** Place a `surface_container_lowest` (#FFFFFF) card on a `surface_container_low` (#eff4f9) section. This "lifts" the content naturally.
*   **Ambient Shadows:** For floating elements (like a "Rent Now" tray), use an extra-diffused shadow: `box-shadow: 0 24px 48px -12px rgba(0, 102, 138, 0.08)`. Note the use of a blue tint (`primary`) in the shadow to mimic the sky-blue ambient light.
*   **The "Ghost Border" Fallback:** If containment is needed for accessibility, use `outline_variant` (#bdc8d1) at 20% opacity. Never use 100% opaque lines.
*   **Asymmetric Breakouts:** Encourage product images (controllers, consoles) to have a 5-10% overflow outside of their containers to break the "box" feel.

## 5. Components

*   **Buttons (Primary):** Use the `secondary_container` (Golden Yellow) for main CTAs. Apply a `xl` (1.5rem) or `full` border radius. Typography must be `label-md` in `on_secondary_container` (#6f5100).
*   **Cards:** Zero borders. Use `surface_container_lowest` (#FFFFFF) with a `xl` (1.5rem) corner radius. Use the Spacing Scale `8` (2rem) for internal padding to ensure the content feels premium.
*   **Chips:** Use `primary_fixed` (#c4e7ff) backgrounds with `on_primary_fixed_variant` text for gaming categories (e.g., "Action," "Multiplayer").
*   **Input Fields:** Use `surface_container_low` as the field background. When focused, the "Ghost Border" should transition to a 2px `primary` border.
*   **Booking Calendar/List:** Forbid divider lines. Separate dates or console listings using the `4` (1rem) spacing token and subtle shifts to `surface_container_highest` for "Selected" states.
*   **Console Status Badge:** A custom component. A small dot using `tertiary` (#855300) to indicate a premium "Pro" rental availability.

## 6. Do's and Don'ts

### Do's
*   **DO** use whitespace as a functional tool. If a section feels crowded, double the spacing token (e.g., move from `12` to `24`).
*   **DO** use high-quality, high-key (bright) photography of PlayStation hardware to match the "Light Mode" aesthetic.
*   **DO** use `primary_container` (#38bdf8) as a background for sections that need to stand out from the white/grey flow.

### Don'ts
*   **DON'T** use pure black (#000000). Always use `on_surface` (#171c20) for text to keep the contrast sophisticated rather than jarring.
*   **DON'T** use 1px dividers or "hr" tags. If you need to separate content, use a background color change or a larger spacing jump.
*   **DON'T** use sharp corners. The gaming experience is friendly; stick to `lg` (1rem) and `xl` (1.5rem) rounding for all containers.
*   **DON'T** use standard dark-grey shadows. Shadows must be large, soft, and tinted with our primary sky blue.