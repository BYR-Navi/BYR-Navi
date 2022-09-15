[![Build Status](https://img.shields.io/travis/com/BYR-Navi/BYR-Navi?logo=travisci)][travis-ci]
[![Website](https://img.shields.io/website?url=http%3A%2F%2Fbyr-navi.com&logo=linode)][website]
[![License](https://img.shields.io/github/license/BYR-Navi/BYR-Navi)][license]
[![Last Commit](https://img.shields.io/github/last-commit/BYR-Navi/BYR-Navi?logo=github)][commit]
[![Donate](https://img.shields.io/badge/Donate-Coffee-A5673F?logo=buymeacoffee)][donate]

# <img height="32" src="https://byr-navi.com/images/logo-dark.svg" alt="Icon" /> BYR-Navi
A Light-Weight and Configurable Navigation [Website][website] Framework (for BYR)

## :triangular_ruler: Design Philosophy
This project is a [Jekyll][jekyll]-powered website, which is built based on [Fomantic UI][fomantic] web framework, and deployed **previously** using [GitHub Pages][github-pages] (while currently running on a [Linode][linode] VPS).

The whole project is designed and built with high flexibility of configuration and customization.
You can either configure it by modifying the `_config.yml` file or customize it by replacing the content of the `*.yml` files in the `_data` folder with your own data.

## :book: A Tiny Tutorial
There is **no easy way for beginners** without essential background knowledge.
To be efficient, the best way to understand this project is to start with the Jekyll&rsquo;s [docs][jekyll-doc] and Fomantic UI&rsquo;s [docs][fomantic-doc].

Before you start, you should have some basic understanding of the following:

- <img height="16" src="https://unpkg.com/simple-icons/icons/html5.svg" alt="Icon" /> HTML
- <img height="16" src="https://unpkg.com/simple-icons/icons/css3.svg" alt="Icon" /> CSS
- <img height="16" src="https://unpkg.com/simple-icons/icons/javascript.svg" alt="Icon" /> JavaScript
- <img height="16" src="https://unpkg.com/simple-icons/icons/jquery.svg" alt="Icon" /> jQuery
- YAML format
- [Liquid][liquid] (Template Engine by <img height="16" src="https://unpkg.com/simple-icons/icons/shopify.svg" alt="Icon" /> Shopify)
- <img height="16" src="https://unpkg.com/simple-icons/icons/ruby.svg" alt="Icon" /> Ruby
- <img height="16" src="https://unpkg.com/simple-icons/icons/linux.svg" alt="Icon" /> UNIX/Linux Shell Script

### Quick Start

1. Install a full [Ruby development environment][jekyll-installation].

2. Install Jekyll and [bundler][jekyll-ruby-101-bundler] [gems][jekyll-ruby-101-gems].

```sh
gem install jekyll bundler
```

3. Clone the project from GitHub.

```sh
git clone https://github.com/BYR-Navi/BYR-Navi.git
```

4. Change into the project directory.

```sh
cd BYR-Navi
```

5. Install required gems in the `Gemfile` using Bundler.

```sh
bundle install
```

6. Build the site and make it available on a local server.

```sh
bundle exec jekyll serve
```

7. Now browse to [http://localhost:4000][localhost-4000].

## :construction: Deployment

### GitHub Pages (Recommended)
Sites on GitHub Pages are powered by Jekyll behind the scenes, so if you&rsquo;re looking for a zero-hassle, zero-cost solution, GitHub Pages are a great way to [host your Jekyll-powered website for free][jekyll-gihub-pages].

### Manual Deployment
Jekyll generates your static site to the `_site` directory by default. You can transfer the contents of this directory to almost any hosting provider to get your site live.
[Here][jekyll-manual-deployment] are some manual ways of achieving this.

## :hearts: Share the Love
I&rsquo;ve put a lot of time and effort into making **BYR-Navi** awesome.
If you love it, you can buy me a coffee.
Every cup helps!
I promise it will be a good investment.

Donate [here][donate].

## :rocket: Powered by
- [Fomantic UI][fomantic]
- <img height="16" src="https://unpkg.com/simple-icons/icons/jquery.svg" alt="Icon" /> [jQuery][jquery]
- <img height="16" src="https://unpkg.com/simple-icons/icons/shieldsdotio.svg" alt="Icon" /> [Shields.io][shields]
- [Day.js][day]
- [CountUp.js][countup]
- [jQuery.countdown][countdown]
- [JavaScript Cookie][js-cookie]
- [url.js][js-url]
- [UNPKG][unpkg]
- [Hitokoto][hitokoto]
- <img height="16" src="https://unpkg.com/simple-icons/icons/apacheecharts.svg" alt="Icon" /> [ECharts][echarts]
- <img height="16" src="https://unpkg.com/simple-icons/icons/matomo.svg" alt="Icon" /> [Matomo][matomo]
- [GeoIP][geoip]
- <img height="16" src="https://unpkg.com/simple-icons/icons/jekyll.svg" alt="Icon" /> [Jekyll][jekyll]
- <img height="16" src="https://unpkg.com/simple-icons/icons/letsencrypt.svg" alt="Icon" /> [Let&rsquo;s Encrypt][letsencrypt]
- <img height="16" src="https://unpkg.com/simple-icons/icons/linode.svg" alt="Icon" /> [Linode][linode]

## :copyright: License
[MIT License][license]

[travis-ci]: https://app.travis-ci.com/BYR-Navi/BYR-Navi "Travis CI"
[website]: https://byr-navi.com/ "Website"
[license]: https://github.com/BYR-Navi/BYR-Navi/blob/master/LICENSE "License"
[commit]: https://github.com/BYR-Navi/BYR-Navi/commits/master "Last Commit"
[donate]: https://byr-navi.com/donate/ "Donate"

[fomantic]: https://fomantic-ui.com/ "Fomantic UI"
[fomantic-doc]: https://fomantic-ui.com/introduction/getting-started.html "Fomantic UI Docs"
[jquery]: https://jquery.com/ "jQuery"
[shields]: https://shields.io/ "Shields.io"
[day]: https://github.com/iamkun/dayjs "Day.js"
[countup]: https://inorganik.github.io/countUp.js/ "CountUp.js"
[countdown]: https://hilios.github.io/jQuery.countdown/ "The Final Countdown plugin for jQuery"
[js-cookie]: https://github.com/js-cookie/js-cookie "JavaScript Cookie"
[js-url]: https://github.com/websanova/js-url "url.js"
[unpkg]: https://unpkg.com/ "UNPKG"
[hitokoto]: https://hitokoto.cn/api "Hitokoto"
[echarts]: https://echarts.apache.org/ "ECharts"
[matomo]: https://matomo.org/ "Matomo"
[geoip]: https://www.maxmind.com/ "GeoIP"
[jekyll]: https://jekyllrb.com/ "Jekyll"
[jekyll-doc]: https://jekyllrb.com/docs/home/ "Jekyll Docs"
[jekyll-installation]: https://jekyllrb.com/docs/installation/ "Jekyll Installation"
[jekyll-gihub-pages]: https://jekyllrb.com/docs/github-pages/ "Jekyll GitHub Pages"
[jekyll-manual-deployment]: https://jekyllrb.com/docs/deployment/manual/ "Jekyll Manual Deployment"
[jekyll-ruby-101-gems]: https://jekyllrb.com/docs/ruby-101/#gems "Jekyll Ruby 101 Gems"
[jekyll-ruby-101-bundler]: https://jekyllrb.com/docs/ruby-101/#bundler "Jekyll Ruby 101 Bundler"
[liquid]: https://shopify.github.io/liquid/ "Liquid"
[localhost-4000]: http://localhost:4000 "Local Host (Port: 4000)"
[github-pages]: https://pages.github.com/ "GitHub Pages"
[letsencrypt]: https://letsencrypt.org/ "Let&rsquo;s Encrypt"
[linode]: https://www.linode.com/ "Linode"
