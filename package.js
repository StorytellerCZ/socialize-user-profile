/* global Package */
Package.describe({
    name: 'socialize:user-profile',
    summary: 'An extensible model for a users profile',
    version: '1.0.3',
    git: 'https://github.com/copleykj/socialize-user-profile.git',
});

Package.onUse(function _(api) {
    api.versionsFrom('1.10.2');

    api.use('socialize:user-blocking@1.0.4');
    api.use('socialize:friendships@1.1.0', { weak: true });

    api.mainModule('server/server.js', 'server');
    api.mainModule('common/common.js', 'client');
});
