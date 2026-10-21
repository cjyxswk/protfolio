# AI Image To Video — visual system source notes

Source: https://aiimagetovideo.pro/ (public HTML and linked product CSS, inspected 2026-10-19).

Observed in the live product:
- Montserrat: Regular 400, Medium 500, Semibold 600, Bold 700, with system sans-serif fallbacks.
- Primary color: #B8F807; page background: #000000; upload and Prompt surfaces: #252525; auxiliary text: #CCCCCC; main text: #FFFFFF.
- Generate/Create action: 16 px, weight 600, height 46 px, radius 10 px.
- Reference image title: 15 px, weight 500, bottom margin 12 px.
- Configuration options and tips: 14 px, weight 400.
- Reference image count: 13 px, weight 400. Add Effects and other compact controls use 12 px.

Implementation uses locally hosted copies of the four Montserrat WOFF2 files exposed at the live product's /fonts/ paths. Montserrat is an open-source font under the SIL Open Font License.

The 32 / 28 / 24 / 20 / 16 px heading hierarchy is a proposed extension for this case study, not a claim that every heading in the live product follows those exact values. Font hero, floating labels, grid palette, and component specimen are presentation layouts inspired by the user-provided reference, not screenshots of the product. The specimen is decorative and does not submit a generation request.
