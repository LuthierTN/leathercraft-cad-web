# Third-Party Notices

LeatherCraft CAD (browser version) uses the following third-party software.
This file lists each dependency, its license, and the upstream source.
Required attribution text is included verbatim where the license requires it.

---

## earcut

Used by `js/io/stlExtrude.js` for polygon-with-holes triangulation.
Loaded at runtime from the esm.sh CDN.

- **Source**: <https://github.com/mapbox/earcut>
- **NPM**: <https://www.npmjs.com/package/earcut>
- **License**: ISC

---

## heic-to (libheif)

Used by `js/cloud/photos.js` to convert HEIC / HEIF photos (iPhone) to JPEG in
browsers that cannot decode them. Loaded unmodified at runtime from the jsDelivr
CDN (the `csp` build) the first time such a photo is picked; nothing is bundled.

- **Source**: <https://github.com/hoppergee/heic-to>
- **NPM**: <https://www.npmjs.com/package/heic-to>
- **License**: LGPL-3.0 (heic-to and the libheif it wraps, <https://github.com/strukturag/libheif>)

---

## three.js

Used by `js/ui/STLExportModal.js` for the 3D STL preview. Loaded at
runtime from the esm.sh CDN.

- **Source**: <https://github.com/mrdoob/three.js>
- **License**: MIT
