app.service('JsPopupService',function(){
    return  {
        confirmationJs: function(){
                        var r = confirm('Desea eliminar el registro?');
                        if (r == true)
                            return true;
                        else
                            return false;
                    },
        confirmationJquery:function() {
                        $( "#dialog-confirm" ).dialog({
                          resizable: false,
                          //height:140,
                          modal: true,
                          buttons: {
                            "Eliminar": function() {
                              $( this ).dialog( "close" );
                              return true;
                            },
                            "Cancelar": function() {
                              $( this ).dialog( "close" );
                              return false;
                            }
                          }
                        });
                      }
    }
});