const q = document.querySelector('.batdangky')
const e = document.querySelector('.batdangnhap')
const w = document.querySelectorAll('.tatne')
const r = document.querySelector('.zzzz')
const t = document.querySelector('.xxxx')


const m = document.querySelector('.modal')
const n = document.querySelector('.register')
const b = document.querySelector('.login')


/* Search */

let searchBtn = document.querySelector('.header__mobile-search-icon');
let searchBar = document.querySelector('.header__search');

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
})


function showa() {
    m.classList.add('lonmano')
    n.classList.remove('register')
}

function showb() {
    m.classList.remove('lonmano')
    n.classList.add('register')
    b.classList.add('login')
}

function showc() {
    m.classList.add('lonmano')
    b.classList.remove('login')
}

function showd() {
    n.classList.add('register')
    b.classList.remove('login')
}

function showd1() {
    b.classList.add('login')
    n.classList.remove('register')
}

if (q) {
    q.addEventListener('click', showa)
    e.addEventListener('click', showc)
}

for (const tat of w) {
    tat.addEventListener('click', showb)
}


r.addEventListener('click', showd)
t.addEventListener('click', showd1)



//login
// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {

                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function(rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}


/* IMAGE */



function contentShowProductSale() {
    const getBoxElementItemProduct = document.querySelector('.product__sale-item');
    const getBoxElementBtnRight = document.querySelector('.product__sale-item-btn-move-slide-right-box');
    const getBoxElementBtnLeft = document.querySelector('.product__sale-item-btn-move-slide-left-box');

    let product = [{
            id: 1,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',

        },
        {
            id: 2,
            image: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',

        }, {
            id: 3,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',

        }, {

            id: 4,
            image: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',

        }, {

            id: 5,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',

        }, {

            id: 6,
            image: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',

        }, {

            id: 7,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',

        }, {


            id: 8,
            image: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',

        }, {


            id: 9,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',

        }, {


            id: 10,
            image: 'https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg',

        }, {

            id: 11,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',
        }, {

            id: 12,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',
        }, {

            id: 13,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',
        }, {

            id: 14,
            image: 'https://cf.shopee.vn/file/f46af0d8a00a3709859fda629f2038f3',
        }
    ]

    if (getBoxElementItemProduct) {
        let html = product.map((product, id) => {
            return `
            <div class="product-inf__img-other" style="transform:translateX(0);">
                    <div class="introduce-imgs" style="background-image: url(&quot;${product.image}&quot;); background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
            </div>
            `
        })
        getBoxElementItemProduct.innerHTML = html.join('');
    }
    var a = product.length / 5;

    let s = 0;
    let i = 1;

    getBoxElementBtnLeft.style.display = 'none';

    if (getBoxElementBtnRight) {
        getBoxElementBtnRight.onclick = function() {
            i = s / 36
            if (i + 2 > a) {
                getBoxElementBtnRight.style.display = 'none';
            }

            if (i <= a) {
                s += 36;
            }

            getBoxElementBtnLeft.style.display = 'block';
            getBoxElementItemProduct.style.transform = `translateX(-${s}%)`;

        }
    }


    if (getBoxElementBtnLeft) {
        getBoxElementBtnLeft.onclick = function() {

            s -= 36;
            i = s / 36;
            getBoxElementBtnRight.style.display = 'block';
            if (i == 0) {
                getBoxElementBtnLeft.style.display = 'none';
            }
            getBoxElementItemProduct.style.transform = `translateX( calc(-${s}%))`;

        }

    }

}
contentShowProductSale();


let videoBtn = document.querySelectorAll('.introduce-imgs');

videoBtn[0].classList.add('active')
videoBtn.forEach(btn => {
    btn.onmouseover = function() {
        document.querySelector('.product-inf__img-other .active').classList.remove('active');
        btn.classList.add('active');
        let scr = btn.getAttribute('style');
        document.querySelector('.introduce-img').style = scr;
    }
})






let addnumber = document.querySelector('.add-number');
let subtractnumber = document.querySelector('.subtract-number');
let soluong = document.querySelector('.soluonghon');
let a = soluong.getAttribute('value');
addnumber.onclick = function() {
    if (soluong.value < 999) {
        soluong.value++;
    }
}
subtractnumber.onclick = function() {
    if (soluong) {
        if (soluong.value > 1) {
            soluong.value--;
        }

    }
}


/* addnumber.onmousedown = function() {
    if (soluong) {
        soluong.value++;
    }
}
subtractnumber.onmousedown = function() {
    if (soluong) {
        if (soluong.value > 1) {
            soluong.value--;
        }

    }
}
addnumber.onmouseup = function() {
    if (soluong) {
        soluong.value++;
    }
}
subtractnumber.onmouseup = function() {
    if (soluong) {
        if (soluong.value > 1) {
            soluong.value--;
        }

    }
} */


soluong.onblur = function() {
    if (soluong) {
        soluong.value = soluong.value;
    }
}


//cho phép cut copy paste drag drop trong thẻ input
$(document).ready(function() {
    $('.quantity-input').bind("cut copy paste drag drop", function(e) {
        e.preventDefault();
    });
});

function isNumberKey(e) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || soluong.value > 99)
        return false;
    return true;
}

//tim kiem
