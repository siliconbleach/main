import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/app.js',
    output: {
        file: '../scripts/artjam.js',
        format: "esm"
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
}
