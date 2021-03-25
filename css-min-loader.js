const css = require('css')

module.exports = function (source) {
    const ast = css.parse(source)
    const min = css.stringify(ast, { compress: true, indent: '' })
    return min
}