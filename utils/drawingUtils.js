// Noktaları düzleştirme fonksiyonu - daha doğal çizim için
export const smoothPoints = (points, factor = 0.2) => {
    if (points.length < 3) return points;
    
    const smoothed = [points[0]];
    
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i-1];
      const curr = points[i];
      const next = points[i+1];
      
      // Basit ağırlıklı ortalama ile düzleştirme
      smoothed.push({
        x: curr.x * (1-factor) + (prev.x + next.x) * factor/2,
        y: curr.y * (1-factor) + (prev.y + next.y) * factor/2,
        pressure: curr.pressure
      });
    }
    
    smoothed.push(points[points.length-1]);
    return smoothed;
  };
  
  // Bezier eğri oluştur - daha yumuşak çizgiler için
  export const createSvgPath = (points) => {
    if (!points || points.length < 2) {
      return '';
    }
    
    // Catmull-Rom spline ile noktaları düzleştir
    const smoothedPoints = smoothPoints(points);
    
    let path = `M ${smoothedPoints[0].x} ${smoothedPoints[0].y}`;
    
    for (let i = 1; i < smoothedPoints.length; i++) {
      const pressureFactor = smoothedPoints[i].pressure ?? 1.0;
      const prevPressure = smoothedPoints[i-1].pressure ?? 1.0;
      
      // Kübik Bezier eğrileri - uyarlanabilir kontrol noktaları
      if (i < smoothedPoints.length - 1) {
        const nextPressure = smoothedPoints[i+1].pressure ?? 1.0;
        
        // Basınç ve yöne göre kontrol noktalarını ayarla
        const dx = smoothedPoints[i+1].x - smoothedPoints[i-1].x;
        const dy = smoothedPoints[i+1].y - smoothedPoints[i-1].y;
        const len = Math.sqrt(dx*dx + dy*dy);
        
        // Normalize et ve basınca göre ölçekle
        const nx = len > 0 ? dx/len : 0;
        const ny = len > 0 ? dy/len : 0;
        
        // Kontrol noktası gerilimi - basınç arttıkça düşer (daha kalın çizgiler)
        const tension = 0.5 * (1 - pressureFactor * 0.5);
        
        const cp1x = smoothedPoints[i-1].x + nx * tension * len/3;
        const cp1y = smoothedPoints[i-1].y + ny * tension * len/3;
        const cp2x = smoothedPoints[i].x - nx * tension * len/3;
        const cp2y = smoothedPoints[i].y - ny * tension * len/3;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${smoothedPoints[i].x} ${smoothedPoints[i].y}`;
      } else {
        // Son nokta
        path += ` L ${smoothedPoints[i].x} ${smoothedPoints[i].y}`;
      }
    }
    
    return path;
  };
  
  // Basınca duyarlı stroke genişliği hesapla
  export const getStrokeWidth = (baseWidth, pressure) => {
    return baseWidth * (pressure ?? 1.0);
  };