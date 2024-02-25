var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var bookmarksList = [];
var currentIndex;


if (localStorage.getItem('bookmarks') !== null) {
	bookmarksList = JSON.parse(localStorage.getItem('bookmarks'));
	displayBookmark(bookmarksList);
}

function addBookmark() {

	if (validateSiteName() == true && validateSiteURL() == true) {
		var bookmark = {
			name: siteNameInput.value,
			url: siteURLInput.value
		};
		if (search() !== true) {
			bookmarksList.push(bookmark);
			localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
			displayBookmark(bookmarksList);
			clear();
		} else {
			alert('Bookmark already exist')
		}
	} else {
		alert('Bookmark Name should be valid , Bookmark URL should be a valid url')
	}
}

document.addEventListener('keydown', function (event) {
	if (event.keyCode === 13) {
		addBookmark();
	}
});

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
        <td class="text-primary">${(i + 1)}</td>
        <td class="text-primary text-break">${arr[i].name}</td >
		<td class="text-primary text-break">${arr[i].url}</td>
        <td class="btns" ><a href="https://${arr[i].url}" target="_blank" class="rounded text-center btn btn-outline-warning "><i class="fa-regular fa-eye text-center"></i></a>
		<button onclick="deleteBookmark(${i})" class="btn btn-outline-danger rounded"><i class="fa-solid fa-sharb fa-trash-can"></i></button>
		</td>
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
	var regex = /[A-Za-z\d]{1,}$/
	return regex.test(siteNameInput.value);
}

function validateSiteURL() {
	var regex = /^(?:https?:\/\/)?(?:www\.)?[\w-]+\.+(?:com|net|mr|\w{2,})(?:\/.*)?$/
	return regex.test(siteURLInput.value);
}