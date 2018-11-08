var loaderUtils = require('loader-utils')
var hljs = require('highlight.js')
var cheerio = require('cheerio')
var markdown = require('markdown-it')

/**
 * `<pre></pre>` => `<pre v-pre></pre>`
 * `<code></code>` => `<code v-pre></code>`
 * @param  {string} str
 * @return {string}
 */
var addVuePreviewAttr = function (str) {
  return str.replace(/(<pre|<code)/g, '$1 v-pre')
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
var renderHighlight = function (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }

  return hljs.highlight(lang, str, true).value
}

module.exports = function (source) {
  this.cacheable && this.cacheable()

  var opts = loaderUtils.getOptions(this) || {}

  var wrapper = opts.wrapper || 'section'

  var parser = markdown('default', {
    html: true,
    highlight: renderHighlight,
    wrapper: wrapper
  })

  var renderVueTemplate = function (html, wrapper) {
    var $ = cheerio.load(html, {
      decodeEntities: false,
      lowerCaseAttributeNames: false,
      lowerCaseTags: false
    })

    var output = {
      i18n: $.html($('i18n').first())
    }

    $('style').remove()
    $('i18n').remove()
    $('script').remove()

    var customTag = output.i18n ? output.i18n : ''

    return `<template><${wrapper}>${$.html()}</${wrapper}></template>${customTag}<script>${opts.script || ''}</script><style>${opts.style || ''}</style>`
  }

  /**
   * override default parser rules by adding v-pre attribute on 'code' and 'pre' tags
   * @param {Array<string>} rules rules to override
   */
  function overrideParserRules (rules) {
    if (parser && parser.renderer && parser.renderer.rules) {
      var parserRules = parser.renderer.rules
      rules.forEach(function (rule) {
        if (parserRules && parserRules[rule]) {
          var defaultRule = parserRules[rule]
          parserRules[rule] = function () {
            return addVuePreviewAttr(defaultRule.apply(this, arguments))
          }
        }
      })
    }
  }

  overrideParserRules(['code_inline', 'code_block', 'fence'])

  source = source.replace(/@/g, '__at__')

  var content = parser.render(source).replace(/__at__/g, '@')

  return renderVueTemplate(content, wrapper)
}
