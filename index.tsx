
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {FunctionDeclaration, GoogleGenAI, Type} from '@google/genai';

// Global type declarations for Google Maps API
declare global {
  namespace google { // Top-level google namespace
    namespace maps { // maps namespace

      // INTERFACES FOR OPTIONS / LITERALS (data structures)
      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        mapId?: string;
        gestureHandling?: string;
        zoomControl?: boolean;
        mapTypeControl?: boolean;
        scaleControl?: boolean;
        streetViewControl?: boolean;
        rotateControl?: boolean;
        fullscreenControl?: boolean;
        cameraControl?: boolean;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      interface LatLngBoundsLiteral {
        east: number;
        north: number;
        south: number;
        west: number;
      }

      interface Point { // Point can be new'd or an object literal
        x: number;
        y: number;
      }

      interface Symbol {
        path?: string | number; // number for google.maps.SymbolPath
        anchor?: Point;
        fillColor?: string;
        fillOpacity?: number;
        labelOrigin?: Point;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
      }

      interface IconSequence {
        icon?: Symbol;
        offset?: string;
        repeat?: string;
      }

      interface MapPanes {
        floatPane: HTMLElement;
        mapPane?: HTMLElement;
        markerLayer?: HTMLElement;
        overlayLayer?: HTMLElement;
        overlayMouseTarget?: HTMLElement;
      }

      interface MapCanvasProjection {
        fromLatLngToDivPixel(latLng: LatLng): Point | null;
        fromDivPixelToLatLng(pixel: Point, noClampNoWrap?: boolean): LatLng | null;
      }

      interface Padding {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      }

      interface PolylineOptions {
        path?: any[] | MVCArray<LatLng>;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        map?: Map;
        icons?: IconSequence[];
      }

      // Nested namespace for marker
      namespace marker {
          interface AdvancedMarkerElementOptions {
            map?: Map;
            position?: LatLng | LatLngLiteral;
            title?: string;
            content?: Node | string;
          }
          // Class for AdvancedMarkerElement instances
          class AdvancedMarkerElement {
            constructor(options?: AdvancedMarkerElementOptions);
            // Instance properties - can be refined based on actual API
            map?: Map | null;
            position?: LatLng | null;
            title?: string | null;
            content?: Node | string | null;
            // ... other properties/methods based on API
          }
      }

      // CLASSES FOR MAP OBJECTS (these define instance shape AND constructors)
      class LatLng {
        constructor(lat: number, lng: number, noWrap?: boolean);
        constructor(literal: LatLngLiteral, noWrap?: boolean);
        equals(other: LatLng): boolean;
        lat(): number;
        lng(): number;
        toString(): string;
        toUrlValue(precision?: number): string;
        toJSON(): LatLngLiteral;
      }

      class LatLngBounds {
        constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
        contains(latLng: LatLng | LatLngLiteral): boolean;
        equals(other: LatLngBounds | null): boolean;
        extend(point: LatLng | LatLngLiteral): void;
        getCenter(): LatLng;
        getNorthEast(): LatLng;
        getSouthWest(): LatLng;
        intersects(other: LatLngBounds): boolean;
        isEmpty(): boolean;
        toJSON(): { north: number; south: number; east: number; west: number; };
        toSpan(): LatLng;
        toString(): string;
        toUrlValue(precision?: number): string;
        union(other: LatLngBounds): LatLngBounds;
      }

      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
        getBounds(): LatLngBounds | null | undefined;
        getCenter(): LatLng;
        getDiv(): HTMLElement;
        getHeading(): number;
        getMapTypeId(): string; // Adjust if using MapTypeId enum
        getProjection(): MapCanvasProjection | null | undefined;
        getStreetView(): StreetViewPanorama;
        getTilt(): number;
        getZoom(): number | undefined; // Changed to number | undefined based on docs
        panBy(x: number, y: number): void;
        panTo(latLng: LatLng | LatLngLiteral): void;
        panToBounds(latLngBounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
        setCenter(latlng: LatLng | LatLngLiteral): void;
        setHeading(heading: number): void;
        setMapTypeId(mapTypeId: string): void; // Adjust if using MapTypeId enum
        setOptions(options: MapOptions): void;
        setStreetView(panorama: StreetViewPanorama | null): void;
        setTilt(tilt: number): void;
        setZoom(zoom: number): void;
        // Controls, data, mapTypes, overlayMapTypes are MVCArrays or complex objects
        // For simplicity, they can be `any` or more detailed interfaces if needed
        controls: MVCArray<Node>[]; // Array of MVCArrays
        data: Data;
        mapTypes: any; // MapTypeRegistry;
        overlayMapTypes: MVCArray<any>; // MVCArray<MapType | null>;
      }
      // Define StreetViewPanorama and Data if needed, or use 'any'
      interface StreetViewPanorama {}
      interface Data {}


      class Polyline {
        constructor(opts?: PolylineOptions);
        getDraggable(): boolean;
        getEditable(): boolean;
        getMap(): Map | null;
        getPath(): MVCArray<LatLng>;
        getVisible(): boolean;
        setDraggable(draggable: boolean): void;
        setEditable(editable: boolean): void;
        setMap(map: Map | null): void;
        setOptions(options: PolylineOptions): void;
        setPath(path: MVCArray<LatLng> | LatLng[] | LatLngLiteral[]): void;
        setVisible(visible: boolean): void;
      }

      class OverlayView {
        constructor();
        draw(): void;
        getMap(): Map | StreetViewPanorama | null | undefined;
        getPanes(): MapPanes | null;
        getProjection(): MapCanvasProjection;
        onAdd(): void;
        onRemove(): void;
        setMap(map: Map | StreetViewPanorama | null): void;
        static preventMapHitsAndGesturesFrom(element: Element): void;
      }

      class MVCArray<T> {
        constructor(array?: T[]);
        clear(): void;
        forEach(callback: (elem: T, index: number) => void): void;
        getArray(): T[];
        getAt(i: number): T;
        getLength(): number;
        insertAt(i: number, elem: T): void;
        pop(): T | undefined; // Changed to T | undefined
        push(elem: T): number;
        removeAt(i: number): T;
        setAt(i: number, elem: T): void;
      }

      class Point {
          constructor(x: number, y: number);
          x: number;
          y: number;
          equals(other: Point | null): boolean; // Added | null
          toString(): string;
      }


      // importLibrary function
      // Note: `typeof Map` now refers to `typeof google.maps.Map` (the class)
      function importLibrary(libraryName: 'maps'): Promise<{Map: typeof Map, Polyline: typeof Polyline, OverlayView: typeof OverlayView}>;
      function importLibrary(libraryName: 'core'): Promise<{LatLng: typeof LatLng, LatLngBounds: typeof LatLngBounds, Point: typeof Point, MVCArray: typeof MVCArray<any>}>; // Removed LatLngLiteral from here as it's an interface
      function importLibrary(libraryName: 'marker'): Promise<{AdvancedMarkerElement: typeof marker.AdvancedMarkerElement}>;
      function importLibrary(libraryName: string): Promise<any>; // Fallback

    } // end namespace maps
  } // end namespace google

  // This assumes the Google Maps script assigns to window.google
  // The `google` object is globally available through the namespace declaration above.

} // end declare global


