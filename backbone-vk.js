
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

   sync : function(method, collection, options) {
       if(method == "read")
       {
           if(options.uids == false)
               throw "No identificators passed";
           var fields = options.fields || {};

           VK.Api.call('getProfiles', {uids : options.uids, fields : fields}, function(e){
               options.success(e.response);
           });
       }
       else if(method == "getFriends")
       {
           var opts = {};
           if(options.uid == false)
               throw "Not identificator passed";
           opts.uid = options.uid;

           if(options.fields)
            opts.fields = options.fields;
           if(options.name_case)
            opts.name_case = options.name_case;
           if(options.count)
            opts.count = options.count;
           if(options.offset)
            opts.offset = options.offset;

            VK.Api.call('friends.get', opts, function(e){
               if(e.error && options.error) options.error(e.error);
               else options.success(e.response);
           });
       }
       else
        throw "Can't add/update/delete profiles";
   },

   getOnline : function(){
       return this.filter(function(profile){
          return profile.get('online') == 1;
       });
   },

    getMales : function(){
        return this.filter(function(profile){
           return profile.get('sex') == 2;
        });
    },

    getFemales : function(){
        return this.filter(function(profile){
           return profile.get('sex') == 1;
        });
    },

    fetchFriends : function(options) {
        options || (options = {});
        var collection = this;
        var success = options.success;
        options.success = function(resp) {
          collection[options.add ? 'add' : 'refresh'](collection.parse(resp), options);
          if (success) success(collection, resp);
        };
        return this.sync.call(this, 'getFriends', this, options);
    }


});