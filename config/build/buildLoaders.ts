import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { IBuildOptions } from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const babelLoader = buildBabelLoader(options);

  const svgLoader = {
    test: /\.svg$/,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true}}],
  }

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      }
    },
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
      "sass-loader",
    ],
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      { 
        loader: 'ts-loader', 
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        }
      }
    ],
    exclude: /node_modules/,
  }

  const cssLoader =     {
    test: /\.css$/i,
    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
  }

  return [
    scssLoader, 
    // tsLoader, 
    cssLoader, 
    assetsLoader, 
    svgLoader,
    babelLoader,
  ]
}