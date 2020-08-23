const production = !process.env.ROLLUP_WATCH;
const purgecss = require("@fullhuman/postcss-purgecss");

export default {
	plugins: [
		require("postcss-import")(),
		require("tailwindcss"),
		require("autoprefixer"),
		require("postcss-nesting"),
		// Only purge css on production
		production &&
		purgecss({
			content: ["./**/*.html", "./**/*.svelte"],
			defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
		})
	]
}