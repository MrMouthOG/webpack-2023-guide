import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BundleAnalyzerPlugin}  from 'webpack-bundle-analyzer';
import { Configuration, DefinePlugin } from "webpack";
import { IBuildOptions } from "./types/types";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({ mode, paths, analyzer, platform }: IBuildOptions): Configuration['plugins'] {
  const isProd = mode === 'production';
  const isDev = mode === 'development';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      template: paths.html,
      favicon: path.resolve(paths.public, 'fav.ico'),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin())
    plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }));
    plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
      ],
    }));
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins;
}