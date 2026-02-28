import svgLoader from 'vite-svg-loader'

export default {
  base: '/my-slides/',
  plugins: [
    svgLoader(),
    // {
    //   name: 'replace-presenter-image-path',
    //   apply: 'build',
    //   transform(code, id) {
    //     if (!id.includes('slides.md')) return

    //     return code.replace(
    //       /presenterImage:\s*['"]\/my-pic\.jpg['"]/g,
    //       "presenterImage: '/my-slides/my-pic.jpg'"
    //     )
    //   }
    // }
  ],
}
