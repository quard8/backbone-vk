var me = null;
$(document).ready(function(){
    VK.init({
        apiId: 2330252
    });

    function bootstrap() {
        me = new Profiles();
        me.fetchFriends({uid : 440358, fields : ["online", "photo_rec", "sex"], success : function(collection, response){
            collection.getMales().forEach(function(profile){
               console.log(profile.get('first_name'));
            });
        }});
    }

    VK.Auth.getLoginStatus(function(response){
        if(response.session) {
            bootstrap();
        }
        else {
          VK.Auth.login(function(response){
            bootstrap();
          }, 2);
        }
    });




    
});