# Personal Homepage

[Link(https://dongjun.info)](https://dongjun.info)


## Stack

- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [Chakra UI](https://chakra-ui.com/) - A simple, modular and accessible component library for React
- [Three.js](https://threejs.org/) - 3D library for JavaScript
- [Framer Motion](https://www.framer.com/motion/) - An animation library for React
- [Vercel](https://vercel.com/) - Cloud platform to host website

## Install
```
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion next react react-dom
npm i -D eslint eslint-next prettier
```

## 3D workspace model

`public/dj_park.glb` follows the supplied `dog.glb` workspace reference. A standing
voxel miniature pinscher works behind the desk, with no person or chair. A custom
slim black MacBook-style laptop has a broad trackpad, a bright contrasting waveform
on its lid and a yellow `★ + 1` badge above it. A notebook and writing tools sit on
the right. The original desk, plant, mug, standing body pose and transparent ground
shadow are retained from the supplied reference. The breed details, laptop geometry,
waveform, notification and stationery are edited.

Regenerate the model with `node scripts/create-workspace-model.cjs`. Its inputs are
`scripts/reference-model.json` and `scripts/reference-assets/dog-original.glb`.
The generated model embeds its WebP textures and needs a WebP-capable browser;
it does not require a Draco decoder or external texture downloads.
For a standalone preview, run `node scripts/preview-model.cjs` and open
`http://127.0.0.1:4318`. The preview loads Three.js 0.148.0 from jsDelivr.
Drag to orbit, scroll to zoom, or save a PNG to `doc/workspace-preview.png`.
Use the default view to see the miniature pinscher and laptop lid, or select
`반대쪽 보기` to inspect the opposite side.
The preview and homepage share camera and lighting in `public/workspace-view.js`.

## Project structure

```
$PROJECT_ROOT
│   # Page files
├── pages
│   # React component files
├── components
│   # Non-react modules
├── lib
│   # Static files for images and 3d model file
└── public
```

## License

MIT License.

You can create your own homepage for free without notifying me by forking this project under the following conditions:

- Add a link to [my homepage](https://dongjun.info/) and [Takuya's website](https://www.craftz.dog/)
- Do not use the 3D model

Check out [LICENSE](./LICENSE) for more detail.

## Acknowledgement
This website is built based on the [Takuya's website](https://www.craftz.dog/).
Highly appreciate for his great work!
