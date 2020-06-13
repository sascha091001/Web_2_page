let finder = document.getElementById('finder');
let Rest;

let Nach = 0;
let Kon = 9;

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

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			console.log(result);
			
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
			
			//console.log(AllOkrugs);
			//console.log(AllRayons);
			//console.log(AllTypes);
			
			let filter = function(Arr){
				let temp = {};				
				return Arr.filter(function(a){
					return a in temp ? 0 : temp[a] = 1;
				});
			};
			
			
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
	
	RestDivArr = []; //Чистка массива
	
	let Places = document.getElementById('Places');
	Places.innerHTML = "";
	
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
						
				<div class = "col-2 mt-3">
					<h6> ${Res[i].typeObject} </h6>
				</div>
						
				<div class = "col-4 mt-3 text-danger">
					<h6> ${Res[i].address} </h6>
				</div>
						
				<div class = "col-3 mt-2">
					<button type="button" class="look btn-primary form-control" data-toggle="modal" data-target="#exampleModal">
						Просм.
					</button>
					
					<button class = "form-control update"> Обнов. </button>
					
					<button type="button" class="delete btn-primary form-control" data-toggle="modal" data-target="#exampleDelete">
						Удален.
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
	
	let next = document.getElementById('next');
	let previous = document.getElementById('prev');
	next.addEventListener('click', NextPage);
	previous.addEventListener('click', PrevPage);
	//3 Кнопки
	
	let butsLook = document.querySelectorAll('.look');
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

function Look(){
	//alert(1);
	console.log(event.target);
	let id = FindId(event.target);
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

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			console.log(result);
			
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
	alert(2);
}

function Delete(){   //Не забыть сделать модальное окно
	let myEvent = event.target;
	let id = FindId(myEvent);
	let YesBut = document.getElementById('yes');
	let NoBut = document.getElementById('no');
	
	//console.log(YesBut);
	YesBut.onclick = function(){
		console.log(id);
		
		let obXhr = new XMLHttpRequest();
		
		obXhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/'+id); //Удаление
		obXhr.send();
		
		obXhr.onreadystatechange = function(){
			if(obXhr.readyState != 4) return;

			if(obXhr.response){
				let result = JSON.parse(obXhr.response);
				console.log(result);
				myEvent.parentNode.parentNode.remove();
			}
		}
	}
}

function FindId(taget){
	let Name = event.target.parentNode.parentNode.children[0].children[0].innerText;    //Если выбираем, то выводится по параметрам поиска
	let Address = event.target.parentNode.parentNode.children[2].children[0].innerText;
	let Type = event.target.parentNode.parentNode.children[1].children[0].innerText;
		
	for (let key in Res){
		if (Res[key].address == Address && Res[key].name == Name && Res[key].typeObject == Type){
			Rest = Res[key];
		}
	}
	
	return Rest.id;
	
}

function NextPage(){
	console.log(RestDivArr.length);
	if (RestDivArr.length - Nach > 10){
		console.log(Nach);
		Nach = Kon + 1;
		Kon = Nach + 9;
		
		let Places = document.getElementById('Places');
		Places.innerHTML = "";
		
		for (let i = Nach; i <= Kon; i++){
			if (RestDivArr[i] != undefined){
				Places.append(RestDivArr[i]);
			}
		}
		
		let butsLook = document.querySelectorAll('.look');
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
	else{
		alert('Это последняя страница!');
		return;
	}
}

function PrevPage(){
	if (Nach > 9){
		Nach = Nach - 10;
		Kon = Nach + 9;
		
		let Places = document.getElementById('Places');
		Places.innerHTML = "";
		
		for (let i = Nach; i <= Kon; i++){
			Places.append(RestDivArr[i]);
		}
	}
	else{
		alert('Это первая страница!');
		return;
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

getRestaurants();
finder.addEventListener('click', findRestaurants);