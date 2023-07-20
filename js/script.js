var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var bookmarksList = [];
var currentIndex;

if (localStorage.getItem('bookmarks') != null) {
    bookmarksList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmark(bookmarksList);
}

function addBookmark() {
    if (validateSiteName() == true && validateSiteURL() == true) {
        var bookmark = { name: siteNameInput.value, url: siteURLInput.value };
        if (search() != true) {
            bookmarksList.push(bookmark);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
            displayBookmark(bookmarksList);
            clear();
        } else {
            alert('Bookmark already exict')
        }
    } else {
        alert('Bookmark Name should be valid , Bookmark URL should be a valid url')
    }
    console.log(bookmark);
}

function search() {
    for (var i = 0; i < bookmarksList.length; i++) {
        if (
            bookmarksList[i].name.includes(siteNameInput.value) == true
        ) {
            return true;
        }

    }

}

function clear() {
    siteNameInput.value = '';
    siteURLInput.value = '';
}

function displayBookmark(arr) {
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartona += `<tr>
        <td>${(i + 1)}</td>
        <td>${arr[i].name}</td>
        <td><a href="https://${arr[i].url}" target="_blank" class="btn btn-outline-warning btn-sm"><i class="fa-solid fa-eye"></i>Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-outline-danger btn-sm"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        </tr>`
    }
    document.getElementById('tableContent').innerHTML = cartona;

}

function deleteBookmark(bookmarkIndex) {
    bookmarksList.splice(bookmarkIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmark(bookmarksList);
}


function validateSiteName() {
    var regex = /[A-Z]|[a-z]{3,}$/
    return regex.test(siteNameInput.value);
}

function validateSiteURL() {
    var regex = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
    return regex.test(siteURLInput.value);
}


// face www.facebook.com
// insta www.instagram.com
// google www.google.com