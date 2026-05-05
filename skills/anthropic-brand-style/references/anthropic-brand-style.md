# Anthropic / Claude-Like Style Reference

This reference converts Anthropic's public `brand-guidelines` skill into Codex-oriented design guidance for building and reviewing interfaces. It is a style adaptation guide, not permission to copy Claude trademarks, logos, or proprietary screens.

Source: <https://github.com/anthropics/skills/blob/main/skills/brand-guidelines/SKILL.md>  
License: Apache License 2.0. See `../LICENSE.txt`.

## Core Palette

Use these tokens as the default Claude-like base:

```css
:root {
  --anthropic-dark: #141413;
  --anthropic-light: #faf9f5;
  --anthropic-mid-gray: #b0aea5;
  --anthropic-light-gray: #e8e6dc;
  --anthropic-orange: #d97757;
  --anthropic-blue: #6a9bcc;
  --anthropic-green: #788c5d;
}
```

Recommended app-level extensions:

```css
:root {
  --surface: #ffffff;
  --surface-warm: #f3f1e8;
  --border: #e8e6dc;
  --border-strong: #d8d4ca;
  --text: #141413;
  --text-muted: #6f6b63;
  --accent: #d97757;
  --accent-hover: #c96442;
}
```

### Color Usage

- Use `#faf9f5` for the main background.
- Use `#ffffff` or `#f3f1e8` for raised surfaces, panels, and code containers.
- Use `#141413` for primary text and primary filled buttons.
- Use `#d97757` for brand marks, selected states, small highlights, and key status accents.
- Use `#e8e6dc` for borders and separators.
- Use `#6a9bcc` and `#788c5d` sparingly for secondary informational or success states.

Avoid:

- Purple-blue gradients.
- Cold blue-black dashboards.
- Neon glows.
- Glassmorphism.
- High-saturation red/green diff colors.
- Large decorative blobs, bokeh, or orb backgrounds.

## Typography

Anthropic's public guidance uses Poppins for headings and Lora for body text, with Arial and Georgia fallbacks. For product UIs, adapt that principle pragmatically:

- Use a system sans stack for dense interface text.
- Use Georgia, Lora, or a similar serif for brand names, large empty-state headings, and editorial hero moments.
- Use monospace fonts for code, diffs, paths, command output, JSON, and tokens.
- Do not scale font sizes with viewport width.
- Do not use negative letter spacing.

Suggested CSS stacks:

```css
--font-ui: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-serif: Georgia, "Times New Roman", serif;
--font-mono: "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
```

## Component Guidance

### Panels

- Use 1px warm gray borders.
- Use subtle shadows only when needed to separate layers.
- Keep panel and card radius at 8px or less in tool UIs.
- Avoid nested cards. Use bands, panels, dividers, and simple groups.

### Buttons

- Primary: near-black fill, white text.
- Secondary: white or warm surface fill, warm gray border.
- Accent: clay orange only when a special emphasis is justified.
- Icon buttons: small, square, thin-line icons, clear hover states.

### Badges and Status

- Use small text, light surfaces, and thin borders.
- Avoid large colored capsules.
- Use orange for active model or focus state, green for safe/success, blue for info.

### Code and Diff Areas

- Use warm white or warm gray surfaces.
- Use monospace text.
- For diffs, use low-saturation green for additions and low-saturation clay/red for deletions.
- Keep line height comfortable enough for scanning.

## Layout Guidance

For tools and coding products:

- Start with the usable workspace, not a marketing hero.
- Use a calm top bar, left navigation/file tree, central work area, and right or bottom assistant panel.
- Keep the primary action visually obvious but not loud.
- Make state visible: selected file, model mode, validation, pending write, snapshot, undo availability.
- Leave whitespace around groups, but preserve information density.

For landing or editorial pages:

- Use warm off-white background and a strong typographic hierarchy.
- Use serif display type more freely than in tool surfaces.
- Keep visual elements restrained and content-led.
- Do not create fake Claude logos or copied product screenshots.

## Review Checklist

Before finalizing, verify:

- Background reads warm, not cold white.
- Text is near-black and easy to scan.
- Orange is used as an accent, not the dominant page color.
- Borders are quiet and warm gray.
- The UI is not dominated by purple, slate blue, beige monotone, or heavy gradients.
- Tool screens are work-first, not landing-page-first.
- Buttons, file paths, code, and badges do not overflow on expected viewport sizes.
- The design evokes Claude's calm editorial feel without copying protected brand assets.

