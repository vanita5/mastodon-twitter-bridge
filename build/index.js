'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dev = process.env.NODE_ENV !== 'production';

var app = (0, _next2.default)({ dev: dev });
var handle = app.getRequestHandler();

app.prepare().then(function () {
    var server = (0, _express2.default)();

    //$FlowFixMe
    server.get('*', function (req, res) {
        return handle(req, res);
    });

    server.listen(3000, function (err) {
        if (err) {
            throw err;
        }

        console.log('> Ready on http://localhost:3000');
    });
});