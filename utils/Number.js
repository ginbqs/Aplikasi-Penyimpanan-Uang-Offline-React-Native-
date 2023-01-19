function Currency(nStr, type) {
    if (isNaN(nStr)) {
        var nStr = 0;
    }
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    let typeCurrency = !type ? '' : type == 'dollar' ? '$' : 'Rp.'
    let curency = x1 + x2;
    return `${typeCurrency}${curency}`

}

function SprintF(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

export {
    Currency,
    SprintF
}