// Asynchronously import Google Maps libraries using the new namespaced types for casting
const {Map, Polyline, OverlayView} = await google.maps.importLibrary('maps') as { Map: typeof google.maps.Map, Polyline: typeof google.maps.Polyline, OverlayView: typeof google.maps.OverlayView };
const {LatLng, LatLngBounds} = await google.maps.importLibrary('core') as { LatLng: typeof google.maps.LatLng, LatLngBounds: typeof google.maps.LatLngBounds };
const {AdvancedMarkerElement} = await google.maps.importLibrary('marker') as { AdvancedMarkerElement: typeof google.maps.marker.AdvancedMarkerElement };


// Define CustomPopup class at module scope
class CustomPopup extends OverlayView { // Extends the imported OverlayView constructor
  private position: google.maps.LatLng;
  private containerDiv: HTMLDivElement;
  public contentElement: HTMLElement;

  constructor(position: google.maps.LatLng, content: HTMLElement) {
    super();
    this.position = position;
    this.contentElement = content;

    this.contentElement.classList.add('popup-bubble');

    this.containerDiv = document.createElement('div');
    this.containerDiv.classList.add('popup-container');
    this.containerDiv.appendChild(this.contentElement);

    // Use the static method from the base class constructor through the imported variable
    OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
  }

  onAdd() {
    const panes = this.getPanes();
    if (panes) {
      panes.floatPane.appendChild(this.containerDiv);
    }
  }

  onRemove() {
    if (this.containerDiv.parentElement) {
      this.containerDiv.parentElement.removeChild(this.containerDiv);
    }
  }

  draw() {
    const projection = this.getProjection();
    if (projection) {
      const divPosition = projection.fromLatLngToDivPixel(this.position);
      if (divPosition) {
        const display =
          Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
            ? 'block'
            : 'none';

        if (display === 'block') {
          this.containerDiv.style.left = divPosition.x + 'px';
          this.containerDiv.style.top = divPosition.y + 'px';
        }

        if (this.containerDiv.style.display !== display) {
          this.containerDiv.style.display = display;
        }
      }
    }
  }
}


// Application state variables
let map: google.maps.Map; // Holds the Google Map instance
let points: google.maps.LatLng[] = []; // Array to store geographical points from responses
let markers: google.maps.marker.AdvancedMarkerElement[] = []; // Array to store map markers
interface LineData {
  poly: google.maps.Polyline;
  geodesicPoly: google.maps.Polyline;
  name: string;
  transport?: string;
  travelTime?: string;
  day?: number; // Added day property
}
let lines: LineData[] = []; // Array to store polylines representing routes/connections

interface PopUpData {
  name: string;
  description: string;
  position: google.maps.LatLng;
  popup: CustomPopup; // CustomPopup instance
  content: HTMLElement;
  time?: string;
  duration?: string;
  sequence?: number;
  day?: number; // Added day property
}
let popUps: PopUpData[] = []; // Array to store custom popups for locations
let bounds: google.maps.LatLngBounds; // Google Maps LatLngBounds object to fit map around points
let activeCardIndex = 0; // Index of the currently selected location card
let isPlannerMode = false; // Flag to indicate if Day Planner mode is active
let dayPlanItinerary: PopUpData[] = []; // Array to hold structured items for the day plan timeline. Now includes 'day'.
let totalDaysInPlan = 1; // For multi-day plans

// DOM Element references
const generateButton = document.querySelector('#generate');
const resetButton = document.querySelector('#reset');
const cardContainer = document.querySelector(
  '#card-container',
) as HTMLDivElement;
const carouselIndicators = document.querySelector(
  '#carousel-indicators',
) as HTMLDivElement;
const prevCardButton = document.querySelector(
  '#prev-card',
) as HTMLButtonElement;
const nextCardButton = document.querySelector(
  '#next-card',
) as HTMLButtonElement;
const cardCarousel = document.querySelector('.card-carousel') as HTMLDivElement;
const plannerModeToggle = document.querySelector(
  '#planner-mode-toggle',
) as HTMLInputElement;
const timelineContainer = document.querySelector(
  '#timeline-container',
) as HTMLDivElement;
const timeline = document.querySelector('#timeline') as HTMLDivElement;
const timelineTitleElement = document.querySelector('#timeline-title') as HTMLHeadingElement;
const closeTimelineButton = document.querySelector(
  '#close-timeline',
) as HTMLButtonElement;
const exportPlanButton = document.querySelector(
  '#export-plan',
) as HTMLButtonElement;
const directionsButton = document.querySelector(
  '#directions-button',
) as HTMLButtonElement;
const mapContainer = document.querySelector('#map-container');
const timelineToggle = document.querySelector('#timeline-toggle');
const mapOverlay = document.querySelector('#map-overlay');
const spinner = document.querySelector('#spinner');
const errorMessage = document.querySelector('#error-message');

