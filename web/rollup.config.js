import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';

function glsl() {
    return {
        transform(code, id) {
            if (/\.glsl$/.test(id) === false) return;

            var transformedCode = 'export default ' + JSON.stringify(
                code
                    .replace(/[ \t]*\/\/.*\n/g, '') // remove //
                    .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '') // remove /* */
                    .replace(/\n{2,}/g, '\n') // # \n+ to \n
            ) + ';';
            return {
                code: transformedCode,
                map: {
                    mappings: ''
                }
            };
        }
    };
}

export default {
    input: 'src/index.js',
    output: {
        indent: '\t',
        format: 'umd',
        name: 'Shadow',
        file: '../build/public/build/ShadowEditor.js'
    },
    treeshake: true,
    external: [],
    plugins: [
        glsl(),
        resolve(),
        commonjs({
            exclude: [
                'assets/**'
            ]
        }),
        replace({
            'process.env.NODE_ENV': '"development"' // production
        }),
        postcss({
            extract: true
        }),
        babel({
            exclude: 'node_modules/**'
        })
    ]
};
