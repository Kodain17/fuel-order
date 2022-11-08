 import svgSprites from 'gulp-svg-sprite'

 export const svgSprite = () => {
 	return app.gulp.src(app.path.src.svgicons)
 		.pipe(app.plugins.plumber(
 			app.plugins.notify.onError({
 				title: 'svgSprite',
 				message: 'Error: <%=error.message %>'
 			}))
 		)
 		.pipe(svgSprites({
 			mode: {
 				stack: {
 					sprite: `../sprite.svg`,
 					example: true
 				}
 			}
 		}))
 		.pipe(app.gulp.dest(app.path.build.images))
 		.pipe(app.plugins.browsersync.stream());
 }