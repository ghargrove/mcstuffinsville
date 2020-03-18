const storybookConfig = {
  addons: ['storybook-addon-styled-component-theme/dist/register'],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader')
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  }
}

export default storybookConfig
