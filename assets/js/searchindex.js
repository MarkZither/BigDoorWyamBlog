
var searchModule = function() {
    var idMap = [];
    function y(e) { 
        idMap.push(e); 
    }
    var idx = lunr(function() {
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('description', { boost: 5 });
        this.field('tags', { boost: 50 });
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
    });
    function a(e) { 
        idx.add(e); 
    }

    a({
        id:0,
        title:"Mark Car Rental",
        content:"Car Rental",
        description:"The Best Mark Car Rental in Krakow Kazimierz",
        tags:'Krakow Kazimierz Car Car'
    });

    a({
        id:1,
        title:"John Hair Salon",
        content:"Hair Salon",
        description:"The best John Hair Salon in Krakow Centrum",
        tags:'Krakow Centrum Hair Hair'
    });

    a({
        id:2,
        title:"Dave Car Rental",
        content:"additional search tags",
        description:"The Best Dave Car Rental in Krakow Bronowice",
        tags:'Krakow Bronowice Car Car'
    });

    y({
        url:'/BigDoorWyamBlog/services/marks-car-rental',
        title:"Mark's Car Rental",
        description:"The Best Mark's Car Rental in Krakow, Kazimierz"
    });

    y({
        url:'/BigDoorWyamBlog/services/johns-hair-salon',
        title:"John's Hair Salon",
        description:"The best John's Hair Salon in Krakow Centrum"
    });

    y({
        url:'/BigDoorWyamBlog/services/daves-car-rental',
        title:"Dave's Car Rental",
        description:"The Best Dave's Car Rental in Krakow, Bronowice"
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
