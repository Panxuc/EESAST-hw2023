class Student {
	constructor(name, id, chinese, math, english, physics, chemistry, biology, politics, history, geography) {
		this.name = name;
		this.id = id;
		this.chinese = chinese;
		this.math = math;
		this.english = english;
		this.physics = physics;
		this.chemistry = chemistry;
		this.biology = biology;
		this.politics = politics;
		this.history = history;
		this.geography = geography;
	}
	print() {
		console.log(this.name);
		console.log(this.id);
		console.log(this.chinese);
		console.log(this.math);
		console.log(this.english);
		console.log(this.physics);
		console.log(this.chemistry);
		console.log(this.biology);
		console.log(this.politics);
		console.log(this.history);
		console.log(this.geography);
	}
	getTotal() {
		var ret = 0;
		if (!isNaN(this.chinese)) {
			ret += this.chinese;
		}
		if (!isNaN(this.math)) {
			ret += this.math;
		}
		if (!isNaN(this.english)) {
			ret += this.english;
		}
		if (!isNaN(this.physics)) {
			ret += this.physics;
		}
		if (!isNaN(this.chemistry)) {
			ret += this.chemistry;
		}
		if (!isNaN(this.biology)) {
			ret += this.biology;
		}
		if (!isNaN(this.politics)) {
			ret += this.politics;
		}
		if (!isNaN(this.history)) {
			ret += this.history;
		}
		if (!isNaN(this.geography)) {
			ret += this.geography;
		}
		return ret;
	}
	getAverage() {
		var ret = 0;
		var count = 0;
		if (!isNaN(this.chinese)) {
			ret += this.chinese;
			count++;
		}
		if (!isNaN(this.math)) {
			ret += this.math;
			count++;
		}
		if (!isNaN(this.english)) {
			ret += this.english;
			count++;
		}
		if (!isNaN(this.physics)) {
			ret += this.physics;
			count++;
		}
		if (!isNaN(this.chemistry)) {
			ret += this.chemistry;
			count++;
		}
		if (!isNaN(this.biology)) {
			ret += this.biology;
			count++;
		}
		if (!isNaN(this.politics)) {
			ret += this.politics;
			count++;
		}
		if (!isNaN(this.history)) {
			ret += this.history;
			count++;
		}
		if (!isNaN(this.geography)) {
			ret += this.geography;
			count++;
		}
		ret /= count;
		return ret;
	}
}

function add() {
	var name = document.getElementById("name").value;
	var id = document.getElementById("id").value;
	var chinese = parseFloat(document.getElementById("chinese").value);
	var math = parseFloat(document.getElementById("math").value);
	var english = parseFloat(document.getElementById("english").value);
	var physics = parseFloat(document.getElementById("physics").value);
	var chemistry = parseFloat(document.getElementById("chemistry").value);
	var biology = parseFloat(document.getElementById("biology").value);
	var politics = parseFloat(document.getElementById("politics").value);
	var history = parseFloat(document.getElementById("history").value);
	var geography = parseFloat(document.getElementById("geography").value);
	var student = new Student(name, id, chinese, math, english, physics, chemistry, biology, politics, history, geography);
	var table = document.getElementById("table");
	var row = table.insertRow();
	var cell1 = row.insertCell();
	var cell2 = row.insertCell();
	var cell3 = row.insertCell();
	var cell4 = row.insertCell();
	var cell5 = row.insertCell();
	var cell6 = row.insertCell();
	var cell7 = row.insertCell();
	var cell8 = row.insertCell();
	var cell9 = row.insertCell();
	var cell10 = row.insertCell();
	var cell11 = row.insertCell();
	var cell12 = row.insertCell();
	var cell13 = row.insertCell();
	var cell14 = row.insertCell();
	cell1.innerHTML = student.name;
	cell2.innerHTML = student.id;
	cell3.innerHTML = student.chinese;
	cell4.innerHTML = student.math;
	cell5.innerHTML = student.english;
	cell6.innerHTML = student.physics;
	cell7.innerHTML = student.chemistry;
	cell8.innerHTML = student.biology;
	cell9.innerHTML = student.politics;
	cell10.innerHTML = student.history;
	cell11.innerHTML = student.geography;
	cell12.innerHTML = student.getTotal();
	cell13.innerHTML = student.getAverage();
	cell14.innerHTML = '<button onclick="analyse(this)">分析</button><button onclick="del(this)">删除</button>';
}

