if (!window.atob) {
    var tableStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var table = tableStr.split("");

    window.atob = function (base64) {
        if (/(=[^=]+|={3,})$/.test(base64)) throw new Error("Строка не верна");
        base64 = base64.replace(/=/g, "");
        var n = base64.length & 3;
        if (n === 1) throw new Error("Недостаточно символов");
        for (var i = 0, j = 0, len = base64.length / 4, bin = []; i < len; ++i) {
            var a = tableStr.indexOf(base64[j++] || "A"), b = tableStr.indexOf(base64[j++] || "A");
            var c = tableStr.indexOf(base64[j++] || "A"), d = tableStr.indexOf(base64[j++] || "A");
            if ((a | b | c | d) < 0) throw new Error("Недостаточно символов");
            bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
            bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
            bin[bin.length] = ((c << 6) | d) & 255;
        };
        return String.fromCharCode.apply(null, bin).substr(0, bin.length + n - 4);
    };

    window.btoa = function (bin) {
        for (var i = 0, j = 0, len = bin.length / 3, base64 = []; i < len; ++i) {
            var a = bin.charCodeAt(j++), b = bin.charCodeAt(j++), c = bin.charCodeAt(j++);
            if ((a | b | c) > 255) throw new Error("Строка не верна");
            base64[base64.length] = table[a >> 2] + table[((a << 4) & 63) | (b >> 4)] +
                (isNaN(b) ? "=" : table[((b << 2) & 63) | (c >> 6)]) +
                (isNaN(b + c) ? "=" : table[c & 63]);
        }
        return base64.join("");
    };

}

function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null,
        str.replace(/\r|\n/g, "").replace(/([~#A-Za-z0-9]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
    );
}
function base64ToHex(str) {
    for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")), hex = []; i < bin.length; ++i) {
        var tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join(" ");
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    }).join(''));
}
function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/^[~#A-Za-z0-9]$/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
function ProvLog(obj) {
    if (obj.value.length < 24){
        obj.disabled = true;
        alert('Вы ввели недопустимое число символов! Строка должна содержать 24 символа.');
    }
    else {
        obj.disabled = false;
    }
}
function fromHEX (txt){
    if (!txt) {alert ('введите текст'); return}
    result = txt.split(/([^ \.;]{1,12})([^ \.;]{1,12})/);
    var tbl = document.createElement('table');
    ro5 = tbl.insertRow(-1);
    ro1 = tbl.insertRow(0);
    ro2 = tbl.insertRow(0);
    ro3 = tbl.insertRow(-1);
    ro4 = tbl.insertRow(-1);
    ro6 = tbl.insertRow(-1);
    for (var j = 0, J = 1; j < J; j++){
        var arr = txt.split(/([^ \.;]{1,12})([^ \.;]{1,12})/);
        var ce = ro5.insertCell(0);    ce.innerHTML = 'конкатенация 2х частей строки(функция b64EncodeUnicode):  ' + b64EncodeUnicode(arr[1]+arr[2]);
        var ce = ro1.insertCell(-1);    ce.innerHTML = 'первая часть строки:  ' + arr[1];
        var ce = ro2.insertCell(-1);    ce.innerHTML = 'вторая часть строки:  ' + arr[2];
        var ce = ro3.insertCell(0);    ce.innerHTML = 'закодированная первая часть:  ' + b64EncodeUnicode(arr[1]);
        var ce = ro4.insertCell(0);    ce.innerHTML = 'закодированная вторая часть:  ' + b64EncodeUnicode(arr[2]);
        var ce = ro6.insertCell(0);    ce.innerHTML = 'вариант из hex to b64(функция hexToBase64):  ' + hexToBase64(arr[1] + arr[2]);
    }
    document.body.firstElementChild.appendChild(tbl);
    document.getElementById('btn').disabled = 0;
}

$( document ).ready(function() {
      $('.hex_button').click(function(){
        $('.close_but').css('display','inline-block');
      });
    $('.close_but').click(function(){
        $('table').remove();
        $(this).css('display','none');
    })
});

