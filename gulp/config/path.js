import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		css: `${srcFolder}/scss/style.scss`,
		html: `${srcFolder}/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
		svg: `${srcFolder}/img/*.svg`,
		files: `${srcFolder}/files/**/*.*`,
		svgicons: `${srcFolder}/img/sprite/*.svg`,
	},
	watch: {
		js: `${srcFolder}/**/*.js`,
		css: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
		svgicons: `${srcFolder}/img/sprite/*.svg`,
		files: `${srcFolder}/files/**/*.*`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: ``
}