import p5 from "p5";

const sketch = self => {
    self.setup = () => {
	self.createCanvas(600, 600);
	self.noStroke();
	self.fill(255, 255, 0);
    };
    //Андрей и Денис прибыли
    let k = 0.2;
    let T = 0.0;
    let X_balls = [];
    let Y_balls = [];
    let VX_balls = [];
    let VY_balls = [];

    let temp_X_balls = [];
    let temp_Y_balls = [];
    let temp_VX_balls = [];
    let temp_VY_balls = [];

    let dT = 0.01;
    let nu = 0.00;
    let NRows = 80;
    let NCols = 80;
    let Step = 10;

    // self.mouseIsPressed
    // Заполним кристаллическую решетку
    for (let row = 0; row < NRows; row++) {
	X_balls.push([]);
	Y_balls.push([]);
	VX_balls.push([]);
	VY_balls.push([]);

	temp_X_balls.push([]);
	temp_Y_balls.push([]);
	temp_VX_balls.push([]);
	temp_VY_balls.push([]);

	for (let col = 0; col < NCols; col++) {
	    X_balls[row].push(1.2 * Step * col);
	    Y_balls[row].push(1.2 * Step * row);
	    if (row == 0) {
		VX_balls[row].push(0.0);
	    } else {
		VX_balls[row].push(0.0);
	    }

	    VY_balls[row].push(0.0);

	    temp_X_balls[row].push(Step * col);
	    temp_Y_balls[row].push(Step * row);
	    temp_VX_balls[row].push(0.0);
	    temp_VY_balls[row].push(0.0);
	}
    }

    //VX_balls[0][0] = 5.0;
    //VY_balls[0][0] = 5.0;

    self.draw = () => {
	self.background(0, 0, 0);
	self.noStroke();
	self.fill(255, 255, 0);

	if(T > 800000) {
	    nu = 0.04;
	}
	
	for (let step = 0; step < 100; step++) {
	    for (let row = 0; row < NRows; ++row) {
		for (let col = 0; col < NCols; ++col) {
		    let ax = 0.0;
		    let ay = 0.0;
		    
		    for (let delta_row = -1; delta_row <= 1; delta_row++) {
			for (let delta_col = -1; delta_col <= 1; delta_col++) {
			    if (delta_row == 0 && delta_col == 0) {
				continue;
			    }

			    let nb_row = row + delta_row;
			    let nb_col = col + delta_col;
			    if (
				nb_row < 0 ||
				    nb_row >= NRows ||
				    nb_col < 0 ||
				    nb_col >= NCols
			    ) {
				continue;
			    }

			    let x0 = X_balls[row][col];
			    let y0 = Y_balls[row][col];
			    let x1 = X_balls[nb_row][nb_col];
			    let y1 = Y_balls[nb_row][nb_col];

			    let s;
			    if (delta_row == delta_col || delta_row == -delta_col) {
				s = Math.sqrt(2) * Step;
			    } else {
				s = Step;
			    }

			    let l = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);

			    ax += k * (1 - s / l) * (x1 - x0);
			    ay += k * (1 - s / l) * (y1 - y0);
			}
		    }

		    ax += -nu * VX_balls[row][col];
		    ay += -nu * VY_balls[row][col];

		    temp_X_balls[row][col] = X_balls[row][col] + VX_balls[row][col] * dT;
		    temp_Y_balls[row][col] = Y_balls[row][col] + VY_balls[row][col] * dT;
		    temp_VX_balls[row][col] = VX_balls[row][col] + ax * dT;
		    temp_VY_balls[row][col] = VY_balls[row][col] + ay * dT;
		    T += dT;
		}
	    }

	    // UPDATE
	    for (let row = 0; row < NRows; row++) {
		for (let col = 0; col < NCols; col++) {
		    X_balls[row][col] = temp_X_balls[row][col];
		    Y_balls[row][col] = temp_Y_balls[row][col];
		    VX_balls[row][col] = temp_VX_balls[row][col];
		    VY_balls[row][col] = temp_VY_balls[row][col];
		}
	    }
	}

	for (let row = 0; row < NRows; row++) {
	    for (let col = 0; col < NCols; col++) {
		self.ellipse(0 + X_balls[row][col] * 0.5, 0 + Y_balls[row][col] * 0.5, 2, 2);
	    }
	}
	self.stroke(255);
	self.fill(255,255,255);
	self.text(T, 10, 20);
	// self.stroke(255);
	//self.line(X0, Y0 - 25, X0, Y0 + 25);
	//self.line(X0 - 25, Y0, X0 + 25, Y0);
    };
};

const P5 = new p5(sketch);
