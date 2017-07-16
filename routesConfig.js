/**
 * Created by PC on 2017/3/31.
 */
module.exports = function (app) {
    app.use('/', require('./routes/index'));
    app.use('/user', require('./routes/user'));
    app.use('/articles', require('./routes/articles'));
    app.use('/room', require('./routes/room'));
    app.use('/contact', require('./routes/contact'));
    app.use('/find', require('./routes/find'));
   //静态文件路径设置
    app.get('/public/avatar/:name', function (req, res, next) {

        var options = {
            root: __dirname + '/public/avatar/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
        };

        var fileName = req.params.name;
        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
                res.status(err.status).end();
            }
            else {
                console.log('Sent:', fileName);
            }
        });

    })
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};