# Personal Portfolio

A single-page React and Tailwind CSS portfolio modeled on the supplied NEXUS reference. The layout uses condensed typography, black backgrounds, lime accents, a right-aligned hero portrait, and image-led project cards.

## Run locally

Requires Node.js 20.19.x or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To generate and serve the production build, run:

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static host. Navigation uses section anchors and case studies open on the same page.

## Replace the sample content

Edit `src/content.js`. Section titles, menu labels, contact details, and all personal and project content are configured there.

| Content | What to change |
| --- | --- |
| Introduction and About | Set `identity.name`, `mark`, `title`, `tagline`, `bio`, and `background`. |
| Portrait and CV | Add your portrait and PDF under `public/assets/`. Set `identity.heroPortrait` and `heroPortraitAlt` for the hero. Set `portrait` and `portraitAlt` for About, and `cv` for the download. A portrait near 3:4 works well in the hero. |
| Projects | Add or remove objects in `projects`. Give each project a unique `id`, update the case-study fields, and set `sample: false` once real content is ready. Override `cover`, `detailImage`, and `imageAlt` in individual entries as needed. Aim for 16:11 covers and 16:9 detail images. |
| Skills and credentials | Edit the `skills` groups and the `credentials` entries, including each issuer and date. |
| Recognition | Set `enabled: false` on any group that should be hidden. The section and its navigation link disappear when all groups are hidden. |
| Services | Set `services.enabled` to `false` to hide both the section and its navigation link. |
| Contact | Replace `contact.email` and the example URLs in `contact.profiles`. Leave `contact.endpoint` empty to keep demo mode enabled. |

Asset paths are relative to `public/`, for example `assets/my-portrait.jpg`. CSS theme values live in `src/styles.css`.

To enable contact delivery, set `contact.endpoint` to a submission service you control. The form sends a JSON POST with `name`, `email`, and `message`, and treats a 2xx response as success. Configure the service to validate the fields, deliver accepted messages, and allow this site's origin if the endpoint is on another origin. Keep any service credentials on the server.

## Project media

The Dingalan and Baler entries are travel montage samples. STRYVE includes primary and secondary brand concept logos. Mystery Nuggets includes two business/brand video posts. Their images, posters, and H.264 MP4 files live in public/assets/works/.

Edit each project’s media array in src/content.js to add images or videos. Videos use src, poster, and caption. Images use src, alt, and caption. The project dialog pauses its videos when closed.
