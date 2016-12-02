define([
  "jquery", "underscore", "backbone"
  , "views/temp-snippet"
  , "helper/pubsub"
  , "text!templates/app/renderform.html"
], function ($, _, Backbone
  , TempSnippetView
  , PubSub
  , _renderForm) {
  return Backbone.View.extend({
    tagName: "fieldset"
    , initialize: function () {
      this.collection.on("add", this.render, this);
      this.collection.on("remove", this.render, this);
      this.collection.on("change", this.render, this);
      PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
      PubSub.on("tempMove", this.handleTempMove, this);
      PubSub.on("tempDrop", this.handleTempDrop, this);
      this.$build = $("#build");
      this.renderForm = _.template(_renderForm);
      this.render();
    }

    , render: function () {
      //Render Snippet Views
      this.$el.empty();
      var that = this;
      var containsFile = false;
      _.each(this.collection.renderAll(), function (snippet) {
        that.$el.append(snippet);
      });

      var config = {
        fields: []
      };
      function getTypeByLabel (title) {
        var mapping = {
          textinput: 'text',
          numberinput: 'number',
          textarea: 'textarea',
          richtext: 'richtext',
          multipleradiosinline: 'radio',
          multiplecheckboxesinline: 'checkbox',
          selectbasic: 'select',
          uiselect: 'uiselect',
          date: 'date',
          daterange: 'daterange',
          datetimerange: 'datetimerange',
          timerange: 'timerange'
        };
        var friendlyTitle = title.replace(/\W/g,'').toLowerCase();

        if (mapping[friendlyTitle]) {
          return mapping[friendlyTitle];
        } else {
          alert('未找到对应的类型:' + title + '; 将使用默认类型 text');
          return 'text'
        }
      }

      if (this.collection.models && Array.isArray(this.collection.models) && this.collection.models.length > 1) {
        var Copyed = _.clone(this.collection.models);

        var rangeTypes = [
          'daterange',
          'timerange',
          'datetimerange'
        ];
        //Copyed.shift();

        Copyed.forEach(function (v, i) {
          var filed = {};
          filed.type = getTypeByLabel(v.attributes.title);
          filed.displayName = v.attributes.fields.label.value;

          filed.validateRules = {};
          filed.validateRules.required = v.attributes.fields.required.value;

          if(v.attributes.fields.minlength && v.attributes.fields.minlength.value){
            filed.validateRules.minlength = v.attributes.fields.minlength.value;
          }
          if(v.attributes.fields.maxlength && v.attributes.fields.maxlength.value){
            filed.validateRules.maxlength = v.attributes.fields.maxlength.value;
          }
          if(v.attributes.fields.min && v.attributes.fields.min.value){
            filed.validateRules.min = v.attributes.fields.min.value;
          }
          if(v.attributes.fields.max && v.attributes.fields.max.value){
            filed.validateRules.max = v.attributes.fields.max.value;
          }

          if (~rangeTypes.indexOf(filed.type)) {
            filed.name = [];
            filed.name[0] = v.attributes.fields.id.value;
            filed.name[1] = v.attributes.fields.end.value;
          }

          config.fields.push(filed);
        });

        console.log('config', config);
      }

      $("#render").val(JSON.stringify(config, undefined, 4));
      this.$el.appendTo("#build form");
      this.delegateEvents();
    }

    , getBottomAbove: function (eventY) {
      var myFormBits = $(this.$el.find(".component"));
      var topelement = _.find(myFormBits, function (renderedSnippet) {
        if (($(renderedSnippet).position().top + $(renderedSnippet).height()) > eventY - 90) {
          return true;
        }
        else {
          return false;
        }
      });
      if (topelement) {
        return topelement;
      } else {
        return myFormBits[0];
      }
    }

    , handleSnippetDrag: function (mouseEvent, snippetModel) {
      $("body").append(new TempSnippetView({model: snippetModel}).render());
      this.collection.remove(snippetModel);
      PubSub.trigger("newTempPostRender", mouseEvent);
    }

    , handleTempMove: function (mouseEvent) {
      $(".target").removeClass("target");
      if (mouseEvent.pageX >= this.$build.position().left &&
        mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
        mouseEvent.pageY >= this.$build.position().top &&
        mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
      } else {
        $(".target").removeClass("target");
      }
    }

    , handleTempDrop: function (mouseEvent, model, index) {
      if (mouseEvent.pageX >= this.$build.position().left &&
        mouseEvent.pageX < (this.$build.width() + this.$build.position().left) &&
        mouseEvent.pageY >= this.$build.position().top &&
        mouseEvent.pageY < (this.$build.height() + this.$build.position().top)) {
        var index = $(".target").index();
        $(".target").removeClass("target");
        this.collection.add(model, {at: index + 1});
      } else {
        $(".target").removeClass("target");
      }
    }
  })
});
