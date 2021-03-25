const NAME = 'CssMinPlugin'

class CssMinPlugin {
    apply(compiler) {
        // console.log(1111, compiler.hooks)
        // compiler.hooks.done.tap(NAME, (stats) => {
        //     console.log('Hello World!', stats);
        // });
        // compiler.hooks.compilation.tap(NAME, (compilation) => {
        //     console.log(22222, compilation)
        //     // Now we can tap into various hooks available through compilation
        //     compilation.hooks.optimize.tap(NAME, (...args) => {
        //         console.log('Assets are being optimized.', args);
        //     });
        // });
        // compiler.hooks.run.tap(NAME, (stats) => {
        //     console.log(stats, 'Hello World!');
        // });

        // compiler.hooks.beforeCompile.tapAsync(NAME, (params, callback) => {
        //     // console.log(args)
        //     // const { compilation } = stats
        //     // const { outputOptions, assetsInfo } = compilation
        //     // console.log(33333, compilation)
        //     console.log(11111, params)
        //     // callback()
        // })

        // compiler.hooks.run.tap(NAME, (stats) => {
        //     console.log(stats)
        // })

        compiler.hooks.compilation.tap(NAME, (compilation) => {
            // console.log(1111, Object.keys(compilation.hooks).sort((a, b) => a.localeCompare(b)))
            compilation.plugin('optimize', data => {
                console.log(3333, data)
            })
            // console.log(compilation.plugin, 222)
        })
    }
}

module.exports = CssMinPlugin;