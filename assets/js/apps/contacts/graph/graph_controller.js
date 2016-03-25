define(["app", "apps/contacts/graph/graph_view"], function(ContactManager, View){
  ContactManager.module("ContactsApp.Graph", function(Graph, ContactManager, Backbone, Marionette, $, _){
    Graph.Controller = {
      showGenderGraph: function() {
        require(["common/views", "entities/contact"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Gender Graph",
            message: "Fetching graph data…"
          });
          ContactManager.regions.main.show(loadingView);

          ContactManager.request("contact:stats-gender").then(function(stats) {
            var graphView = new View.Graph({
              data: stats
            });
            ContactManager.regions.main.show(graphView);
          });

        });
      }
    }
  });

  return ContactManager.ContactsApp.Graph.Controller;
});
