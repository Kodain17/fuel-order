import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';


const sass = gulpSass(dartSass);

export const css = () => {
	return app.gulp.src(app.path.src.css, {sourcemaps: true})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: "CSS",
			message: 'Error: <%= error.message %>'
		}))
	)
	.pipe(sass({
		outputStyle: 'expanded'
	}))
    .pipe(autoprefixer({
      cascade: false
    }))
	.pipe(app.gulp.dest(app.path.build.css))
    .pipe(cleanCss({
      debug: true,
      compatibility: '*'
    }, details => {
      console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
    }))
	.pipe(rename({
		extname: '.min.css'
	}))
	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(app.plugins.browsersync.stream());
}