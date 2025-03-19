import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import postcssPresetEnv from "postcss-preset-env";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "./app.js",
  output: {
    file: "../../scripts/artjam.js",
    sourcemap: true,
    format: "iife",
    name: "app",
  },
  plugins: [
    postcss({
      plugins: [
        postcssPresetEnv({
          autoprefixer: { grid: true },
          stage: 3,
          features: {
            "nesting-rules": true,
          },
        }),
      ],
    }),
    svelte({
      extensions: [".svelte"],
      include: "**/*.svelte",
      preprocess: sveltePreprocess({
        postcss: true,
      }),
      emitCss: false,
      onwarn: (warning, handler) => {
        if (warning.code === "a11y-distracting-elements") return;
        handler(warning);
      },
      compilerOptions: {
        generate: "ssr",
        hydratable: true,
        customElement: false,
      },
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
      exportConditions: ["svelte", "module", "import"],
      extensions: [".mjs", ".js", ".json", ".svelte"],
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".mjs", ".html", ".svelte"],
      exclude: ["node_modules/**"],
    }),
    json({
      include: "node_modules/**",
      exclude: ["node_modules/foo/**", "node_modules/bar/**"],
      preferConst: true,
      indent: "  ",
      compact: true,
      namedExports: true,
    }),
    production && terser(),
  ],
};