// Initializes the Google Map instance.
async function initMap() {
  bounds = new LatLngBounds();

  map = new Map(document.getElementById('map') as HTMLElement, { // Use imported Map constructor
    center: new LatLng(-34.397, 150.644), // Use imported LatLng constructor
    zoom: 8, // Default zoom
    mapId: '4504f8b37365c3d0', // Custom map ID for styling
    gestureHandling: 'greedy', // Allows easy map interaction on all devices
    zoomControl: false,
    cameraControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  });
}

// Initialize the map as soon as the script loads.
await initMap();

// Function declaration for extracting location data using Google AI.
const locationFunctionDeclaration: FunctionDeclaration = {
  name: 'location',
  parameters: {
    type: Type.OBJECT,
    description: 'Geographic coordinates of a location.',
    properties: {
      name: {
        type: Type.STRING,
        description: 'Name of the location.',
      },
      description: {
        type: Type.STRING,
        description:
          'Description of the location: why is it relevant, details to know.',
      },
      lat: {
        type: Type.STRING,
        description: 'Latitude of the location.',
      },
      lng: {
        type: Type.STRING,
        description: 'Longitude of the location.',
      },
      time: {
        type: Type.STRING,
        description:
          'Time of day to visit this location (e.g., "09:00", "14:30").',
      },
      duration: {
        type: Type.STRING,
        description:
          'Suggested duration of stay at this location (e.g., "1 hour", "45 minutes").',
      },
      sequence: {
        type: Type.NUMBER,
        description: 'Order in the day itinerary (1 = first stop of the day).',
      },
      day: { // Added for multi-day
        type: Type.NUMBER,
        description: 'The day number in a multi-day itinerary (1 for Day 1, 2 for Day 2, etc.). Optional for single day plans.'
      }
    },
    required: ['name', 'description', 'lat', 'lng'],
  },
};

// Function declaration for extracting route/line data using Google AI.
const lineFunctionDeclaration: FunctionDeclaration = {
  name: 'line',
  parameters: {
    type: Type.OBJECT,
    description: 'Connection between a start location and an end location.',
    properties: {
      name: {
        type: Type.STRING,
        description: 'Name of the route or connection',
      },
      start: {
        type: Type.OBJECT,
        description: 'Start location of the route',
        properties: {
          lat: {
            type: Type.STRING,
            description: 'Latitude of the start location.',
          },
          lng: {
            type: Type.STRING,
            description: 'Longitude of the start location.',
          },
        },
      },
      end: {
        type: Type.OBJECT,
        description: 'End location of the route',
        properties: {
          lat: {
            type: Type.STRING,
            description: 'Latitude of the end location.',
          },
          lng: {
            type: Type.STRING,
            description: 'Longitude of the end location.',
          },
        },
      },
      transport: {
        type: Type.STRING,
        description:
          'Mode of transportation between locations (e.g., "walking", "driving", "public transit").',
      },
      travelTime: {
        type: Type.STRING,
        description:
          'Estimated travel time between locations (e.g., "15 minutes", "1 hour").',
      },
      day: { // Added for multi-day
        type: Type.NUMBER,
        description: 'The day number in a multi-day itinerary (1 for Day 1, 2 for Day 2, etc.) this travel segment belongs to. Optional for single day plans.'
      }
    },
    required: ['name', 'start', 'end'],
  },
};

