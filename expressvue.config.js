const path = require("path");

module.exports = {
    pagesPath: path.normalize(path.join(__dirname, "views")),
    webpack: {
        server: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
        },
        client: {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: "babel-loader",
                        options: {
                            babelrc: false,
                            presets: ["@babel/preset-env"],
                        },
                    },
                ],
            },
        },
    },
    data: {
        foo: true,
        globalData: true,
    },
    head: {
        title: 'It will be a pleasure',
        // Meta tags
        metas: [
            {name: 'application-name', content: 'Name of my application'},
            {name: 'description', content: 'A description of the page', id: 'desc'}, // id to replace intead of create element
            // ...
            // Twitter
            {name: 'twitter:title', content: 'Content Title'},
            // ...
            // Facebook / Open Graph
            {property: 'fb:app_id', content: '123456789'},
            {property: 'og:title', content: 'Content Title'},
            // ...
            // Rel
            {rel: 'icon', type: 'image/png', href: '/assets/favicons/favicon-32x32.png', sizes: '32x32'}
            // Generic rel for things like icons and stuff
        ],
        // Scripts
        scripts: [
            // { src: '/assets/scripts/hammer.min.js' },
            // { src: '/assets/scripts/vue-touch.min.js', charset: 'utf-8' },


            {src: "//unpkg.com/vue@latest/dist/vue.min.js", charset: 'utf-8'},
            {src: "//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.js", charset: 'utf-8'},
            {src: "//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue-icons.min.js", charset: 'utf-8'},
            // Note with Scripts [charset] is optional defaults to utf-8
            // ...
        ],
        // Styles
        styles: [
            // { style: '/assets/rendered/style.css' },
            // { style: '/assets/rendered/style.css', type: 'text/css' }
            {style: "//unpkg.com/bootstrap/dist/css/bootstrap.min.css", type: 'text/css',},
            {style: "//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css", type: 'text/css',}
            // Note with Styles, [type] is optional...
            // ...
        ],
    },
};