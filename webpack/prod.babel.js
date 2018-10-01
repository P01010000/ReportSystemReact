import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import merge from 'webpack-merge';
import common from './common';

const ROOT_PATH = path.resolve('./');
const serverroot = '//tappqa/training/2018/hn/ReportSystemReact/prod';

export default merge(
    common(serverroot),
    {
        mode: 'production',
        devtool: 'hidden-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(ROOT_PATH, 'src/index.html')
            }),
            new webpack.DefinePlugin({
                __DEV__: false,
                __STAGING__: false,
                __PROD__: true,
            }),
        ]
    }
);
