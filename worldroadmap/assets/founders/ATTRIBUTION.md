# Founder Image Assets

This folder keeps founder/team card media local so the WorldRoadmap page does not depend on remote hotlinked images at runtime.

## Local Photo Copies

| File | Person | Source | License / Credit |
| --- | --- | --- | --- |
| `sam-altman.jpg` | Sam Altman | Wikimedia Commons, `Sam Altman November 2022.jpg` | CC BY 2.0, Village Global |
| `greg-brockman.jpg` | Greg Brockman | Wikimedia Commons, `Greg Brockman, 2019.jpg` | CC BY 3.0, Simulation |
| `ilya-sutskever.jpg` | Ilya Sutskever | Wikimedia Commons, `Democratizing Deep Learning with Nervana and Google Brain (15105407149) (cropped).jpg` | CC BY 2.0, Steve Jurvetson |
| `dario-amodei.jpg` | Dario Amodei | Wikimedia Commons, `Dario Amodei at TechCrunch Disrupt 2023 01 (cropped).jpg` | CC BY 2.0, TechCrunch |
| `arthur-mensch.jpg` | Arthur Mensch | Wikimedia Commons, `Arthur Mensch.jpg` | CC BY 4.0, Slush |
| `larry-page-sergey-brin.jpg` | Larry Page & Sergey Brin | Wikimedia Commons, `Google page brin.jpg` | CC BY 2.0, Ehud Kenan |
| `mark-zuckerberg.jpg` | Mark Zuckerberg | Wikimedia Commons, `MarkZuckerberg.jpg` | CC BY 2.5, Elaine Chan and Priscilla Chan |
| `elon-musk.jpg` | Elon Musk | Wikimedia Commons, `Elon Musk Royal Society.jpg` | CC BY-SA 4.0, Duncan.Hull |

## Local Placeholder Portraits

The SVG files are local initials/team placeholders, not photographs. They are used only where a stable, openly reusable portrait was not available during this pass.

`pack-v2/*.svg` was copied from `ai_founder_portrait_pack_v2/assets/placeholders/` and provides person/team-specific safe cards for the full WorldRoadmap company set. The pack metadata intentionally keeps most real photos behind manual review, so these SVGs should stay as the default until a source has been checked for identity, copyright, and reuse terms.

When a real photo is approved later, add it as a local file in this folder, update `worldroadmap/src/data.js`, and add the corresponding source/license row above.
