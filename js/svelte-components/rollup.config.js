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
		compilerOptions: {
		  generate: "dom", // ✅ Ensure it's "dom" if running in browser
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
	  commonjs(), // ✅ Process CommonJS after resolving dependencies
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
  