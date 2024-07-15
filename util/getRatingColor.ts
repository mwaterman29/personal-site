const getRatingColor = (rating: number) => {
    // Define color codes
    const colors = {
      red: [158, 21, 11],
      yellow: [255, 235, 56],
      green: [0, 143, 0],
      cyan: [0, 222, 214],
      cyanStart: [130, 196, 194]
    };
  
    let startColor, endColor;
    let fraction: number;
  
    if (rating <= 50) {
      // 0 - 50 goes from red to yellow
      startColor = colors.red;
      endColor = colors.yellow;
      fraction = rating / 50;
    } else if (rating < 100) {
      // 50 - 100 goes from yellow to green
      startColor = colors.yellow;
      endColor = colors.green;
      fraction = (rating - 50) / 50;
    } else if (rating <= 130) {
      // 100 - 130 goes from green to cyan
      startColor = colors.cyanStart;
      endColor = colors.cyan;
      fraction = (rating - 100) / 30;
    } else {
      // Rating above 130 defaults to cyan
      startColor = colors.cyan;
      endColor = colors.cyan;
      fraction = 0;
    }
  
    const interpolate = (start: number, end: number, fraction: number) => 
      Math.round(start + (end - start) * fraction);
  
    const r = interpolate(startColor[0], endColor[0], fraction);
    const g = interpolate(startColor[1], endColor[1], fraction);
    const b = interpolate(startColor[2], endColor[2], fraction);
  
    return `rgb(${r}, ${g}, ${b})`
  };

export default getRatingColor;