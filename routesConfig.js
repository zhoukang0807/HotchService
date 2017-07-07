/**
 * Created by PC on 2017/3/31.
 */
module.exports = function (app) {
    app.use('/', require('./routes/index'));
    app.use('/user', require('./routes/user'));
    app.use('/articles', require('./routes/articles'));
    app.use('/room', require('./routes/room'));
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