// podaci od interesa
var host = "https://localhost:";
var port = "44352/";
var zaposleniEndpoint = "api/zaposleni/";

var zEndpoint = "/api/Employees";
var jediniceEndpoint = "api/jedinice/";
var loginEndpoint = "api/authentication/login";
var registerEndpoint = "api/authentication/register";
var searchEndpoint = "api/pretraga";
var formAction = "Create";
var editingId;
var jwt_token;


function loadPage() {

	setupPopper();
	showLogin();
	//loadZaposleni();
}

// prikaz forme za prijavu
function showLogin() {
	document.getElementById("data").style.display = "block";
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("loginFormStart").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("searchFormZaposleni").style.display = "none";
	document.getElementById("searchSellers").style.display = "none";


	loadZaposleni();
}
function showLoginNew() {
	document.getElementById("usernameLogin").value = "";
	document.getElementById("passwordLogin").value = "";
	document.getElementById("usernameRegister").value;
	document.getElementById("emailRegister").value = "";
	document.getElementById("passwordRegister").value = "";
	document.getElementById("confirmPasswordRegister").value = "";
	document.getElementById("data").style.display = "block";
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("loginFormStart").style.display = "block";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("searchFormZaposleni").style.display = "none";
	document.getElementById("searchSellers").style.display = "none";



	loadZaposleni();
}

function validateRegisterForm(username, email, password, confirmPassword) {
	if (username.length === 0) {
		alert("Username field can not be empty.");
		return false;
	} else if (email.length === 0) {
		alert("Email field can not be empty.");
		return false;
	} else if (password.length === 0) {
		alert("Password field can not be empty.");
		return false;
	} else if (confirmPassword.length === 0) {
		alert("Confirm password field can not be empty.");
		return false;
	} else if (password !== confirmPassword) {
		alert("Password value and confirm password value should match.");
		return false;
	}
	return true;
}

