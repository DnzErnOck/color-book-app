// SvgPathGeometry.js

export const parseSvgContent = (svgContent) => {
    const paths = [];
  
    const getBoundingBox = (points) => {
      const xs = points.map(p => p.x);
      const ys = points.map(p => p.y);
      return {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys)
      };
    };
  
    const pathRegex = /<path[^>]*d="([^"]*)"[^>]*>/g;
    let match;
    while ((match = pathRegex.exec(svgContent)) !== null) {
      const pathData = match[1];
      const points = parseSvgPath(pathData);
      paths.push({ id: `path-${paths.length}`, d: pathData, points, bbox: getBoundingBox(points) });
    }
  
    const ellipseRegex = /<ellipse[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"[^>]*rx="([^"]+)"[^>]*ry="([^"]+)"[^>]*>/g;
    while ((match = ellipseRegex.exec(svgContent)) !== null) {
      const [_, cx, cy, rx, ry] = match.map(Number);
      const points = [];
      for (let i = 0; i < 20; i++) {
        const angle = (2 * Math.PI * i) / 20;
        points.push({ x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle) });
      }
      paths.push({ id: `ellipse-${paths.length}`, d: '', points, bbox: getBoundingBox(points) });
    }
  
    const circleRegex = /<circle[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"[^>]*r="([^"]+)"[^>]*>/g;
    while ((match = circleRegex.exec(svgContent)) !== null) {
      const [_, cx, cy, r] = match.map(Number);
      const points = [];
      for (let i = 0; i < 20; i++) {
        const angle = (2 * Math.PI * i) / 20;
        points.push({ x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
      }
      paths.push({ id: `circle-${paths.length}`, d: '', points, bbox: getBoundingBox(points) });
    }
  
    return paths;
  };
  
  export const parseViewBox = (svgContent) => {
    const viewBoxMatch = svgContent.match(/viewBox="([\d.\s\-]+)"/);
    if (!viewBoxMatch) {
      return { minX: 0, minY: 0, width: 512, height: 512 };
    }
  
    const [minX, minY, width, height] = viewBoxMatch[1].split(' ').map(Number);
    return { minX, minY, width, height };
  };
  
  export const pointInPolygon = (point, vs) => {
    let x = point.x, y = point.y;
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      let xi = vs[i].x, yi = vs[i].y;
      let xj = vs[j].x, yj = vs[j].y;
      let intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / ((yj - yi) || 1e-10) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  
  export const findContainingPath = (parsedPaths, x, y) => {
    for (let path of parsedPaths) {
      if (path?.points?.length && pointInPolygon({ x, y }, path.points)) {
        return path;
      }
    }
    return null;
  };
  
  
  export const screenToSvgCoords = (x, y, viewBox, containerRect) => {
    if (!containerRect || containerRect.width === 0 || containerRect.height === 0) {
      return { x: 0, y: 0 };
    }
    const scaleX = viewBox.width / containerRect.width;
    const scaleY = viewBox.height / containerRect.height;
    return {
      x: x * scaleX + viewBox.minX,
      y: y * scaleY + viewBox.minY
    };
  };
  
  const parseSvgPath = (d) => {
    const commands = d.match(/[a-df-z][^a-df-z]*/ig);
    const points = [];
    let current = { x: 0, y: 0 };
    for (let cmd of commands || []) {
      const type = cmd[0];
      const nums = cmd.slice(1).trim().split(/[ ,]+/).map(Number);
      if (type === 'M' || type === 'L') {
        for (let i = 0; i < nums.length; i += 2) {
          current = { x: nums[i], y: nums[i + 1] };
          points.push(current);
        }
      }
    }
    return points;
  };
  