// System instructions provided to the Google AI model guiding its responses.
const systemInstructions = `## System Instructions for an Interactive Map Explorer

**Model Persona:** You are a knowledgeable, geographically-aware assistant that provides visual information through maps.
Your primary goal is to answer any location-related query comprehensively, using map-based visualizations.
You can process information about virtually any place, real or fictional, past, present, or future.

**Core Capabilities:**

1. **Geographic Knowledge:** You possess extensive knowledge of:
   * Global locations, landmarks, and attractions
   * Historical sites and their significance
   * Natural wonders and geography
   * Cultural points of interest
   * Travel routes and transportation options

2. **Two Operation Modes:**

   **A. General Explorer Mode** (Default when DAY_PLANNER_MODE is false):
   * Respond to any query by identifying relevant geographic locations.
   * You MUST use the "location" function to specify ANY geographic point of interest. Provide its name, description, latitude (lat), and longitude (lng).
   * You MUST use the "line" function to define ALL connections or routes between locations, if appropriate for the query.
   * Provide as many interesting locations as possible (4-8 is ideal).
   * Ensure each location has a meaningful description.
   * Focus on information delivery rather than scheduling.

   **B. Day Planner Mode** (When DAY_PLANNER_MODE is true):
   * Create detailed day itineraries. If the user requests a multi-day plan (e.g., "3-day trip to Paris", "a week in Rome"), you MUST generate an itinerary for the specified number of days.
   * For EACH day in the plan, include:
     * A logical sequence of locations to visit (typically 4-7 major stops per day).
     * Specific times and realistic durations for each location visit.
     * Travel routes between locations with appropriate transportation methods.
     * A balanced schedule considering travel time, meal breaks, and visit durations.
   * **CRITICAL for ALL planner mode responses:**
     * You MUST use the "location" function for every stop in the itinerary. This function call MUST include name, description, lat, lng, time, duration, and sequence properties.
     * You MUST use the "line" function to define travel segments between stops. This function call MUST include name, start, end, transport, and travelTime properties.
   * **CRITICAL for MULTI-DAY plans:**
     * If generating a plan for more than one day, EACH \`location\` AND EACH \`line\` function call MUST include a \`day\` property (e.g., \`day: 1\`, \`day: 2\`). This indicates which day of the overall itinerary the item belongs to.
     * For single-day plans, the \`day\` property can be omitted or set to 1.

**Output Format Rules (MANDATORY):**

1. **General Explorer Mode:**
   * All geographic points MUST be returned via the "location" function.
   * All routes/connections MUST be returned via the "line" function.
   * Do NOT provide location names, coordinates, or descriptions as plain text in your response. Use the functions.

2. **Day Planner Mode:**
   * Every planned stop MUST be returned via the "location" function, including all required properties (time, duration, sequence, day if multi-day).
   * Every travel segment between stops MUST be returned via the "line" function, including all required properties (transport, travelTime, day if multi-day).
   * Do NOT provide itinerary details (location names, times, travel info) as plain text. Use the functions.

**Important Guidelines:**
* It is MANDATORY that all geographic data and route information is provided exclusively through the 'location' and 'line' function calls. Do NOT provide this information as plain text.
* If you cannot represent the information using these functions for any reason, state that you cannot fulfill the request in that manner, but still attempt to use functions for any part you can.
* If unsure about a specific location, use your best judgment to provide coordinates.
* Never reply with just questions or requests for clarification without first attempting to use the functions.
* Always attempt to map the information visually, even for complex or abstract queries, by using the functions.
* For day plans, create realistic schedules that start no earlier than 8:00am and end by 9:00pm for each day.
* If a user asks for "more places" or a "longer plan", interpret this as potentially more locations per day (up to 7) or more days if the context implies.

Remember: In default mode, respond to ANY query by finding relevant locations AND RETURNING THEM VIA FUNCTIONS. In day planner mode, create structured single or multi-day itineraries as requested, paying close attention to the \`day\`, \`sequence\`, \`time\`, and \`duration\` properties, AND RETURNING ALL DATA VIA FUNCTIONS.`;


// Initialize the Google AI client.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// Functions to control the visibility of the timeline panel.
function showTimeline() {
  if (timelineContainer) {
    timelineContainer.style.display = 'block';

    // Delay adding 'visible' class for CSS transition effect.
    setTimeout(() => {
      timelineContainer.classList.add('visible');

      if (window.innerWidth > 768) {
        // Desktop view
        mapContainer.classList.add('map-container-shifted');
        adjustInterfaceForTimeline(true);
        window.dispatchEvent(new Event('resize')); // Force map redraw
      } else {
        // Mobile view
        mapOverlay.classList.add('visible');
      }
    }, 10);
  }
}

function hideTimeline() {
  if (timelineContainer) {
    timelineContainer.classList.remove('visible');
    mapContainer.classList.remove('map-container-shifted');
    mapOverlay.classList.remove('visible');
    adjustInterfaceForTimeline(false);

    // Wait for transition before setting display to none.
    setTimeout(() => {
      timelineContainer.style.display = 'none';
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}

// Adjusts map bounds when the timeline visibility changes.
function adjustInterfaceForTimeline(isTimelineVisible: boolean) {
  if (bounds && map && bounds.getNorthEast() && bounds.getSouthWest()) { // Check if bounds are valid
    setTimeout(() => {
      map.fitBounds(bounds);
    }, 350); // Delay to allow layout adjustments
  }
}

// Event Listeners for UI elements.
const promptInput = document.querySelector(
  '#prompt-input',
) as HTMLTextAreaElement;
promptInput.placeholder = "Khám phá địa điểm, lịch sử, sự kiện, hoặc hỏi về bất kỳ vị trí nào..."; // Default placeholder

promptInput.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter' && !e.shiftKey) {
    // Allow shift+enter for new lines
    const buttonEl = document.getElementById('generate') as HTMLButtonElement;
    buttonEl.classList.add('loading');
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      sendText(promptInput.value);
      promptInput.value = '';
    }, 10); // Delay to show loading state
  }
});

generateButton.addEventListener('click', (e) => {
  const buttonEl = e.currentTarget as HTMLButtonElement;
  buttonEl.classList.add('loading');

  setTimeout(() => {
    sendText(promptInput.value);
  }, 10);
});

resetButton.addEventListener('click', (e) => {
  restart();
});

if (prevCardButton) {
  prevCardButton.addEventListener('click', () => {
    navigateCards(-1);
  });
}

if (nextCardButton) {
  nextCardButton.addEventListener('click', () => {
    navigateCards(1);
  });
}

if (plannerModeToggle) {
  plannerModeToggle.addEventListener('change', () => {
    isPlannerMode = plannerModeToggle.checked;
    promptInput.placeholder = isPlannerMode
      ? "Tạo kế hoạch trong ngày/nhiều ngày tại... (ví dụ: '3 ngày ở Đà Lạt' hoặc 'Một ngày ở Hà Nội')"
      : "Khám phá địa điểm, lịch sử, sự kiện, hoặc hỏi về bất kỳ vị trí nào...";

    if (!isPlannerMode && timelineContainer) {
      hideTimeline();
    }
  });
}

if (closeTimelineButton) {
  closeTimelineButton.addEventListener('click', () => {
    hideTimeline();
  });
}

if (timelineToggle) {
  timelineToggle.addEventListener('click', () => {
    if (dayPlanItinerary.length > 0) {
        showTimeline();
    } else {
        // Allow opening timeline even if empty, e.g., to see a message or if user expects it
        showTimeline(); 
    }
  });
}

if (mapOverlay) {
  mapOverlay.addEventListener('click', () => {
    hideTimeline();
  });
}

if (exportPlanButton) {
  exportPlanButton.addEventListener('click', () => {
    exportDayPlan();
  });
}

