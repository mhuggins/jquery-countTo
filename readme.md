jQuery countTo Plugin
=====================
[jQuery countTo](https://github.com/mhuggins/jquery-countTo) is a [jQuery](http://jquery.com) plugin that will count up (or down) to a target number at a specified speed, rendered within an HTML DOM element.

Requirements:
-------------
[jQuery countTo](https://github.com/mhuggins/jquery-countTo) requires the latest version of [jQuery](http://jquery.com).

Usage:
------
The most basic usage of this plugin is to create a DOM element, and apply the `countTo` method to it in your JS.

    <script type="text/javascript"><!--
        $('.timer').countTo({from: 0, to: 500});
    //--></script>
    
    <span class="timer"></span>

A more detailed example that demonstrates all possible options being used is as follows.

    <script type="text/javascript"><!--
        $('.timer').countTo({
            from: 50,
            to: 2500,
            speed: 1000,
            decimals: 2,
            commas: true,
            refreshInterval: 50,
            onComplete: function(value) {
                console.debug(this);
            }
        });
    //--></script>
    
    <span class="timer"></span>

Options:
--------
A complete listing of the options that can be passed to the `countTo` method is below.

<table>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><i>from</i></td>
    <td>The number to start counting from.</td>
  </tr>
  <tr>
    <td><i>to</i></td>
    <td>The number to stop counting at.</td>
  </tr>
  <tr>
    <td><i>speed</i></td>
    <td>The number of milliseconds it should take to finish counting.</td>
  </tr>
  <tr>
    <td><i>decimals</i></td>
    <td>The number of decimal points to use.</td>
  </tr>
  <tr>
      <td><i>commas</i></td>
      <td>Whether to show commas in formatted number.</td>
  </tr>
  <tr>
    <td><i>refreshInterval</i></td>
    <td>The number of milliseconds updating the count.</td>
  </tr>
  <tr>
    <td><i>onComplete</i></td>
    <td>A callback function the is triggered when counting finishes.  The final value is
        passed to the function, and it is run in the context of the DOM element</td>
  </tr>
</table>

Created By:
-----------
[Matt Huggins](http://www.matthuggins.com)

Modified By:
------------
[Andrew Herron](http://www.kritikal.com)

License:
--------
jQuery-countTo is released under the [MIT license](http://www.opensource.org/licenses/MIT).
