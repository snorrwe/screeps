module.exports = {
    entry: {
        main: "./src/main.ts"
    },
    output: {
        filename: "main.js",
        path: __dirname + "/dist/"
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    }
};