if (directionsButton) {
  directionsButton.addEventListener('click', () => {
    generateGoogleMapsDirections(); // Main button defaults to Day 1 or current context
  });
}

// Resets the map and application state to initial conditions.
function restart() {
  points = [];
  bounds = new LatLngBounds();
  dayPlanItinerary = [];
  totalDaysInPlan = 1;

  markers.forEach((marker) => marker.map = null); 
  markers = [];

  lines.forEach((line) => {
    line.poly.setMap(null);
    line.geodesicPoly.setMap(null);
  });
  lines = [];

  popUps.forEach((item) => {
    item.popup.setMap(null);
  });
  popUps = [];

  if (cardContainer) cardContainer.innerHTML = '';
  if (carouselIndicators) carouselIndicators.innerHTML = '';
  if (cardCarousel) cardCarousel.style.display = 'none';
  if (timeline) timeline.innerHTML = '';
  if (timelineTitleElement) timelineTitleElement.textContent = 'Kế hoạch trong ngày của bạn';
  if (timelineContainer) hideTimeline(); 
}

// Sends the user's prompt to the Google AI and processes the response.
async function sendText(prompt: string) {
  spinner.classList.remove('hidden');
  errorMessage.innerHTML = '';
  restart(); 
  const buttonEl = document.getElementById('generate') as HTMLButtonElement;

  try {
    let finalPrompt = prompt;
    if (isPlannerMode) {
      if (prompt.toLowerCase().includes('ngày') || prompt.toLowerCase().includes('days') || prompt.match(/\d+\s*(ngày|day)s?/i)) {
         finalPrompt = `${prompt} (Yêu cầu: Tạo kế hoạch chi tiết cho nhiều ngày. Bắt buộc sử dụng thuộc tính 'day' cho mỗi địa điểm và tuyến đường.)`;
      } else {
         finalPrompt = `${prompt} (Yêu cầu: Tạo kế hoạch chi tiết trong một ngày. Bắt buộc sử dụng các thuộc tính 'sequence', 'time', 'duration'.)`;
      }
    }

    const updatedInstructions = isPlannerMode
      ? systemInstructions.replace('DAY_PLANNER_MODE', 'true')
      : systemInstructions.replace('DAY_PLANNER_MODE', 'false');

    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: finalPrompt, 
      config: {
        systemInstruction: updatedInstructions,
        temperature: 0.5, // Lowered temperature for more focused output
        tools: [
          {
            functionDeclarations: [
              locationFunctionDeclaration,
              lineFunctionDeclaration,
            ],
          },
        ],
      },
    });

    let accumulatedText = '';
    let results = false;
    for await (const chunk of response) {
      if (chunk.text) { 
        accumulatedText += chunk.text;
      }
      const fns = chunk.functionCalls ?? [];
      for (const fn of fns) {
        if (fn.name === 'location') {
          await setPin(fn.args);
          results = true;
        }
        if (fn.name === 'line') {
          await setLeg(fn.args);
          results = true;
        }
      }
    }

    if (!results) {
      console.warn("Không có lệnh gọi hàm nào được nhận. Phản hồi văn bản của AI:", accumulatedText);
      throw new Error(
        `Không thể tạo ra kết quả nào. Vui lòng thử lại, hoặc thử một truy vấn khác. ${accumulatedText ? "Phản hồi từ AI: " + accumulatedText.substring(0,150) + (accumulatedText.length > 150 ? "..." : "") : "(Không có phản hồi văn bản từ AI)"}`
      );
    }

    if (isPlannerMode && dayPlanItinerary.length > 0) {
      // Sort by day, then by sequence, then by time
      dayPlanItinerary.sort(
        (a, b) =>
          (a.day || 1) - (b.day || 1) ||
          (a.sequence || Infinity) - (b.sequence || Infinity) ||
          (a.time || '').localeCompare(b.time || ''),
      );
      
      // Determine total days
      totalDaysInPlan = Math.max(...dayPlanItinerary.map(item => item.day || 1), 1);
      if (timelineTitleElement) {
        timelineTitleElement.textContent = totalDaysInPlan > 1 
            ? `Kế hoạch ${totalDaysInPlan} ngày của bạn` 
            : 'Kế hoạch trong ngày của bạn';
      }

      createTimeline(); 
      showTimeline();   
    }

    createLocationCards(); 
  } catch (e: any) {
    errorMessage.innerHTML = e.message;
    console.error('Error generating content:', e);
  } finally {
    buttonEl.classList.remove('loading');
  }
  spinner.classList.add('hidden');
}

// Adds a pin (marker and popup) to the map for a given location.
async function setPin(args: any) {
  const point = new LatLng(Number(args.lat), Number(args.lng));
  points.push(point);
  if (!bounds.contains(point)) { // Only extend if necessary, avoid overly large bounds initially
    bounds.extend(point);
  }


  const marker = new AdvancedMarkerElement({ // Use imported AdvancedMarkerElement constructor
    map,
    position: point,
    title: args.name,
  });
  markers.push(marker);
  // map.panTo(point); // Avoid aggressive panning for each pin
  if (markers.length === 1) map.panTo(point); // Pan to first marker
  map.fitBounds(bounds);


  const content = document.createElement('div');
  let timeInfo = '';
  if (args.time) {
    timeInfo = `<div style="margin-top: 4px; font-size: 12px; color: #2196F3;">
                  <i class="fas fa-clock"></i> ${args.time}
                  ${args.duration ? ` • ${args.duration}` : ''}
                </div>`;
  }
  content.innerHTML = `<b>${args.name}</b><br/>${args.description}${timeInfo}`;

  const popup = new CustomPopup(point, content);

  if (!isPlannerMode) {
    popup.setMap(map);
  }

  const locationDay = args.day ? Number(args.day) : 1;

  const locationInfo: PopUpData = {
    name: args.name,
    description: args.description,
    position: point,
    popup,
    content,
    time: args.time,
    duration: args.duration,
    sequence: args.sequence,
    day: locationDay,
  };

  popUps.push(locationInfo);

  if (isPlannerMode && (args.time || args.sequence !== undefined)) { 
    dayPlanItinerary.push(locationInfo);
  }
}

