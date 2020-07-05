module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'wildcard',
      {
        noModifyCase: true,
        exts: ['js', 'es6', 'es', 'jsx', 'javascript', 'vue']
      }
    ]
  ]
};
