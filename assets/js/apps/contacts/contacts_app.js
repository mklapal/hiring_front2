define(["app"], function(ContactManager){
  ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _){
    ContactsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "contacts(/filter/criterion::criterion)": "listContacts",
        "contacts/:id": "showContact",
        "gender-graph": "showGenderGraph"
      }
    });

    var API = {
      listContacts: function(criterion){
        require(["apps/contacts/list/list_controller"], function(ListController){
          ListController.listContacts(criterion);
        });
      },

      showGenderGraph: function() {
        require(["apps/contacts/graph/graph_controller"], function(GraphController){
          GraphController.showGenderGraph();
        });
      },

      showContact: function(id){
        require(["apps/contacts/show/show_controller"], function(ShowController){
          ShowController.showContact(id);
        });
      }
    };

    ContactManager.on("contacts:list", function(){
      ContactManager.navigate("contacts");
      API.listContacts();
    });

    ContactManager.on("contacts:gender-graph", function(){
      ContactManager.navigate("gender-graph");
      API.showGenderGraph();
    });

    ContactManager.on("contacts:filter", function(criterion){
      if(criterion){
        ContactManager.navigate("contacts/filter/criterion:" + criterion);
      }
      else{
        ContactManager.navigate("contacts");
      }
    });

    ContactManager.on("contact:show", function(id){
      ContactManager.navigate("contacts/" + id);
      API.showContact(id);
    });

    ContactsApp.on("start", function(){
      new ContactsApp.Router({
        controller: API
      });
    });
  });

  return ContactManager.ContactsApp;
});
