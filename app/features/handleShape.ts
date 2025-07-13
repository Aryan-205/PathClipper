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
  let now = Date.now(); // Base timestamp for IDs

  const width = canvasSize.x;
  const height = canvasSize.y;
  const centerX = width / 2;
  const centerY = height / 2;
  const smallOffset = 10; // A small offset for arrows to create distinct points

  switch (selectedShapeName) {
    case "Custom":
      newDivs = [];
      break;
    case "Triangle":
      newDivs = [
        { id: now++, xPosition: centerX, yPosition: 0 },         // Top center
        { id: now++, xPosition: 0, yPosition: height },         // Bottom left
        { id: now++, xPosition: width, yPosition: height },     // Bottom right
      ];
      break;
    case "Square":
      newDivs = [
        { id: now++, xPosition: 0, yPosition: 0 },
        { id: now++, xPosition: width, yPosition: 0 },
        { id: now++, xPosition: width, yPosition: height },
        { id: now++, xPosition: 0, yPosition: height },
      ];
      break;
    case "Circle":
      // For a perfect circle, clip-path: circle() is used directly.
      // If you need points to approximate a circle, you'd calculate many points on its circumference.
      // For `path()`, a common approach is to use a polygon that approximates it,
      // but it's not ideal for smooth curves. I'll provide an empty array as `path()`
      // is not typically used for perfect circles.
      newDivs = [];
      break;
    case "Ellipse":
      // Similar to Circle, `clip-path: ellipse()` is used directly.
      newDivs = [];
      break;
    case "Trapezoid":
      // Example: 20% cut off from top width on each side
      const trapezoidTopWidth = width * 0.6; // e.g., 60% of total width
      const trapezoidSideCut = (width - trapezoidTopWidth) / 2;
      newDivs = [
        { id: now++, xPosition: trapezoidSideCut, yPosition: 0 },               // Top-left
        { id: now++, xPosition: width - trapezoidSideCut, yPosition: 0 },       // Top-right
        { id: now++, xPosition: width, yPosition: height },                     // Bottom-right
        { id: now++, xPosition: 0, yPosition: height },                         // Bottom-left
      ];
      break;
    case "Parallelogram":
      // Example: skewed by 20% of width
      const skewAmount = width * 0.2;
      newDivs = [
        { id: now++, xPosition: skewAmount, yPosition: 0 },             // Top-left (shifted right)
        { id: now++, xPosition: width, yPosition: 0 },                   // Top-right
        { id: now++, xPosition: width - skewAmount, yPosition: height }, // Bottom-right (shifted left)
        { id: now++, xPosition: 0, yPosition: height },                 // Bottom-left
      ];
      break;
    case "Rhombus":
      newDivs = [
        { id: now++, xPosition: centerX, yPosition: 0 },       // Top middle
        { id: now++, xPosition: width, yPosition: centerY },   // Right middle
        { id: now++, xPosition: centerX, yPosition: height },  // Bottom middle
        { id: now++, xPosition: 0, yPosition: centerY },       // Left middle
      ];
      break;
    case "Left arrow":
      newDivs = [
        { id: now++, xPosition: width, yPosition: 0 },                           // Top right
        { id: now++, xPosition: width, yPosition: height },                     // Bottom right
        { id: now++, xPosition: centerX, yPosition: height },                   // Bottom center
        { id: now++, xPosition: 0, yPosition: centerY },                         // Left middle point
        { id: now++, xPosition: centerX, yPosition: 0 },                       // Top center
      ];
      break;
    case "Right arrow":
      newDivs = [
        { id: now++, xPosition: 0, yPosition: 0 },                               // Top left
        { id: now++, xPosition: centerX, yPosition: 0 },                       // Top center
        { id: now++, xPosition: width, yPosition: centerY },                   // Right middle point
        { id: now++, xPosition: centerX, yPosition: height },                 // Bottom center
        { id: now++, xPosition: 0, yPosition: height },                         // Bottom left
      ];
      break;
    case "Left Point": // A shape pointing left, like a speech bubble or flag
        newDivs = [
            { id: now++, xPosition: width, yPosition: 0 },                  // Top right
            { id: now++, xPosition: width, yPosition: height },              // Bottom right
            { id: now++, xPosition: 0, yPosition: centerY },                // Left middle (the point)
        ];
        break;
    case "Right Point": // A shape pointing right
        newDivs = [
            { id: now++, xPosition: 0, yPosition: 0 },                      // Top left
            { id: now++, xPosition: width, yPosition: centerY },           // Right middle (the point)
            { id: now++, xPosition: 0, yPosition: height },                 // Bottom left
        ];
        break;
    case "Left Chevron":
      newDivs = [
        { id: now++, xPosition: width, yPosition: 0 },
        { id: now++, xPosition: centerX, yPosition: centerY }, // Middle point
        { id: now++, xPosition: width, yPosition: height },
      ];
      break;
    case "Right Chevron":
      newDivs = [
        { id: now++, xPosition: 0, yPosition: 0 },
        { id: now++, xPosition: centerX, yPosition: centerY }, // Middle point
        { id: now++, xPosition: 0, yPosition: height },
      ];
      break;
    case "Star":
      // A 5-point star. This is a bit more complex, using proportional points.
      // These are approximate points for a basic star shape.
      newDivs = [
        { id: now++, xPosition: centerX, yPosition: 0 }, // Top point
        { id: now++, xPosition: width * 0.65, yPosition: height * 0.35 }, // Right inner
        { id: now++, xPosition: width, yPosition: height * 0.35 }, // Right outer
        { id: now++, xPosition: width * 0.75, yPosition: height * 0.6 }, // Right bottom inner
        { id: now++, xPosition: width * 0.85, yPosition: height }, // Bottom right outer
        { id: now++, xPosition: centerX, yPosition: height * 0.75 }, // Bottom middle inner
        { id: now++, xPosition: width * 0.15, yPosition: height }, // Bottom left outer
        { id: now++, xPosition: width * 0.25, yPosition: height * 0.6 }, // Left bottom inner
        { id: now++, xPosition: 0, yPosition: height * 0.35 }, // Left outer
        { id: now++, xPosition: width * 0.35, yPosition: height * 0.35 }, // Left inner
      ];
      break;
    case "Cross":
      // A simple plus-sign cross shape
      const barWidth = width * 0.3; // Width of the horizontal/vertical bars
      const barHeight = height * 0.3; // Height of the horizontal/vertical bars
      const outerHorizontalStart = centerX - barWidth / 2;
      const outerHorizontalEnd = centerX + barWidth / 2;
      const outerVerticalStart = centerY - barHeight / 2;
      const outerVerticalEnd = centerY + barHeight / 2;

      newDivs = [
        // Top T-section
        { id: now++, xPosition: outerHorizontalStart, yPosition: 0 },
        { id: now++, xPosition: outerHorizontalEnd, yPosition: 0 },
        { id: now++, xPosition: outerHorizontalEnd, yPosition: outerVerticalStart },
        // Right T-section
        { id: now++, xPosition: width, yPosition: outerVerticalStart },
        { id: now++, xPosition: width, yPosition: outerVerticalEnd },
        { id: now++, xPosition: outerHorizontalEnd, yPosition: outerVerticalEnd },
        // Bottom T-section
        { id: now++, xPosition: outerHorizontalEnd, yPosition: height },
        { id: now++, xPosition: outerHorizontalStart, yPosition: height },
        { id: now++, xPosition: outerHorizontalStart, yPosition: outerVerticalEnd },
        // Left T-section
        { id: now++, xPosition: 0, yPosition: outerVerticalEnd },
        { id: now++, xPosition: 0, yPosition: outerVerticalStart },
        { id: now++, xPosition: outerHorizontalStart, yPosition: outerVerticalStart },
      ];
      break;
    default:
      newDivs = [];
      break;
  }
  return newDivs;
};