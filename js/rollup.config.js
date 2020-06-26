import resolve from './src/node_modules/@rollup/plugin-node-resolve';
import babel from './src/node_modules/@rollup/plugin-babel';

export default {
    input: 'src/app.js',
    output: {
        file: '../scripts/artjam.js',
        format: "cjs"
    },
    plugins: [
        resolve(),
        babel({ babelHelpers: 'bundled' })
    ]
}