// Adds a line (route) between two locations on the map.
async function setLeg(args: any) {
  const start = new LatLng(
    Number(args.start.lat),
    Number(args.start.lng),
  );
  const end = new LatLng(Number(args.end.lat), Number(args.end.lng));
  points.push(start);
  points.push(end);
  bounds.extend(start);
  bounds.extend(end);
  map.fitBounds(bounds);

  const polyOptions: google.maps.PolylineOptions = { 
    strokeOpacity: 0.0,
    strokeWeight: 3,
    map,
  };

  const geodesicPolyOptions: google.maps.PolylineOptions = { 
    strokeColor: isPlannerMode ? '#2196F3' : '#CC0099',
    strokeOpacity: 1.0,
    strokeWeight: isPlannerMode ? 4 : 3,
    map,
  };

  if (isPlannerMode) {
    geodesicPolyOptions.icons = [
      {
        icon: {path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 3} as google.maps.Symbol, 
        offset: '0',
        repeat: '15px',
      },
    ];
  }

  const poly = new Polyline(polyOptions); // Use imported Polyline constructor
  const geodesicPoly = new Polyline(geodesicPolyOptions); // Use imported Polyline constructor

  const path = [start, end];
  poly.setPath(path);
  geodesicPoly.setPath(path);

  const lineDay = args.day ? Number(args.day) : 1;

  lines.push({
    poly,
    geodesicPoly,
    name: args.name,
    transport: args.transport,
    travelTime: args.travelTime,
    day: lineDay,
  });
}

// Creates and populates the timeline view for the day plan.
function createTimeline() {
  if (!timeline || dayPlanItinerary.length === 0) {
    if (timeline) timeline.innerHTML = ''; 
    return;
  }
  timeline.innerHTML = ''; 

  let currentDay = -1;
  let timelineItemAnimationCounter = 0; // For staggered animation

  dayPlanItinerary.forEach((item, index) => {
    const itemDay = item.day || 1;
    if (itemDay !== currentDay) {
      currentDay = itemDay;
      const dayHeaderContainer = document.createElement('div');
      dayHeaderContainer.className = 'timeline-day-header-container';

      const dayTitle = document.createElement('h4');
      dayTitle.className = 'timeline-day-header-title';
      dayTitle.innerHTML = `<i class="fas fa-calendar-day"></i> Ngày ${currentDay}`;
      dayHeaderContainer.appendChild(dayTitle);

      if (totalDaysInPlan > 0) { // Only add per-day directions if multi-day or explicitly for day 1
        const dayDirectionsButton = document.createElement('button');
        dayDirectionsButton.className = 'timeline-day-directions-button interactive-button';
        dayDirectionsButton.setAttribute('data-day', currentDay.toString());
        dayDirectionsButton.innerHTML = `<i class="fas fa-route"></i> Chỉ đường ngày này`;
        dayDirectionsButton.addEventListener('click', () => {
          generateGoogleMapsDirections(currentDay);
        });
        dayHeaderContainer.appendChild(dayDirectionsButton);
      }
      timeline.appendChild(dayHeaderContainer);
    }

    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    // Apply animation with delay
    timelineItem.style.animationDelay = `${timelineItemAnimationCounter * 0.07}s`;
    timelineItemAnimationCounter++;

    const timeDisplay = item.time || 'Linh hoạt';

    const popUpIndex = popUps.findIndex(p => p.name === item.name && p.position.equals(item.position) && p.day === item.day);

    timelineItem.innerHTML = `
      <div class="timeline-time">${timeDisplay}</div>
      <div class="timeline-connector">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-content" data-popup-index="${popUpIndex}" data-dayplan-index="${index}" data-day="${itemDay}">
        <div class="timeline-title">${item.name}</div>
        <div class="timeline-description">${item.description}</div>
        ${item.duration ? `<div class="timeline-duration">${item.duration}</div>` : ''}
      </div>
    `;

    const timelineContent = timelineItem.querySelector('.timeline-content');
    if (timelineContent) {
      timelineContent.addEventListener('click', () => {
        const clickedPopUpIndex = parseInt(timelineContent.getAttribute('data-popup-index') || '-1', 10);
        if (clickedPopUpIndex !== -1 && clickedPopUpIndex < popUps.length) { 
          highlightCard(clickedPopUpIndex);
          map.panTo(popUps[clickedPopUpIndex].position);
        }
      });
    }
    timeline.appendChild(timelineItem);

    const nextItemInSameDay = dayPlanItinerary.find((nextItem, nextItemIndex) => 
        nextItemIndex > index && (nextItem.day || 1) === itemDay
    );

    if (nextItemInSameDay) {
        const connectingLine = lines.find(line => {
            const lineDayMatches = (line.day || 1) === itemDay;
            if (!lineDayMatches) return false;

            const linePath = line.poly.getPath();
            if (linePath.getLength() < 2) return false; 
            const lineStart = linePath.getAt(0);
            const lineEnd = linePath.getAt(linePath.getLength() -1);

            const matchesPointsExact = (lineStart.equals(item.position) && lineEnd.equals(nextItemInSameDay.position));
            if (matchesPointsExact) return true;
            
            const matchesPointsReversed = (lineStart.equals(nextItemInSameDay.position) && lineEnd.equals(item.position));
            if (matchesPointsReversed) return true;

            const lineNameLower = line.name.toLowerCase();
            const currentNameLower = item.name.toLowerCase();
            const nextNameLower = nextItemInSameDay.name.toLowerCase();
            const matchesNames = lineNameLower.includes(currentNameLower) && lineNameLower.includes(nextNameLower) ||
                   lineNameLower.includes(`from ${currentNameLower} to ${nextNameLower}`) || 
                   lineNameLower.includes(`từ ${currentNameLower} đến ${nextNameLower}`) ||
                   lineNameLower.includes(`di chuyển từ ${currentNameLower} đến ${nextNameLower}`);

            return matchesNames; 
        });

        if (connectingLine && (connectingLine.transport || connectingLine.travelTime)) {
            const transportItem = document.createElement('div');
            transportItem.className = 'timeline-item transport-item';
            // Apply animation with delay
            transportItem.style.animationDelay = `${timelineItemAnimationCounter * 0.07}s`;
            timelineItemAnimationCounter++;

            transportItem.innerHTML = `
              <div class="timeline-time"></div>
              <div class="timeline-connector">
                <div class="timeline-dot" style="background-color: #999;"></div>
                <div class="timeline-line"></div>
              </div>
              <div class="timeline-content transport">
                <div class="timeline-title">
                  <i class="fas fa-${getTransportIcon(connectingLine.transport || 'route')}"></i>
                  ${connectingLine.transport || 'Di chuyển'}
                </div>
                <div class="timeline-description">${connectingLine.name}</div>
                ${connectingLine.travelTime ? `<div class="timeline-duration">${connectingLine.travelTime}</div>` : ''}
              </div>
            `;
            timeline.appendChild(transportItem); 
        }
    }
  });
}


