module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order',
    'stylelint-config-html/vue'
  ],
  defaultSeverity: 'warning',
  plugins: ['stylelint-order'],
  rules: {},
  overrides: [
    {
      files: ['*.html', '**/*.html'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['*.vue', '**/*.vue'],
    }
  ]
}
