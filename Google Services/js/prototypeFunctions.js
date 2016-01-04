//Array.prototype.Remove = function(idx) {
//    this.splice(idx, 1);
//};
//
//Array.prototype.Clear = function() {
//    this.splice(0, this.length);
//};
//
//Array.prototype.Copy = function(list) {
//    for(var i = 0; i < list.length; i++){
//        this.push(list[i]);
//    }
//};
//
//Array.prototype.Last = function (){
//    var idx = 0;
//    for(var i = 0; i < this.length; i++){
//        if(this[i].ACTIVE == true && this[i + 1].ACTIVE == false){
//            idx = i + 1;
//            break;
//        }
//    }
//
//    return idx;
//};
//
//Array.prototype.Insert = function (idx, service){
//    var temp = [];
//
//    for(var i = 0; i < this.length; i++){
//        if(i == idx){
//            temp.push(service);
//            temp.push(this[i]);
//        } else {
//            temp.push(this[i]);
//        }
//    }
//
//    this.Clear();
//    this.Copy(temp);
//};
//
//Array.prototype.Update = function (checkbox) {
//    for (var i = 0; i < this.length; i++) {
//        if (this[i].ID == checkbox.id) {
//            this[i].ACTIVE = checkbox.checked;
//
//            var temp = this[i];
//            if(this[i].ACTIVE == false){
//                this.Remove(i);
//                this.push(temp);
//            } else {
//                this.Remove(i);
//                var idx = this.Last();
//                this.Insert(idx, temp);
//            }
//        }
//    }
//};



//Array.prototype.BuildServices = function(){
//    var ul = document.getElementById("list");
//    ul.innerHTML = "";
//
//    for (var i = 0; i < this.length; i++) {
//        ul.appendChild(CreateLi(this[i]));
//    }
//
//    $("#list").sortable();
//};
//
//Array.prototype.BuildMail = function(){
//    var div = document.getElementById("mailList");
//
//    for (var i = 0; i < this.length; i++) {
//        div.appendChild(CreateRadioButton(this[i], "mail"));
//    }
//};

//Array.prototype.BuildStyle = function(){
//    var div = document.getElementById("styleList");
//
//    for (var i = 0; i < this.length; i++) {
//        div.appendChild(CreateRadioButton(this[i], "style"));
//    }
//};