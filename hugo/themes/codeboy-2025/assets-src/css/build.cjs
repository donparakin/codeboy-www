//======================================================================
// build.cjs:
//  - Call `sass` to compile all *.scss and *.css files in `src` to `dest`
//    excluding _*.scss or _*.css files (with underscore prefix).
//  - Command line options:
//      --dev           - style is expanded (else compressed)
//      --watch         - use sass's --watch option
//  - Sass CLI: https://sass-lang.com/documentation/cli/dart-sass/
//======================================================================
const { spawn } = require("node:child_process");

const src = "themes/codeboy-2025/assets-src/css";
const dest = "themes/codeboy-2025/assets/built";

const args = [];
args.push("node_modules/sass/sass.js");
args.push("--load-path=node_modules");
args.push("--quiet-deps");
args.push("--silence-deprecation=import");
if (process.argv.includes("--watch")) {
    args.push("--style=expanded");
    args.push("--watch");
    args.push("--error-css");
} else if (process.argv.includes("--dev")) {
    args.push("--style=expanded");
    args.push("--error-css");
} else {
    args.push("--style=compressed");
}
args.push(`${src}:${dest}`);

const proc = spawn("node", args, {stdio: 'inherit'});
