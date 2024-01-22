// This step was inspired by david_hughes_alb's Python code, which caches the base values of certain steps
// in the atmosphere, and that drastically increases the efficiency of the code and reduces runtime!
//						h,	    a,		T,			P,			rho
const baseValues = [[	0.00,	-6.5,	288.15, 	101325.00,  1.2250],
                    [	11.00,  0.0,	216.65,  	22625.791,  0.3640],
                    [	20.00,  1.0,	216.65,   	5471.940, 	0.0880],
                    [	32.00,  2.8,	228.65,     867.256, 	0.0130],
                    [	47.00,  0.0,	270.65,     110.767, 	0.0014],
                    [	51.00, -2.8,	270.65,     66.849, 	0.0008],
                    [	71.00, -2.0,	214.65,     3.949, 		0.0001]]
const R = 287.00;   // J/kg.K  
const gamma = 1.4;
const g = 9.80065;  // m/s^2

const roundNumber = (num, digits) => {
    return Math.round((num + Number.EPSILON) * (10 ** digits)) / (10 ** digits)
    // return parseFloat(num).toFixed(digits);
}

const getAdiabaticState = (i, h) => {
    let h_0 = baseValues[i][0];
    let a = baseValues[i][1];
    let T_0 = baseValues[i][2];
    let P_0 = baseValues[i][3];
    let rho_0 = baseValues[i][4];

    let T = T_0 + a * (h - h_0);
    let P =  ((T / T_0) ** ((g * -1) / (R * a / 1000))) * P_0;
    let rho = ((T / T_0) ** (((g * -1) / (R * a / 1000)) - 1)) * rho_0;
    let s = (gamma * R * T) ** 0.5;

    // [T, P, rho, s]
    return [roundNumber(T, 3), roundNumber(P, 4), roundNumber(rho, 6), roundNumber(s, 2)];
}

const getIsothermalState = (i, h) => {
    let h_0 = baseValues[i][0];
    let a = baseValues[i][1];
    let T = baseValues[i][2]; // Constant
    let P_0 = baseValues[i][3];
    let rho_0 = baseValues[i][4];

    let P = Math.exp(((-1 * g) / (R * T)) * ((h - h_0) * 1000)) * P_0;
    let rho = (P * rho_0) / P_0;
    let s = (gamma * R * T) ** 0.5;

    // [T, P, rho, s]
    return [roundNumber(T, 3), roundNumber(P, 4), roundNumber(rho, 6), roundNumber(s, 2)];
}

const getResult = h => {
	if (h <= 11) {                  // 0
        return getAdiabaticState(0, h);
    } else if (h > 11 && h <= 20) { // 1
        return getIsothermalState(1, h);
    } else if (h > 20 && h <= 32) { // 2
        return getAdiabaticState(2, h);
    } else if (h > 32 && h <= 47) { // 3
        return getAdiabaticState(3, h);
    } else if (h > 47 && h <= 51) { // 4
        return getIsothermalState(4, h);
    } else if (h > 51 && h <= 71) { // 5
        return getAdiabaticState(5, h);
    } else if (h > 71 && h <= 80) { // 6
        return getAdiabaticState(6, h);
    } else {
        alert("Oops! altitude must be below 80 km!");
    }
}