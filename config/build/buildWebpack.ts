import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { IBuildOptions } from "./types/types";

export function buildWebpack(options: IBuildOptions): webpack.Configuration {
  const {mode, paths} = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: {
      runtimeChunk: 'single',
    },
    devtool: isDev ? 'inline-source-map' : 'source-map',
  }

}