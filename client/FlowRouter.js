

FlowRouter.route('/',{
    subscriptions: function(params) {
        console.log('route / ... flow sub');
        this.register('menuItems', Meteor.subscribe('menu-items'));
    },
    action: function() {
        console.log('route / ... flow action');
        //FlowLayout.render('menu');
        //if (!Meteor.user()) {
        FlowLayout.render('layout-unauth', { content: "login"});
        //    FlowLayout.render('layout', { header: "header", content: "content"});
        //}

    }
});

FlowRouter.route('/Signin',{
    subscriptions: function(params) {
        console.log('flow sub');

    },
    action: function() {
        console.log('flow action');
        //FlowLayout.render('menu');
        //if (!Meteor.user()) {
        FlowLayout.render('layout-unauth', { header: "header-unauth", content: "content-mktg"});
        //    FlowLayout.render('layout', { header: "header", content: "content"});
        //}

    }
});