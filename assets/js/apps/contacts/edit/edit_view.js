define(["app", "apps/contacts/common/views"], function(ContactManager, CommonViews){
  ContactManager.module("ContactsApp.Edit.View", function(View, ContactManager, Backbone, Marionette, $, _){
    View.Contact = CommonViews.Form.extend({
      initialize: function(){
        this.title = "Edit " + this.model.get("firstName") + " " + this.model.get("lastName");
      },

      onRender: function(){
        if(this.options.generateTitle){
          var $title = $("<h1>", { text: this.title });
          this.$el.prepend($title);
        }

        this.$("#contact-gender").val(this.model.get("gender"));

        this.$(".js-submit").text("Update contact");
      }
    });
  });

  return ContactManager.ContactsApp.Edit.View;
});
