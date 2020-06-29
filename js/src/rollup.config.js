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
    ]

    {
    id: 1,
        nickname: 'drunkteemoorgy',
            name: 'DrunkTeemoOrgy',
                voterStatus: 1,
                    votes: {
        215: {
            id: 6,
                user_id: 7
        }
    }
}
}
