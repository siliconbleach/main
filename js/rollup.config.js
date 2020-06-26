export default {
    input: 'src/app.js',
    output: {
        file: '../scripts/artjam.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
}
