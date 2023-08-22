let navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
let pages = document.getElementsByName("page");

for (let i = 0; i < navLinks.length; i++) {
    (function (pageNo) {
        navLinks[i].onclick = function () {
            switchPage(pageNo);
        };
    })(i);
}

function switchPage(pageNo) {
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("hide");
    }
    navLinks[pageNo].classList.add("active");
    pages[pageNo].classList.remove("hide");
}


let icon = [
    ['./img/home_FILL0_wght400_GRAD0_opsz48.svg', './img/home_FILL1_wght400_GRAD0_opsz48.svg'],
    ['./img/manage_search_FILL1_wght400_GRAD0_opsz48-grey.svg', './img/manage_search_FILL1_wght400_GRAD0_opsz48.svg'],
    ['./img/edit_FILL0_wght400_GRAD0_opsz48.svg', './img/edit_FILL1_wght400_GRAD0_opsz48.svg'],
    ['./img/person_add_FILL0_wght400_GRAD0_opsz48.svg', './img/person_add_FILL1_wght400_GRAD0_opsz48.svg'],
    ['./img/info_FILL0_wght400_GRAD0_opsz48.svg', './img/info_FILL1_wght400_GRAD0_opsz48.svg']
]

function icon_cover_change(i) {
    let path = 'page' + i + '_icon'
    let img = document.getElementById(path)
    let cover = img.getAttribute("data-cover")
    if (cover !== '2') {
        img.setAttribute("data-cover", cover !== '1' ? '1' : '0')
        img.src = icon[i - 1]['1' - cover]
    }
}

function icon_click_change(i) {
    let path = 'page' + i + '_icon'
    let img = document.getElementById(path)
    let cover = img.getAttribute("data-cover")
    img.setAttribute("data-cover", '2')
    img.src = icon[i - 1][1]
}

function icon_change(i, ok) {
    let path = 'page' + i + '_icon'
    let img = document.getElementById(path)
    let cover = img.getAttribute("data-cover")
    if (cover !== '0' && ok) {
        img.setAttribute("data-cover", '0')
        img.src = icon[i - 1][0]
    }
}

document.getElementById('page1_div').addEventListener('mouseover', function () {
    icon_cover_change(1)
});
document.getElementById('page1_div').addEventListener('mouseout', function () {
    icon_cover_change(1)
});
document.getElementById('page1_div').addEventListener('click', function () {
    for (let i = 1; i <= 5; i++) {
        icon_change(i, true)
    }
    icon_click_change(1)
});

document.getElementById('page2_div').addEventListener('mouseover', function () {
    icon_cover_change(2)
});
document.getElementById('page2_div').addEventListener('mouseout', function () {
    icon_cover_change(2)
});
document.getElementById('page2_div').addEventListener('click', function () {
    for (let i = 1; i <= 5; i++) {
        icon_change(i, true)
    }
    icon_click_change(2)
});

document.getElementById('page3_div').addEventListener('mouseover', function () {
    icon_cover_change(3)
});
document.getElementById('page3_div').addEventListener('mouseout', function () {
    icon_cover_change(3)
});
document.getElementById('page3_div').addEventListener('click', function () {
    for (let i = 1; i <= 5; i++) {
        icon_change(i, true)
    }
    icon_click_change(3)
});

document.getElementById('page4_div').addEventListener('mouseover', function () {
    icon_cover_change(4)
});
document.getElementById('page4_div').addEventListener('mouseout', function () {
    icon_cover_change(4)
});
document.getElementById('page4_div').addEventListener('click', function () {
    for (let i = 1; i <= 5; i++) {
        icon_change(i, true)
    }
    icon_click_change(4)
});

document.getElementById('page5_div').addEventListener('mouseover', function () {
    icon_cover_change(5)
});
document.getElementById('page5_div').addEventListener('mouseout', function () {
    icon_cover_change(5)
});
document.getElementById('page5_div').addEventListener('click', function () {
    for (let i = 1; i <= 5; i++) {
        icon_change(i, true)
    }
    icon_click_change(5)
});
