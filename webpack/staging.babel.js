import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import common from './common';

const ROOT_PATH = path.resolve('./');
const serverroot = '//tappqa/training/2018/hn/ReportSystemReact/qa';

export default merge(
    common(serverroot),
    {
        mode: 'production',
        devtool: 'inline-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(ROOT_PATH, 'src/index.html')
            }),
            new webpack.DefinePlugin({
                __DEV__: false,
                __STAGING__: true,
                __PROD__: false,
            }),
        ]
    }
);
