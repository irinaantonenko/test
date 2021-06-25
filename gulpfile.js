const { src, dest, parallel, series, watch } = require('gulp'),
browserSync = require('browser-sync').create(),
sourcemaps = require('gulp-sourcemap');
	sass = require('gulp-sass')(require('sass'));
	sass.copiler = require('node-sass');
function styles() {
	return src('./src/scss/**/*.scss')
	.pipe(sourcemap.init())
	.pipe(autoprefixer({overrideBrowserslist: ['last 10 versions'], grid: true}))
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemap.write())
	.pipe(dest('./src/css'))
	.pipe(browserSync.stream());
}
function browsersync(){
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
}
function startwatch(){
	watch('./src/scss/**/*.scss', styles)
	watch('*.html').on('change', browserSync.reload)
}
exports.styles = styles;
exports.browsersync = browsersync;
exports.default = parallel(styles, browsersync, startwatch)
