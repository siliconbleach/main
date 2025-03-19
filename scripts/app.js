(function($) {
    console.log('logs immediately');
    $(document).ready(function(){
      console.log('logs after ready');
    });
  })(jQuery);