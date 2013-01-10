M.mod_agora = {};
 
M.mod_agora.init = function(Y) {
 
    // example to submit a form field on change
    Y.on('change', function(e) {
        Y.one('#mform1').submit();
    }, '#id_fieldname' );
};
