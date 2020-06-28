let finder = document.getElementById('finder');
let add = document.getElementById('add');

let Res;
let Nach = 0;
let Kon = 9;

let page = 1;

let Types;
let Okrugs;
let Rayons;

let checker1 = 0;

let RestDivArr = [];

function getRestaurants(){
	let AdmArea = document.getElementById('okrug');
	let District = document.getElementById('rayon');
	let TypeObject = document.getElementById('type');
	let Discount = document.getElementById('discount');
	let obXhr = new XMLHttpRequest();
	
	obXhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');
	obXhr.send();
	
	obXhr.onreadystatechange = function(){
		if(obXhr.readyState != 4) return;
		
		if(obXhr.status != 200){
			BadAlert();
		}

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			console.log(result);
			//GoodAlert();
			
			for (let i = 0; i < result.length - 1; i++){
				for (let j = 0; j < result.length - 1; j++){
					if (result[j].rate < result[j+1].rate){
						let temp = result[j];
						result[j] = result[j+1]
						result[j+1] = temp;
					}
				}
			}
			
			Res = result;
			console.log(result);
			
			let AllOkrugs = result.reduce(function(prev, curr){
				return [...prev, curr.admArea];
			}, [])
			
			SortByA(AllOkrugs);
					
			let AllRayons = result.reduce(function(prev, curr){
				return [...prev, curr.district];
			}, [])
			
			SortByA(AllRayons);
			
			let AllTypes = result.reduce(function(prev, curr){
				return [...prev, curr.typeObject];
			}, [])
			
			SortByA(AllTypes);
			
			let filter = function(Arr){
				let temp = {};				
				return Arr.filter(function(a){
					return a in temp ? 0 : temp[a] = 1;
				});
			};
			
			Okrugs = filter(AllOkrugs);
			Rayons = filter(AllRayons);
			Types = filter(AllTypes);
			
			for (let key in filter(AllOkrugs)){
				let okrug = document.createElement('option');
				okrug.innerHTML = `
						<p> ${filter(AllOkrugs)[key]} </p>
				`
				
				AdmArea.append(okrug);
			}
			
			for (let key in filter(AllRayons)){
				let rayon = document.createElement('option');
				rayon.innerHTML = `
						<p> ${filter(AllRayons)[key]} </p>
				`
				
				District.append(rayon);
			}
			
			for (let key in filter(AllTypes)){
				let types = document.createElement('option');
				types.innerHTML = `
						<p> ${filter(AllTypes)[key]} </p>
				`
				
				TypeObject.append(types);
			}
		}
	}	
}

