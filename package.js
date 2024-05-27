/* global Package */
Package.describe({
    name: 'socialize:user-profile',
    summary: 'An extensible model for a users profile',
    version: '2.0.0',
    git: 'https://github.com/copleykj/socialize-user-profile.git',
});

Package.onUse(function _(api) {
    api.versionsFrom(['2.8.1', '3.0-rc.2']);

    api.use('socialize:user-blocking@2.0.0');
    api.use('aldeed:simple-schema@1.13.1');
    api.use('socialize:friendships@2.0.0', { weak: true });

    api.mainModule('server/server.js', 'server');
    api.mainModule('common/common.js', 'client');
});
