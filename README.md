# Instructions

As discussed I am sending you the description of the dev project. There is no time limit so you can send it back whenever you consider it is done.

If you get stacked with this example try to deliver at least whatever part you can. Doesn't matter it is not 100%, this way we can see how you think and code. Always better to see something than nothing :)

If you can't do the Backbone part you may finish d3 part might or vice versa :)

If you are not familiar with github you can download ZIP files here
https://github.com/mklapal/hiring_front2/archive/master.zip
and then send us the test back via email.

# Create a d3.js graph in existing js app
----------------------------------------------------------------------

Your task will be to create a data visualization in an existing Marionette application.

The application is a Contact Manager. When the user opens it in a browser, they land on a page listing the existing contacts. Each contact has a first name, last name and phone number. 

1. The user should be able to add the "gender" for each contact.

2. The user should be able to see a button "Gender graph", next to the "New contact" button on the landing page.

3. When the user clicks on the "Gender graph" button, they should be redirected to a new page.

4. The user should see a graph on the new page that visualizes the gender distribution. The graph could be one of following charts: pie chart, donut chart or bar chart. The chart should be built with d3.js library.

*Note:* The design of the chart is entirely up to you. Feel free to create it the way you find best.
Also nothing except the instructions here is strictly defined and you may use whatever you feel comfortable with it.

*Note:* To make it easier for you, you can add the logic to calculate genders and values into the view. In real example this should be part of controller but here you can do it also in the view.

Hope you enjoy it :)

# Original README

see original repo on [https://github.com/davidsulc/structuring-backbone-with-requirejs-and-marionette] (https://github.com/davidsulc/structuring-backbone-with-requirejs-and-marionette) 

# Useful links

www.backbonejs.org
www.d3js.org
https://github.com/davidsulc/
https://lostechies.com/derickbailey/

# Hint if needed

## Trigger new page with the dataviz

See how they show dialog to edit a contact. Keep in mind new page can't use ```regions.dialog```!

```
contactsListView.on("childview:contact:edit", function(childView, args){
	require(["apps/contacts/edit/edit_view"], function(EditView){

		...

		ContactManager.regions.dialog.show(view);
	});
});
```

## Pass the data to view

You can pass data to view easily using this:

```
var view = new View.Graph({
	data: array
});
```

then in the view you have access through:

```
initialize: function(options) {
	console.log(options);
},
```

## Templates

See other views and templates to understand how you can use variables in the templates.


## d3
https://bl.ocks.org/mbostock/3887193

In view you can use this magic to get the svg on right place :)

```
onRender: function() {
	var $graph = this.$el.find('.graph');
	var svg = d3.select($graph).append("svg");

	...
	
}

```


