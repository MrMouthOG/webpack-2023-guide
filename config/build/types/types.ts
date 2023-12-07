export interface IBuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  public: string;
}

export type TBuildMode = 'production' | 'development';
export type TBuildPlatform = 'desktop' | 'mobile';

export interface IBuildOptions {
  port: number;
  paths: IBuildPaths;
  mode: TBuildMode;
  analyzer?: boolean;
  platform: TBuildPlatform;
}