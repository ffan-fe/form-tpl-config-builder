define(function(require) {
  var formname               = require('text!templates/snippet/formname.html')
  , prependedtext            = require('text!templates/snippet/prependedtext.html')
  , search                   = require('text!templates/snippet/searchinput.html')
  , textinput                = require('text!templates/snippet/textinput.html')
  , appendedcheckbox         = require('text!templates/snippet/appendedcheckbox.html')
  , appendedtext             = require('text!templates/snippet/appendedtext.html')
  , date             = require('text!templates/snippet/appendedtext.html')
  , daterange             = require('text!templates/snippet/appendedtext.html')
  , timerange             = require('text!templates/snippet/appendedtext.html')
  , datetimerange             = require('text!templates/snippet/appendedtext.html')
  , filebutton               = require('text!templates/snippet/filebutton.html')
  , button                   = require('text!templates/snippet/button.html')
  , buttondouble             = require('text!templates/snippet/buttondouble.html')
  , buttondropdown           = require('text!templates/snippet/buttondropdown.html')
  , multiplecheckboxes       = require('text!templates/snippet/multiplecheckboxes.html')
  , multiplecheckboxesinline = require('text!templates/snippet/multiplecheckboxesinline.html')
  , multipleradios           = require('text!templates/snippet/multipleradios.html')
  , multipleradiosinline     = require('text!templates/snippet/multipleradiosinline.html')
  , passwordinput            = require('text!templates/snippet/passwordinput.html')
  , prependedcheckbox        = require('text!templates/snippet/prependedcheckbox.html')
  , prependedtext            = require('text!templates/snippet/prependedtext.html')
  , searchinput              = require('text!templates/snippet/searchinput.html')
  , selectbasic              = require('text!templates/snippet/selectbasic.html')
  , selectmultiple           = require('text!templates/snippet/selectmultiple.html')
  , textarea                 = require('text!templates/snippet/textarea.html')
  , richtext                 = require('text!templates/snippet/richtext.html')
  , textinput                = require('text!templates/snippet/textinput.html')
  , numberinput                = require('text!templates/snippet/numberinput.html');

  return {
    formname                   : formname
    , prependedtext            : prependedtext
    , search                   : search
    , textinput                : textinput
    , uiselect                : textinput
    , appendedcheckbox         : appendedcheckbox
    , appendedtext             : appendedtext
    , date             : date
    , daterange             : daterange
    , timerange             : timerange
    , datetimerange             : datetimerange
    , filebutton               : filebutton
    , singlebutton             : button
    , doublebutton             : buttondouble
    , buttondropdown           : buttondropdown
    , multiplecheckboxes       : multiplecheckboxes
    , multiplecheckboxesinline : multiplecheckboxesinline
    , multipleradios           : multipleradios
    , multipleradiosinline     : multipleradiosinline
    , passwordinput            : passwordinput
    , prependedcheckbox        : prependedcheckbox
    , searchinput              : searchinput
    , selectbasic              : selectbasic
    , selectmultiple           : selectmultiple
    , textarea                 : textarea
    , richtext                 : richtext
    , numberinput                : numberinput
  }
});
