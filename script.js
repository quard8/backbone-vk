var me = null;
$(document).ready(function(){
    VK.init({
        apiId: 2330252
    });

    me = new Profiles();
    me.fetch({uids : [1,2,3]});
    

});