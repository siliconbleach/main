import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json'
import svelte from 'rollup-plugin-svelte';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
const production = !process.env.ROLLUP_WATCH;

export default {
    input: './app.js',
    output: {
        file: '../../scripts/artjam.js',
        sourcemap: true,
        format: "iife"
        name: 'app'
    },

    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [

        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file - better for performance
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        commonjs(),
        babel({ babelHelpers: 'bundled' }),
        json({
            // All JSON files will be parsed by default,
            // but you can also specifically include/exclude files
            include: 'node_modules/**',
            exclude: ['node_modules/foo/**', 'node_modules/bar/**'],

            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst: true, // Default: false

            indent: '  ',
            // specify indentation for the generated default export —
            // defaults to '\t'

            // ignores indent and generates the smallest code
            compact: true, // Default: false

            // generate a named export for every property of the JSON object
            namedExports: true // Default: true
        }),
        production && terser()
    ],
}
