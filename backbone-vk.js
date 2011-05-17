
var Profile = Backbone.Model.extend({
   sync : function(method, model, options) {
       if(method == "read")
       {
           var id = model.get('uid');
           VK.Api.call('getProfiles', {uids : id}, function(e){
              model.set(model.parse(e.response[0], null));
           });
       }
       else
        throw "Can't add/update/delete profiles";
   }
});

var Profiles = Backbone.Collection.extend({
   model : Profile,

   sync : function(method, model, options) {
       if(method == "read")
       {
           var ids = options.uids;
           var collection = this;
           VK.Api.call('getProfiles', {uids : ids}, function(e){
               collection.parse(e.response, null);
           });
       }
       else
        throw "Can't add/update/delete profiles";
   },

   getOnline : function(){
       return this.filter(function(profile){
          return profile.get('online') == 1;
       });
   }
});