function findRestaurants(){
    let Sel_Area = document.getElementById('okrug').value;
	let Sel_Dist = document.getElementById('rayon').value;
	let Sel_Type = document.getElementById('type').value;
	let Sel_Disc = document.getElementById('discount').value;
	let Sel_Name = document.getElementById('name').value;
	let Sel_SeatsFrom = document.getElementById('fromSeats').value;
	let Sel_SeatsTo = document.getElementById('toSeats').value;
	let Sel_DateFrom = document.getElementById('fromDate').value;
	let Sel_DateTo = document.getElementById('toDate').value;
	
	let counter = 0;
	
	Nach = 0;
	Kon = 9;
	
	page = 1;
	
	RestDivArr = []; //Чистка массива
	
	let Places = document.getElementById('Places');
	Places.innerHTML = "";
	
	myPages.innerHTML = '';
	
	Alert.innerHTML = ''; //Чистим алерт
	
	let MenuBlock = document.getElementById('menu');
	
	let tableRest = document.getElementById('table_Rest');
	
	tableRest.innerHTML = `
		<div style = "background-color: royalblue; color: white" class = "row border border-primary ml-3 mr-3">
			<div class = "col-3">
				<h5> Название </h5>
			</div>
					
			<div class = "col-3">
				<h5> Тип </h5>
			</div>
					
			<div class = "col-4">
				<h5> Адрес </h5>
			</div>
					
			<div class = "col-2">
				<h5> Действия </h5>
			</div>
		</div>	
	`
	
	let obXhr = new XMLHttpRequest();
	
	obXhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');
	obXhr.send();
	
	obXhr.onreadystatechange = function(){
		if(obXhr.readyState != 4) return;
		
		if(obXhr.status != 200){
			BadAlert();
		}

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			console.log(result);
			GoodAlert();
			
			for (let i = 0; i < result.length - 1; i++){
				for (let j = 0; j < result.length - 1; j++){
					if (result[j].rate < result[j+1].rate){
						let temp = result[j];
						result[j] = result[j+1]
						result[j+1] = temp;
					}
				}
			}
			
			Res = result;
			
			for (let i in Res){
				if (((Res[i].admArea == Sel_Area) || (Sel_Area == 'Не выбрано')) && ((Res[i].district == Sel_Dist) || (Sel_Dist == 'Не выбрано')) && ((Res[i].typeObject == Sel_Type) || (Sel_Type == 'Не выбрано'))
					&& ((Res[i].socialPrivileges == Sel_Disc) || (Sel_Disc == 'Не выбрано')) && ((Res[i].name == Sel_Name) || (Sel_Name == ''))  && ((Res[i].seatsCount >= Sel_SeatsFrom) || (Sel_SeatsFrom == ''))
					&& ((Res[i].seatsCount <= Sel_SeatsTo) || (Sel_SeatsTo == '')) && ((Res[i].created_at >= Sel_DateFrom) || (Sel_DateFrom == '')) && ((Res[i].created_at <= Sel_DateTo) || (Sel_DateTo == ''))){
				
					let newDiv = document.createElement('div');
					newDiv.className = "row border border-primary ml-3 mr-3";
					
					newDiv.innerHTML = `
						<div class = "col-3 mt-3">
							<h6> ${Res[i].name} </h6>
						</div>
								
						<div class = "col-3 mt-3">
							<h6> ${Res[i].typeObject} </h6>
						</div>
								
						<div class = "col-4 mt-3 text-danger">
							<h6> ${Res[i].address} </h6>
						</div>
								
						<div class = "col-2 mt-2 mb-2">
							<button type="button" class="look form-control" data-toggle="modal" data-target="#exampleModal">
								<img src = "look.png" width = "37px"; height = "37px">
							</button>
							
							<button type="button" class="update form-control" data-toggle="modal" data-target="#exampleUpdate">
								<img src = "redact.png" width = "37px"; height = "37px">
							</button>
							
							<button type="button" class="delete form-control" data-toggle="modal" data-target="#exampleDelete">
								<img src = "bin.png" width = "37px"; height = "37px">
							</button>
						</div>
					`
					
					RestDivArr.push(newDiv);
					
					if (counter < 10){
						Places.append(newDiv);
					}
					
					counter++;
				}
			}
			
			let newPage = document.createElement('div');
			newPage.className = "col text-center";
			newPage.id = "Paginate";
			
			newPage.innerHTML = `
			
			<button  class = "form-control" id = "prev"> Пред. </button> <button class = "form-control" id = "next"> След. </button>
			`
			
			myPages.append(newPage);
			
			let newEl = document.createElement('div');
			newEl.id = "Pnum";
			
			newEl.innerHTML = `
			<h5 class = "ml-4"> Номер страницы: <span id = "myPage" class = "text-danger"> 1 </span> </h5>
			`
			
			Paginate.append(newEl);
			
			let next = document.getElementById('next');
			let previous = document.getElementById('prev');
			next.addEventListener('click', NextPage);
			previous.addEventListener('click', PrevPage);
		}
	}
}

