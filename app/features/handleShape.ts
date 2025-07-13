interface DivData {
  id: number;
  xPosition: number;
  yPosition: number;
}

interface CanvasSize {
  x: number;
  y: number;
}

/**
 * Calculates the array of div points for a given shape and canvas size.
 * @param {string} selectedShapeName - The name of the selected shape.
 * @param {CanvasSize} canvasSize - The current dimensions of the canvas.
 * @returns {DivData[]} An array of DivData objects.
 */
export const calculateShapeDivs = (selectedShapeName: string, canvasSize: CanvasSize): DivData[] => {
  let newDivs: DivData[] = [];
  let id = 0 // Base timestamp for IDs

  const width = canvasSize.x;
  const height = canvasSize.y;
  const centerX = width / 2;
  const centerY = height / 2;

  switch (selectedShapeName) {
    case "Custom":
      newDivs = [];
      break;
    case "Triangle":
      newDivs = [
        { id: id++, xPosition: centerX, yPosition: 0 },         // Top center
        { id: id++, xPosition: 0, yPosition: height },         // Bottom left
        { id: id++, xPosition: width, yPosition: height },     // Bottom right
      ];
      break;
    case "Square":
      newDivs = [
        { id: id++, xPosition: 0, yPosition: 0 },
        { id: id++, xPosition: width, yPosition: 0 },
        { id: id++, xPosition: width, yPosition: height },
        { id: id++, xPosition: 0, yPosition: height },
      ];
      break;
    case "Message":
      newDivs = [
        { id: id++, xPosition: 0, yPosition: 0 },
        { id: id++, xPosition: width, yPosition: 0 },
        { id: id++, xPosition: width, yPosition: (2*height)/3 },
        { id: id++, xPosition: 3*width/4, yPosition: (2*height)/3 },
        { id: id++, xPosition: 3*width/4, yPosition: height },
        { id: id++, xPosition: width/2, yPosition: (2*height)/3 },
        { id: id++, xPosition: 0, yPosition: (2*height)/3 },
      ];
      break;
    case "Ben":
      newDivs = [
        { id: id++, xPosition: 0, yPosition: 0 },
        { id: id++, xPosition: width, yPosition: 0 },
        { id: id++, xPosition: 2*width/3, yPosition: height/2 },
        { id: id++, xPosition: width, yPosition: height },
        { id: id++, xPosition: 0, yPosition: height },
        { id: id++, xPosition: width/3, yPosition: height/2 },
      ];
      break;
    case "Trapezoid":
      const trapezoidTopWidth = width * 0.6; // e.g., 60% of total width
      const trapezoidSideCut = (width - trapezoidTopWidth) / 2;
      newDivs = [
        { id: id++, xPosition: trapezoidSideCut, yPosition: 0 },               // Top-left
        { id: id++, xPosition: width - trapezoidSideCut, yPosition: 0 },       // Top-right
        { id: id++, xPosition: width, yPosition: height },                     // Bottom-right
        { id: id++, xPosition: 0, yPosition: height },                         // Bottom-left
      ];
      break;
    case "Parallelogram":
      const skewAmount = width * 0.2;
      newDivs = [
        { id: id++, xPosition: skewAmount, yPosition: 0 },             // Top-left (shifted right)
        { id: id++, xPosition: width, yPosition: 0 },                   // Top-right
        { id: id++, xPosition: width - skewAmount, yPosition: height }, // Bottom-right (shifted left)
        { id: id++, xPosition: 0, yPosition: height },                 // Bottom-left
      ];
      break;
    case "Rhombus":
      newDivs = [
        { id: id++, xPosition: centerX, yPosition: 0 },       // Top middle
        { id: id++, xPosition: width, yPosition: centerY },   // Right middle
        { id: id++, xPosition: centerX, yPosition: height },  // Bottom middle
        { id: id++, xPosition: 0, yPosition: centerY },       // Left middle
      ];
      break;
    case "Left arrow":
      newDivs = [
        { id: id++, xPosition: width, yPosition: 0 },                           // Top right
        { id: id++, xPosition: width, yPosition: height },                     // Bottom right
        { id: id++, xPosition: centerX, yPosition: height },                   // Bottom center
        { id: id++, xPosition: 0, yPosition: centerY },                         // Left middle point
        { id: id++, xPosition: centerX, yPosition: 0 },                       // Top center
      ];
      break;
    case "Right arrow":
      newDivs = [
        { id: id++, xPosition: 0, yPosition: 0 },                               // Top left
        { id: id++, xPosition: centerX, yPosition: 0 },                       // Top center
        { id: id++, xPosition: width, yPosition: centerY },                   // Right middle point
        { id: id++, xPosition: centerX, yPosition: height },                 // Bottom center
        { id: id++, xPosition: 0, yPosition: height },                         // Bottom left
      ];
      break;
    case "Left Point":
        newDivs = [
            { id: id++, xPosition: width, yPosition: 0 },
            { id: id++, xPosition: width, yPosition: height },
            { id: id++, xPosition: 0, yPosition: centerY },
        ];
        break;
    case "Right Point":
        newDivs = [
            { id: id++, xPosition: 0, yPosition: 0 },
            { id: id++, xPosition: width, yPosition: centerY },
            { id: id++, xPosition: 0, yPosition: height },
        ];
        break;
    case "Pentagon":
      {
        const numSides = 5;
        const angleOffset = -Math.PI / 2;
        
        const isSquare = width === height;
        const radiusX = isSquare ? Math.min(width, height) / 2 : width / 2;
        const radiusY = isSquare ? radiusX : height / 2;

        for (let i = 0; i < numSides; i++) {
          const angle = angleOffset + (i * 2 * Math.PI) / numSides;
          const x = centerX + radiusX * Math.cos(angle);
          const y = centerY + radiusY * Math.sin(angle);
          newDivs.push({ id: id++, xPosition: x, yPosition: y });
        }
      }
      break;
    case "Hexagon":
      {
        const numSides = 6;
        const angleOffset = Math.PI / 6;
        
        const isSquare = width === height;
        const radiusX = isSquare ? Math.min(width, height) / 2 : width / 2;
        const radiusY = isSquare ? radiusX : height / 2;

        for (let i = 0; i < numSides; i++) {
          const angle = angleOffset + (i * 2 * Math.PI) / numSides;
          const x = centerX + radiusX * Math.cos(angle);
          const y = centerY + radiusY * Math.sin(angle);
          newDivs.push({ id: id++, xPosition: x, yPosition: y });
        }
      }
      break;
    case "Star":
      newDivs = [
        { id: id++, xPosition: centerX, yPosition: 0 }, // Top point
        { id: id++, xPosition: width * 0.65, yPosition: height * 0.35 }, // Right inner
        { id: id++, xPosition: width, yPosition: height * 0.35 }, // Right outer
        { id: id++, xPosition: width * 0.75, yPosition: height * 0.6 }, // Right bottom inner
        { id: id++, xPosition: width * 0.85, yPosition: height }, // Bottom right outer
        { id: id++, xPosition: centerX, yPosition: height * 0.75 }, // Bottom middle inner
        { id: id++, xPosition: width * 0.15, yPosition: height }, // Bottom left outer
        { id: id++, xPosition: width * 0.25, yPosition: height * 0.6 }, // Left bottom inner
        { id: id++, xPosition: 0, yPosition: height * 0.35 }, // Left outer
        { id: id++, xPosition: width * 0.35, yPosition: height * 0.35 }, // Left inner
      ];
      break;
    case "Cross":
      const barWidth = width * 0.3;
      const barHeight = height * 0.3;
      const outerHorizontalStart = centerX - barWidth / 2;
      const outerHorizontalEnd = centerX + barWidth / 2;
      const outerVerticalStart = centerY - barHeight / 2;
      const outerVerticalEnd = centerY + barHeight / 2;

      newDivs = [
        { id: id++, xPosition: outerHorizontalStart, yPosition: 0 },
        { id: id++, xPosition: outerHorizontalEnd, yPosition: 0 },
        { id: id++, xPosition: outerHorizontalEnd, yPosition: outerVerticalStart },
        { id: id++, xPosition: width, yPosition: outerVerticalStart },
        { id: id++, xPosition: width, yPosition: outerVerticalEnd },
        { id: id++, xPosition: outerHorizontalEnd, yPosition: outerVerticalEnd },
        { id: id++, xPosition: outerHorizontalEnd, yPosition: height },
        { id: id++, xPosition: outerHorizontalStart, yPosition: height },
        { id: id++, xPosition: outerHorizontalStart, yPosition: outerVerticalEnd },
        { id: id++, xPosition: 0, yPosition: outerVerticalEnd },
        { id: id++, xPosition: 0, yPosition: outerVerticalStart },
        { id: id++, xPosition: outerHorizontalStart, yPosition: outerVerticalStart },
      ];
      break;
    default:
      newDivs = [];
      break;
  }
  return newDivs;
};