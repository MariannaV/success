const path = require('path'),
  root = path.resolve(__dirname, '../'),
  isDev = process.env.NODE_ENV === 'development',
  isProd = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { browsers: require(`${root}/package.json`).browserslist },
        /*modules: false,
        loose: true,
        spec: true,
        useBuiltIns: 'usage',
        corejs: 3,
        forceAllTransforms: true,
        debug: false,*/
      },
    ],
  ],
  plugins: [
    //------------------------------------------STAGE 0------------------------------------------
    /* obj::func => func.bind(obj)                ::obj.func      => obj.func.bind(obj)
       obj::func(val) => func.call(obj, val)      ::obj.func(val) => obj.func.call(obj, val) */
    // 'module:@babel/plugin-proposal-function-bind',
    //------------------------------------------STAGE 1------------------------------------------
    /* obj?.a?.b?.c  => c   || undefined
       obj?.a?.c?.() => c() || undefined */
    // ["@babel/plugin-proposal-optional-chaining", { loose: false }],
    /* obj.a ?? 0 is ideal check on null || undefined */
    // ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }]
    // ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }], //ESLint has a problem
    /* not supported by TypeScript
      '@babel/plugin-proposal-export-default-from', '@babel/plugin-proposal-export-namespace-from',*/
    /* a ||= b  => a || (a = b), and also: a &&= b, a ??= b
      '@babel/plugin-proposal-logical-assignment-operators', */
    //------------------------------------------STAGE 2------------------------------------------
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    /* function f(a = throw new Error('a - required'), b) { const v = a > 10 || throw new Error("Invalid value") }
       f()  //error, a - required      f(5) // error, invalid value */
    // '@babel/plugin-proposal-throw-expressions',
    /* for generators: '@babel/plugin-proposal-function-sent', */
  ].filter(Boolean),
}
