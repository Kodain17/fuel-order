import gulp from 'gulp';
import {path} from './gulp/config/path.js';
import {plugins} from './gulp/config/plugins.js';

global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins
}

import {copy} from './gulp/task/copy.js';
import {reset} from './gulp/task/reset.js';
import {html} from './gulp/task/html.js';
import {server} from './gulp/task/server.js';
import {css} from './gulp/task/css.js';
import {js} from './gulp/task/js.js';
import {images} from './gulp/task/images.js';
import {otfToTtf, ttfToWoff, fontsStyle} from './gulp/task/fonts.js';
import {svgSprite} from './gulp/task/svgSprite.js';

function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.svgicons, svgSprite);
	gulp.watch(path.watch.images, images);
};
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTask =  gulp.series(fonts, gulp.parallel(copy, html, css, svgSprite, js, images));

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));

gulp.task('default', dev);