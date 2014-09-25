#!/usr/bin/env node

'use strict';

var child = require('child_process');
var run = require(__dirname + '/pre-common');
var label = 'pre-push';

function haveCommitsToPush(cb) {
  // todo: find if there are commits to push for any remote name / any branch
  // detect current branch
  child.exec('git rev-parse --abbrev-ref HEAD', function (err, stdout) {
    var branch = 'master'
    if (stdout.trim().length) {
      branch = stdout.trim()
    }
    child.exec('git log origin/' + branch + '..HEAD', function (err, stdout) {
      if (err) {
        console.error(label, 'Failed to check for commits. Cannot run the tests.');
        console.error(label, err);
        return process.exit(1);
      }

      if (!stdout.trim().length) {
        console.log('');
        console.log(label, 'No local commits detected, bailing out.');
        console.log('');
        return process.exit(0);
      }
      console.log(label, "Detected commits:");
      console.log(label, stdout.trim());
      cb();
    });
  })
}

run(label, haveCommitsToPush);
