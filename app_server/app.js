app.use('/api', indexApi);
app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});

app.get(/(\/informacije)|(\/lokacija\/[a-z0-9]{24})/*'*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'app_public', 'build', 'index.html'));
});
