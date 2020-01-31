//Pizza Object Constructor
function Pizza(type, size) {
  this.type = type;
  this.size = size;
  this.price = 0;
}

//Base Price Prototype
Pizza.prototype.basePrice = function(type) {
  if (type === "Leo") {
    this.price = 15;
  } else if (type === "Donnie") {
    this.price = 16;
  } else if (type === "Mikey") {
    this.price = 17;
  } else if (type === "Raph") {
    this.price = 18;
  }
}

//Size Price Adjuster Prototype
Pizza.prototype.sizeCost = function(size) {
  if (size === "Medium") {
    this.price += 2;
  } else if (size === "Large") {
    this.price += 4;
  }
}

//Display Prototype
Pizza.prototype.displayOrder = function() {
  var order = $("ul#order");
  var htmlOrder = "<li>Your Order is:<br>" + this.size + " " + this.type + "<br> Total: $" + this.price;
  order.html(htmlOrder);
}

$(document).ready(function(){
  $("#order").submit(function(event){
    event.preventDefault();
    var pizza = new Pizza($("#pizza").val(), $("#size").val());
    pizza.basePrice(pizza.type);
    pizza.sizeCost(pizza.size);
    pizza.displayOrder();
  });
  $("#custom").submit(function(event){
    event.preventDefault();
    var toppings = [];
    $("input[name=custompie]:checked").each(function() {
      toppings.push(this.value);
    });
    console.log(toppings);
  });
});