function Look(){
	//alert(1);
	Alert.innerHTML = '';
	console.log(event.target.parentNode);
	let Restaurant = FindId(event.target.parentNode);
	let id = Restaurant.id;
	console.log(id);
	
	let NetObj;
	let Company;
	let Disc;
	
	let Info = document.getElementById('info_table');
	console.log(Info);
	
	Info.innerHTML = '';
	
	let obXhr = new XMLHttpRequest();
	
	obXhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/'+id); //Просмотр
	obXhr.send();
	
	obXhr.onreadystatechange = function(){
		if(obXhr.readyState != 4) return;
		
		if(obXhr.status != 200){
			BadAlert();
		}

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			console.log(result);
			GoodAlert();
			
			if (result.isNetObject == 0){
				NetObj = 'Нет';
			}
			else{
				NetObj = 'Да';
			}
			
			if (result.socialPrivileges == 0){
				Disc = 'Нет';
			}
			else{
				Disc = 'Да';
			}
			
			if (result.operatingCompany == 0){
				Company = '--';
			}
			else{
				Company = result.operatingCompany;
			}
			
			let newDiv = document.createElement('div');
			newDiv.className = "row"
			newDiv.innerHTML = `
			<div class = "col-6">
				<p class = "text-danger"> Наименование </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.name} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Является сетевым </p>
			</div>
			
			<div class = "col-6">
				<p> ${NetObj} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Управл. компания </p>
			</div>
			
			<div class = "col-6">
				<p> ${Company} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Вид объекта </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.typeObject} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Адм. округ </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.admArea} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Район </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.district} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Адрес </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.address} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Число мест </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.seatsCount} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Льготы </p>
			</div>
			
			<div class = "col-6">
				<p> ${Disc} </p>
			</div>
			
			<div class = "col-6">
				<p class = "text-danger"> Телефон </p>
			</div>
			
			<div class = "col-6">
				<p> ${result.publicPhone} </p>
			</div>
			`
			
			Info.append(newDiv);
		}
	}	
}

