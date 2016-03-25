define(["app",
        "tpl!apps/contacts/graph/templates/graph.tpl",
        "d3"],
       function(ContactManager, viewTpl, d3){
  ContactManager.module("ContactsApp.Graph.View", function(View, ContactManager, Backbone, Marionette, $, _){
    View.Graph = Marionette.ItemView.extend({
      template: viewTpl,

      initialize: function(options) {
        this.data = options.data;
      },

      onRender: function() {
        var $graph = this.$el.find('.gender-graph')[0];

        var d3data = [
          {label: "Female", color: '#f55', value: this.data.F},
          {label: "?", color: '#aaa', value: this.data.unknown},
          {label: "Male", color: '#55f', value: this.data.M}
        ];
        // prevent paddingAngle cumulation
        d3data = d3data.filter(function(d) { return !!d.value });

        var total = this.data.F + this.data.M + this.data.unknown;

        // data accessors
        var getColor = function(d) {
          return d.data.color;
        };
        var labelText = function(d) {
          return d.data.value ? d.data.label : '';
        }
        var valueText = function(d) {
          if (!d.data.value) return '';
          return d.data.value;
        };
        var percentText = function(d) {
          if (!d.data.value) return '';
          return (100 * d.data.value / total).toFixed(0) + '%';
        };
        var getHintText = function(d) {
          return labelText(d) +
            ": " + valueText(d) +
            " (" + percentText(d) + ")";
        }

        // be prepared - responsive
        // to be fully responsive listen to resize event
        var width = Math.max(document.getElementById('main-region').clientWidth, 480);
        var height = (width / 2) + 20;
        var radius = (width / 2) - 30;
        var svg = d3.select($graph)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform',
            'translate(' + (width / 2) + ',' + (height) + ')');

        // summary text in center
        svg
          .append('text')
          .attr('class', 'summary')
          .attr('x', 0)
          .attr('y', -20)
          .text(total + ' contacts');

        var arc = d3.svg.arc()
          .innerRadius(radius * 0.5)
          .outerRadius(radius + 1);

        var labelArcRadius = radius + 5;
        var labelArc = d3.svg.arc()
          .innerRadius(labelArcRadius)
          .outerRadius(labelArcRadius);

        var padAngle = Math.PI / 180;

        var pie = d3.layout.pie()
          .value(function(d) { return d.value; })
          .sort(null)
          .startAngle(-(Math.PI / 2))
          .endAngle(Math.PI / 2)
          .padAngle(padAngle);

        var segment = svg.selectAll('path')
          .data(pie(d3data))
          .enter()
          .append('g')
          .attr('label', getHintText)
          .attr('class', 'segment');
        segment
          .append('path')
          .attr('class', 'arc')
          .attr('d', arc)
          .attr('fill', getColor)
          .attr('stroke', getColor);
        segment
          .append('path')
          .attr("id", function(d, i) { return "tp" + i; })
          .attr('class', 'label-arc')
          .attr('d', labelArc)
          .attr('fill', getColor)
          .attr('stroke', getColor);
        segment
          .append("text")
          .attr("class", "label")
          .attr("dy", -3) //Move the text down
          .append("textPath")
          .attr("xlink:href", function(d, i) { return "#tp" + i; })
          .attr("startOffset", "25%")
          .text(labelText);
        segment
          .append("text")
          .attr("class", "value")
          .attr("dy", 0) //Move the text down
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .text(valueText);
        segment
          .append("text")
          .attr("class", "percent")
          .attr("dy", 15) //Move the text down
          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
          .text(percentText);

      }

    });
  });

  return ContactManager.ContactsApp.Graph.View;
});
