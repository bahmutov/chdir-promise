require('lazy-ass');
var check = require('check-more-types');
var folders = require('..');

la(check.object(folders), 'expected folders to be an object', folders);
la(check.fn(folders.to), 'expected folders.to to be a function', folders);

folders.to(__dirname)
  .then(folders.comeBack)
  .done();