function Update(){
	Alert.innerHTML = '';
	let myEvent = event.target.parentNode;
	console.log(myEvent);
	let Restaurant = FindId(myEvent);
	console.log(Restaurant);
	let id = Restaurant.id;
	console.log(id);
	
	if (checker1 == 0){
		for (let key in Okrugs){
			let okrug = document.createElement('option');
			okrug.innerHTML = `
			<p> ${Okrugs[key]} </p>
			`
			myOkrug.append(okrug);
		}
		
		for (let key in Rayons){
			let rayon = document.createElement('option');
			rayon.innerHTML = `
			<p> ${Rayons[key]} </p>
			`
			myRayon.append(rayon);
		}
		
		for (let key in Types){
			let type = document.createElement('option');
			type.innerHTML = `
			<p> ${Types[key]} </p>
			`
			myType.append(type);
		}
		
		checker1++;
	}

	let name = document.getElementById('name_R');
	name.value = Restaurant.name;
	
	let company = document.getElementById('company_R');
	company.value = Restaurant.operatingCompany;
	
	myOkrug.value = Restaurant.admArea;
	myRayon.value = Restaurant.district;
	myType.value = Restaurant.typeObject;
	
	isNet.value = Restaurant.isNetObject;
	myAddress.value = Restaurant.address;
	
	mySeats.value = Restaurant.seatsCount;
	myPhone.value = Restaurant.publicPhone;
	mySoc.value = Restaurant.socialPrivileges;
	
	myRating.value = Restaurant.rate;
	myDiscount.value = Restaurant.socialDiscount;
	
	mySet_1.value = Restaurant.set_1;
	mySet_2.value = Restaurant.set_2;	
	mySet_3.value = Restaurant.set_3;	
	mySet_4.value = Restaurant.set_4;	
	mySet_5.value = Restaurant.set_5;	
	mySet_6.value = Restaurant.set_6;	
	mySet_7.value = Restaurant.set_7;	
	mySet_8.value = Restaurant.set_8;	
	mySet_9.value = Restaurant.set_9;	
	mySet_10.value = Restaurant.set_10;	
	
	
	Saver.onclick = function(){
		let obXhr = new XMLHttpRequest();
		
		let data = 'name=' + name.value+ '&operatingCompany=' +company.value+ '&admArea=' +myOkrug.value+ '&typeObject='+myType.value+ '&isNetObject=' +isNet.value+ '&address=' +myAddress.value+
		'&seatsCount=' +mySeats.value+ '&publicPhone=' +myPhone.value+ '&socialPrivileges=' +mySoc.value+ '&rate=' +myRating.value+ '&socialDiscount=' +myDiscount.value+ '&set_1=' +mySet_1.value+
		'&set_2=' +mySet_2.value+ '&set_3=' +mySet_3.value+ '&set_4=' +mySet_4.value+ '&set_5=' +mySet_5.value+ '&set_6=' +mySet_6.value+ '&set_7=' +mySet_7.value+ '&set_8=' +mySet_8.value+ 
		'&set_9=' +mySet_9.value+ '&set_10=' +mySet_10.value;
		
		obXhr.open('PUT', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/'+id); //Изменение
		obXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
		
		obXhr.send(data);
		
		obXhr.onreadystatechange = function(){
			if(obXhr.readyState != 4) return;
			
			if(obXhr.status != 200){
				BadAlert();
			}

			if(obXhr.response){
				let result = JSON.parse(obXhr.response);
				console.log(result);
				GoodAlert();
				
				for (let i in Res){
					if (Res[i].id == result.id){
						Res[i] = result;
						console.log(Res[i]);
					}
				}
				
				myEvent.parentNode.parentNode.children[0].children[0].innerText = result.name;
				myEvent.parentNode.parentNode.children[1].children[0].innerText = result.typeObject;
				myEvent.parentNode.parentNode.children[2].children[0].innerText = result.address;
				
				let Chistka = document.querySelectorAll('textarea, select, input');
				//console.log(Chistka);
				
				for (let i in Chistka){
					if (i > 9){
						Chistka[i].value = '';
					}
				}
			}
		}
	}
}

function Delete(){   //Не забыть сделать модальное окно
	Alert.innerHTML = '';
	let myEvent = event.target.parentNode;
	let Restaurant = FindId(myEvent);
	let id = Restaurant.id;
	let YesBut = document.getElementById('yes');
	
	console.log(myEvent.parentNode.parentNode);
	
	YesBut.onclick = function(){
		let obXhr = new XMLHttpRequest();
		
		obXhr.open('DELETE', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/'+id); //Удаление
		obXhr.send();
		
		obXhr.onreadystatechange = function(){
			if(obXhr.readyState != 4) return;
			
			if(obXhr.status != 200){
				BadAlert();
			}

			if(obXhr.response){
				let result = JSON.parse(obXhr.response);
				GoodAlert();
				//DelId = result;
				console.log(result);
				//console.log(RestDivArr);
				
				for (let i in RestDivArr){
					//console.log(RestDivArr[i].children[2].children[0].innerText, Restaurant.address);
					if ((`${RestDivArr[i].children[0].children[0].innerText}` == Restaurant.name) && (`${RestDivArr[i].children[2].children[0].innerText}` == Restaurant.address || `${RestDivArr[i].children[2].children[0].innerText}` == 'null')){
						RestDivArr.splice(i, 1);
						myEvent.parentNode.parentNode.remove();
						//console.log(RestDivArr);
					}
				}
			}
		}
	}
}

function FindId(target){
	let Name = target.parentNode.parentNode.children[0].children[0].innerText;  
	let Address = target.parentNode.parentNode.children[2].children[0].innerText;
	let Type = target.parentNode.parentNode.children[1].children[0].innerText;	
	
	console.log(Name, Address, Type);

	for (let key in Res){
		if ((`${Res[key].address}` == Address) && (`${Res[key].name}` == Name)){
			return Res[key];
		}
	}		
}

function NextPage(){
	console.log(RestDivArr.length);
	if (RestDivArr.length - Nach > 10){
		page++;
		console.log(page);
		Nach = Kon + 1;
		Kon = Nach + 9;
		console.log(Nach);
		
		let Places = document.getElementById('Places');
		Places.innerHTML = "";
		
		for (let i = Nach; i <= Kon; i++){
			if (RestDivArr[i] != undefined){
				Places.append(RestDivArr[i]);
			}
		}
		
		myPage.innerText = page;
	}
	else{
		alert('Это последняя страница!');
		return;
	}
}

function PrevPage(){
	if (Nach > 9){
		page--;
		console.log(page);
		Nach = Nach - 10;
		Kon = Nach + 9;
		
		let Places = document.getElementById('Places');
		Places.innerHTML = "";
		
		for (let i = Nach; i <= Kon; i++){
			Places.append(RestDivArr[i]);
		}
		
		myPage.innerText = page;
	}
	else{
		alert('Это первая страница!');
		return;
	}
}

function addToList(){
	Alert.innerHTML = '';
	
	if (checker1 == 0){
		for (let key in Okrugs){
			let okrug = document.createElement('option');
			okrug.innerHTML = `
			<p> ${Okrugs[key]} </p>
			`
			myOkrug.append(okrug);
		}
		
		for (let key in Rayons){
			let rayon = document.createElement('option');
			rayon.innerHTML = `
			<p> ${Rayons[key]} </p>
			`
			myRayon.append(rayon);
		}
		
		for (let key in Types){
			let type = document.createElement('option');
			type.innerHTML = `
			<p> ${Types[key]} </p>
			`
			myType.append(type);
		}
	
		checker1++;
	}	
	
	Saver.onclick = function(){		
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1");
		  
		let formData = new FormData(elem);
		xhr.send(formData);
		  
		xhr.onreadystatechange = function(){
			if(xhr.readyState != 4) return;
			
			if(xhr.status != 200){
				BadAlert();
			}

			if(xhr.response){
				let result = JSON.parse(xhr.response);
				console.log(Res);
				console.log(result);
				GoodAlert();
				Res.push(result);
				console.log(Res);
				//findRestaurants();
				
				let newDiv = document.createElement('div');
				newDiv.className = "row border border-primary ml-3 mr-3";
					
				newDiv.innerHTML = `
					<div class = "col-3 mt-3">
						<h6> ${result.name} </h6>
					</div>
								
					<div class = "col-3 mt-3">
						<h6> ${result.typeObject} </h6>
					</div>
								
					<div class = "col-4 mt-3 text-danger">
						<h6> ${result.address} </h6>
					</div>
								
					<div class = "col-2 mt-2 mb-2">
						<button type="button" class="look form-control" data-toggle="modal" data-target="#exampleModal">
							<img src = "look.png" width = "37px"; height = "37px">
						</button>
							
						<button type="button" class="update form-control" data-toggle="modal" data-target="#exampleUpdate">
							<img src = "redact.png" width = "37px"; height = "37px">
						</button>
							
						<button type="button" class="delete form-control" data-toggle="modal" data-target="#exampleDelete">
							<img src = "bin.png" width = "37px"; height = "37px">
						</button>
					</div>
				`
					
				RestDivArr.push(newDiv);
				
				if (RestDivArr.length <= 10 || page > 1){
					if (RestDivArr.length > 1){
						Places.append(newDiv);
					}
				}
			}
		}
	}
	
	let Chistka = document.querySelectorAll('textarea, select, input');
	for (let i in Chistka){
		if (i > 9){
			Chistka[i].value = '';
		}
	}
}


function SortByA(result){
	for (let i = 0; i < result.length - 1; i++){
		for (let j = 0; j < result.length - 1; j++){
			if (result[j] > result[j+1]){
				let temp = result[j];
				result[j] = result[j+1]
				result[j+1] = temp;
			}
		}
	}
}

function ButChecker(){
	butsLook = document.querySelectorAll('.look');
	let butsUpdate = document.querySelectorAll('.update');
	let butsDelete = document.querySelectorAll('.delete');
			
	for (let but of butsLook){
		but.addEventListener('click', Look);
	}
			
	for (let but of butsUpdate){
		but.addEventListener('click', Update);
	}
			
	for (let but of butsDelete){
		but.addEventListener('click', Delete);
	}
}

function BadAlert(){
	let AlertZone = document.getElementById('Alert');
			
	let newAlert = document.createElement('div');
	newAlert.className = "alert alert-danger alert-dismissible fade show ml-2 mr-2";
	newAlert.role = "alert";
			
	newAlert.innerHTML = `
		<button type = "button" class = "close" data-dismiss = "alert">
			&times;
		</button>
				
		<h4 class="alert-heading">Ошибки!</h4>
		<hr>
		<p> Данные не загружены </p>
		<p> Введите другие значения или перезайдите на сайт </p>
	`

	AlertZone.append(newAlert);
			
	setTimeout(function () {
		AlertZone.innerHTML = '';
	}, 5000);
			
	return;	
}

function GoodAlert(){
	let AlertZone = document.getElementById('Alert');
			
	let newAlert = document.createElement('div');
	newAlert.className = "alert alert-success alert-dismissible fade show ml-2 mr-2";
	newAlert.role = "alert";
			
	newAlert.innerHTML = `
		<button type = "button" class = "close" data-dismiss = "alert">
			&times;
		</button>
				
		<h4 class="alert-heading">Совершены изменения!</h4>
		<hr>
		<p> Данные успешно загружены. </p>
	`

	AlertZone.append(newAlert);
			
	setTimeout(function () {
		AlertZone.innerHTML = '';
	}, 5000);
			
	return;
}

setInterval(ButChecker, 250);

getRestaurants();
finder.addEventListener('click', findRestaurants);
add.addEventListener('click', addToList);