import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
    input: './app.js',
    output: {
        file: '../../scripts/artjam.js',
        format: "cjs"
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
        ,],
}
