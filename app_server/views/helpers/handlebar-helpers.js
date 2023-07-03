var hbs = require('hbs');

hbs.registerHelper("makeLink", function(text, url) {
    let link = '<a href="' + url + '">' + text + '</a>';
    return new hbs.SafeString(link);
});

hbs.registerHelper('changeID', function (input) {
    // console.log("XX"+this._id);
    return "XX"+this._id;
});

hbs.registerHelper('changeModal', function (input) {
    // console.log("XXXX"+this._id);
    return "XXXX"+this._id;
});

hbs.registerHelper('isPublished', function(status) {
    if (status === "published")
        return "Objavljen";
    else
        return "Izbrisan";
});

hbs.registerHelper('date', function(longDate) {
    longDate = new Date(longDate);
    console.log("Začetni datum: " + longDate)

    var day = longDate.getDate();
    var month = longDate.getMonth() + 1;
    var year = longDate.getFullYear();

    var date =  day + "." + month + "." + year;
    return date;
});

hbs.registerHelper("makeLink2", function(text, url1, url2) {
    let link = '<a href="' + url1 + url2 + '">' + text + '</a>';
    return new hbs.SafeString(link);
});