function del(obj) {
	var tr = obj.parentNode.parentNode;
	tr.parentNode.removeChild(tr);
}

function analyse(obj) {
	// 用canvas画雷达图
	var tr = obj.parentNode.parentNode;
	var tds = tr.getElementsByTagName("td");
	var chinese = parseFloat(tds[2].innerHTML);
	var math = parseFloat(tds[3].innerHTML);
	var english = parseFloat(tds[4].innerHTML);
	var physics = parseFloat(tds[5].innerHTML);
	var chemistry = parseFloat(tds[6].innerHTML);
	var biology = parseFloat(tds[7].innerHTML);
	var politics = parseFloat(tds[8].innerHTML);
	var history = parseFloat(tds[9].innerHTML);
	var geography = parseFloat(tds[10].innerHTML);
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// 画出坐标轴
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 2 / 9) * math / 150, 250 + 200 * Math.sin(Math.PI * 2 / 9) * math / 150);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 4 / 9) * english / 150, 250 + 200 * Math.sin(Math.PI * 4 / 9) * english / 150);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 6 / 9) * physics / 100, 250 + 200 * Math.sin(Math.PI * 6 / 9) * physics / 100);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 8 / 9) * chemistry / 100, 250 + 200 * Math.sin(Math.PI * 8 / 9) * chemistry / 100);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 10 / 9) * biology / 100, 250 + 200 * Math.sin(Math.PI * 10 / 9) * biology / 100);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 12 / 9) * politics / 100, 250 + 200 * Math.sin(Math.PI * 12 / 9) * politics / 100);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 14 / 9) * history / 100, 250 + 200 * Math.sin(Math.PI * 14 / 9) * history / 100);
	ctx.moveTo(250, 250);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 16 / 9) * geography / 100, 250 + 200 * Math.sin(Math.PI * 16 / 9) * geography / 100);
	ctx.stroke();
	// 画出各个点
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 2 / 9) * math / 150, 250 + 200 * Math.sin(Math.PI * 2 / 9) * math / 150, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 4 / 9) * english / 150, 250 + 200 * Math.sin(Math.PI * 4 / 9) * english / 150, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 6 / 9) * physics / 100, 250 + 200 * Math.sin(Math.PI * 6 / 9) * physics / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 8 / 9) * chemistry / 100, 250 + 200 * Math.sin(Math.PI * 8 / 9) * chemistry / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 10 / 9) * biology / 100, 250 + 200 * Math.sin(Math.PI * 10 / 9) * biology / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 12 / 9) * politics / 100, 250 + 200 * Math.sin(Math.PI * 12 / 9) * politics / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 14 / 9) * history / 100, 250 + 200 * Math.sin(Math.PI * 14 / 9) * history / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.beginPath();
	ctx.arc(250 + 200 * Math.cos(Math.PI * 16 / 9) * geography / 100, 250 + 200 * Math.sin(Math.PI * 16 / 9) * geography / 100, 5, 0, 2 * Math.PI);
	ctx.fill();
	// 画出各个点的连线
	ctx.beginPath();
	ctx.moveTo(250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 2 / 9) * math / 150, 250 + 200 * Math.sin(Math.PI * 2 / 9) * math / 150);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 4 / 9) * english / 150, 250 + 200 * Math.sin(Math.PI * 4 / 9) * english / 150);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 6 / 9) * physics / 100, 250 + 200 * Math.sin(Math.PI * 6 / 9) * physics / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 8 / 9) * chemistry / 100, 250 + 200 * Math.sin(Math.PI * 8 / 9) * chemistry / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 10 / 9) * biology / 100, 250 + 200 * Math.sin(Math.PI * 10 / 9) * biology / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 12 / 9) * politics / 100, 250 + 200 * Math.sin(Math.PI * 12 / 9) * politics / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 14 / 9) * history / 100, 250 + 200 * Math.sin(Math.PI * 14 / 9) * history / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 16 / 9) * geography / 100, 250 + 200 * Math.sin(Math.PI * 16 / 9) * geography / 100);
	ctx.lineTo(250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150);
	ctx.stroke();
	// 画出各个点的名字
	ctx.fillText("语文", 250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150);
	ctx.fillText("数学", 250 + 200 * Math.cos(Math.PI * 2 / 9) * math / 150, 250 + 200 * Math.sin(Math.PI * 2 / 9) * math / 150);
	ctx.fillText("英语", 250 + 200 * Math.cos(Math.PI * 4 / 9) * english / 150, 250 + 200 * Math.sin(Math.PI * 4 / 9) * english / 150);
	ctx.fillText("物理", 250 + 200 * Math.cos(Math.PI * 6 / 9) * physics / 100, 250 + 200 * Math.sin(Math.PI * 6 / 9) * physics / 100);
	ctx.fillText("化学", 250 + 200 * Math.cos(Math.PI * 8 / 9) * chemistry / 100, 250 + 200 * Math.sin(Math.PI * 8 / 9) * chemistry / 100);
	ctx.fillText("生物", 250 + 200 * Math.cos(Math.PI * 10 / 9) * biology / 100, 250 + 200 * Math.sin(Math.PI * 10 / 9) * biology / 100);
	ctx.fillText("政治", 250 + 200 * Math.cos(Math.PI * 12 / 9) * politics / 100, 250 + 200 * Math.sin(Math.PI * 12 / 9) * politics / 100);
	ctx.fillText("历史", 250 + 200 * Math.cos(Math.PI * 14 / 9) * history / 100, 250 + 200 * Math.sin(Math.PI * 14 / 9) * history / 100);
	ctx.fillText("地理", 250 + 200 * Math.cos(Math.PI * 16 / 9) * geography / 100, 250 + 200 * Math.sin(Math.PI * 16 / 9) * geography / 100);
	// 画出各个点的分数
	ctx.fillText(chinese, 250 + 200 * Math.cos(Math.PI * 0 / 9) * chinese / 150, 250 + 200 * Math.sin(Math.PI * 0 / 9) * chinese / 150 - 10);
	ctx.fillText(math, 250 + 200 * Math.cos(Math.PI * 2 / 9) * math / 150, 250 + 200 * Math.sin(Math.PI * 2 / 9) * math / 150 - 10);
	ctx.fillText(english, 250 + 200 * Math.cos(Math.PI * 4 / 9) * english / 150, 250 + 200 * Math.sin(Math.PI * 4 / 9) * english / 150 - 10);
	ctx.fillText(physics, 250 + 200 * Math.cos(Math.PI * 6 / 9) * physics / 100, 250 + 200 * Math.sin(Math.PI * 6 / 9) * physics / 100 - 10);
	ctx.fillText(chemistry, 250 + 200 * Math.cos(Math.PI * 8 / 9) * chemistry / 100, 250 + 200 * Math.sin(Math.PI * 8 / 9) * chemistry / 100 - 10);
	ctx.fillText(biology, 250 + 200 * Math.cos(Math.PI * 10 / 9) * biology / 100, 250 + 200 * Math.sin(Math.PI * 10 / 9) * biology / 100 - 10);
	ctx.fillText(politics, 250 + 200 * Math.cos(Math.PI * 12 / 9) * politics / 100, 250 + 200 * Math.sin(Math.PI * 12 / 9) * politics / 100 - 10);
	ctx.fillText(history, 250 + 200 * Math.cos(Math.PI * 14 / 9) * history / 100, 250 + 200 * Math.sin(Math.PI * 14 / 9) * history / 100 - 10);
	ctx.fillText(geography, 250 + 200 * Math.cos(Math.PI * 16 / 9) * geography / 100, 250 + 200 * Math.sin(Math.PI * 16 / 9) * geography / 100 - 10);
}