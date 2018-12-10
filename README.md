## @chiaweilee/vue-markdown-loader

[![Greenkeeper badge](https://badges.greenkeeper.io/chiaweilee/vue-markdown-loader.svg)](https://greenkeeper.io/)

<a href="https://npmcharts.com/compare/@chiaweilee/vue-markdown-loader?minimal=true"><img src="https://img.shields.io/npm/dm/@chiaweilee/vue-markdown-loader.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/@chiaweilee/vue-markdown-loader"><img src="https://img.shields.io/npm/v/@chiaweilee/vue-markdown-loader.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/@chiaweilee/vue-markdown-loader"><img src="https://img.shields.io/npm/l/@chiaweilee/vue-markdown-loader.svg" alt="License"></a>

### Intro

*a fork of @QingWei-Li/vue-markdown-loader*

support:

- vue template
- custom wrapper
- style, script mixin
- vue-i18n
- vue-i18n-loader
- vue-i18n-filter

*for safety, we do not support style and script writing in .md file. use mixin instead.*

### Demo

See [@chiaweilee/vue-markdown-docs](https://github.com/chiaweilee/vue-markdown-docs)

### Install

`npm install @chiaweilee/vue-markdown-loader`

### Usage

#### Vue-cli 3.x

```JavaScript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('@chiaweilee/vue-markdown-loader')
      .loader('@chiaweilee/vue-markdown-loader')
      .options({
        // options
      })
  }
}
```

[vue.config.js of @chiaweilee/vue-markdown-docs](https://github.com/chiaweilee/vue-markdown-docs/blob/master/vue.config.js)

### Options

+ wrapper

*tag of root wrapper for .md, default: `section`, type: `String`*

```JavaScript
{ wrapper: 'div' }
```

+ scriptMixin

*mixin script into every .md, `option`, type: `String`❕*

```JavaScript
import test from './test'
export default {
    mounted () {
        test()
    }
}
```

+ scriptStyle

*mixin style into every .md, `option`, type: `String`❕*

```css
.wrapper { color: red }
```

+ customTagMixin

*mixin custom tag into every .md, `option`, type: `String`❕*

*custom tag will inject before `scriptMixin` and `scriptStyle`*

```html
<style scope>.wrapper { color: red }</style>
<script>
import test from './test'
export default {
    mounted () {
        test()
    }
}
</script>
```

[loader option of @chiaweilee/vue-markdown-docs](https://github.com/chiaweilee/vue-markdown-docs/blob/master/src/core/loader-option.js)
