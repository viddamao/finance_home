var user;

$(window).load(function () {
        $('ul.nav > li').click(function (e) {
           
            $('ul.nav > li').removeClass('active');
            $(this).addClass('active');                
        });            
    });