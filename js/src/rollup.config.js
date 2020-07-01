import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json'

export default {
    input: './app.js',
    output: {
        file: '../../scripts/artjam.js',
        format: "cjs"
    },
    plugins: [
        resolve(),
        json({
            // All JSON files will be parsed by default,
            // but you can also specifically include/exclude files
            include: 'node_modules/**',
            exclude: ['node_modules/foo/**', 'node_modules/bar/**'],

            // for tree-shaking, properties will be declared as
            // variables, using either `var` or `const`
            preferConst: true, // Default: false

            // specify indentation for the generated default export —
            // defaults to '\t'
            indent: '  ',

            // ignores indent and generates the smallest code
            compact: true, // Default: false

            // generate a named export for every property of the JSON object
            namedExports: true // Default: true
        }),
        commonjs(),
        babel({ babelHelpers: 'bundled' })
        ,],
}
