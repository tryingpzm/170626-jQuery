//*********************************************************************
var $ = function(selectorOrElement){
  var elements;
  if(typeof selectorOrElement==="string"){
    elements = document.querySelectorAll(selectorOrElement);
  }else if(selectorOrElement instanceof Element){
    elements={
      0:selectorOrElement,
      length:1
    };
  }
   //elements为类数组对象

  //下面是 on方法
  elements.on = function(event, fn) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.addEventListener) { //w3c
        element.addEventListener(event, fn);
      } else if (element.attachEvent) { //IE
        element.attachEvent("on" + event, fn);
      }
    }
    return elements;
  };

  //下面是addClass方法
  elements.addClass = function(claName) {
    for (var i = 0; i < elements.length; i++) {
      element = elements[i];
      var classNames = element.className;
      var regE = new RegExp(claName);
      if (regE.test(classNames)) {
        console.log("想要添加的类已存在");
      } else {
        console.log("添加成功");
        element.className = classNames + " " + claName;
      }

    }
    return elements;
  };
  //下面是removeClass方法
  elements.removeClass = function(className) {

    for (var i = 0; i < elements.length; i++) {
      if (!elements[i].classList) {
        elements[i].classList.remove(className);
      } else { //<IE8
        var reg = new RegExp(className);
        if (reg.test(elements[i].className)) {
          console.log(elements[i].className);
          elements[i].className = elements[i].className.replace(className, '');
          console.log(elements[i].className);
          console.log("删除成功");
        } else {
          console.log("抱歉，要删除的类不存在");
        }
      }
    }
    return elements;
  };

  //下面是text()方法
  elements.text = function(text) {
    var arr = [];
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (!arguments[0]) {
        arr[i] = element.innerText;
        if (i === elements.length - 1) {
          return arr;
        }
      } else if (typeof text === "string") {
        if (element.textContent) {
          element.textContent = text;
        } else if (element.innerText) {
          element.innerText = text;
        }
      }
    }
  };

  //下面是innerHtml
  elements.html = function(html) {
    var arr = [];
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (!arguments[0]) {
        arr[i] = element.innerText;
        if (i === elements.length - 1) {
          return arr;
        }
      } else if (typeof html === "string") {
        element.innerHTML = html;
      }
    }
  };

  //下面是css方法
  elements.css = function(part, style) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.style[part] = style;
    }
  };

  //下面是arrt方法
  elements.attr = function(attribute, value) {
    var arr;
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if(arguments.length===1){
        arr.push(element.getAttribute(attribute));
        if(i===elements.length-1){
          return arr;
        }
      }else if(arguments.length===2){
        element.setAttribute(attribute,value);
      }
    }

  };
  
  //下面是get方法
  elements.get=function(i){
    return elements[i];
  };
  
  //下面是siblings方法，获取某元素所有兄弟
  elements.siblings=function(){
    if(elements.length!==1){
      console.log("此方法仅用于求某元素兄弟元素，不适用于数组");
      return;
    }else{
      var result=[];
      var element=elements[0];
      var children=element.parentNode.childNodes;
      for(var i=0;i<children.length;i++){
        if(children[i]!==element){
          result.push(children[i]);
        }
      }
      return result;
    }
  };
  
  //下面是返回值
  return elements;
};
//***********************************************************************

//下面是测试

$("li").addClass("black").on("click", function(e) {
  console.log(e.target + " " + e.currentTarget);
});
// $("li").removeClass("black");
var li = document.getElementsByTagName("li")[3];
var p = document.createElement("p");
p.textContent = "afsfd";
$("li").text("今晚打老虎");
console.log($("li").text());
$("li").html("<p>asdfasdf</p>");
console.log($("li").html());
$("li").css("border", "3px solid red");
$("li").attr("title","今晚打老虎");
$("li")[0].style.border="6px solid blue";
$("li").get(1).style.border = '1px solid blue';
console.log($($("li")[0]).siblings()[5].nodeName);