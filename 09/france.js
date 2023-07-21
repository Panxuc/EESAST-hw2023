function main() {
	var canvas = document.getElementById('canvas');
	var gl = canvas.getContext('webgl');
	gl.clearColor(255 / 255, 255 / 255, 255 / 255, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
	var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
	var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
	var program = createProgram(gl, vertexShader, fragmentShader);
	gl.useProgram(program);
	var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
	var colorUniformLocation = gl.getUniformLocation(program, "u_color");
	gl.enableVertexAttribArray(positionAttributeLocation);
	var positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
	var primitiveType = gl.TRIANGLES;
	var count = 3;
	var positions = [
		-1.0, 1.0,
		-0.33, 1.0,
		-0.33, -1.0,
		-1.0, 1.0,
		-1.0, -1.0,
		-0.33, -1.0,
		-0.33, 1.0,
		0.33, 1.0,
		0.33, -1.0,
		-0.33, 1.0,
		-0.33, -1.0,
		0.33, -1.0,
		0.33, 1.0,
		1.0, 1.0,
		1.0, -1.0,
		0.33, 1.0,
		0.33, -1.0,
		1.0, -1.0
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	var colors = [
		[0 / 255, 85 / 255, 164 / 255],
		[0 / 255, 85 / 255, 164 / 255],
		[255 / 255, 255 / 255, 255 / 255],
		[255 / 255, 255 / 255, 255 / 255],
		[239 / 255, 65 / 255, 53 / 255],
		[239 / 255, 65 / 255, 53 / 255]
	];
	gl.clearColor(0, 0, 0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	for (var i = 0; i < colors.length; i++) {
		gl.uniform4f(colorUniformLocation, colors[i][0], colors[i][1], colors[i][2], 1);
		gl.drawArrays(primitiveType, i * 3, count);
	}
}

// 创建着色器方法，输入参数：渲染上下文，着色器类型，数据源
function createShader(gl, type, source) {
	var shader = gl.createShader(type); // 创建着色器对象
	gl.shaderSource(shader, source); // 提供数据源
	gl.compileShader(shader); // 编译 -> 生成着色器
	return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	return program;
}

main();