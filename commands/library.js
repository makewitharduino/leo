var boards = require('../boards'),
  config = require('../lib/config'),
  out = require('../lib/output'),
  LeoDownload = require('../lib/download');

var Program = null;

module.exports.setup = function (program) {
  program
    .command('library')
    .description('Downdload library.')
    .action(run);

  Program = program;
};

function run(env) {
  if (config.ide.path === '') {
    out.error('Unable to find Arduino IDE path. You can set it manually by running `leo config set ide.path \'/some/path\'`');
    process.exit(1);
  }
  var d = new LeoDownload();
  var libraryPath = config.ide.path + '/libraries/';
  d.downloadLibrary(env,libraryPath);
}
