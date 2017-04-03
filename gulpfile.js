const gulp = require('gulp');
const browserSync = require('browser-sync');

// Load tasks
const tasks = require('./gulptasks');
for (let taskKey in tasks) {
  if (tasks.hasOwnProperty(taskKey)) {
    gulp.task(taskKey, tasks[taskKey]);
  }
}

// Default task
gulp.task('default', ['browser-sync', 'styles', 'javascript'], function() {
  gulp.watch('./src/js/*.js', ['javascript', browserSync.reload]);
  gulp.watch('./src/scss/*.scss', ['styles']);
});