function registerUser() {
	var username = document.getElementById("usernameRegister").value;
	var email = document.getElementById("emailRegister").value;
	var password = document.getElementById("passwordRegister").value;
	var confirmPassword = document.getElementById("confirmPasswordRegister").value;

	if (validateRegisterForm(username, email, password, confirmPassword)) {
		var url = host + port + registerEndpoint;
		var sendData = { "Username": username, "Email": email, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					console.log("Successful registration");
					alert("Successful registration");
					showLoginNew();
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("Desila se greska!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}

// prikaz forme za registraciju
function showRegistration() {
	document.getElementById("data").style.display = "none";
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "block";
	document.getElementById("logout").style.display = "none";
	document.getElementById("loginFormStart").style.display = "none";
	document.getElementById("searchFormZaposleni").style.display = "none";
	document.getElementById("searchSellers").style.display = "none";



}

function validateLoginForm(username, password) {
	if (username.length === 0) {
		alert("Username field can not be empty.");
		return false;
	} else if (password.length === 0) {
		alert("Password field can not be empty.");
		return false;
	}
	return true;
}
function validateAddForm(name, yearEmployment, yearBorn, salary) {
	if (yearBorn > 1960 && yearBorn < 2000) {
		alert("Godina rodjenja mora biti izmedju 1960 i 2000!");
		return false;
	} else if (yearEmployment > 2010 && yearBorn < 2020) {
		alert("Godina zaposlenja mora biti izmedju 2010 i 2020");
		return false;
	} else if (name.length > 70) {
		alert("Duzina ne moze biti preko 70 karaktera.");
		return false;
	} else if (salary >= 250  && salary <= 10000){
		alert("Plata mora biti izmedju 250 i 10,000!");
		return false;
	}
	return true;
}

function loginUser() {
	var username = document.getElementById("usernameLogin").value;
	var password = document.getElementById("passwordLogin").value;

	if (validateLoginForm(username, password)) {
		var url = host + port + loginEndpoint;
		var sendData = { "Username": username, "Password": password };
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200) {
					console.log("Successful login");
					alert("Successful login");
					response.json().then(function (data) {
						console.log(data);
						document.getElementById("info").innerHTML = "Currently logged in user: <i>" + data.email + "<i/>.";
						document.getElementById("logout").style.display = "block";
						document.getElementById("loginForm").style.display = "none";
						document.getElementById("btnRegister").style.display = "none";
						document.getElementById("searchSellers").style.display = "none";

						document.getElementById("searchFormZaposleni").style.display = "block";
						document.getElementById("loginFormStart").style.display = "none";


						// koristimo Window sessionStorage Property za cuvanje key/value parova u browser-u
						// sessionStorage cuva podatke za samo jednu sesiju
						// podaci će se obrisati kad se tab browser-a zatvori
						// (postoji i localStorage koji čuva podatke bez datuma njihovog "isteka")
						// dobavljanje tokena: token = sessionStorage.getItem(data.token);
						//sessionStorage.setItem("token", data.token);
						jwt_token = data.token;
						loadZaposleni();
						loadJedinice()
					});
				} else {
					console.log("Error occured with code " + response.status);
					console.log(response);
					alert("Greška prilikom prijave!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}


// prikaz autora
function loadZaposleni() {
	/* document.getElementById("data").style.display = "block";
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("formDiv").style.display = "block";

	document.getElementById("registerForm").style.display = "none"; */

	// ucitavanje prodavca
	var requestUrl = host + port + zaposleniEndpoint;
	console.log("URL zahteva: " + requestUrl);
	var headers = {};
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;			// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);

	}
	console.log(headers);
	fetch(requestUrl, { headers: headers })
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setZaposleni);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
};


function loadJedinice() {
	// ucitavanje prodavca
	var requestUrl = host + port + jediniceEndpoint;
	console.log("URL zahteva: " + requestUrl);
	var headers = {};
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;			// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	console.log(headers);
	fetch(requestUrl, { headers: headers })
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setJedinice);
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
}

function showError() {
	var container = document.getElementById("data");
	container.innerHTML = "";

	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var errorText = document.createTextNode("Greska prilikom preuzimanja zaposlenog!");

	h1.appendChild(errorText);
	div.appendChild(h1);
	container.append(div);
}

// metoda za postavljanje autora u tabelu
function setZaposleni(data) {
	var container = document.getElementById("data");
	container.innerHTML = "";

	console.log(data);

	// ispis naslova
	var div = document.createElement("div");
	var h1 = document.createElement("h1");
	var headingText = document.createTextNode("Zaposleni");
	h1.appendChild(headingText);
	div.appendChild(h1);

	// ispis tabele
	var table = document.createElement("table");
	table.setAttribute("class", "table table-bordered table-striped table-hover");
	var header = createHeader();
	table.append(header);

	var tableBody = document.createElement("tbody");

	for (var i = 0; i < data.length; i++) {
		// prikazujemo novi red u tabeli
		var row = document.createElement("tr");
		// prikaz podataka

		if (jwt_token) {
			row.appendChild(createTableCell(data[i].name));
			row.appendChild(createTableCell(data[i].rola));
			row.appendChild(createTableCell(data[i].yearEmployment));
			row.appendChild(createTableCell(data[i].yearBorn));
			row.appendChild(createTableCell(data[i].sectorName));
			row.appendChild(createTableCell(data[i].salary));

			// prikaz dugmadi za izmenu i brisanje
			var stringId = data[i].id.toString();

			var buttonDelete = document.createElement("button");
			buttonDelete.setAttribute("class", "btn btn-outline-danger");
			buttonDelete.name = stringId;
			buttonDelete.addEventListener("click", deleteSeller);
			var buttonDeleteText = document.createTextNode("Obrisi");
			buttonDelete.appendChild(buttonDeleteText);
			var buttonDeleteCell = document.createElement("td");
			buttonDeleteCell.appendChild(buttonDelete);
			row.appendChild(buttonDeleteCell);

			/* var buttonEdit = document.createElement("button");
			buttonEdit.setAttribute("class", "btn btn-outline-warning");
			buttonEdit.name = stringId;
			buttonEdit.addEventListener("click", editSeller);
			var buttonEditText = document.createTextNode("Edit");
			buttonEdit.appendChild(buttonEditText);
			var buttonEditCell = document.createElement("td");
			buttonEditCell.appendChild(buttonEdit);
			row.appendChild(buttonEditCell);
 */


		}
		else {
			row.appendChild(createTableCell(data[i].name));
			row.appendChild(createTableCell(data[i].rola));
			row.appendChild(createTableCell(data[i].yearEmployment));
			row.appendChild(createTableCell(data[i].sectorName));

		}

		tableBody.appendChild(row);
	}

	table.appendChild(tableBody);
	div.appendChild(table);


	if (jwt_token) {
		// prikaz forme
		document.getElementById("formDiv").style.display = "block";
	}

	// ispis novog sadrzaja
	container.appendChild(div);
};

function setJedinice(data) {
	var dropdown = document.getElementById("organizacionajedinicaid");
	for (var i = 0; i < data.length; i++) {
		var option = document.createElement("option");
		option.value = data[i].id;
		var text = document.createTextNode(data[i].name);
		option.appendChild(text);
		dropdown.appendChild(option);
	}
}

function createHeader() {
	var thead = document.createElement("thead");
	var row = document.createElement("tr");
	row.setAttribute("class", "table-warning");
	//row.appendChild(createTableCell("Id"));



	if (jwt_token) {
		row.appendChild(createTableCellHead("Ime i prezime"));
		row.appendChild(createTableCellHead("Rola"));
		row.appendChild(createTableCellHead("Godina zaposlenja"));
		row.appendChild(createTableCellHead("Godina rodjenja"));
		row.appendChild(createTableCellHead("Jedinica"));
		row.appendChild(createTableCellHead("plata"));
		row.appendChild(createTableCellHead("Delete"));
		//row.appendChild(createTableCellHead("Edit"));
	}
	else {
		row.appendChild(createTableCellHead("Ime i prezime"));
		row.appendChild(createTableCellHead("Rola"));
		row.appendChild(createTableCellHead("Godina zaposlenja"));
		row.appendChild(createTableCellHead("Jedinica"));
	}

	thead.appendChild(row);
	return thead;
}
function createTableCellHead(text) {
	var cell = document.createElement("th");
	var cellText = document.createTextNode(text);
	cell.setAttribute("style", "text-align:left;")
	cell.appendChild(cellText);
	return cell;
}

function createTableCell(text) {
	var cell = document.createElement("td");
	var cellText = document.createTextNode(text);
	cell.appendChild(cellText);
	return cell;
}

// dodavanje novog autora
function submitSellerForm() {

	var imeiprezime = document.getElementById("imeiprezime").value;
	var rola = document.getElementById("rola").value;
	var godinazaposlenja = document.getElementById("godinazaposlenja").value;
	var organizacionajedinicaid = document.getElementById("organizacionajedinicaid").value;
	var godinarodjenja = document.getElementById("godinarodjenja").value;
	var plata = document.getElementById("plata").value;

	var httpAction;
	var sendData;
	var url;

	// u zavisnosti od akcije pripremam objekat
	if (formAction === "Create") {
		httpAction = "POST";
		url = host + port + zaposleniEndpoint;
		sendData = {
			"name": imeiprezime,
			"rola": rola,
			"yearEmployment": godinazaposlenja,
			"sectorid": organizacionajedinicaid,
			"yearBorn": godinarodjenja,
			"salary": plata,

		};
	}
	else {
		httpAction = "PUT";
		url = host + port + zaposleniEndpoint + editingId.toString();
		sendData = {
			"Id": editingId,
			"name": imeiprezime,
			"rola": rola,
			"yearEmployment": godinazaposlenja,
			"sectorid": organizacionajedinicaid,
			"yearBorn": godinarodjenja,
			"salary": plata,
		};
	}


	console.log("Objekat za slanje");
	console.log(sendData);
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	if (validateAddForm(name, yearEmployment, yearBorn, salary)) {
		fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200 || response.status === 201) {
					console.log("Successful action");
					formAction = "Create";
					refreshTable();
				} else {
					console.log("Error occured with code " + response.status);
					alert("Desila se greska!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}

// brisanje autora
function deleteSeller() {
	// izvlacimo {id}
	var deleteID = this.name;
	// saljemo zahtev 
	var url = host + port + zaposleniEndpoint + deleteID.toString();
	var headers = { 'Content-Type': 'application/json' };
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	fetch(url, { method: "DELETE", headers: headers })
		.then((response) => {
			if (response.status === 204) {
				console.log("Successful action");
				refreshTable();
			} else {
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
};

// izmena autora
function editSeller() {
	// izvlacimo id
	var editId = this.name;
	// saljemo zahtev da dobavimo tog autora

	var url = host + port + zaposleniEndpoint + editId.toString();
	var headers = {};
	if (jwt_token) {
		headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
	}
	fetch(url, { headers: headers })
		.then((response) => {
			if (response.status === 200) {
				console.log("Successful action");
				response.json().then(data => {
					document.getElementById("imeiprezime").value = data.name;
					document.getElementById("rola").value = data.surname;
					document.getElementById("godinazaposlenja").value = data.yearEmployment;
					document.getElementById("godinarodjenja").value = data.yearBorn;
					document.getElementById("plata").value = data.salary;
					editingId = data.id;
					formAction = "Update";
				});
			} else {
				formAction = "Create";
				console.log("Error occured with code " + response.status);
				alert("Desila se greska!");
			}
		})
		.catch(error => console.log(error));
};


function cancelRegistracija() {
	showLogin();
}
function cancel() {
	formAction = "Create";
	refreshTable();
}
// osvezi prikaz tabele
function refreshTable() {
	// cistim formu
	document.getElementById("imeiprezime").value = "";
	document.getElementById("rola").value = "";
	document.getElementById("godinazaposlenja").value = "";
	document.getElementById("godinarodjenja").value = "";
	var plata = document.getElementById("plata").value = "";
	// osvezavam


};

function logout() {
	jwt_token = undefined;
	document.getElementById("info").innerHTML = "";
	document.getElementById("data").style.display = "none";
	document.getElementById("formDiv").style.display = "none";
	document.getElementById("loginForm").style.display = "block";
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("logout").style.display = "none";
	document.getElementById("btnLogin").style.display = "initial";
	document.getElementById("btnRegister").style.display = "initial";
	document.getElementById("loginFormStart").style.display = "none";
	document.getElementById("searchSellers").style.display = "none";
	document.getElementById("searchFormZaposleni").style.display = "none";



}
function submitSearchZaposleniForm() {

	var minpopulation = document.getElementById("minpopulation").value;
	var maxpopulation = document.getElementById("maxpopulation").value;
	var sendData = {
		"PrvaVrednost": minpopulation,
		"DrugaVrednost": maxpopulation,
	};
	var url = host + port + searchEndpoint;

	console.log("Objekat za slanje");
	console.log(sendData);

	fetch(url, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sendData) })
		.then((response) => {
			if (response.status === 200) {
				response.json().then(setZaposleni);
				document.getElementById("searchFormZaposleniForm").reset();
			} else {
				console.log("Error occured with code " + response.status);
				showError();
			}
		})
		.catch(error => console.log(error));
	return false;
}


function searchSellers() {
	var naziv = document.getElementById("startSearch").value;

	if (validateSearchForm(naziv)) {
		var url = host + port + searchsellerEndpoint;
		httpAction = "POST";
		sendData = {
			"StoreName": naziv,

		};
		var headers = { 'Content-Type': 'application/json' };
		if (jwt_token) {
			headers.Authorization = 'Bearer ' + jwt_token;		// headers.Authorization = 'Bearer ' + sessionStorage.getItem(data.token);
		}
		fetch(url, { method: httpAction, headers: headers, body: JSON.stringify(sendData) })
			.then((response) => {
				if (response.status === 200 || response.status === 201) {
					response.json().then(setSellers);
				} else {
					console.log("Error occured with code " + response.status);
					alert("Desila se greska!");
				}
			})
			.catch(error => console.log(error));
	}
	return false;
}


function setupPopper() {

	const button = document.getElementById('btnLogout');
	const tooltip = document.getElementById('tooltip');

	const popperInstance = Popper.createPopper(button, tooltip, {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 8],
				},
			},
		],
	});

	function show() {
		// Make the tooltip visible
		tooltip.setAttribute('data-show', '');

		// Enable the event listeners
		popperInstance.setOptions((options) => ({
			...options,
			modifiers: [
				...options.modifiers,
				{ name: 'eventListeners', enabled: true },
			],
		}));

		// Update its position
		popperInstance.update();
	}

	function hide() {
		// Hide the tooltip
		tooltip.removeAttribute('data-show');

		// Disable the event listeners
		popperInstance.setOptions((options) => ({
			...options,
			modifiers: [
				...options.modifiers,
				{ name: 'eventListeners', enabled: false },
			],
		}));
	}

	const showEvents = ['mouseenter', 'focus'];
	const hideEvents = ['mouseleave', 'blur'];

	showEvents.forEach((event) => {
		button.addEventListener(event, show);
	});

	hideEvents.forEach((event) => {
		button.addEventListener(event, hide);
	});

}