(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['table-template'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " \r\n		<tr>\r\n			<td><input type=\"checkbox\" class=\"idRecurso\" value=\"";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"check_"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.recurso)),stack1 == null || stack1 === false ? stack1 : stack1.id_recurso)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"/>\r\n		\r\n		\r\n		</td>\r\n		<td>\r\n				<a href=\"";
  if (helper = helpers.url_base) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url_base); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "recurso/ver/contenido/";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"link_";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"preview_link\">\r\n					<img src=\"";
  if (helper = helpers.icono) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.icono); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" title=\"";
  if (helper = helpers.extension) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.extension); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" width=\"16\" height=\"16\" border=\"0\" />\r\n				</a>\r\n			</td>\r\n			<td>\r\n				<a href=\"";
  if (helper = helpers.url_base) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.url_base); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "recurso/ver/contenido/";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" id=\"title_";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" class=\"preview_link\">\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.titulo), {hash:{},inverse:self.program(4, program4, data),fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n					</a>\r\n					<br/>\r\n					";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.descripcion), {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \r\n										<br/>Extension: <span id=\"ext_";
  if (helper = helpers.id_recurso) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id_recurso); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (helper = helpers.extension) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.extension); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span>\r\n			</td>\r\n		</tr>\r\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n						";
  if (helper = helpers.titulo) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.titulo); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n					";
  return buffer;
  }

function program4(depth0,data) {
  
  
  return "\r\n						Sin t&iacute;tulo\r\n					";
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\r\n						";
  if (helper = helpers.descripcion) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.descripcion); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\r\n					";
  return buffer;
  }

function program8(depth0,data) {
  
  
  return "\r\n						Sin descripci&oacute;n\r\n					";
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.recurso), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });
})();