// Returns an appropriate Font Awesome icon class based on transport type.
function getTransportIcon(transportType: string): string {
  const type = (transportType || '').toLowerCase();
  if (type.includes('walk') || type.includes('đi bộ')) {
    return 'walking';
  }
  if (type.includes('car') || type.includes('driv') || type.includes('ô tô') || type.includes('lái xe')) {
    return 'car-side';
  }
  if (
    type.includes('bus') || type.includes('xe buýt') ||
    type.includes('transit') || type.includes('công cộng') ||
    type.includes('public')
  ) {
    return 'bus-alt';
  }
  if (
    type.includes('train') || type.includes('tàu hỏa') ||
    type.includes('subway') || type.includes('tàu điện ngầm') ||
    type.includes('metro')
  ) {
    return 'train';
  }
  if (type.includes('bike') || type.includes('cycl') || type.includes('xe đạp')) {
    return 'bicycle';
  }
  if (type.includes('taxi') || type.includes('cab')) {
    return 'taxi';
  }
  if (type.includes('boat') || type.includes('thuyền') || type.includes('ferry') || type.includes('phà')) {
    return 'ship';
  }
  if (type.includes('plane') || type.includes('fly') || type.includes('máy bay')) {
    return 'plane-departure';
  }
  {
    return 'route'; // Default icon
  }
}

