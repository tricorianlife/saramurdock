/* Inline css/site.css into every page's <head> for fast first paint.
   Re-run after editing css/site.css:  node scripts/inline-css.js
   Idempotent: replaces the external <link> on first run, and the
   inlined <style data-site-css> block on subsequent runs. */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
let css = fs.readFileSync(path.join(root, 'css', 'site.css'), 'utf8');
// fonts are referenced as ../fonts in the external file (css/ dir);
// inlined at site root the path must be fonts/.
css = css.replace(/\.\.\/fonts\//g, 'fonts/');
const styleBlock = '<style data-site-css>\n' + css + '\n</style>';

const linkRe = /<link rel="stylesheet" href="css\/site\.css">/;
const styleRe = /<style data-site-css>[\s\S]*?<\/style>/;

let changed = 0;
for (const f of fs.readdirSync(root).filter(f => f.endsWith('.html'))) {
  const p = path.join(root, f);
  let s = fs.readFileSync(p, 'utf8');
  if (styleRe.test(s)) { s = s.replace(styleRe, styleBlock); }
  else if (linkRe.test(s)) { s = s.replace(linkRe, styleBlock); }
  else { continue; }
  fs.writeFileSync(p, s);
  changed++;
}
console.log('inlined site.css into', changed, 'pages');
