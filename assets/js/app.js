define([
  "jquery", "underscore", "backbone"
  , "collections/snippets", "collections/my-form-snippets"
  , "views/tab", "views/my-form"
  , "text!data/input.json", "text!data/radio.json", "text!data/select.json", "text!data/date.json", "text!templates/app/render.html",
], function ($, _, Backbone
  , SnippetsCollection, MyFormSnippetsCollection
  , TabView, MyFormView
  , inputJSON, radioJSON, selectJSON, dateJSON
  , renderTab) {
  return {
    initialize: function () {

      //Bootstrap tabs from json.
      new TabView({
        title: "Input"
        , collection: new SnippetsCollection(JSON.parse(inputJSON))
      });
      new TabView({
        title: "Radios / Checkboxes"
        , collection: new SnippetsCollection(JSON.parse(radioJSON))
      });
      new TabView({
        title: "Select"
        , collection: new SnippetsCollection(JSON.parse(selectJSON))
      });
      new TabView({
        title: "date"
        , collection: new SnippetsCollection(JSON.parse(dateJSON))
      });
      new TabView({
        title: "对应的 config"
        , content: renderTab
      });

      //Make the first tab active!
      $("#components .tab-pane").first().addClass("active");
      $("#formtabs li").first().addClass("active");
      // Bootstrap "My Form" with 'Form Name' snippet.
      new MyFormView({
        title: "Original"
        , collection: new MyFormSnippetsCollection([

        ])
      });
    }
  }
});