// Generates a placeholder SVG image for location cards.
function getPlaceholderImage(locationName: string): string {
  let hash = 0;
  for (let i = 0; i < locationName.length; i++) {
    hash = locationName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  const saturation = 60 + (hash % 30);
  const lightness = 50 + (hash % 20);
  const letter = locationName.charAt(0).toUpperCase() || '?';

  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="180" viewBox="0 0 300 180">
      <rect width="300" height="180" fill="hsl(${hue}, ${saturation}%, ${lightness}%)" />
      <text x="150" y="95" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" dominant-baseline="middle">${letter}</text>
    </svg>
  `)}`;
}

// Creates and displays location cards in the carousel.
function createLocationCards() {
  if (!cardContainer || !carouselIndicators || popUps.length === 0) {
     if (cardCarousel) cardCarousel.style.display = 'none';
     if (cardContainer) cardContainer.innerHTML = '';
     if (carouselIndicators) carouselIndicators.innerHTML = '';
    return;
  }
  cardContainer.innerHTML = '';
  carouselIndicators.innerHTML = '';
  cardCarousel.style.display = 'block';

  popUps.forEach((location, index) => {
    const card = document.createElement('div');
    card.className = 'location-card interactive-card';
    if (isPlannerMode) card.classList.add('day-planner-card');
    if (index === 0) card.classList.add('card-active'); 

    const imageUrl = getPlaceholderImage(location.name);
    let cardContent = `<div class="card-image" style="background-image: url('${imageUrl}')"></div>`;

    if (isPlannerMode) {
      if (location.day && totalDaysInPlan > 1) {
        cardContent += `<div class="card-day-badge">Ngày ${location.day}</div>`;
      }
      if (location.sequence) {
        cardContent += `<div class="card-sequence-badge">${location.sequence}</div>`;
      }
      if (location.time) {
        cardContent += `<div class="card-time-badge">${location.time}</div>`;
      }
    }

    cardContent += `
      <div class="card-content">
        <h3 class="card-title">${location.name}</h3>
        <p class="card-description">${location.description}</p>
        ${isPlannerMode && location.duration ? `<div class="card-duration">${location.duration}</div>` : ''}
        <div class="card-coordinates">
          ${location.position.lat().toFixed(5)}, ${location.position.lng().toFixed(5)}
        </div>
      </div>
    `;
    card.innerHTML = cardContent;

    card.addEventListener('click', () => {
      highlightCard(index); 
      map.panTo(location.position);
    });

    cardContainer.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active'); 
    carouselIndicators.appendChild(dot);
  });

  if (popUps.length > 0) {
    highlightCard(0); 
  }
}

// Highlights the selected card and corresponding elements.
function highlightCard(index: number) { // index is for popUps array
  activeCardIndex = index;
  const cards = cardContainer?.querySelectorAll('.location-card');
  if (!cards || cards.length === 0 || index >= cards.length) return; 

  cards.forEach((card) => card.classList.remove('card-active'));
  const activeCardElement = cards[index] as HTMLDivElement;
  if (activeCardElement) {
    activeCardElement.classList.add('card-active');
    activeCardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  const dots = carouselIndicators?.querySelectorAll('.carousel-dot');
  if (dots) {
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  popUps.forEach((locationItem, i) => {
    const shouldShowPopup = isPlannerMode ? (i === index) : true;
    locationItem.popup.setMap(shouldShowPopup ? map : null);
    if (locationItem.content) {
      locationItem.content.classList.toggle('popup-active', i === index);
    }
  });

  if (isPlannerMode) {
    highlightTimelineItem(index); // Pass popUps index
  }
}

// Highlights the timeline item corresponding to the selected card.
function highlightTimelineItem(popUpIndex: number) { // popUpIndex is the index in the main popUps array
  if (!timeline || popUpIndex < 0 || popUpIndex >= popUps.length) return;
  
  const timelineContentItems = timeline.querySelectorAll('.timeline-content[data-popup-index]');
  timelineContentItems.forEach((item) => item.classList.remove('active'));

  for (const item of timelineContentItems) {
    const itemPopUpIndexAttr = item.getAttribute('data-popup-index');
    if (itemPopUpIndexAttr && parseInt(itemPopUpIndexAttr, 10) === popUpIndex) {
      item.classList.add('active');
      item.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      break; 
    }
  }
}


// Allows navigation through cards using arrow buttons.
function navigateCards(direction: number) {
  if (popUps.length === 0) return;
  let newIndex = activeCardIndex + direction;
  if (newIndex < 0) newIndex = popUps.length - 1;
  if (newIndex >= popUps.length) newIndex = 0;

  highlightCard(newIndex);
  map.panTo(popUps[newIndex].position);
}

// Exports the current day plan as a simple text file.
function exportDayPlan() {
  if (!dayPlanItinerary.length) {
    alert("Không có kế hoạch nào để xuất."); 
    return;
  }
  let content = `# ${totalDaysInPlan > 1 ? `Kế hoạch ${totalDaysInPlan} ngày` : 'Kế hoạch trong ngày'} của bạn\n\n`;
  let currentDay = -1;

  dayPlanItinerary.forEach((item) => { 
    const itemDay = item.day || 1;
    if (itemDay !== currentDay) {
      currentDay = itemDay;
      content += `\n## Ngày ${currentDay}\n\n`;
    }

    content += `### ${item.sequence || '*'}. ${item.name}\n`;
    content += `Thời gian: ${item.time || 'Linh hoạt'}\n`;
    if (item.duration) content += `Thời lượng: ${item.duration}\n`;
    content += `\n${item.description}\n\n`;

    const currentItemIndexInItinerary = dayPlanItinerary.indexOf(item);
    const nextItemInSameDay = dayPlanItinerary.find((nextItem, nextItemIndex) => 
        nextItemIndex > currentItemIndexInItinerary && (nextItem.day || 1) === itemDay
    );

    if (nextItemInSameDay) {
        const connectingLine = lines.find(line => {
            const lineDayMatches = (line.day || 1) === itemDay;
            if (!lineDayMatches) return false;
            
            const linePath = line.poly.getPath();
            if (linePath.getLength() < 2) return false;
            const lineStart = linePath.getAt(0);
            const lineEnd = linePath.getAt(linePath.getLength() -1 );

            return (
                (lineStart.equals(item.position) && lineEnd.equals(nextItemInSameDay.position)) ||
                (lineStart.equals(nextItemInSameDay.position) && lineEnd.equals(item.position)) 
            );
        });

      if (connectingLine) {
        content += `#### Di chuyển đến ${nextItemInSameDay.name}\n`;
        content += `Phương tiện: ${connectingLine.transport || 'Chưa xác định'}\n`;
        if (connectingLine.travelTime) {
          content += `Thời gian di chuyển: ${connectingLine.travelTime}\n`;
        }
        content += `\n`;
      }
    }
  });

  const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileNameBase = totalDaysInPlan > 1 ? `ke-hoach-${totalDaysInPlan}-ngay` : 'ke-hoach-trong-ngay';
  a.download = `${fileNameBase}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generates and opens Google Maps directions URL.
// If targetDayNumber is not provided, it defaults to Day 1.
function generateGoogleMapsDirections(targetDayNumber?: number) {
  if (dayPlanItinerary.length === 0) {
    alert("Vui lòng tạo kế hoạch trước khi xem chỉ đường.");
    return;
  }

  const dayToProcess = targetDayNumber || 1; // Default to Day 1 if no specific day is requested

  const itineraryForDirections = dayPlanItinerary.filter(item => (item.day || 1) === dayToProcess);

  if (itineraryForDirections.length === 0) {
      alert(`Không có lịch trình cho Ngày ${dayToProcess} để tạo chỉ đường.`);
      return;
  }
  
  // Alert only if the main header button was used for a multi-day plan
  if (!targetDayNumber && totalDaysInPlan > 1 && dayToProcess === 1) {
      alert(`Chỉ đường đang được tạo cho Ngày ${dayToProcess}. Các ngày khác có thể xem bằng nút chỉ đường riêng của từng ngày.`);
  }

  let url = 'https://www.google.com/maps/dir/?api=1';

  const origin = itineraryForDirections[0].position;
  url += `&origin=${origin.lat()},${origin.lng()}`;

  if (itineraryForDirections.length > 1) {
    const destination = itineraryForDirections[itineraryForDirections.length - 1].position;
    url += `&destination=${destination.lat()},${destination.lng()}`;

    if (itineraryForDirections.length > 2) {
      const waypoints = itineraryForDirections
        .slice(1, -1) 
        .map(item => `${item.position.lat()},${item.position.lng()}`)
        .join('|');
      if (waypoints) {
        url += `&waypoints=${waypoints}`;
      }
    }
  }
  
  window.open(url, '_blank');
}
