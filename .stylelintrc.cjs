module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-html'
  ],
  defaultSeverity: 'warning',
  plugins: [
    'stylelint-less',
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {},
  overrides: [
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
      rules: {}
    },
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
      rules: {}
    }
  ],
}
